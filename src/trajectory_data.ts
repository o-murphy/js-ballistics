// Flags for marking trajectory row if Zero or Mach crossing
// Also uses to set a filters for a trajectory calculation loop
import {
    UnitProps,
    Unit,
    preferredUnits,
    Angular,
    Distance,
    Velocity,
    Energy,
    Weight,
    Dimension,
    UNew,
    unitTypeCoerce,
} from "./unit";
import { Shot } from "./shot";
import {
    _TrajectoryData,
    _TrajectoryDataInterpKey,
    HitOutput,
    TrajFlag,
    TerminationReason,
    WasmManager,
} from "./_wasm";
import { RangeError } from "./exceptions";

// "Same instant" tolerance for HitResult.samples' event-to-sample annotation.
// Mirrors Python's _SAME_INSTANT_REL_TOL / _SAME_INSTANT_ABS_TOL.
const SAME_INSTANT_REL_TOL = 1e-3;
const SAME_INSTANT_ABS_TOL = 1e-6;

// Flags that mark a record as a physical event (as opposed to a scheduled sample).
const EVENT_FLAGS: number =
    TrajFlag.ZERO | TrajFlag.MACH | TrajFlag.APEX | TrajFlag.MRT;

// Logs the HitResult.trajectory deprecation notice once per process, rather than on
// every access (it can be read in a hot loop, unlike Python's per-call warning).
let trajectoryDeprecationWarned = false;
function warnTrajectoryDeprecated(): void {
    if (trajectoryDeprecationWarned) {
        return;
    }
    trajectoryDeprecationWarned = true;
    console.warn(
        "HitResult.trajectory is deprecated; use `.records` for the exact " +
            "chronological stream or `.samples` for the deterministic " +
            "scheduled-sample table."
    );
}

const trajFlagNames: Record<number, string> = {
    [TrajFlag.NONE]: "NONE",
    [TrajFlag.ZERO_UP]: "ZERO_UP",
    [TrajFlag.ZERO_DOWN]: "ZERO_DOWN",
    [TrajFlag.ZERO]: "ZERO",
    [TrajFlag.MACH]: "MACH",
    [TrajFlag.RANGE]: "RANGE",
    [TrajFlag.APEX]: "APEX",
    [TrajFlag.ALL]: "ALL",
    [TrajFlag.MRT]: "MRT",
};

const trajFlagName = (value: TrajFlag): string => {
    if (Object.prototype.hasOwnProperty.call(trajFlagNames, value)) {
        return trajFlagNames[value];
    }

    let parts: string[] = [];
    for (const [bitStr, name] of Object.entries(trajFlagNames)) {
        const bit = Number(bitStr);

        if (bit !== 0 && (value & bit) === bit) {
            parts.push(name);
        }
    }

    if (
        (value & TrajFlag.ZERO_UP) === TrajFlag.ZERO_UP &&
        (value & TrajFlag.ZERO_DOWN) === TrajFlag.ZERO_DOWN
    ) {
        parts = parts.filter(
            (part) => part !== "ZERO_UP" && part !== "ZERO_DOWN"
        );
        if (!parts.includes("ZERO")) {
            parts.push("ZERO");
        }
    }

    parts.sort();

    return parts.length > 0 ? parts.join("|") : "UNKNOWN";
};

/**
 * `math.isclose` equivalent from Python's standard library.
 *
 * Returns true when `a` and `b` differ by no more than
 * `max(relTol * max(|a|, |b|), absTol)`. Handles `NaN` and `±Infinity`
 * consistently with the Python implementation.
 */
function isClose(
    a: number,
    b: number,
    relTol = 1e-9,
    absTol = 0.0
): boolean {
    if (relTol < 0 || absTol < 0) {
        throw new Error("tolerances must be non-negative");
    }

    if (a === b) {
        return true;
    }

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return false;
    }

    const diff = Math.abs(a - b);
    const scale = Math.max(Math.abs(a), Math.abs(b));

    return diff <= Math.max(relTol * scale, absTol);
}

/**
 * `bisect.bisect_left` equivalent from Python's standard library.
 *
 * Returns the leftmost index at which `x` could be inserted into the
 * sorted array `arr` to keep it sorted.
 */
function bisectLeft(arr: readonly number[], x: number): number {
    let lo = 0;
    let hi = arr.length;

    while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (arr[mid] < x) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }

    return lo;
}

class TrajectoryData {
    /**
     * Represents data related to a trajectory calculation.
     * This class is used solely as a return value from trajectory calculations.
     *
     * @class
     * @param {number} time - Flight time in seconds
     * @param {Distance} distance - Down-range (x-axis) coordinate of this point
     * @param {Velocity} velocity - The velocity at the given point.
     * @param {number} mach - Velocity in Mach terms
     * @param {Distance} height - Vertical (y-axis) coordinate of this point
     * @param {Distance} slantHeight - Distance orthogonal to sight-line
     * @param {Angular} dropAngle - Slant_height in angular terms
     * @param {Distance} windage - Windage (z-axis) coordinate of this point
     * @param {Angular} windageAngle - Windage in angular terms
     * @param {Distance} slantDistance - Distance along sight line that is closest to this point
     * @param {Angular} angle - Angle of velocity vector relative to x-axis
     * @param {number} densityRatio - Ratio of air density here to standard density
     * @param {number} drag - Standard Drag Factor at this point
     * @param {Energy} energy - Energy of bullet at this point
     * @param {Weight} ogw - Optimal game weight, given .energy
     * @param {TrajFlag} flag - Row type
     */
    constructor(
        readonly time: number,
        readonly distance: Distance,
        readonly velocity: Velocity,
        readonly mach: number,
        readonly height: Distance,
        readonly slantHeight: Distance,
        readonly dropAngle: Angular,
        readonly windage: Distance,
        readonly windageAngle: Angular,
        readonly slantDistance: Distance,
        readonly angle: Angular,
        readonly densityRatio: number,
        readonly drag: number,
        readonly energy: Energy,
        readonly ogw: Weight,
        readonly flag: TrajFlag
    ) { }

    /**
     * Return a copy of this point with a new flag value.
     *
     * Replaces Python's `NamedTuple._replace(flag=...)`. Preserves the
     * `TrajectoryData` prototype so all instance methods survive.
     */
    withFlag(flag: TrajFlag): TrajectoryData {
        return new TrajectoryData(
            this.time,
            this.distance,
            this.velocity,
            this.mach,
            this.height,
            this.slantHeight,
            this.dropAngle,
            this.windage,
            this.windageAngle,
            this.slantDistance,
            this.angle,
            this.densityRatio,
            this.drag,
            this.energy,
            this.ogw,
            flag
        );
    }

    /**
     * Returns an array of numerical values representing the trajectory data in default units.
     *
     * @returns {number[]} An array where each element corresponds to a specific piece of trajectory data
     * converted to default units.
     */
    inDefUnits(): number[] {
        return [
            this.time,
            this.distance.In(preferredUnits.distance),
            this.velocity.In(preferredUnits.velocity),
            this.mach,
            this.height.In(preferredUnits.drop),
            this.slantHeight.In(preferredUnits.drop),
            this.dropAngle.In(preferredUnits.adjustment),
            this.windage.In(preferredUnits.drop),
            this.windageAngle.In(preferredUnits.adjustment),
            this.slantDistance.In(preferredUnits.distance),
            this.angle.In(preferredUnits.angular),
            this.densityRatio,
            this.drag,
            this.energy.In(preferredUnits.energy),
            this.ogw.In(preferredUnits.ogw),
            this.flag,
        ];
    }

    /**
     * Returns an array of strings representing the trajectory data in a formatted manner.
     *
     * @returns {string[]} An array of formatted strings, each representing a piece of trajectory data.
     */
    formatted(): string[] {
        function _fmt<AllowedUnitT extends Unit>(
            value: Dimension<AllowedUnitT>,
            unit: AllowedUnitT
        ): string {
            return `${value.In(unit).toFixed(UnitProps[unit].accuracy)} ${UnitProps[unit].symbol}`;
        }

        return [
            `${this.time.toFixed(3)} s`,
            _fmt(this.distance, preferredUnits.distance),
            _fmt(this.velocity, preferredUnits.velocity),
            `${this.mach.toFixed(2)} mach`,
            _fmt(this.height, preferredUnits.drop),
            _fmt(this.slantHeight, preferredUnits.drop),
            _fmt(this.dropAngle, preferredUnits.adjustment),
            _fmt(this.windage, preferredUnits.drop),
            _fmt(this.windageAngle, preferredUnits.adjustment),
            _fmt(this.slantDistance, preferredUnits.distance),
            _fmt(this.angle, preferredUnits.angular),
            `${this.densityRatio.toFixed(3)}`,
            `${this.drag.toFixed(3)}`,
            _fmt(this.energy, preferredUnits.energy),
            _fmt(this.ogw, preferredUnits.ogw),
            `${trajFlagName(this.flag)}`,
        ];
    }

    /**
     * Converts TrajectoryData instance to WASM-compatible format.
     */
    toWasmTrajectoryData(): _TrajectoryData {
        return {
            time: this.time,
            distance_ft: this.distance.foot,
            velocity_fps: this.velocity.fps,
            mach: this.mach,
            height_ft: this.height.foot,
            slant_height_ft: this.slantHeight.foot,
            drop_angle_rad: this.dropAngle.rad,
            windage_ft: this.windage.foot,
            windage_angle_rad: this.windageAngle.rad,
            slant_distance_ft: this.slantDistance.foot,
            angle_rad: this.angle.rad,
            density_ratio: this.densityRatio,
            drag: this.drag,
            energy_ft_lb: this.energy.footPound,
            ogw_lb: this.ogw.pound,
            flag: this.flag,
        };
    }

    static fromWasmTrajectoryData(data: _TrajectoryData): TrajectoryData {
        return new TrajectoryData(
            data.time,
            UNew.Foot(data.distance_ft),
            UNew.FPS(data.velocity_fps),
            data.mach,
            UNew.Foot(data.height_ft),
            UNew.Foot(data.slant_height_ft),
            UNew.Radian(data.drop_angle_rad),
            UNew.Foot(data.windage_ft),
            UNew.Radian(data.windage_angle_rad),
            UNew.Foot(data.slant_distance_ft),
            UNew.Radian(data.angle_rad),
            data.density_ratio,
            data.drag,
            UNew.FootPound(data.energy_ft_lb),
            UNew.Pound(data.ogw_lb),
            data.flag
        );
    }
}

class HitResult {
    /**
     * Computed trajectory data of the shot.
     *
     * @param shot - The parameters of the shot calculation
     * @param records - Computed TrajectoryData points (exact, chronological stream)
     * @param filterFlags - Flags that were requested in the trajectory calculation
     * @param error - RangeError if any (optional)
     */
    readonly shot: Shot;
    readonly records: TrajectoryData[];
    error?: Error;
    readonly filterFlags: TrajFlag;

    private _samples?: TrajectoryData[];
    private _events?: TrajectoryData[];

    constructor(
        shot: Shot,
        records: TrajectoryData[],
        filterFlags: TrajFlag = TrajFlag.NONE,
        error?: Error
    ) {
        this.shot = shot;
        this.records = records;
        this.filterFlags = filterFlags;
        this.error = error;
    }

    /**
     * Exact physical event records (ZERO, MACH, APEX, MRT), without the
     * scheduled-sample projection. Memoized — mirrors Python's
     * `@cached_property`.
     */
    get events(): TrajectoryData[] {
        if (this._events) {
            return this._events;
        }
        this._events = this.records.filter(
            (row) => (row.flag & EVENT_FLAGS) !== 0
        );
        return this._events;
    }

    /**
     * Return the deterministic scheduled-sample table.
     *
     * Physical events remain exact in {@link events}; this presentation view
     * annotates a scheduled sample with an event's flag only when the two
     * are, to floating-point precision, the *same instant*. It never
     * annotates merely the *nearest* sample when no sample is actually
     * that close. Cardinality always equals the sampling schedule's,
     * regardless of whether any annotation occurs.
     */
    get samples(): TrajectoryData[] {
        if (this._samples) {
            return this._samples;
        }

        const samples = this.records.filter(
            (row) =>
                // RANGE identifies an explicit sample. A terminal NONE row
                // is also a sample so incomplete trajectories retain their
                // endpoint.
                (row.flag & TrajFlag.RANGE) !== 0 ||
                (row.flag & EVENT_FLAGS) === 0
        );

        if (samples.length === 0) {
            this._samples = [];
            return this._samples;
        }

        const projected = samples.slice();
        const sampleTimes = samples.map((row) => row.time);

        for (const event of this.events) {
            const right = bisectLeft(sampleTimes, event.time);
            let index: number;

            if (right === 0) {
                index = 0;
            } else if (right === samples.length) {
                index = samples.length - 1;
            } else {
                const left = right - 1;

                // For an exact tie use the later scheduled row, consistently.
                index =
                    event.time - sampleTimes[left] <
                        sampleTimes[right] - event.time
                        ? left
                        : right;
            }

            if (
                isClose(
                    sampleTimes[index],
                    event.time,
                    SAME_INSTANT_REL_TOL,
                    SAME_INSTANT_ABS_TOL
                )
            ) {
                const sample = projected[index];
                projected[index] = sample.withFlag(
                    (sample.flag | event.flag) as TrajFlag
                );
            }
        }

        this._samples = projected;
        return this._samples;
    }

    /**
     * @deprecated Alias for {@link HitResult.records}, kept for source compatibility
     * with the pre-`bclibc@2.0.0-beta.1` API. Use `.records` for the exact
     * chronological stream, or `.samples` for the deterministic scheduled-sample
     * table (what `.trajectory` used to mean). Logs a one-time console warning.
     */
    get trajectory(): TrajectoryData[] {
        warnTrajectoryDeprecated();
        return this.records;
    }

    /**
     * Get Shot properties (alias for shot for Python compatibility).
     */
    get props(): Shot {
        return this.shot;
    }

    /**
     * Returns an iterator for the trajectory data.
     * Allows iterating over the HitResult object directly.
     */
    *[Symbol.iterator](): Iterator<TrajectoryData> {
        yield* this.records;
    }

    /**
     * Allows accessing trajectory elements by index.
     */
    at(index: number): TrajectoryData {
        return this.records[index];
    }

    get length(): number {
        return this.records.length;
    }

    /**
     * Check if the specified flag was requested in the trajectory calculation.
     */
    protected _checkFlag(flag: TrajFlag): void {
        const wasRequested = (this.filterFlags & flag) !== 0;
        if (!wasRequested) {
            const flagName = trajFlagName(flag);
            throw new Error(
                `${flagName} was not requested in trajectory. Use Calculator.fire(..., flags=TrajFlag.${flagName}) to include it.`
            );
        }
    }

    /**
     * Get first TrajectoryData row with the specified flag.
     *
     * For event flags the search is restricted to {@link events}, matching
     * the Python implementation.
     */
    flag(flag: TrajFlag): TrajectoryData | undefined {
        this._checkFlag(flag);
        const rows = (flag & EVENT_FLAGS) !== 0 ? this.events : this.records;
        return rows.find((row) => (row.flag & flag) !== 0);
    }

    /**
     * Get all zero crossing points.
     */
    zeros(): TrajectoryData[] {
        this._checkFlag(TrajFlag.ZERO);

        const data = this.events.filter((row) => (row.flag & TrajFlag.ZERO) !== 0);
        if (data.length < 1) {
            throw new Error("Can't find zero crossing points");
        }

        return data;
    }

    /**
     * Finds the index of the TrajectoryData item closest to the given distance.
     *
     * Matches Python's deprecated `index_at_distance`, including its
     * deliberately loose epsilon (1e-1).
     */
    indexAtDistance(distance: Distance): number {
        const epsilon = 1e-1;
        return this.records.findIndex(
            (item) => item.distance.rawValue >= distance.rawValue - epsilon
        );
    }

    getAtDistance(d: Distance): TrajectoryData {
        const index = this.indexAtDistance(d);
        if (index < 0) {
            throw new Error(
                `Calculated trajectory doesn't reach requested distance ${d.rawValue}`
            );
        }
        return this.records[index];
    }

    /**
     * Get TrajectoryData where the specified attribute equals the target value.
     * Interpolates to create a new TrajectoryData point if necessary.
     */
    async getAt(
        keyAttribute: _TrajectoryDataInterpKey,
        value: number,
        epsilon: number = 1e-9,
        startFromTime: number = 0.0
    ): Promise<TrajectoryData> {
        const traj = this.records;
        const n = traj.length;

        const getKeyVal = (td: TrajectoryData): number => {
            const keyIndex =
                typeof keyAttribute === "object" ? keyAttribute : keyAttribute;
            switch (keyIndex) {
                case 0:
                    return td.time;
                case 1:
                    return td.distance.foot;
                case 2:
                    return td.velocity.fps;
                case 3:
                    return td.mach;
                case 4:
                    return td.height.foot;
                case 5:
                    return td.slantHeight.foot;
                case 6:
                    return td.dropAngle.rad;
                case 7:
                    return td.windage.foot;
                case 8:
                    return td.windageAngle.rad;
                case 9:
                    return td.slantDistance.foot;
                case 10:
                    return td.angle.rad;
                case 11:
                    return td.densityRatio;
                case 12:
                    return td.drag;
                case 13:
                    return td.energy.footPound;
                case 14:
                    return td.ogw.pound;
                default:
                    throw new Error(`Invalid interpolation key: ${keyIndex}`);
            }
        };

        if (n < 3) {
            if (Math.abs(getKeyVal(traj[0]) - value) < epsilon) {
                return traj[0];
            }
            if (n > 1 && Math.abs(getKeyVal(traj[1]) - value) < epsilon) {
                return traj[1];
            }
            throw new Error(
                "Interpolation requires at least 3 TrajectoryData points."
            );
        }

        let startIdx = 0;
        if (startFromTime > 0) {
            startIdx = traj.findIndex((td) => td.time >= startFromTime);
            if (startIdx < 0) startIdx = 0;
        }

        const currVal = getKeyVal(traj[startIdx]);
        if (Math.abs(currVal - value) < epsilon) {
            return traj[startIdx];
        }

        let searchForward = true;
        if (startIdx === n - 1) {
            searchForward = false;
        } else if (startIdx > 0 && startIdx < n - 1) {
            const nextVal = getKeyVal(traj[startIdx + 1]);
            if (
                (nextVal > currVal && value > currVal) ||
                (nextVal < currVal && value < currVal)
            ) {
                searchForward = true;
            } else {
                searchForward = false;
            }
        }

        let targetIdx = -1;
        if (searchForward) {
            for (let i = startIdx; i < n - 1; i++) {
                const curr = getKeyVal(traj[i]);
                const next = getKeyVal(traj[i + 1]);
                if (
                    (curr < value && value <= next) ||
                    (next <= value && value < curr)
                ) {
                    targetIdx = i + 1;
                    break;
                }
            }
        }
        if (!searchForward || targetIdx === -1) {
            for (let i = startIdx; i > 0; i--) {
                const curr = getKeyVal(traj[i]);
                const prev = getKeyVal(traj[i - 1]);
                if (
                    (prev <= value && value < curr) ||
                    (curr < value && value <= prev)
                ) {
                    targetIdx = i;
                    break;
                }
            }
        }

        if (targetIdx === -1) {
            throw new Error(
                `Trajectory does not reach the requested value ${value} for the specified key`
            );
        }

        if (Math.abs(getKeyVal(traj[targetIdx]) - value) < epsilon) {
            return traj[targetIdx];
        }

        if (targetIdx === 0) {
            targetIdx = 1;
        }

        let p0: TrajectoryData, p1: TrajectoryData, p2: TrajectoryData;
        if (targetIdx >= n - 1) {
            p0 = traj[n - 3];
            p1 = traj[n - 2];
            p2 = traj[n - 1];
        } else {
            p0 = traj[targetIdx - 1];
            p1 = traj[targetIdx];
            p2 = traj[targetIdx + 1];
        }

        const bclibc = await WasmManager.init();
        const interpolated = bclibc.interpolateTrajectoryData(
            keyAttribute,
            value,
            p0.toWasmTrajectoryData(),
            p1.toWasmTrajectoryData(),
            p2.toWasmTrajectoryData(),
            TrajFlag.NONE,
            bclibc._InterpMethod.PCHIP
        );

        return TrajectoryData.fromWasmTrajectoryData(interpolated);
    }

    /**
     * Calculate the danger space for a target centered at the given range.
     */
    async dangerSpace(
        atRange: number | Distance,
        targetHeight: number | Distance
    ): Promise<DangerSpace> {
        const bclibc = await WasmManager.init();
        const interpKey = bclibc._TrajectoryDataInterpKey;

        const _atRange = unitTypeCoerce(
            atRange,
            Distance,
            preferredUnits.distance
        );
        const _targetHeight = unitTypeCoerce(
            targetHeight,
            Distance,
            preferredUnits.drop
        );
        const halfHeight = _targetHeight.foot / 2.0;

        const targetRow = await this.getAt(
            interpKey.SLANT_DISTANCE,
            _atRange.foot
        );

        const isClimbing =
            targetRow.angle.rad - this.shot.lookAngle.rad > 0;
        const sign = isClimbing ? -1 : 1;

        const slantHeightBegin =
            targetRow.slantHeight.foot + sign * halfHeight;
        const slantHeightEnd =
            targetRow.slantHeight.foot - sign * halfHeight;

        let beginRow: TrajectoryData;
        let endRow: TrajectoryData;

        try {
            beginRow = await this.getAt(
                interpKey.SLANT_HEIGHT,
                slantHeightBegin,
                1e-9,
                targetRow.time
            );
        } catch {
            beginRow = this.records[0];
        }

        try {
            endRow = await this.getAt(
                interpKey.SLANT_HEIGHT,
                slantHeightEnd,
                1e-9,
                targetRow.time
            );
        } catch {
            endRow = this.records[this.records.length - 1];
        }

        return new DangerSpace(
            targetRow,
            _targetHeight,
            beginRow,
            endRow,
            this.shot.lookAngle
        );
    }

    static fromWasmHitOutput(
        shot: Shot,
        hit: HitOutput,
        raiseRangeError: boolean = true,
        filterFlags: TrajFlag = TrajFlag.NONE
    ): HitResult {
        const trajectory = (hit.trajectory as _TrajectoryData[]).map((item) =>
            TrajectoryData.fromWasmTrajectoryData(item)
        );

        let error: Error | undefined = undefined;
        const reasonValue = hit.reason;

        if (reasonValue === TerminationReason.MINIMUM_VELOCITY_REACHED) {
            error = new RangeError(RangeError.MinimumVelocityReached, trajectory);
        } else if (reasonValue === TerminationReason.MAXIMUM_DROP_REACHED) {
            error = new RangeError(RangeError.MaximumDropReached, trajectory);
        } else if (reasonValue === TerminationReason.MINIMUM_ALTITUDE_REACHED) {
            error = new RangeError(RangeError.MinimumAltitudeReached, trajectory);
        }

        if (raiseRangeError && error) {
            throw error;
        }

        return new HitResult(shot, trajectory, filterFlags, error);
    }
}

/**
 * Result of a danger space calculation.
 */
class DangerSpace {
    constructor(
        readonly atRange: TrajectoryData,
        readonly targetHeight: Distance,
        readonly begin: TrajectoryData,
        readonly end: TrajectoryData,
        readonly lookAngle: Angular
    ) { }
}

export {
    TrajectoryData,
    trajFlagName,
    trajFlagNames,
    HitResult,
    DangerSpace,
    isClose,
    bisectLeft,
    EVENT_FLAGS,
    SAME_INSTANT_REL_TOL,
    SAME_INSTANT_ABS_TOL,
};
