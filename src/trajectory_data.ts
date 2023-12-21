// Flags for marking trajectory row if Zero or Mach crossing
// Also uses to set a filters for a trajectory calculation loop
import calcSettings from "./settings"
import {
    UnitProps,
    Unit,
    UNew,
    unitTypeCoerce,
    Angular,
    Distance,
    Velocity,
    Energy,
    Weight,
    AbstractUnit
} from "./unit";
import {Weapon} from "./munition";
import {Shot} from "./conditions";

enum TrajFlag {
    NONE = 0,
    ZERO_UP = 1 << 0,
    ZERO_DOWN = 1 << 1,
    MACH = 1 << 2,
    RANGE = 1 << 3,
    DANGER = 1 << 4,
    ZERO = ZERO_UP | ZERO_DOWN,
    ALL = ZERO | MACH | RANGE | DANGER
}

class TrajectoryData {
    /**
     * Constructor for TrajectoryData class.
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     * @param {number} time
     * @param {number|Distance} distance
     * @param {number|Velocity} velocity
     * @param {number} mach
     * @param {number|Distance|Object} drop
     * @param {number|Angular|Object} dropAdjustment
     * @param {number|Distance|Object} windage
     * @param {number|Angular|Object} windageAdjustment
     * @param {number|Angular|Object} angle
     * @param {number|Energy|Object} energy
     * @param {number|Weight|Object} ogw
     * @param {number|TrajFlag} flag
     */
    constructor(
        readonly time: number,
        readonly distance: Distance,
        readonly velocity: Velocity,
        readonly mach: number,
        readonly drop: Distance,
        readonly dropAdjustment: Angular,
        readonly windage: Distance,
        readonly windageAdjustment: Angular,
        readonly angle: Angular,
        readonly energy: Energy,
        readonly ogw: Weight,
        readonly flag: TrajFlag
    ) {
    }

    /**
     * matrix of floats of the trajectory in default units
     * @return {number[]}
     */
    inDefUnits(): number[] {
        return [
            this.time,
            this.distance.In(calcSettings.Units.distance),
            this.velocity.In(calcSettings.Units.velocity),
            this.mach,
            this.drop.In(calcSettings.Units.drop),
            this.dropAdjustment.In(calcSettings.Units.adjustment),
            this.windage.In(calcSettings.Units.drop),
            this.windageAdjustment.In(calcSettings.Units.adjustment),
            this.angle.In(calcSettings.Units.angular),
            this.energy.In(calcSettings.Units.energy),
            this.ogw.In(calcSettings.Units.ogw),
            this.flag
        ]
    }

    /**
     * @return {string[]}
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
            _fmt(this.distance, calcSettings.Units.distance),
            _fmt(this.velocity, calcSettings.Units.velocity),
            `${this.mach.toFixed(2)} mach`,
            _fmt(this.drop, calcSettings.Units.drop),
            _fmt(this.dropAdjustment, calcSettings.Units.adjustment),
            _fmt(this.windage, calcSettings.Units.drop),
            _fmt(this.windageAdjustment, calcSettings.Units.adjustment),
            _fmt(this.angle, calcSettings.Units.angular),
            _fmt(this.energy, calcSettings.Units.energy),
            _fmt(this.ogw, calcSettings.Units.ogw),
            `${this.flag}`
        ]
    }
}


class DangerSpace {
    /** Stores the danger space data for distance specified
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     * @param {TrajectoryData} atRange
     * @param {number|Distance|Object} targetHeight
     * @param {TrajectoryData} begin
     * @param {TrajectoryData} end
     * @param {number|Angular|Object} lookAngle
     */

    constructor(
        readonly atRange: TrajectoryData,
        readonly targetHeight: Distance,
        readonly begin: TrajectoryData,
        readonly end: TrajectoryData,
        readonly lookAngle: Angular
    ) {
    }

    toString(): string {
        return `Danger space at ${this.atRange.distance.to(calcSettings.Units.distance)} ` +
            `for ${this.targetHeight.to(calcSettings.Units.drop)} tall target ` +
            `ranges from ${this.begin.distance.to(calcSettings.Units.distance)} ` +
            `to ${this.end.distance.to(calcSettings.Units.distance)}`;
    }
}


class HitResult {
    /** Results of the shot
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     * @param {Weapon} weapon
     * @param {Shot} shot
     * @param {TrajectoryData[]} _trajectory
     * @param {boolean} _extra
     */

    constructor(
        readonly weapon: Weapon,
        readonly shot: Shot,
        readonly _trajectory: TrajectoryData[],
        readonly _extra: boolean = false,
    ) {}

    toArray(): Array<TrajectoryData> {
        return [...this._trajectory];
    }

    // get(index: number) {
    //     return this._trajectory[index];
    // }

    get trajectory(): TrajectoryData[] {
        return this._trajectory
    }

    get extra(): boolean {
        return this._extra
    }

    protected _checkExtra(): void {
        if (!this._extra) {
            throw new Error(`${Object.getPrototypeOf(this).constructor.name} has no extra data. Use Calculator.fire(..., extra_data=true)`);
        }
    }

    zeros(): TrajectoryData[] {
        this._checkExtra();

        const data = this._trajectory.filter(row => row.flag & TrajFlag.ZERO);
        if (data.length < 1) {
            throw new Error("Can't find zero crossing points");
        }

        return data;
    }

    /** get danger space for target height and look angle
     * @param {number|Distance|Object} atRange
     * @param {number|Distance|Object} targetHeight
     * @param {number|Angular|Object} lookAngle
     * @return {DangerSpace} - danger space for target height and look angle
     */
    dangerSpace(atRange:(number|Distance),
                targetHeight: (number|Distance),
                lookAngle : (number|Angular)= UNew.Degree(0)) {
        this._checkExtra();

        const _atRange: Distance = unitTypeCoerce(atRange, Distance, calcSettings.Units.distance);
        const _targetHeight: Distance = unitTypeCoerce(targetHeight, Distance, calcSettings.Units.drop);
        const _lookAngle: Angular = unitTypeCoerce(lookAngle, Angular, calcSettings.Units.angular);

        let i

        for (i = 0; i < this._trajectory.length; i++) {
            if (this._trajectory[i].distance.rawValue >= _atRange.rawValue) {
                break;
            }
        }

        if (i === this._trajectory.length) {
            throw new Error(`Calculated trajectory doesn't reach requested distance ${_atRange}`);
        }

        const targetHeightHalf = _targetHeight.rawValue / 2.0;
        const tanLookAngle = Math.tan(_lookAngle.In(Unit.Radian));

        const findBeginDanger = (rowNum: number) => {
            const centerRow = this._trajectory[rowNum];
            for (let i = rowNum - 1; i >= 0; i--) {
                const primeRow = this._trajectory[i];
                const targetCenter = centerRow.drop.rawValue + tanLookAngle * (primeRow.distance.rawValue - centerRow.distance.rawValue);
                if (Math.abs(targetCenter - primeRow.drop.rawValue) >= targetHeightHalf) {
                    return this._trajectory[i];
                }
            }
            return this._trajectory[0];
        };

        const findEndDanger = (rowNum: number) => {
            const centerRow = this._trajectory[rowNum];
            for (let i = rowNum + 1; i < this._trajectory.length; i++) {
                const primeRow = this._trajectory[i];
                const targetCenter = centerRow.drop.rawValue + tanLookAngle * (primeRow.distance.rawValue - centerRow.distance.rawValue);
                if (Math.abs(targetCenter - primeRow.drop.rawValue) >= targetHeightHalf) {
                    return primeRow;
                }
            }
            return this._trajectory[this._trajectory.length - 1];
        };

        return new DangerSpace(this._trajectory[i], _targetHeight, findBeginDanger(i), findEndDanger(i), _lookAngle);
    }

}


export {TrajectoryData, TrajFlag, DangerSpace, HitResult}