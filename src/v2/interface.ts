import TrajectoryCalc from "./trajectory_calc";
import { Shot } from "./conditions";
import { DragTable } from "./drag_model";
import { HitResult } from "./trajectory_data";
import { UNew, Angular, Distance, unitTypeCoerce, preferredUnits } from "./unit";


/**
 * A class for performing calculations related to trajectories.
 */
export default class Calculator {

    protected _calc: TrajectoryCalc

    /**
     * Retrieves the drag table data from the trajectory calculations.
     * @returns {DragTable} - The drag table data used in the trajectory calculations.
     */
    get cdm(): DragTable {
        return this._calc.tableData
    }

    /**
     * Calculates the barrel elevation required to hit a target at a specified distance.
     * @param {Object} options - Parameters for the calculation.
     * @param {Shot} options.shot - The shot parameters including weapon and ammo data.
     * @param {number | Distance} options.targetDistance - The distance to the target, can be a number or Distance object.
     * @returns {Angular} - The required barrel elevation in radians.
     */
    barrelElevationForTarget(
        shot: Shot,
        targetDistance: (number | Distance)
    ): Angular {
        this._calc = new TrajectoryCalc(shot.ammo)
        const _targetDistance = unitTypeCoerce(targetDistance, Distance, preferredUnits.distance)
        const totalElevation = this._calc.zeroAngle(shot, _targetDistance)
        return UNew.Radian(
            totalElevation.In(Angular.Radian) - shot.lookAngle.In(Angular.Radian)
        )
    }

    /**
     * Sets the weapon's zero elevation based on the specified zero distance.
     * @param {Shot} shot - The shot parameters including weapon and ammo data.
     * @param {number | Distance} zeroDistance - The distance at which the weapon should be zeroed, can be a number or Distance object.
     * @returns {Angular} - The new zero elevation of the weapon in radians.
     */
    setWeaponZero(shot: Shot, zeroDistance: (number | Distance)): Angular {
        shot.weapon.zeroElevation = this.barrelElevationForTarget(shot, zeroDistance)
        return shot.weapon.zeroElevation
    }

    /**
     * Fires a shot and calculates the hit result over a specified trajectory range.
     * @param {Object} options - Parameters for the shot and trajectory calculation.
     * @param {Shot} options.shot - The shot parameters including weapon and ammo data.
     * @param {number | Distance} options.trajectoryRange - The total range of the trajectory, can be a number or Distance object.
     * @param {number | Distance} [options.trajectoryStep=0] - The step size for trajectory calculations, can be a number or Distance object. Default is 0.
     * @param {boolean} [options.extraData=false] - Flag indicating whether to include extra data in the result. Default is false.
     * @returns {HitResult} - The result of the shot, including information about the hit.
     */
    fire({
        shot, 
        trajectoryRange,
        trajectoryStep = 0,
        extraData = false,
    }: {
        shot: Shot, 
        trajectoryRange: (number | Distance),
        trajectoryStep?: (number | Distance),
        extraData?: boolean,
    }): HitResult {
        const _trajectoryRange: Distance = unitTypeCoerce(trajectoryRange, Distance, preferredUnits.distance)

        const _trajectoryStep = trajectoryStep
            ? unitTypeCoerce(trajectoryStep, Distance, preferredUnits.distance)
            : _trajectoryRange.In(_trajectoryRange.units)

        this._calc = new TrajectoryCalc(shot.ammo)

        const data = this._calc.trajectory(shot, _trajectoryRange, _trajectoryStep, extraData)
        return new HitResult(shot, data, extraData)
    }
}