// Types of the bclibc module. The bare WebAssembly build has
// nothing to generate them from, so they are written here, with the same names.

export type _InterpMethod = 0|1;

export type _TerminationReason = 0|1|2|3|4|5;

export type _TrajFlag = 0|1|2|3|4|8|16|31|32;

export type _IntegrationMethod = 0|1|2|3|4|5;

export type _BaseTrajDataInterpKey = 0|2|3|4|5|6|7|1;

export type _TrajectoryDataInterpKey = 0|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15;

export type _Config = {
  stepMultiplier: number,
  zeroFindingAccuracy: number,
  minimumVelocity: number,
  maximumDrop: number,
  maxIterations: number,
  gravityConstant: number,
  minimumAltitude: number
};

export type _Wind = {
  velocity_fps: number,
  direction_from_rad: number,
  until_distance_ft: number,
  MAX_DISTANCE_FEET: number
};

export type _DragTablePoint = {
  Mach: number,
  CD: number
};

export type _TrajectoryRequest = {
  range_limit_ft: number,
  range_step_ft: number,
  time_step: number,
  dense_output: boolean,
  filter_flags: _TrajFlag
};

export type _MaxRangeResult = {
  angle_at_max_rad: number,
  max_range_ft: number
};

export type _TrajectoryData = {
  time: number,
  distance_ft: number,
  velocity_fps: number,
  mach: number,
  height_ft: number,
  slant_height_ft: number,
  drop_angle_rad: number,
  windage_ft: number,
  windage_angle_rad: number,
  slant_distance_ft: number,
  angle_rad: number,
  density_ratio: number,
  drag: number,
  energy_ft_lb: number,
  ogw_lb: number,
  flag: _TrajFlag
};

export type _ZeroPointResult = {
  angle_rad: number,
  point: _TrajectoryData,
  has_point: boolean
};

export type _ShotPropsInput = {
  bc: number,
  look_angle_rad: number,
  twist_inch: number,
  length_inch: number,
  diameter_inch: number,
  weight_grain: number,
  barrel_elevation_rad: number,
  barrel_azimuth_rad: number,
  sight_height_ft: number,
  cant_angle_rad: number,
  muzzle_velocity_fps: number,
  drag_table: _DragTablePoint[],
  temp_c: number,
  pressure_hpa: number,
  altitude_ft: number,
  humidity: number,
  latitude_deg: number,
  azimuth_deg: number,
  winds: _Wind[],
  method: _IntegrationMethod,
  config: _Config
};

export type _BaseTrajData = {
  time: number,
  px: number,
  py: number,
  pz: number,
  vx: number,
  vy: number,
  vz: number,
  mach: number,
  position: { x: number; y: number; z: number },
  velocity: { x: number; y: number; z: number }
};

export type _Interception = {
  raw_data: _BaseTrajData,
  full_data: _TrajectoryData
};

export type _HitOutput = {
  trajectory: _TrajectoryData[],
  /** Not produced by the bare WebAssembly build: always empty. */
  dense_trajectory: _BaseTrajData[],
  reason: _TerminationReason
};

/** What `WasmManager.get()` gives: the functions of the flat C ABI of bclibc (bclibc_ffi.h), in JavaScript terms. */
export interface MainModule {
  _InterpMethod: { PCHIP: 0; LINEAR: 1 };
  _TerminationReason: {
    NO_TERMINATE: 0;
    TARGET_RANGE_REACHED: 1;
    MINIMUM_VELOCITY_REACHED: 2;
    MAXIMUM_DROP_REACHED: 3;
    MINIMUM_ALTITUDE_REACHED: 4;
    HANDLER_REQUESTED_STOP: 5;
  };
  _TrajFlag: { NONE: 0; ZERO_UP: 1; ZERO_DOWN: 2; ZERO: 3; MACH: 4; RANGE: 8; APEX: 16; ALL: 31; MRT: 32 };
  _IntegrationMethod: { RK4: 0; EULER: 1; VELOCITY_VERLET: 2; CASH_KARP: 3; DOPRI: 4; TSITOURAS: 5 };
  _BaseTrajDataInterpKey: { TIME: 0; POS_X: 2; POS_Y: 3; POS_Z: 4; VEL_X: 5; VEL_Y: 6; VEL_Z: 7; MACH: 1 };
  _TrajectoryDataInterpKey: {
    TIME: 0;
    DISTANCE: 1;
    VELOCITY: 2;
    MACH: 3;
    HEIGHT: 4;
    SLANT_HEIGHT: 5;
    DROP_ANGLE: 6;
    WINDAGE: 7;
    WINDAGE_ANGLE: 8;
    SLANT_DISTANCE: 9;
    ANGLE: 10;
    DENSITY_RATIO: 11;
    DRAG: 12;
    ENERGY: 13;
    OGW: 14;
    FLAG: 15;
  };
  APEX_IS_MAX_RANGE_RADIANS: number;
  ALLOWED_ZERO_ERROR_FEET: number;
  interpolateTrajectoryData(
    key: _TrajectoryDataInterpKey,
    value: number,
    p0: _TrajectoryData,
    p1: _TrajectoryData,
    p2: _TrajectoryData,
    flag: _TrajFlag,
    method: _InterpMethod
  ): _TrajectoryData;
  getCorrection(distanceFt: number, offsetFt: number): number;
  calculateEnergy(bulletWeightGrain: number, velocityFps: number): number;
  calculateOgw(bulletWeightGrain: number, velocityFps: number): number;
  hermite(x: number, xk: number, xk1: number, yk: number, yk1: number, mk: number, mk1: number): number;
  interpolate3pt(x: number, x0: number, x1: number, x2: number, y0: number, y1: number, y2: number): number;
  interpolate2pt(x: number, x0: number, y0: number, x1: number, y1: number): number;
  findApex(shot: _ShotPropsInput): _TrajectoryData;
  findMaxRange(shot: _ShotPropsInput, lowAngleDeg: number, highAngleDeg: number): _MaxRangeResult;
  findZeroAngle(shot: _ShotPropsInput, distanceFt: number): number;
  findZeroPoint(shot: _ShotPropsInput, distanceFt: number): _ZeroPointResult;
  integrateRawAt(shot: _ShotPropsInput, key: _BaseTrajDataInterpKey, targetValue: number): _Interception;
  integrate(shot: _ShotPropsInput, request: _TrajectoryRequest): _HitOutput;
}
