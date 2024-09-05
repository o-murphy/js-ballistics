// Flags for marking trajectory row if Zero or Mach crossing
// Also uses to set a filters for a trajectory calculation loop
import calcSettings from "../settings"
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
} from "../unit";
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
     * @param {number|Distance|null} drop
     * @param {number|Angular|null} dropAdjustment
     * @param {number|Distance|null} windage
     * @param {number|Angular|null} windageAdjustment
     * @param {number|Distance|null} lookDistance
     * @param {number|Angular|null} angle
     * @param {number} densityFactor
     * @param {number} drag
     * @param {number|Energy|null} energy
     * @param {number|Weight|null} ogw
     * @param {number|TrajFlag} flag
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
            this.targetDrop.In(calcSettings.Units.drop),
            this.dropAdjustment.In(calcSettings.Units.adjustment),
            this.windage.In(calcSettings.Units.drop),
            this.windageAdjustment.In(calcSettings.Units.adjustment),
            this.lookDistance.In(calcSettings.Units.distance),
            this.angle.In(calcSettings.Units.angular),
            this.densityFactor,
            this.drag,
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
            _fmt(this.height, calcSettings.Units.distance),
            _fmt(this.targetDrop, calcSettings.Units.drop),
            _fmt(this.dropAdjustment, calcSettings.Units.adjustment),
            _fmt(this.windage, calcSettings.Units.drop),
            _fmt(this.windageAdjustment, calcSettings.Units.adjustment),
            _fmt(this.lookDistance, calcSettings.Units.distance),
            _fmt(this.angle, calcSettings.Units.angular),
            `${this.densityFactor.toFixed(3)}`,
            `${this.drag.toFixed(3)}`,
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
     * @param {number|Distance|null} targetHeight
     * @param {TrajectoryData} begin
     * @param {TrajectoryData} end
     * @param {number|Angular|null} lookAngle
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

    indexAtDistance(d: Distance): number {
        // Get index of the first trajectory point where distance >= d
        return this.trajectory.findIndex(trajectoryPoint => trajectoryPoint.distance >= d) !== -1 
            ? this.trajectory.findIndex(trajectoryPoint => trajectoryPoint.distance >= d)
            : -1;
    }

    getAtDistance(d: Distance): TrajectoryData {
        const index = this.indexAtDistance(d);
        if (index < 0) {
            throw new Error(`Calculated trajectory doesn't reach requested distance ${d}`);
        }
        return this.trajectory[index];
    }

    /** get danger space for target height and look angle
     * @param {number|Distance|null} atRange
     * @param {number|Distance|null} targetHeight
     * @param {number|Angular|null} lookAngle
     * @return {DangerSpace} - danger space for target height and look angle
     */
    dangerSpace(atRange:(number|Distance),
                targetHeight: (number|Distance),
                lookAngle : (number|Angular|null)= null) {
        this._checkExtra();

        const _atRange: Distance = unitTypeCoerce(atRange, Distance, calcSettings.Units.distance);
        
        const _targetHeight: Distance = unitTypeCoerce(targetHeight, Distance, calcSettings.Units.drop);
        const _targetHeightHalf: number = _targetHeight.rawValue / 2.0;
        let _lookAngle: Angular = unitTypeCoerce(lookAngle ?? 0, Angular, calcSettings.Units.angular);

        _lookAngle = _lookAngle ? this.shot.lookAngle : unitTypeCoerce(_lookAngle, Angular, calcSettings.Units.angular)

        // Get index of first trajectory point with distance >= at_range
        const index = this.indexAtDistance(_atRange)
        if (index < 0) {
            throw new Error(
                `Calculated trajectory doesn't reach requested distance ${atRange}`
            )
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
                if ((primeRow.targetDrop.rawValue - centerRow.targetDrop.rawValue) >= _targetHeightHalf) {
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
                if ((centerRow.targetDrop.rawValue - primeRow.targetDrop.rawValue) >= _targetHeightHalf) {
                    return primeRow;
                }
            }
            
            return this.trajectory[this.trajectory.length - 1];
        };

        return new DangerSpace(
            this._trajectory[index], 
            _targetHeight, 
            findBeginDanger(index), 
            findEndDanger(index), 
            _lookAngle
        );
    }

}


export {TrajectoryData, TrajFlag, DangerSpace, HitResult}