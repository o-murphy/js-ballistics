import TrajectoryCalc from "./trajectory_calc.js";
import {HitResult} from "./trajectory_data.js";
import {Measure, unitTypeCoerce} from "./unit.js";
import calcSettings from "./settings.js";


export default class Calculator {
    /**
     * Basic interface for the ballistics calculator
     * @param {Weapon} weapon
     * @param {Ammo} ammo
     * @param {Atmo} zeroAtmo
     */
    constructor(weapon, ammo, zeroAtmo) {
        this.weapon = weapon
        this.ammo = ammo
        this._zeroAtmo = zeroAtmo

        this.calculateElevation()

    }

    /**
     * get current barrel elevation
     * @return {Measure.Angular|Object}
     */
    get elevation() {
        return this._elevation
    }

    /**
     * returns custom drag function based on input data
     * @return {{CD: number, Mach: number}[]}
     */
    get cdm() {
        return this._calc.cdm
    }

    /**
     * Recalculates barrel elevation for weapon and zero atmo
     */
    calculateElevation() {
        this._calc = new TrajectoryCalc(this.ammo)
        this._elevation = this._calc.zeroAngle(this.weapon, this._zeroAtmo)
    }

    /**
     * Calculates trajectory
     * @param {Shot} shot
     * @param {number|Distance|Object} trajectory_step
     * @param {boolean} extra_data
     * @return {HitResult}
     */
    fire(shot, trajectory_step, extra_data = false) {
        const step = unitTypeCoerce(trajectory_step, Measure.Distance, calcSettings.Units.distance)
        this._calc = new TrajectoryCalc(this.ammo)
        if (shot.zeroAngle) {
            shot.zeroAngle = this._elevation
        }
        const data = this._calc.trajectory(this.weapon, shot, step, extra_data)
        return new HitResult(this.weapon, shot, data, extra_data)
    }
}