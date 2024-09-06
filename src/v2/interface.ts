import TrajectoryCalc from "./trajectory_calc";
import { Shot } from "./conditions";
import { DragTable } from "./drag_model";
import { HitResult } from "./trajectory_data";
import { UNew, Unit, Angular, Distance, unitTypeCoerce, preferredUnits } from "./unit";


class Calculator {

    protected _calc: TrajectoryCalc

    get cdm(): DragTable {
        return this._calc.tableData
    }

    barrelElevationForTarget(shot: Shot, targetDistance: (number | Distance)): Angular {
        this._calc = new TrajectoryCalc(shot.ammo)
        const _targetDistance = unitTypeCoerce(targetDistance, Distance, preferredUnits.distance)
        const totalElevation = this._calc.zeroAngle(shot, _targetDistance)
        return UNew.Radian(
            totalElevation.In(Angular.Radian) - shot.lookAngle.In(Angular.Radian)
        )
    }

    setWeaponZero(shot: Shot, zeroDistance: (number | Distance)): Angular {
        shot.weapon.zeroElevation = this.barrelElevationForTarget(shot, zeroDistance)
        return shot.weapon.zeroElevation
    }

    fire(
        shot: Shot, trajectoryRange: (number | Distance),
        trajectoryStep: (number | Distance) = 0,
        extraData: boolean = false,
    ): HitResult {
        const _trajectoryRange: Distance = unitTypeCoerce(trajectoryRange, Distance, preferredUnits.distance)

        const _trajectoryStep = trajectoryStep
            ? unitTypeCoerce(trajectoryStep, Distance, preferredUnits.distance)
            : _trajectoryRange.In(_trajectoryRange.units)

        this._calc = new TrajectoryCalc(shot.ammo)

        const data = this._calc.trajectory(shot, _trajectoryRange, _trajectoryStep, extraData)
        return new HitResult(shot, data, extraData)
    }
}