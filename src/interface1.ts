import { Shot, SHOT_DEFAULT_CONFIG } from "./conditions";
import { UNew, Angular, Distance, unitTypeCoerce, preferredUnits, Unit } from "./unit";
import { loadBclibc, ShotPropsInput, Config, HitOutput, IntegrationMethod, _IntegrationMethod, TrajectoryRequest, _TrajFlag } from "./_wasm";
import { TrajFlag } from "./trajectory_data";


const DEFAULT_CONFIG = SHOT_DEFAULT_CONFIG.config;

/**
 * Configuration options for Calculator
 */
type CalculatorOptions = Partial<Pick<ShotPropsInput, 'config' | 'method'>>;

/**
 * A class for performing ballistic trajectory calculations.
 * 
 * All methods automatically initialize the WASM module on first call,
 * so no manual initialization is required.
 * 
 * @example
 * ```typescript
 * // Simple usage - no initialization needed
 * const calc = new Calculator();
 * const elevation = await calc.barrelElevationForTarget(shot, 1000);
 * 
 * // With custom configuration
 * const calc = new Calculator({
 *     method: { value: 1 },
 *     config: { maximumDrop: 1000 }
 * });
 * ```
 */
class Calculator {
    public method: IntegrationMethod;
    public config: Config;

    /**
     * Creates an instance of Calculator.
     * 
     * @param options Configuration options
     * @param options.method The integration method to use
     * @param options.config The calculation configuration
     */
    constructor(options?: CalculatorOptions) {
        options = options ?? {};
        this.method = options.method ?? IntegrationMethod.RK4;
        this.config = { ...DEFAULT_CONFIG, ...options.config ?? {} };
    }

    /**
     * Calculates the barrel elevation required to hit a target at a specified distance.
     * 
     * This method automatically initializes the WASM module on first call.
     * 
     * @param shot The shot parameters including weapon and ammo data
     * @param targetDistance The distance to the target (number in default units or Distance object)
     * @returns The required barrel elevation
     * 
     * @example
     * ```typescript
     * const calc = new Calculator();
     * const elevation = await calc.barrelElevationForTarget(shot, 1000);
     * console.log(`Elevation: ${elevation.In(Angular.Radian)} rad`);
     * ```
     */
    async barrelElevationForTarget(shot: Shot, targetDistance: number | Distance): Promise<Angular> {
        const _targetDistance = unitTypeCoerce(targetDistance, Distance, preferredUnits.distance);

        // Auto-initialize WASM if needed
        const engine = await loadBclibc();

        const totalElevationRad = engine.findZeroAngle(
            shot.toWasmShotPropsInput(this.method, this.config),
            _targetDistance.In(Unit.Foot)
        );

        return UNew.Radian(totalElevationRad - shot.lookAngle.In(Angular.Radian));
    }

    /**
     * Sets the weapon's zero elevation based on the specified zero distance.
     * 
     * This method automatically initializes the WASM module on first call.
     * Modifies the shot.weapon.zeroElevation property.
     * 
     * @param shot The shot parameters including weapon and ammo data
     * @param zeroDistance The distance at which the weapon should be zeroed
     * @returns The new zero elevation of the weapon
     * 
     * @example
     * ```typescript
     * const calc = new Calculator();
     * const zero = await calc.setWeaponZero(shot, 100);
     * console.log(`Zero elevation: ${zero.In(Angular.MOA)} MOA`);
     * ```
     */
    async setWeaponZero(shot: Shot, zeroDistance: number | Distance): Promise<Angular> {
        shot.weapon.zeroElevation = await this.barrelElevationForTarget(shot, zeroDistance);
        return shot.weapon.zeroElevation;
    }

    /**
     * Fires a shot and calculates the complete trajectory.
     * 
     * This method automatically initializes the WASM module on first call.
     * 
     * @param options Parameters for the shot and trajectory calculation
     * @param options.shot The shot parameters including weapon and ammo data
     * @param options.trajectoryRange The total range of the trajectory
     * @param options.trajectoryStep The step size for trajectory calculations (default: range/10)
     * @param options.timeStep Time step for integration (default: 0)
     * @param options.filterFlags Trajectory data filter flags (default: ALL)
     * @param options.denseOutput Whether to generate dense output (default: false)
     * @returns The complete trajectory result including hit data
     * 
     * @example
     * ```typescript
     * const calc = new Calculator();
     * 
     * // Simple trajectory
     * const result = await calc.fire({
     *     shot,
     *     trajectoryRange: 1000,
     *     trajectoryStep: 10
     * });
     * 
     * // With all options
     * const result = await calc.fire({
     *     shot,
     *     trajectoryRange: 2000,
     *     trajectoryStep: 25,
     *     timeStep: 0.01,
     *     filterFlags: engine._TrajFlag.BASIC,
     *     denseOutput: true
     * });
     * 
     * console.log(`Impact velocity: ${result.trajectory[result.trajectory.length - 1].velocity}`);
     * ```
     */
    async fire({
        shot,
        trajectoryRange,
        trajectoryStep = 0.0,
        timeStep = 0.0,
        filterFlags,
        denseOutput = false
    }: {
        shot: Shot;
        trajectoryRange: number | Distance;
        trajectoryStep?: number | Distance;
        timeStep?: number;
        filterFlags?: TrajFlag;
        denseOutput?: boolean;
    }): Promise<HitOutput> {
        // Convert trajectory range to Distance
        const _trajectoryRange = unitTypeCoerce(
            trajectoryRange,
            Distance,
            preferredUnits.distance
        );

        // Calculate step size (default: 1/10 of range)
        let step: Distance;
        if (!trajectoryStep) {
            step = UNew.Inch(_trajectoryRange.rawValue / 10.0);
        } else {
            step = unitTypeCoerce(trajectoryStep, Distance, preferredUnits.distance);
        }

        // Auto-initialize WASM if needed
        const engine = await loadBclibc();

        // Build trajectory request
        const request: TrajectoryRequest = {
            range_limit_ft: _trajectoryRange.In(Unit.Foot),
            range_step_ft: step.In(Unit.Foot),
            time_step: timeStep,
            dense_output: denseOutput,
            filter_flags: (filterFlags ?? TrajFlag.ALL) as unknown as _TrajFlag
        };

        // Calculate trajectory
        const data = engine.integrate(
            shot.toWasmShotPropsInput(this.method, this.config),
            request
        );

        return data;
        // return new HitResult(shot, data.trajectory, data.dense_trajectory);
    }
}

export { Calculator, type CalculatorOptions };