// @ts-ignore
import TrajectoryCalc from "./trajectory_calc.js";
import {HitResult, TrajectoryData} from "./trajectory_data";
import {Distance, Angular, unitTypeCoerce} from "./unit";
import calcSettings from "./settings";
import {Ammo, Weapon} from "./munition";
import {Atmo, Shot} from "./conditions";


export default class Calculator {

    // @ts-ignore
    protected _elevation: Angular
    // @ts-ignore
    protected _calc: TrajectoryCalc

    /**
     * Basic interface for the ballistics calculator
     * @param {Weapon} weapon
     * @param {Ammo} ammo
     * @param _zeroAtmo
     */
    constructor(
        readonly weapon: Weapon,
        readonly ammo: Ammo,
        readonly _zeroAtmo: Atmo
    ) {
        this.calculateElevation()
    }

    /**
     * get current barrel elevation
     * @return {Angular}
     */
    get elevation(): Angular {
        return this._elevation
    }

    /**
     * returns custom drag function based on input data
     * @return {{CD: number, Mach: number}[]}
     */
    get cdm(): { CD: number, Mach: number }[] {
        return this._calc.cdm
    }

    /**
     * Recalculates barrel elevation for weapon and zero atmo
     */
    calculateElevation(): void {
        this._calc = new TrajectoryCalc(this.ammo)
        this._elevation = this._calc.zeroAngle(this.weapon, this._zeroAtmo)
    }

    /**
     * Calculates trajectory
     * @param {Shot} shot
     * @param {number|Distance} trajectory_step
     * @param {boolean} extra_data
     * @return {HitResult}
     */
    fire(
        shot: Shot,
        trajectory_step: (number | Distance),
        extra_data: boolean = false
    ): HitResult {
            const step: Distance = unitTypeCoerce(trajectory_step, Distance, calcSettings.Units.distance)
            this._calc = new TrajectoryCalc(this.ammo)
            if (shot.zeroAngle) {
                shot.zeroAngle = this._elevation
            }
            const data: TrajectoryData[] = this._calc.trajectory(this.weapon, shot, step, extra_data)
            return new HitResult(this.weapon, shot, data, extra_data)
    }
}