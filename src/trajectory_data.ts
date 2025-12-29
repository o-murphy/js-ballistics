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
} from "./unit";
import { Shot } from "./shot";
import {
    _TrajectoryData,
    _TrajectoryDataInterpKey,
    _InterpMethod,
    HitOutput,
    TrajFlag,
    loadBclibc,
    TerminationReason
} from "./_wasm";
import { RangeError } from "./exceptions";

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

const trajFlagName = (value: TrajFlag) => {
    if (Object.prototype.hasOwnProperty.call(trajFlagNames, value)) {
        return trajFlagNames[value];
    }

    let parts: string[] = [];
    // Object.entries iterates over key-value pairs. Keys (bitStr) will be strings, so convert to number.
    for (const [bitStr, name] of Object.entries(trajFlagNames)) {
        const bit = Number(bitStr); // Convert the string key back to a number

        // Ensure 'bit' is not 0 (e.g., TrajFlag.NONE) as (value & 0) == 0 is always true.
        // And check if the 'bit' flag is set in the 'value'.
        if (bit !== 0 && (value & bit) === bit) {
            parts.push(name);
        }
    }

    // This block handles the special case where both ZERO_UP and ZERO_DOWN are present,
    // and you want to represent it as "ZERO".
    if (
        (value & TrajFlag.ZERO_UP) === TrajFlag.ZERO_UP &&
        (value & TrajFlag.ZERO_DOWN) === TrajFlag.ZERO_DOWN
    ) {
        // If ZERO_UP and ZERO_DOWN are both in parts, replace them with "ZERO"
        parts = parts.filter((part) => part !== "ZERO_UP" && part !== "ZERO_DOWN");
        // Only add "ZERO" if it's not already implicitly handled by direct lookup
        // and if it makes sense as a combined flag.
        if (!parts.includes("ZERO")) {
            parts.push("ZERO");
        }
    }

    // Sort parts to ensure consistent output, useful for testing
    parts.sort();

    return parts.length > 0 ? parts.join("|") : "UNKNOWN";
};

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
    ) { } // Properties are automatically assigned due to 'readonly' and constructor parameters

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
            this.height.In(preferredUnits.drop), // Changed to preferredUnits.drop as per python
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
        /** simple formatter
         * @param {Dimension} value
         * @param {Unit} unit
         * @return {string} time
         */
        function _fmt<AllowedUnitT extends Unit>(value: Dimension<AllowedUnitT>, unit: AllowedUnitT): string {
            return `${value.In(unit).toFixed(UnitProps[unit].accuracy)} ${UnitProps[unit].symbol}`;
        }

        return [
            `${this.time.toFixed(3)} s`, // Changed to 3 decimal places as per python
            _fmt(this.distance, preferredUnits.distance),
            _fmt(this.velocity, preferredUnits.velocity),
            `${this.mach.toFixed(2)} mach`,
            _fmt(this.height, preferredUnits.drop), // Changed to preferredUnits.drop as per python
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
     *
     * This method serializes all trajectory data fields into the raw format
     * expected by WASM functions like interpolateTrajectoryData.
     *
     * @returns WASM-compatible trajectory data object
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
            flag: { value: this.flag }
        };
    }

    static fromWasmTrajectoryData(data: _TrajectoryData) {
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
            data.flag.value as TrajFlag
        )
    }
}

class HitResult {
    /**
     * Computed trajectory data of the shot.
     *
     * @param shot - The parameters of the shot calculation
     * @param trajectory - Computed TrajectoryData points
     * @param error - RangeError if any (optional)
     * @param filterFlags - Flags that were requested in the trajectory calculation
     */

    readonly shot: Shot;
    readonly trajectory: TrajectoryData[];
    error?: Error;
    readonly filterFlags: TrajFlag;

    constructor(
        shot: Shot,
        trajectory: TrajectoryData[],
        filterFlags: TrajFlag = TrajFlag.NONE,
        error?: Error,
    ) {
        this.shot = shot;
        this.trajectory = trajectory;
        this.filterFlags = filterFlags;
        this.error = error;
    }

    /**
     * Get Shot properties (alias for shot for Python compatibility)
     */
    get props(): Shot {
        return this.shot;
    }

    /**
     * Returns an iterator for the trajectory data.
     * Allows iterating over the HitResult object directly.
     */
    *[Symbol.iterator](): Iterator<TrajectoryData> {
        yield* this.trajectory;
    }

    /**
     * Allows accessing trajectory elements by index.
     * @param {number} index - The index of the element.
     * @returns {TrajectoryData} - Trajectory data at the specified index.
     */
    at(index: number): TrajectoryData {
        return this.trajectory[index];
    }

    get length(): number {
        return this.trajectory.length;
    }

    /**
     * Check if the specified flag was requested in the trajectory calculation.
     * @param flag - The flag to check
     * @throws Error if the flag was not requested
     */
    protected _checkFlag(flag: TrajFlag): void {
        // Check if the flag was requested in filter_flags
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
     * @param flag - The flag to search for
     * @returns First TrajectoryData row with the specified flag, or undefined if not found
     * @throws Error if the flag was not requested
     */
    flag(flag: TrajFlag): TrajectoryData | undefined {
        this._checkFlag(flag);
        return this.trajectory.find(row => row.flag & flag);
    }

    /**
     * Get all zero crossing points.
     * @returns Array of TrajectoryData at zero crossings
     * @throws Error if zero crossing points are not found
     */
    zeros(): TrajectoryData[] {
        this._checkFlag(TrajFlag.ZERO);

        const data = this.trajectory.filter((row) => row.flag & TrajFlag.ZERO);
        if (data.length < 1) {
            throw new Error("Can't find zero crossing points");
        }

        return data;
    }

    /**
     * Finds the index of the TrajectoryData item closest to the given distance.
     * @param {Distance} distance - The distance to search for.
     * @returns {number} - The index of the closest TrajectoryData item.
     */
    indexAtDistance(distance: Distance): number {
        // Adding epsilon to avoid floating-point issues, similar to Python
        const epsilon = 1e-8;
        return this.trajectory.findIndex(
            (item) => item.distance.rawValue >= distance.rawValue - epsilon
        );
    }

    getAtDistance(d: Distance): TrajectoryData {
        const index = this.indexAtDistance(d);
        if (index < 0) {
            throw new Error(
                `Calculated trajectory doesn't reach requested distance ${d.rawValue}` // Changed to d.rawValue for better output
            );
        }
        return this.trajectory[index];
    }

    /**
     * Get TrajectoryData where the specified attribute equals the target value.
     * Interpolates to create a new TrajectoryData point if necessary.
     *
     * @param keyAttribute - The TrajectoryDataInterpKey to interpolate on
     * @param value - The target value for the key attribute
     * @param epsilon - Allowed difference to match existing TrajectoryData without interpolating (default: 1e-9)
     * @param startFromTime - Time to center the search from (default: 0.0)
     * @returns TrajectoryData where keyAttribute equals value
     * @throws Error if trajectory doesn't reach the requested value
     * @throws Error if interpolation requires at least 3 points
     */
    async getAt(
        keyAttribute: _TrajectoryDataInterpKey,
        value: number,
        epsilon: number = 1e-9,
        startFromTime: number = 0.0
    ): Promise<TrajectoryData> {
        const traj = this.trajectory;
        const n = traj.length;

        // Helper to get raw value of the key attribute from TrajectoryData
        const getKeyVal = (td: TrajectoryData): number => {
            // Map _TrajectoryDataInterpKey to TrajectoryData property
            const keyIndex = typeof keyAttribute === 'object' && 'value' in keyAttribute
                ? keyAttribute.value
                : keyAttribute;
            switch (keyIndex) {
                case 0: return td.time;
                case 1: return td.distance.rawValue;
                case 2: return td.velocity.rawValue;
                case 3: return td.mach;
                case 4: return td.height.rawValue;
                case 5: return td.slantHeight.rawValue;
                case 6: return td.dropAngle.rawValue;
                case 7: return td.windage.rawValue;
                case 8: return td.windageAngle.rawValue;
                case 9: return td.slantDistance.rawValue;
                case 10: return td.angle.rawValue;
                case 11: return td.densityRatio;
                case 12: return td.drag;
                case 13: return td.energy.rawValue;
                case 14: return td.ogw.rawValue;
                default: throw new Error(`Invalid interpolation key: ${keyIndex}`);
            }
        };

        // Check if we have enough points for interpolation
        if (n < 3) {
            if (Math.abs(getKeyVal(traj[0]) - value) < epsilon) {
                return traj[0];
            }
            if (n > 1 && Math.abs(getKeyVal(traj[1]) - value) < epsilon) {
                return traj[1];
            }
            throw new Error("Interpolation requires at least 3 TrajectoryData points.");
        }

        // Find starting index based on startFromTime
        let startIdx = 0;
        if (startFromTime > 0) {
            startIdx = traj.findIndex(td => td.time >= startFromTime);
            if (startIdx < 0) startIdx = 0;
        }

        const currVal = getKeyVal(traj[startIdx]);
        if (Math.abs(currVal - value) < epsilon) {
            return traj[startIdx];
        }

        // Determine search direction
        let searchForward = true;
        if (startIdx === n - 1) {
            searchForward = false;
        } else if (startIdx > 0 && startIdx < n - 1) {
            const nextVal = getKeyVal(traj[startIdx + 1]);
            if ((nextVal > currVal && value > currVal) || (nextVal < currVal && value < currVal)) {
                searchForward = true;
            } else {
                searchForward = false;
            }
        }

        // Search for target value
        let targetIdx = -1;
        if (searchForward) {
            for (let i = startIdx; i < n - 1; i++) {
                const curr = getKeyVal(traj[i]);
                const next = getKeyVal(traj[i + 1]);
                if ((curr < value && value <= next) || (next <= value && value < curr)) {
                    targetIdx = i + 1;
                    break;
                }
            }
        }
        if (!searchForward || targetIdx === -1) {
            for (let i = startIdx; i > 0; i--) {
                const curr = getKeyVal(traj[i]);
                const prev = getKeyVal(traj[i - 1]);
                if ((prev <= value && value < curr) || (curr < value && value <= prev)) {
                    targetIdx = i;
                    break;
                }
            }
        }

        if (targetIdx === -1) {
            throw new Error(`Trajectory does not reach the requested value ${value} for the specified key`);
        }

        // Check for exact match
        if (Math.abs(getKeyVal(traj[targetIdx]) - value) < epsilon) {
            return traj[targetIdx];
        }

        // Step forward from first point if needed
        if (targetIdx === 0) {
            targetIdx = 1;
        }

        // Choose three bracketing points (p0, p1, p2)
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

        // Use WASM interpolation
        const bclibc = await loadBclibc();
        const interpolated = bclibc.interpolateTrajectoryData(
            keyAttribute,
            value,
            p0.toWasmTrajectoryData(),
            p1.toWasmTrajectoryData(),
            p2.toWasmTrajectoryData(),
            { value: TrajFlag.NONE },
            bclibc._InterpMethod.PCHIP
        );

        return TrajectoryData.fromWasmTrajectoryData(interpolated);
    }

    static fromWasmHitOutput(shot: Shot, hit: HitOutput, raiseRangeError: boolean = true, filterFlags: TrajFlag = TrajFlag.NONE) {
        const trajectory = (hit.trajectory as _TrajectoryData[]).map(item => TrajectoryData.fromWasmTrajectoryData(item));

        // Check termination reason and create error if needed
        let error: Error | undefined = undefined;
        const reasonValue = typeof hit.reason === 'object' && 'value' in hit.reason
            ? hit.reason.value
            : hit.reason;

        if (reasonValue === TerminationReason.MINIMUM_VELOCITY_REACHED) {
            error = new RangeError(RangeError.MinimumVelocityReached, trajectory);
        } else if (reasonValue === TerminationReason.MAXIMUM_DROP_REACHED) {
            error = new RangeError(RangeError.MaximumDropReached, trajectory);
        } else if (reasonValue === TerminationReason.MINIMUM_ALTITUDE_REACHED) {
            error = new RangeError(RangeError.MinimumAltitudeReached, trajectory);
        }

        // If raiseRangeError is true and there's an error, throw it
        if (raiseRangeError && error) {
            throw error;
        }

        return new HitResult(shot, trajectory, filterFlags, error);
    }
}

export { TrajectoryData, trajFlagName, trajFlagNames, HitResult };
