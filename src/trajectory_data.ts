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
    APEX = 1 << 4, // Corrected APEX bit value
    ALL = ZERO | MACH | RANGE | APEX, // Corrected ALL value
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

    // This block handles the special case where both ZERO_UP and ZERO_DOWN are present,
    // and you want to represent it as "ZERO".
    if (
        (value & TrajFlag.ZERO_UP) === TrajFlag.ZERO_UP &&
        (value & TrajFlag.ZERO_DOWN) === TrajFlag.ZERO_DOWN
    ) {
        // If ZERO_UP and ZERO_DOWN are both in parts, replace them with "ZERO"
        parts = parts.filter(
            (part) => part !== "ZERO_UP" && part !== "ZERO_DOWN",
        );
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
     * @param {Energy} energy - The energy of the projectile.
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
            return `${value.In(unit).toFixed(UnitProps[unit].accuracy)} ${UnitProps[unit].symbol}`;
        }

        return [
            `${this.time.toFixed(3)} s`, // Changed to 3 decimal places as per python
            _fmt(this.distance, preferredUnits.distance),
            _fmt(this.velocity, preferredUnits.velocity),
            `${this.mach.toFixed(2)} mach`,
            _fmt(this.height, preferredUnits.drop), // Changed to preferredUnits.drop as per python
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
     * @param {Distance} targetHeight - The height of the target, or null if not applicable.
     * @param {TrajectoryData} begin - The starting trajectory data for the danger space.
     * @param {TrajectoryData} end - The ending trajectory data for the danger space.
     * @param {Angular} lookAngle - The look angle for the danger space, or null if not applicable.
     */
    constructor(
        readonly atRange: TrajectoryData,
        readonly targetHeight: Distance,
        readonly begin: TrajectoryData,
        readonly end: TrajectoryData,
        readonly lookAngle: Angular,
    ) { }

    /**
     * Returns a string representation of the DangerSpace object.
     * @returns {string} - A string summarizing the DangerSpace data.
     */
    toString(): string {
        let str = `Danger space at ${this.atRange.distance.to(preferredUnits.distance)} ` +
            `for ${this.targetHeight.to(preferredUnits.drop)} tall target`;

        if (this.lookAngle.rawValue !== 0) {
            str += ` at ${this.lookAngle.to(Angular.Degree)} look-angle`;
        }

        str += ` ranges from ${this.begin.distance.to(preferredUnits.distance)} ` +
            `to ${this.end.distance.to(preferredUnits.distance)}`;
        return str;
    }
}

class HitResult {
    /**
     * Results of the shot
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     * @param {Shot} shot
     * @param {TrajectoryData[]} _trajectory
     * @param {boolean} _extra
     */

    readonly shot: Shot;
    readonly trajectory: TrajectoryData[];
    readonly extra: boolean;

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

    protected _checkExtra(): void {
        if (!this.extra) {
            // Using a custom message similar to Python's __repr__
            throw new Error(
                `${Object.getPrototypeOf(this).constructor.name} has no extra data. Use Calculator.fire(..., extra_data=true)`,
            );
        }
    }

    get length(): number {
        return this.trajectory.length;
    }

    zeros(): TrajectoryData[] {
        this._checkExtra();

        const data = this.trajectory.filter((row) => row.flag & TrajFlag.ZERO);
        if (data.length < 1) {
            throw new Error("Can't find zero crossing points"); // Equivalent to Python's ArithmeticError, here using generic Error
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
            (item) => item.distance.rawValue >= distance.rawValue - epsilon,
        );
    }

    getAtDistance(d: Distance): TrajectoryData {
        const index = this.indexAtDistance(d);
        if (index < 0) {
            throw new Error(
                `Calculated trajectory doesn't reach requested distance ${d.rawValue}`, // Changed to d.rawValue for better output
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
                `Calculated trajectory doesn't reach requested distance ${_atRange.rawValue}`,
            );
        }

        const findBeginDanger = (rowNum: number): TrajectoryData => {
            /**
             * Beginning of danger space is last .distance' < .distance where
             * (.drop' - target_center) >= target_height/2
             * @param {number} rowNum - Index of the trajectory point for which we are calculating danger space
             * @return {TrajectoryData} - Distance marking the beginning of danger space
             */
            const centerRow = this.trajectory[rowNum];

            // Iterate in reverse from rowNum - 1 down to 0, similar to Python's reversed(self.trajectory[:row_num])
            for (let i = rowNum - 1; i >= 0; i--) {
                const primeRow = this.trajectory[i];
                if (
                    (primeRow.targetDrop.rawValue - centerRow.targetDrop.rawValue) >=
                    _targetHeightHalf
                ) {
                    return primeRow;
                }
            }
            return this.trajectory[0];
        };

        const findEndDanger = (rowNum: number): TrajectoryData => {
            /**
             * End of danger space is first .distance' > .distance where
             * (target_center - .drop') >= target_height/2
             * @param {number} rowNum - Index of the trajectory point for which we are calculating danger space
             * @return {TrajectoryData} - Distance marking the end of danger space
             */
            const centerRow = this.trajectory[rowNum];

            // Iterate forwards from rowNum + 1 up to the end, similar to Python's self.trajectory[row_num + 1:]
            for (let i = rowNum + 1; i < this.trajectory.length; i++) {
                const primeRow = this.trajectory[i];
                if (
                    (centerRow.targetDrop.rawValue - primeRow.targetDrop.rawValue) >=
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
