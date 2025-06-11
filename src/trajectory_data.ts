// Flags for marking trajectory row if Zero or Mach crossing
// Also uses to set a filters for a trajectory calculation loop
import {
    UnitProps,
    Unit,
    preferredUnits,
    unitTypeCoerce,
    Angular,
    Distance,
    Velocity,
    Energy,
    Weight,
    AbstractUnit,
} from "./unit";
import { Shot } from "./conditions";

enum TrajFlag {
    NONE = 0,
    ZERO_UP = 1 << 0,
    ZERO_DOWN = 1 << 1,
    MACH = 1 << 2,
    RANGE = 1 << 3,
    ZERO = ZERO_UP | ZERO_DOWN,
    ALL = ZERO | MACH | RANGE,
    APEX = 16,
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

    if (parts.includes("ZERO_UP") && parts.includes("ZERO_DOWN")) {
        // Filter out both specific parts to keep the combined logic
        parts = parts.filter(
            (part) => part !== "ZERO_UP" && part !== "ZERO_DOWN",
        );
        // If you had a specific combined name like `ZERO_TOGGLE` in _TrajFlagNames for `ZERO_UP | ZERO_DOWN`,
        // that would have been caught by the direct lookup, so this step might be simpler.
        // If the combination is dynamic, you might add a specific combined name here.
        // e.g., parts.push("ZERO_TOGGLE"); // If you want a specific combined name
    }

    return parts.length > 0 ? parts.join("|") : "UNKNOWN";
};

class TrajectoryData {
    /**
     * Represents data related to a trajectory calculation.
     * This class is used solely as a return value from trajectory calculations.
     *
     * @class
     * @param {number} time - The time elapsed in the trajectory calculation.
     * @param {Distance} distance - The distance traveled.
     * @param {Velocity} velocity - The velocity at the given point.
     * @param {number} mach - The Mach number at the given point.
     * @param {Distance} height - The height above the reference point.
     * @param {Distance} targetDrop - The drop from the target elevation.
     * @param {Angular} dropAdjustment - Adjustment in angle due to drop.
     * @param {Distance} windage - The amount of windage correction.
     * @param {Angular} windageAdjustment - Adjustment in angle due to windage.
     * @param {Distance} lookDistance - The distance to the target.
     * @param {Angular} angle - The angle of the trajectory.
     * @param {number} densityFactor - Factor representing air density effects.
     * @param {number} drag - The drag experienced by the projectile.
     * @param {Energy} energy - The energy of the projectile at the given point.
     * @param {Weight} ogw - The optimal gun weight.
     * @param {TrajFlag} flag - Flags representing various trajectory characteristics.
     */
    constructor(
        readonly time: number,
        readonly distance: Distance,
        readonly velocity: Velocity,
        readonly mach: number,
        readonly height: Distance,
        readonly targetDrop: Distance,
        readonly dropAdjustment: Angular,
        readonly windage: Distance,
        readonly windageAdjustment: Angular,
        readonly lookDistance: Distance,
        readonly angle: Angular,
        readonly densityFactor: number,
        readonly drag: number,
        readonly energy: Energy,
        readonly ogw: Weight,
        readonly flag: TrajFlag,
    ) {
        this.time = time;
        this.distance = distance;
        this.velocity = velocity;
        this.mach = mach;
        this.height = height;
        this.targetDrop = targetDrop;
        this.dropAdjustment = dropAdjustment;
        this.windage = windage;
        this.windageAdjustment = windageAdjustment;
        this.lookDistance = lookDistance;
        this.angle = angle;
        this.densityFactor = densityFactor;
        this.drag = drag;
        this.energy = energy;
        this.ogw = ogw;
        this.flag = flag;
    }

    /**
     * Returns an array of numerical values representing the trajectory data in default units.
     *
     * @returns {number[]} An array where each element corresponds to a specific piece of trajectory data
     *                      converted to default units.
     */
    inDefUnits(): number[] {
        return [
            this.time,
            this.distance.In(preferredUnits.distance),
            this.velocity.In(preferredUnits.velocity),
            this.mach,
            this.height.In(preferredUnits.distance),
            this.targetDrop.In(preferredUnits.drop),
            this.dropAdjustment.In(preferredUnits.adjustment),
            this.windage.In(preferredUnits.drop),
            this.windageAdjustment.In(preferredUnits.adjustment),
            this.lookDistance.In(preferredUnits.distance),
            this.angle.In(preferredUnits.angular),
            this.densityFactor,
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
         * @param {AbstractUnit} value
         * @param {Unit} unit
         * @return {string} time
         */
        function _fmt(value: AbstractUnit, unit: Unit): string {
            return `${value.In(unit).toFixed(UnitProps[unit].accuracy)}${UnitProps[unit].symbol}`;
        }

        return [
            `${this.time.toFixed(2)} s`,
            _fmt(this.distance, preferredUnits.distance),
            _fmt(this.velocity, preferredUnits.velocity),
            `${this.mach.toFixed(2)} mach`,
            _fmt(this.height, preferredUnits.distance),
            _fmt(this.targetDrop, preferredUnits.drop),
            _fmt(this.dropAdjustment, preferredUnits.adjustment),
            _fmt(this.windage, preferredUnits.drop),
            _fmt(this.windageAdjustment, preferredUnits.adjustment),
            _fmt(this.lookDistance, preferredUnits.distance),
            _fmt(this.angle, preferredUnits.angular),
            `${this.densityFactor.toFixed(3)}`,
            `${this.drag.toFixed(3)}`,
            _fmt(this.energy, preferredUnits.energy),
            _fmt(this.ogw, preferredUnits.ogw),
            `${trajFlagName(this.flag)}`,
        ];
    }
}

class DangerSpace {
    /**
     * Stores the danger space data for a specified distance.
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     *
     * @param {TrajectoryData} atRange - The trajectory data at the specified range.
     * @param {number | Distance | null} targetHeight - The height of the target, or null if not applicable.
     * @param {TrajectoryData} begin - The starting trajectory data for the danger space.
     * @param {TrajectoryData} end - The ending trajectory data for the danger space.
     * @param {number | Angular | null} lookAngle - The look angle for the danger space, or null if not applicable.
     */
    constructor(
        readonly atRange: TrajectoryData,
        readonly targetHeight: Distance,
        readonly begin: TrajectoryData,
        readonly end: TrajectoryData,
        readonly lookAngle: Angular,
    ) {
        this.atRange = atRange;
        this.targetHeight = targetHeight;
        this.begin = begin;
        this.end = end;
        this.lookAngle = lookAngle;
    }

    /**
     * Returns a string representation of the DangerSpace object.
     * @returns {string} - A string summarizing the DangerSpace data.
     */
    toString(): string {
        return (
            `Danger space at ${this.atRange.distance.to(preferredUnits.distance)} ` +
            `for ${this.targetHeight.to(preferredUnits.drop)} tall target ` +
            `ranges from ${this.begin.distance.to(preferredUnits.distance)} ` +
            `to ${this.end.distance.to(preferredUnits.distance)}`
        );
    }
}

class HitResult {
    /** Results of the shot
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     * @param {Shot} shot
     * @param {TrajectoryData[]} _trajectory
     * @param {boolean} _extra
     */

    readonly shot: Shot;
    readonly trajectory: TrajectoryData[];
    readonly extra: boolean = false;

    constructor(
        shot: Shot,
        trajectory: TrajectoryData[],
        extra: boolean = false,
    ) {
        this.shot = shot;
        this.trajectory = trajectory;
        this.extra = extra;
    }

    /**
     * Returns a copy of the trajectory data as an array.
     * @returns {TrajectoryData[]} - A new array containing the trajectory data.
     */
    toArray(): TrajectoryData[] {
        return [...this.trajectory];
    }

    protected _checkExtra(): void {
        if (!this.extra) {
            throw new Error(
                `${Object.getPrototypeOf(this).constructor.name} has no extra data. Use Calculator.fire(..., extra_data=true)`,
            );
        }
    }

    zeros(): TrajectoryData[] {
        this._checkExtra();

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
        return this.trajectory.findIndex(
            (item) => item.distance.rawValue >= distance.rawValue,
        );
    }

    getAtDistance(d: Distance): TrajectoryData {
        const index = this.indexAtDistance(d);
        if (index < 0) {
            throw new Error(
                `Calculated trajectory doesn't reach requested distance ${d}`,
            );
        }
        return this.trajectory[index];
    }

    /**
     * Calculates the danger space for the specified range and target height.
     * @param {number | Distance} atRange - The distance at which to calculate the danger space.
     * @param {number | Distance} targetHeight - The height of the target.
     * @param {number | Angular | null} lookAngle - The look angle for the calculation.
     * @returns {DangerSpace} - The computed DangerSpace object.
     */
    public dangerSpace(
        atRange: number | Distance,
        targetHeight: number | Distance,
        lookAngle: number | Angular | null = null,
    ): DangerSpace {
        this._checkExtra();

        const _atRange: Distance = unitTypeCoerce(
            atRange,
            Distance,
            preferredUnits.distance,
        );

        const _targetHeight: Distance = unitTypeCoerce(
            targetHeight,
            Distance,
            preferredUnits.distance,
        );
        const _targetHeightHalf: number = _targetHeight.rawValue / 2.0;

        const _lookAngle: Angular =
            lookAngle === null || lookAngle === undefined
                ? this.shot.lookAngle
                : unitTypeCoerce(lookAngle, Angular, preferredUnits.angular);

        // Get index of first trajectory point with distance >= at_range
        const index = this.indexAtDistance(_atRange);
        if (index < 0) {
            throw new Error(
                `Calculated trajectory doesn't reach requested distance ${atRange}`,
            );
        }

        const findBeginDanger = (rowNum: number) => {
            /**
             * Beginning of danger space is last .distance' < .distance where
             * (.drop' - target_center) >= target_height/2
             * @param {number} rowNum - Index of the trajectory point for which we are calculating danger space
             * @return {TrajectoryData} - Distance marking the beginning of danger space
             */
            const centerRow = this.trajectory[rowNum];

            for (let i = rowNum - 1; i >= 0; i--) {
                const primeRow = this.trajectory[i];
                if (
                    primeRow.targetDrop.rawValue -
                        centerRow.targetDrop.rawValue >=
                    _targetHeightHalf
                ) {
                    return primeRow;
                }
            }

            return this.trajectory[0];
        };

        const findEndDanger = (rowNum: number) => {
            /**
             * End of danger space is first .distance' > .distance where
             * (target_center - .drop') >= target_height/2
             * @param {number} rowNum - Index of the trajectory point for which we are calculating danger space
             * @return {TrajectoryData} - Distance marking the end of danger space
             */
            const centerRow = this.trajectory[rowNum];

            for (let i = rowNum + 1; i < this.trajectory.length; i++) {
                const primeRow = this.trajectory[i];
                if (
                    centerRow.targetDrop.rawValue -
                        primeRow.targetDrop.rawValue >=
                    _targetHeightHalf
                ) {
                    return primeRow;
                }
            }

            return this.trajectory[this.trajectory.length - 1];
        };

        return new DangerSpace(
            this.trajectory[index],
            _targetHeight,
            findBeginDanger(index),
            findEndDanger(index),
            _lookAngle,
        );
    }
}

export {
    TrajectoryData,
    TrajFlag,
    trajFlagName,
    trajFlagNames,
    DangerSpace,
    HitResult,
};
