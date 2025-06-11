import EulerIntegrationEngine from "./engines/euler";
import { Shot } from "./conditions";
import { DragTable } from "./drag_model";
import { HitResult } from "./trajectory_data";
import {
    UNew,
    Angular,
    Distance,
    unitTypeCoerce,
    preferredUnits,
} from "./unit";
import {
    createEngine,
    EngineConstructor,
    EngineInterface,
    GenericConfig,
} from "./generics/engine";
import { BaseEngineConfig } from "./engines";

/**
 * A class for performing calculations related to trajectories.
 * @template C The specific configuration type for the engine used by this calculator.
 */
class Calculator<C extends GenericConfig> {
    // Default to TrajectoryCalcConfig

    // The _config property should match the generic type C
    protected _config: Partial<C>;
    // The engine constructor should be capable of creating an EngineInterface<C> (engine constructor)
    protected _engine: EngineConstructor<C>;
    // The actual instantiated engine (engine instance)
    protected _calc: EngineInterface<C>;

    /**
     * Creates an instance of Calculator.
     * @param options An object containing the configuration and an optional engine constructor.
     * @param options.config The configuration for the engine.
     * @param options.engine The constructor of the engine class to use (defaults to EulerIntegrationEngine).
     */
    constructor(options?: {
        config?: Partial<C>;
        engine?: EngineConstructor<C>;
    }) {
        // Assign config directly. It's required, not optional, for type safety.
        options = options ?? {};
        this._config = options.config ?? {};

        if (options.engine) {
            // Case 1: An explicit engine constructor is provided.
            this._engine = options.engine;
            this._calc = createEngine(this._engine, this._config);
        } else {
            this._engine =
                EulerIntegrationEngine as EngineConstructor<BaseEngineConfig>;
            this._calc = new EulerIntegrationEngine(
                this._config as Partial<BaseEngineConfig>,
            );
        }
    }

    /**
     * Retrieves the drag table data from the trajectory calculations.
     * @returns {DragTable} - The drag table data used in the trajectory calculations.
     */
    get cdm(): DragTable {
        return this._calc.tableData;
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
        targetDistance: number | Distance,
    ): Angular {
        const _targetDistance = unitTypeCoerce(
            targetDistance,
            Distance,
            preferredUnits.distance,
        );
        const totalElevation = this._calc.zeroAngle(shot, _targetDistance);
        return UNew.Radian(
            totalElevation.In(Angular.Radian) -
                shot.lookAngle.In(Angular.Radian),
        );
    }

    /**
     * Sets the weapon's zero elevation based on the specified zero distance.
     * @param {Shot} shot - The shot parameters including weapon and ammo data.
     * @param {number | Distance} zeroDistance - The distance at which the weapon should be zeroed, can be a number or Distance object.
     * @returns {Angular} - The new zero elevation of the weapon in radians.
     */
    setWeaponZero(shot: Shot, zeroDistance: number | Distance): Angular {
        shot.weapon.zeroElevation = this.barrelElevationForTarget(
            shot,
            zeroDistance,
        );
        return shot.weapon.zeroElevation;
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
        trajectoryStep = 0.0,
        extraData = false,
        timeStep = 0.0,
    }: {
        shot: Shot;
        trajectoryRange: number | Distance;
        trajectoryStep?: number | Distance;
        extraData?: boolean;
        timeStep?: number;
    }): HitResult {
        const _trajectoryRange: Distance = unitTypeCoerce(
            trajectoryRange,
            Distance,
            preferredUnits.distance,
        );
        let step = undefined;
        if (!trajectoryStep) {
            step = UNew.Inch(_trajectoryRange.rawValue / 10.0);
        } else {
            step = unitTypeCoerce(
                trajectoryStep,
                Distance,
                preferredUnits.distance,
            );
        }

        const data = this._calc.trajectory(
            shot,
            _trajectoryRange,
            step,
            extraData,
            timeStep,
        );
        return new HitResult(shot, data, extraData);
    }
}

export default Calculator;
