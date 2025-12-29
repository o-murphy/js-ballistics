import { Shot } from "./shot";
import { UNew, Angular, Distance, unitTypeCoerce, preferredUnits } from "./unit";
import { loadBclibc, ShotPropsInput, Config, IntegrationMethod, TrajectoryRequest, _TrajFlag, HitOutput, TrajFlag } from "./_wasm";
import { HitResult } from "./trajectory_data";
import { cGravityImperial } from "./constants";

export { Calculator };


/** Maximum allowed slant-error in feet to end zero search */
export const cZeroFindingAccuracy = 0.000005;

/** Maximum number of iterations for zero search */
export const cMaxIterations = 40;

/** Minimum altitude in feet (below sea level) */
export const cMinimumAltitude = -1500;

/** Maximum drop from muzzle in feet to continue trajectory */
export const cMaximumDrop = -10000;

/** Minimum velocity in fps to continue trajectory */
export const cMinimumVelocity = 50.0;

/** Gravity constant in feet per second squared */
export const cGravityConstant = -cGravityImperial;

/** Multiplier for engine's default step (changes integration speed & precision) */
export const cStepMultiplier = 1.0;

/** Default configuration for shot calculations */
export const DEFAULT_CONFIG: Config = {
    zeroFindingAccuracy: cZeroFindingAccuracy,
    maxIterations: cMaxIterations,
    minimumAltitude: cMinimumAltitude,
    maximumDrop: cMaximumDrop,
    minimumVelocity: cMinimumVelocity,
    gravityConstant: cGravityConstant,
    stepMultiplier: cStepMultiplier
};


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
    constructor(options?: Partial<Pick<ShotPropsInput, 'config' | 'method'>>) {
        options = options ?? {};
        this.method = options.method ?? IntegrationMethod.RK4;
        this.config = { ...DEFAULT_CONFIG, ...options.config ?? {} };

        // Ensure maximumDrop and minimumAltitude are negative (like Python does)
        // C++ engine expects: height < maximumDrop (triggers when bullet drops too far)
        // C++ engine expects: altitude < minimumAltitude (triggers when too low)
        // this.config.maximumDrop = -Math.abs(this.config.maximumDrop);
        // this.config.minimumAltitude = -Math.abs(this.config.minimumAltitude);
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
            shot.toWasmShotProps(this.method, this.config),
            _targetDistance.foot
        );

        return UNew.Radian(totalElevationRad - shot.lookAngle.rad);
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
     * @param options.raiseRangeError Should throw an error on termination (default: false)
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
        filterFlags = TrajFlag.RANGE,
        denseOutput = false,
        raiseRangeError = true
    }: {
        shot: Shot;
        trajectoryRange: number | Distance;
        trajectoryStep?: number | Distance;
        timeStep?: number;
        filterFlags?: TrajFlag;
        denseOutput?: boolean;
        raiseRangeError?: boolean;
    }): Promise<HitResult> {
        // Convert trajectory range to Distance
        const _trajectoryRange = unitTypeCoerce(
            trajectoryRange,
            Distance,
            preferredUnits.distance
        );

        // Calculate step size (default: same as range to match Python behavior)
        let step: Distance;
        if (!trajectoryStep) {
            step = _trajectoryRange;  // Match Python: dist_step = trajectory_range
        } else {
            step = unitTypeCoerce(trajectoryStep, Distance, preferredUnits.distance);
        }

        // Auto-initialize WASM if needed
        const engine = await loadBclibc();

        // Build trajectory request
        const request: TrajectoryRequest = {
            range_limit_ft: _trajectoryRange.foot,
            range_step_ft: step.foot,
            time_step: timeStep,
            dense_output: denseOutput,
            filter_flags: filterFlags as unknown as _TrajFlag
        };

        // Debug: log request for vertical shot
        const angleInDeg = shot.relativeAngle.rad * 180 / Math.PI;
        if (Math.abs(angleInDeg - 90) < 0.1) {  // If near-vertical
            console.log('[Calculator.fire] Vertical shot request:', {
                angleInDeg,
                range_limit_ft: request.range_limit_ft,
                range_step_ft: request.range_step_ft,
                filter_flags: filterFlags,
                filter_flags_typeof: typeof request.filter_flags,
                filter_flags_value: request.filter_flags
            });
        }

        // Calculate trajectory
        const hit_out: HitOutput = engine.integrate(
            shot.toWasmShotProps(this.method, this.config),
            request
        );

        return HitResult.fromWasmHitOutput(shot, hit_out, raiseRangeError, filterFlags);
    }
}
