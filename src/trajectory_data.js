// Flags for marking trajectory row if Zero or Mach crossing
// Also uses to set a filters for a trajectory calculation loop
import {UnitProps, calcSettings, Unit, UNew, unitTypeCoerce, Measure} from "./index.js";

const TrajFlag = {
    NONE: 0,
    ZERO_UP: 1,
    ZERO_DOWN: 2,
    MACH: 4,
    RANGE: 8,
    DANGER: 16,
    ZERO: 1 | 2,
    ALL: 1 | 2 | 4 | 8 | 16
}

class TrajectoryData {
    /**
     * Constructor for TrajectoryData class.
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
        time, distance, velocity, mach,
        drop, dropAdjustment,
        windage, windageAdjustment,
        angle, energy, ogw, flag
    ) {
        this.time = time
        this.distance = distance
        this.velocity = velocity
        this.mach = mach
        this.drop = drop
        this.dropAdjustment = dropAdjustment
        this.windage = windage
        this.windageAdjustment = windageAdjustment
        this.angle = angle
        this.energy = energy
        this.ogw = ogw
        this.flag = flag
    }

    /**
     * matrix of floats of the trajectory in default units
     */
    inDefUnits() {
        return [
            this.time,
            this.distance.in(calcSettings.Units.distance),
            this.velocity.in(calcSettings.Units.velocity),
            this.mach,
            this.drop.in(calcSettings.Units.drop),
            this.dropAdjustment.in(calcSettings.Units.adjustment),
            this.windage.in(calcSettings.Units.drop),
            this.windageAdjustment.in(calcSettings.Units.adjustment),
            this.angle.in(calcSettings.Units.angular),
            this.energy.in(calcSettings.Units.energy),
            this.ogw.in(calcSettings.Units.ogw),
            this.flag
        ]
    }

    /**
     * @return {string[]}
     */
    formatted() {

        /** simple formatter
         * @param {AbstractUnit} value
         * @param {Unit} unit
         * @return {string} time
         */
        function _fmt(value, unit) {
            return `${value.in(unit).toFixed(UnitProps[unit].accuracy)}${UnitProps[unit].symbol}`;
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
     * @param {TrajectoryData} atRange
     * @param {number|Distance|Object} targetHeight
     * @param {TrajectoryData} begin
     * @param {TrajectoryData} end
     * @param {number|Angular|Object} lookAngle
     */
    constructor(atRange, targetHeight, begin, end, lookAngle) {
        this.atRange = atRange;
        this.targetHeight = targetHeight;
        this.begin = begin;
        this.end = end;
        this.lookAngle = unitTypeCoerce(lookAngle, Measure.Angular, calcSettings.Units.angular);
    }

    toString() {
        return `Danger space at ${this.atRange.distance.to(calcSettings.Units.distance)} ` +
            `for ${this.targetHeight.to(calcSettings.Units.drop)} tall target ` +
            `ranges from ${this.begin.distance.to(calcSettings.Units.distance)} ` +
            `to ${this.end.distance.to(calcSettings.Units.distance)}`;
    }
}


class HitResult {
    /** Results of the shot
     * @param {Weapon} weapon
     * @param {Shot} shot
     * @param {TrajectoryData[]} trajectory
     * @param {boolean} extra
     */
    constructor(weapon, shot, trajectory, extra = false) {
        this.weapon = weapon;
        this.shot = shot;
        this._trajectory = trajectory;
        this._extra = extra;
    }

    toArray() {
        return [...this._trajectory];
    }

    get(index) {
        return this._trajectory[index];
    }

    get trajectory() {
        return this._trajectory
    }

    get extra() {
        return this._extra
    }

    __check_extra__() {
        if (!this._extra) {
            throw new Error(`${Object.getPrototypeOf(this).constructor.name} has no extra data. Use Calculator.fire(..., extra_data=true)`);
        }
    }

    zeros() {
        this.__check_extra__();

        const data = this._trajectory.filter(row => row.flag & TrajFlag.ZERO.value);
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
    danger_space(atRange, targetHeight, lookAngle = UNew.Degree(0)) {
        this.__check_extra__();

        atRange = unitTypeCoerce(atRange, Measure.Distance, calcSettings.Units.distance);
        targetHeight = unitTypeCoerce(targetHeight, Measure.Distance, calcSettings.Units.drop);
        lookAngle = unitTypeCoerce(lookAngle, Measure.Angular, calcSettings.Units.angular);

        let i

        for (i = 0; i < this._trajectory.length; i++) {
            if (this._trajectory[i].distance.rawValue >= atRange.rawValue) {
                break;
            }
        }

        if (i === this._trajectory.length) {
            throw new Error(`Calculated trajectory doesn't reach requested distance ${atRange}`);
        }

        const targetHeightHalf = targetHeight.rawValue / 2.0;
        const tanLookAngle = Math.tan(lookAngle.in(Unit.Radian));

        const findBeginDanger = (rowNum) => {
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

        const findEndDanger = (rowNum) => {
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

        return new DangerSpace(this._trajectory[i], targetHeight, findBeginDanger(i), findEndDanger(i), lookAngle);
    }

}


export {TrajectoryData, TrajFlag, DangerSpace, HitResult}