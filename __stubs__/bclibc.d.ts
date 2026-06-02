/**
 * Minimal type stub for @wasm/bclibc when WASM is not built.
 * All types are kept compatible with the real Emscripten-generated declarations.
 */

export type _TrajFlag = number;
export type _IntegrationMethod = number;
export type _TerminationReason = number;

export interface _Config {
    zeroFindingAccuracy: number;
    maxIterations: number;
    minimumAltitude: number;
    maximumDrop: number;
    minimumVelocity: number;
    gravityConstant: number;
    stepMultiplier: number;
    [key: string]: number;
}

export interface _Wind {
    velocity_fps: number;
    direction_from_rad: number;
    until_distance_ft: number;
    MAX_DISTANCE_FEET: number;
}

export interface _ShotPropsInput {
    bc: number;
    look_angle_rad: number;
    twist_inch: number;
    length_inch: number;
    diameter_inch: number;
    weight_grain: number;
    barrel_elevation_rad: number;
    barrel_azimuth_rad: number;
    sight_height_ft: number;
    cant_angle_rad: number;
    muzzle_velocity_fps: number;
    drag_table: any;
    temp_c: number;
    pressure_hpa: number;
    altitude_ft: number;
    humidity: number;
    latitude_deg: number;
    azimuth_deg: number;
    winds: any;
    method: _IntegrationMethod;
    config: _Config;
}

export type _BaseTrajData = any;
export type _TrajectoryData = any;

export interface _TrajectoryDataInterpKey {
    TIME: any;
    DISTANCE: any;
    VELOCITY: any;
    MACH: any;
    HEIGHT: any;
    SLANT_HEIGHT: any;
    DROP_ANGLE: any;
    WINDAGE: any;
    WINDAGE_ANGLE: any;
    SLANT_DISTANCE: any;
    ANGLE: any;
    DENSITY_RATIO: any;
    DRAG: any;
    ENERGY: any;
    OGW: any;
    FLAG: any;
}

export type _InterpMethod = any;

export interface _HitOutput {
    trajectory: any;
    error?: any;
    termination_reason?: _TerminationReason;
}

export interface _TrajectoryRequest {
    range_limit_ft: number;
    range_step_ft: number;
    time_step: number;
    dense_output: boolean;
    filter_flags: _TrajFlag;
}

export interface MainModule {
    integrate(props: _ShotPropsInput, request: _TrajectoryRequest): _HitOutput;
    findZeroAngle(props: _ShotPropsInput, targetDistanceFt: number): number;
    testThrowRuntimeError(message: string): void;
    testThrowCustomException(message: string, value: number, count: number): void;
    testThrowSolverError(message: string): void;
    _TrajFlag: _TrajectoryDataInterpKey;
    _TrajectoryDataInterpKey: _TrajectoryDataInterpKey;
    [key: string]: any;
}

declare const factory: () => Promise<MainModule>;
export default factory;
