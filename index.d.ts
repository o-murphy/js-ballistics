/**
 * Global physical and atmospheric constants for ballistic calculations.
 *
 * This module defines scientific constants used throughout the ballistic calculations,
 * including atmospheric model constants, physical constants, and runtime limits.
 * All constants follow international standards (ISA, ICAO) where applicable.
 *
 * Constant Categories:
 *   - Global atmosphere constants: Standard conditions and coefficients
 *   - ISA metric constants: International Standard Atmosphere in metric units
 *   - ICAO constants: International Civil Aviation Organization standards
 *   - Conversion factors: Unit conversion constants
 *   - Runtime limits: Computational bounds and validation limits
 *
 * References:
 *   - ISA: https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html
 *   - ICAO: International Civil Aviation Organization standards
 *   - Physical constants: NIST and other authoritative sources
 */
/** Standard gravity (g) in ft/s² */
declare const cGravityImperial: 32.17405;
/** Earth's rotational speed (Ω) in radians per second (rad/s) */
declare const cEarthAngularVelocityRadS: 0.000072921159;
/** Standard relative humidity used in atmospheric calculations (%) */
declare const cStandardHumidity: 0;
/** Pressure exponent constant for barometric formula (dimensionless) */
declare const cPressureExponent: 5.255876;
declare const cA0: 1.24871;
declare const cA1: 0.0988438;
declare const cA2: 0.00152907;
declare const cA3: -3.07031e-06;
declare const cA4: 4.21329e-7;
declare const cA5: 0.0003342;
/** Standard temperature at sea level in Celsius (°C) */
declare const cStandardTemperatureC: 15;
/** Temperature lapse rate in Kelvin per foot (K/ft) */
declare const cLapseRateKperFoot: -0.0019812;
/** Temperature lapse rate in metric units (°C/m) */
declare const cLapseRateMetric: -6.5e-03;
/** Standard atmospheric pressure at sea level (hPa) */
declare const cStandardPressureMetric: 1013.25;
/** Speed of sound coefficient in metric units (m/s per √K) */
declare const cSpeedOfSoundMetric: 20.0467;
/** Standard air density at sea level in metric units (kg/m³) */
declare const cStandardDensityMetric: 1.225;
/** Standard temperature at sea level in Fahrenheit (°F) */
declare const cStandardTemperatureF: 59;
/** Temperature lapse rate in imperial units (°F/ft) */
declare const cLapseRateImperial: -3.56616e-03;
/** Standard atmospheric pressure at sea level (InHg) */
declare const cStandardPressure: 29.92;
/** Speed of sound coefficient in imperial units (fps per √°R) */
declare const cSpeedOfSoundImperial: 49.0223;
/** Standard air density at sea level in imperial units (lb/ft³) */
declare const cStandardDensity: 0.076474;
/** Celsius to Kelvin conversion constant (K) */
declare const cDegreesCtoK: 273.15;
/** Fahrenheit to Rankine conversion constant (°R) */
declare const cDegreesFtoR: 459.67;
/** Density conversion factor from imperial to metric units (kg/m³ per lb/ft³) */
declare const cDensityImperialToMetric: 16.0185;
/** Minimum allowed temperature for atmospheric calculations (°F) */
declare const cLowestTempF: -130;
/** Maximum wind effect distance for computational limits (ft) */
declare const cMaxWindDistanceFeet: 100000000;

// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {
}

interface ClassHandle {
  isAliasOf(other: ClassHandle): boolean;
  delete(): void;
  deleteLater(): this;
  isDeleted(): boolean;
  // @ts-ignore - If targeting lower than ESNext, this symbol might not exist.
  [Symbol.dispose](): void;
  clone(): this;
}
interface _InterpMethodValue<T extends number> {
  value: T;
}
type _InterpMethod = _InterpMethodValue<0>|_InterpMethodValue<1>;

interface _TerminationReasonValue<T extends number> {
  value: T;
}
type _TerminationReason = _TerminationReasonValue<0>|_TerminationReasonValue<1>|_TerminationReasonValue<2>|_TerminationReasonValue<3>|_TerminationReasonValue<4>|_TerminationReasonValue<5>;

interface _TrajFlagValue<T extends number> {
  value: T;
}
type _TrajFlag = _TrajFlagValue<0>|_TrajFlagValue<1>|_TrajFlagValue<2>|_TrajFlagValue<3>|_TrajFlagValue<4>|_TrajFlagValue<8>|_TrajFlagValue<16>|_TrajFlagValue<31>|_TrajFlagValue<32>;

interface _IntegrationMethodValue<T extends number> {
  value: T;
}
type _IntegrationMethod = _IntegrationMethodValue<0>|_IntegrationMethodValue<1>;

interface _BaseTrajDataInterpKeyValue<T extends number> {
  value: T;
}
type _BaseTrajDataInterpKey = _BaseTrajDataInterpKeyValue<0>|_BaseTrajDataInterpKeyValue<2>|_BaseTrajDataInterpKeyValue<3>|_BaseTrajDataInterpKeyValue<4>|_BaseTrajDataInterpKeyValue<5>|_BaseTrajDataInterpKeyValue<6>|_BaseTrajDataInterpKeyValue<7>|_BaseTrajDataInterpKeyValue<1>;

interface _TrajectoryDataInterpKeyValue<T extends number> {
  value: T;
}
type _TrajectoryDataInterpKey = _TrajectoryDataInterpKeyValue<0>|_TrajectoryDataInterpKeyValue<1>|_TrajectoryDataInterpKeyValue<2>|_TrajectoryDataInterpKeyValue<3>|_TrajectoryDataInterpKeyValue<4>|_TrajectoryDataInterpKeyValue<5>|_TrajectoryDataInterpKeyValue<6>|_TrajectoryDataInterpKeyValue<7>|_TrajectoryDataInterpKeyValue<8>|_TrajectoryDataInterpKeyValue<9>|_TrajectoryDataInterpKeyValue<10>|_TrajectoryDataInterpKeyValue<11>|_TrajectoryDataInterpKeyValue<12>|_TrajectoryDataInterpKeyValue<13>|_TrajectoryDataInterpKeyValue<14>|_TrajectoryDataInterpKeyValue<15>;

interface _WindList extends ClassHandle {
  size(): number;
  get(_0: number): _Wind | undefined;
  push_back(_0: _Wind): void;
  resize(_0: number, _1: _Wind): void;
  set(_0: number, _1: _Wind): boolean;
}

interface _DragTable extends ClassHandle {
  size(): number;
  get(_0: number): _DragTablePoint | undefined;
  push_back(_0: _DragTablePoint): void;
  resize(_0: number, _1: _DragTablePoint): void;
  set(_0: number, _1: _DragTablePoint): boolean;
}

interface _Vector extends ClassHandle {
  x: number;
  y: number;
  z: number;
  add(_0: _Vector): _Vector;
  sub(_0: _Vector): _Vector;
  neg(): _Vector;
  norm(): _Vector;
  copy(): _Vector;
  iadd(_0: _Vector): void;
  isub(_0: _Vector): void;
  inorm(): void;
  mul(_0: number): _Vector;
  div(_0: number): _Vector;
  dot(_0: _Vector): number;
  imul(_0: number): void;
  idiv(_0: number): void;
  fusedMultiplyAdd(_0: _Vector, _1: number): _Vector;
  fusedMultiplySubtract(_0: _Vector, _1: number): _Vector;
  linearCombination(_0: _Vector, _1: number, _2: _Vector, _3: number): _Vector;
  linearCombination4(_0: _Vector, _1: number, _2: _Vector, _3: number, _4: _Vector, _5: number, _6: _Vector, _7: number): _Vector;
  mag(): number;
  magSquared(): number;
  toString(): string;
}

type _Config = {
  stepMultiplier: number,
  zeroFindingAccuracy: number,
  minimumVelocity: number,
  maximumDrop: number,
  maxIterations: number,
  gravityConstant: number,
  minimumAltitude: number
};

type _Atmosphere = {
  t0: number,
  a0: number,
  p0: number,
  mach: number,
  density_ratio: number,
  cLowestTempC: number
};

type _Wind = {
  velocity_fps: number,
  direction_from_rad: number,
  until_distance_ft: number,
  MAX_DISTANCE_FEET: number
};

type _Coriolis = {
  sin_lat: number,
  cos_lat: number,
  sin_az: number,
  cos_az: number,
  range_east: number,
  range_north: number,
  cross_east: number,
  cross_north: number,
  flat_fire_only: boolean,
  muzzle_velocity_fps: number
};

type _DragTablePoint = {
  Mach: number,
  CD: number
};

type _TrajectoryRequest = {
  range_limit_ft: number,
  range_step_ft: number,
  time_step: number,
  dense_output: boolean,
  filter_flags: _TrajFlag
};

type _MaxRangeResult = {
  angle_at_max_rad: number,
  max_range_ft: number
};

type _TrajectoryData = {
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

type _ShotPropsInput = {
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
  alt0_ft: number,
  muzzle_velocity_fps: number,
  drag_table: any,
  atmo: _Atmosphere,
  coriolis: _Coriolis,
  winds: any,
  method: _IntegrationMethod,
  config: _Config
};

type _BaseTrajData = {
  time: number,
  px: number,
  py: number,
  pz: number,
  vx: number,
  vy: number,
  vz: number,
  mach: number,
  position: any,
  velocity: any
};

type _Interception = {
  raw_data: _BaseTrajData,
  full_data: _TrajectoryData
};

type _HitOutput = {
  trajectory: any,
  dense_trajectory: any,
  reason: _TerminationReason
};

interface EmbindModule {
  _InterpMethod: {PCHIP: _InterpMethodValue<0>, LINEAR: _InterpMethodValue<1>};
  _TerminationReason: {NO_TERMINATE: _TerminationReasonValue<0>, TARGET_RANGE_REACHED: _TerminationReasonValue<1>, MINIMUM_VELOCITY_REACHED: _TerminationReasonValue<2>, MAXIMUM_DROP_REACHED: _TerminationReasonValue<3>, MINIMUM_ALTITUDE_REACHED: _TerminationReasonValue<4>, HANDLER_REQUESTED_STOP: _TerminationReasonValue<5>};
  _TrajFlag: {NONE: _TrajFlagValue<0>, ZERO_UP: _TrajFlagValue<1>, ZERO_DOWN: _TrajFlagValue<2>, ZERO: _TrajFlagValue<3>, MACH: _TrajFlagValue<4>, RANGE: _TrajFlagValue<8>, APEX: _TrajFlagValue<16>, ALL: _TrajFlagValue<31>, MRT: _TrajFlagValue<32>};
  _IntegrationMethod: {RK4: _IntegrationMethodValue<0>, EULER: _IntegrationMethodValue<1>};
  _BaseTrajDataInterpKey: {TIME: _BaseTrajDataInterpKeyValue<0>, POS_X: _BaseTrajDataInterpKeyValue<2>, POS_Y: _BaseTrajDataInterpKeyValue<3>, POS_Z: _BaseTrajDataInterpKeyValue<4>, VEL_X: _BaseTrajDataInterpKeyValue<5>, VEL_Y: _BaseTrajDataInterpKeyValue<6>, VEL_Z: _BaseTrajDataInterpKeyValue<7>, MACH: _BaseTrajDataInterpKeyValue<1>};
  _TrajectoryDataInterpKey: {TIME: _TrajectoryDataInterpKeyValue<0>, DISTANCE: _TrajectoryDataInterpKeyValue<1>, VELOCITY: _TrajectoryDataInterpKeyValue<2>, MACH: _TrajectoryDataInterpKeyValue<3>, HEIGHT: _TrajectoryDataInterpKeyValue<4>, SLANT_HEIGHT: _TrajectoryDataInterpKeyValue<5>, DROP_ANGLE: _TrajectoryDataInterpKeyValue<6>, WINDAGE: _TrajectoryDataInterpKeyValue<7>, WINDAGE_ANGLE: _TrajectoryDataInterpKeyValue<8>, SLANT_DISTANCE: _TrajectoryDataInterpKeyValue<9>, ANGLE: _TrajectoryDataInterpKeyValue<10>, DENSITY_RATIO: _TrajectoryDataInterpKeyValue<11>, DRAG: _TrajectoryDataInterpKeyValue<12>, ENERGY: _TrajectoryDataInterpKeyValue<13>, OGW: _TrajectoryDataInterpKeyValue<14>, FLAG: _TrajectoryDataInterpKeyValue<15>};
  _WindList: {
    new(): _WindList;
  };
  _DragTable: {
    new(): _DragTable;
  };
  _Vector: {
    new(): _Vector;
    new(_0: number, _1: number, _2: number): _Vector;
  };
  APEX_IS_MAX_RANGE_RADIANS: number;
  ALLOWED_ZERO_ERROR_FEET: number;
  interpolateTrajectoryData(_0: _TrajectoryDataInterpKey, _1: number, _2: _TrajectoryData, _3: _TrajectoryData, _4: _TrajectoryData, _5: _TrajFlag, _6: _InterpMethod): _TrajectoryData;
  getCorrection(_0: number, _1: number): number;
  calculateEnergy(_0: number, _1: number): number;
  calculateOgw(_0: number, _1: number): number;
  hermite(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number): number;
  interpolate3pt(_0: number, _1: number, _2: number, _3: number, _4: number, _5: number, _6: number): number;
  interpolate2pt(_0: number, _1: number, _2: number, _3: number, _4: number): number;
  findApex(_0: _ShotPropsInput): _TrajectoryData;
  findMaxRange(_0: _ShotPropsInput, _1: number, _2: number): _MaxRangeResult;
  findZeroAngle(_0: _ShotPropsInput, _1: number): number;
  integrateRawAt(_0: _ShotPropsInput, _1: _BaseTrajDataInterpKey, _2: number): _Interception;
  interpolateBasetrajData(_0: _BaseTrajDataInterpKey, _1: number, _2: _BaseTrajData, _3: _BaseTrajData, _4: _BaseTrajData): _BaseTrajData;
  integrate(_0: _ShotPropsInput, _1: _TrajectoryRequest): _HitOutput;
}

type MainModule = WasmModule & EmbindModule;

/**
 * WASM Module Manager
 *
 * Centralized singleton manager for the BCLIBC WebAssembly module.
 *
 * Usage:
 * ```typescript
 * import { WasmManager } from './_wasm';
 *
 * // Initialize once
 * await WasmManager.init();
 *
 * // Use synchronously everywhere
 * const bclibc = WasmManager.get();
 * const result = bclibc.findZeroAngle(...);
 * ```
 */

declare const loadBclibc: () => Promise<MainModule>;
declare const IntegrationMethod: {
    readonly RK4: {
        readonly value: 0;
    };
    readonly EULER: {
        readonly value: 1;
    };
};
type IntegrationMethod = typeof IntegrationMethod[keyof typeof IntegrationMethod];
declare enum TrajFlag {
    NONE = 0,
    ZERO_UP = 1,
    ZERO_DOWN = 2,
    ZERO = 3,
    MACH = 4,
    RANGE = 8,
    APEX = 16,
    ALL = 31,
    MRT = 32
}
type Config = _Config;
type HitOutput = _HitOutput;
type TrajectoryRequest = _TrajectoryRequest;
type BaseTrajData = _BaseTrajData;
type ShotPropsInput = _ShotPropsInput;

declare enum Unit {
    Radian = 0,
    Degree = 1,
    MOA = 2,
    MIL = 3,
    MRad = 4,
    Thousand = 5,
    InchesPer100Yd = 6,
    CmPer100M = 7,
    OClock = 8,
    Inch = 10,
    Foot = 11,
    Yard = 12,
    Mile = 13,
    NauticalMile = 14,
    Millimeter = 15,
    Centimeter = 16,
    Meter = 17,
    Kilometer = 18,
    Line = 19,
    FootPound = 30,
    Joule = 31,
    MmHg = 40,
    InHg = 41,
    Bar = 42,
    hPa = 43,
    PSI = 44,
    Fahrenheit = 50,
    Celsius = 51,
    Kelvin = 52,
    Rankin = 53,
    MPS = 60,
    KMH = 61,
    FPS = 62,
    MPH = 63,
    KT = 64,
    Grain = 70,
    Ounce = 71,
    Gram = 72,
    Pound = 73,
    Kilogram = 74,
    Newton = 75
}
type AngularUnit = Unit.Radian | Unit.Degree | Unit.MOA | Unit.MIL | Unit.MRad | Unit.Thousand | Unit.InchesPer100Yd | Unit.CmPer100M | Unit.OClock;
type DistanceUnit = Unit.Inch | Unit.Foot | Unit.Yard | Unit.Mile | Unit.NauticalMile | Unit.Millimeter | Unit.Centimeter | Unit.Meter | Unit.Kilometer | Unit.Line;
type VelocityUnit = Unit.MPS | Unit.KMH | Unit.FPS | Unit.MPH | Unit.KT;
type WeightUnit = Unit.Grain | Unit.Ounce | Unit.Gram | Unit.Pound | Unit.Kilogram | Unit.Newton;
type TemperatureUnit = Unit.Fahrenheit | Unit.Celsius | Unit.Kelvin | Unit.Rankin;
type EnergyUnit = Unit.FootPound | Unit.Joule;
type PressureUnit = Unit.MmHg | Unit.InHg | Unit.Bar | Unit.hPa | Unit.PSI;
declare class Dimension<AllowedUnitT extends Unit> {
    /**
     * Abstract class for unit of measure instance definition.
     * Stores defined unit and value, applies conversions to other units.
     *
     * @param {number} value - Numeric value of the unit.
     * @param {Unit} units - Unit as Unit enum.
     */
    ["constructor"]: typeof Dimension;
    _value: number;
    _definedUnits: AllowedUnitT;
    constructor(value: number, units: AllowedUnitT);
    /**
     * Returns a human-readable representation of the value with its unit.
     *
     * @return {string} A string representing the value with its unit.
     */
    toString(): string;
    /**
     * Validates the units.
     *
     * @param {number} value - Value of the unit.
     * @param {AllowedUnitT} units - Unit enum type.
     * @return {number} Value in specified units.
     * @throws {TypeError} When the provided units are not of the expected type.
     * @throws {Error} When the provided units are not supported.
     */
    protected _unit_support_error(value: number, units: any): number;
    /**
     * Converts value with specified units to raw value.
     *
     * @param {number} value - Value of the unit.
     * @param {AllowedUnitT} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    protected toRaw(value: number, units: AllowedUnitT): number;
    /**
     * Converts raw value to specified units.
     *
     * @param {number} value - Raw value of the unit.
     * @param {AllowedUnitT} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    protected fromRaw(value: number, units: AllowedUnitT): number;
    /**
     * Returns a new unit instance in specified units.
     *
     * @param {AllowedUnitT} units - Unit enum type.
     * @return {Dimension} New unit instance in specified units.
     */
    to(units: AllowedUnitT): Dimension<AllowedUnitT>;
    to(units: Unit): Dimension<Unit>;
    /**
     * Returns value in specified units.
     *
     * @param {AllowedUnitT} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    In(units: AllowedUnitT): number;
    In(units: Unit): number;
    /**
     * Returns defined units.
     *
     * @return {AllowedUnitT} Defined units.
     */
    get units(): AllowedUnitT;
    /**
     * Raw unit value getter.
     *
     * @return {number} Raw unit value.
     */
    get rawValue(): number;
}
/**
 * Angular unit
 */
declare class Angular extends Dimension<AngularUnit> {
    static readonly Radian: AngularUnit;
    static readonly Degree: AngularUnit;
    static readonly MOA: AngularUnit;
    static readonly MIL: AngularUnit;
    static readonly MRad: AngularUnit;
    static readonly Thousand: AngularUnit;
    static readonly InchesPer100Yd: AngularUnit;
    static readonly CmPer100M: AngularUnit;
    static readonly OClock: AngularUnit;
    constructor(value: number, units: AngularUnit);
    get rad(): number;
    protected toRaw(value: number, units: AngularUnit): number;
    protected fromRaw(value: number, units: AngularUnit): number;
}
/**
 * Distance unit
 */
declare class Distance extends Dimension<DistanceUnit> {
    static readonly Inch: DistanceUnit;
    static readonly Foot: DistanceUnit;
    static readonly Yard: DistanceUnit;
    static readonly Mile: DistanceUnit;
    static readonly NauticalMile: DistanceUnit;
    static readonly Line: DistanceUnit;
    static readonly Millimeter: DistanceUnit;
    static readonly Centimeter: DistanceUnit;
    static readonly Meter: DistanceUnit;
    static readonly Kilometer: DistanceUnit;
    constructor(value: number, units: DistanceUnit);
    get foot(): number;
    get inch(): number;
    protected toRaw(value: number, units: DistanceUnit): number;
    protected fromRaw(value: number, units: DistanceUnit): number;
}
/**
 * Velocity unit
 */
declare class Velocity extends Dimension<VelocityUnit> {
    static readonly MPS: VelocityUnit;
    static readonly KMH: VelocityUnit;
    static readonly FPS: VelocityUnit;
    static readonly MPH: VelocityUnit;
    static readonly KT: VelocityUnit;
    constructor(value: number, units: VelocityUnit);
    get fps(): number;
    protected toRaw(value: number, units: VelocityUnit): number;
    protected fromRaw(value: number, units: VelocityUnit): number;
}
/**
 * Weight unit
 */
declare class Weight extends Dimension<WeightUnit> {
    static readonly Grain: WeightUnit;
    static readonly Ounce: WeightUnit;
    static readonly Gram: WeightUnit;
    static readonly Pound: WeightUnit;
    static readonly Kilogram: WeightUnit;
    static readonly Newton: WeightUnit;
    constructor(value: number, units: WeightUnit);
    get grain(): number;
    protected toRaw(value: number, units: WeightUnit): number;
    protected fromRaw(value: number, units: WeightUnit): number;
}
/**
 * Pressure unit
 */
declare class Pressure extends Dimension<PressureUnit> {
    static readonly MmHg: PressureUnit;
    static readonly InHg: PressureUnit;
    static readonly Bar: PressureUnit;
    static readonly hPa: PressureUnit;
    static readonly PSI: PressureUnit;
    constructor(value: number, units: PressureUnit);
    protected toRaw(value: number, units: PressureUnit): number;
    protected fromRaw(value: number, units: PressureUnit): number;
}
/**
 * Temperature unit
 */
declare class Temperature extends Dimension<TemperatureUnit> {
    static readonly Fahrenheit: TemperatureUnit;
    static readonly Celsius: TemperatureUnit;
    static readonly Kelvin: TemperatureUnit;
    static readonly Rankin: TemperatureUnit;
    constructor(value: number, units: TemperatureUnit);
    protected toRaw(value: number, units: TemperatureUnit): number;
    protected fromRaw(value: number, units: TemperatureUnit): number;
}
/**
 * Energy unit
 */
declare class Energy extends Dimension<EnergyUnit> {
    static readonly FootPound: EnergyUnit;
    static readonly Joule: EnergyUnit;
    constructor(value: number, units: EnergyUnit);
    protected toRaw(value: number, units: EnergyUnit): number;
    protected fromRaw(value: number, units: EnergyUnit): number;
}
declare const UnitProps: {
    0: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    1: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    2: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    3: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    4: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    5: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    6: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    7: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    8: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    10: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    11: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    12: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    13: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    14: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    15: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    16: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    17: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    18: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    19: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    30: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    31: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    40: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    41: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    42: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    43: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    44: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    50: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    51: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    52: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    53: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    60: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    61: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    62: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    63: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    64: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    70: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    71: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    72: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    73: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    74: {
        name: string;
        accuracy: number;
        symbol: string;
    };
    75: {
        name: string;
        accuracy: number;
        symbol: string;
    };
};
declare const Measure: {
    Angular: typeof Angular;
    Distance: typeof Distance;
    Velocity: typeof Velocity;
    Weight: typeof Weight;
    Temperature: typeof Temperature;
    Pressure: typeof Pressure;
    Energy: typeof Energy;
};
declare const UNew: {
    Radian: (value: number) => Angular;
    Degree: (value: number) => Angular;
    MOA: (value: number) => Angular;
    MIL: (value: number) => Angular;
    MRad: (value: number) => Angular;
    Thousand: (value: number) => Angular;
    InchesPer100Yd: (value: number) => Angular;
    CmPer100M: (value: number) => Angular;
    OClock: (value: number) => Angular;
    Inch: (value: number) => Distance;
    Foot: (value: number) => Distance;
    Yard: (value: number) => Distance;
    Mile: (value: number) => Distance;
    NauticalMile: (value: number) => Distance;
    Millimeter: (value: number) => Distance;
    Centimeter: (value: number) => Distance;
    Meter: (value: number) => Distance;
    Kilometer: (value: number) => Distance;
    Line: (value: number) => Distance;
    FootPound: (value: number) => Energy;
    Joule: (value: number) => Energy;
    MmHg: (value: number) => Pressure;
    InHg: (value: number) => Pressure;
    Bar: (value: number) => Pressure;
    hPa: (value: number) => Pressure;
    PSI: (value: number) => Pressure;
    Fahrenheit: (value: number) => Temperature;
    Celsius: (value: number) => Temperature;
    Kelvin: (value: number) => Temperature;
    Rankin: (value: number) => Temperature;
    MPS: (value: number) => Velocity;
    KMH: (value: number) => Velocity;
    FPS: (value: number) => Velocity;
    MPH: (value: number) => Velocity;
    KT: (value: number) => Velocity;
    Grain: (value: number) => Weight;
    Ounce: (value: number) => Weight;
    Gram: (value: number) => Weight;
    Pound: (value: number) => Weight;
    Kilogram: (value: number) => Weight;
    Newton: (value: number) => Weight;
    0: (value: number) => Angular;
    1: (value: number) => Angular;
    2: (value: number) => Angular;
    3: (value: number) => Angular;
    4: (value: number) => Angular;
    5: (value: number) => Angular;
    6: (value: number) => Angular;
    7: (value: number) => Angular;
    8: (value: number) => Angular;
    10: (value: number) => Distance;
    11: (value: number) => Distance;
    12: (value: number) => Distance;
    13: (value: number) => Distance;
    14: (value: number) => Distance;
    15: (value: number) => Distance;
    16: (value: number) => Distance;
    17: (value: number) => Distance;
    18: (value: number) => Distance;
    19: (value: number) => Distance;
    30: (value: number) => Energy;
    31: (value: number) => Energy;
    40: (value: number) => Pressure;
    41: (value: number) => Pressure;
    42: (value: number) => Pressure;
    43: (value: number) => Pressure;
    44: (value: number) => Pressure;
    50: (value: number) => Temperature;
    51: (value: number) => Temperature;
    52: (value: number) => Temperature;
    53: (value: number) => Temperature;
    60: (value: number) => Velocity;
    61: (value: number) => Velocity;
    62: (value: number) => Velocity;
    63: (value: number) => Velocity;
    64: (value: number) => Velocity;
    70: (value: number) => Weight;
    71: (value: number) => Weight;
    72: (value: number) => Weight;
    73: (value: number) => Weight;
    74: (value: number) => Weight;
    75: (value: number) => Weight;
};
/**
 * Coerces the given instance to the specified unit class type or creates a new instance.
 * This function is used to ensure that a value, which might be a raw number or an existing
 * unit object, is consistently represented as an instance of a specific unit class.
 *
 * @template T - A type that extends `AbstractUnit`, representing the specific unit class (e.g., `Distance`, `Weight`).
 * @param {number | T} instance - The value to coerce. It can be a raw number (which will be used to create a new instance)
 * or an existing instance of the `expectedClass` (which will be returned directly).
 * @param {new (value: number, unit: Unit) => T} expectedClass - The constructor function for the expected unit class (e.g., `Distance`, `Weight`).
 * This is typically the class itself.
 * @param {Unit} defaultUnit - The default unit to use when `instance` is a number and a new `expectedClass` instance needs to be created.
 * This should be an enum value from the `Unit` type relevant to `expectedClass` (e.g., `Distance.Meter`, `Weight.Kilogram`).
 * @returns {T} An instance of the `expectedClass` type, representing the coerced value.
 * @throws {TypeError} If the `instance` is not a `number` and not an instance of the `expectedClass`,
 * indicating an unsupported type for coercion.
 */
declare function unitTypeCoerce<AllowedUnitT extends Unit, T extends Dimension<AllowedUnitT>>(instance: number | T, expectedClass: new (value: number, unit: AllowedUnitT) => T, defaultUnit: AllowedUnitT): T;
interface IPreferredUnits {
    angular: AngularUnit;
    distance: DistanceUnit;
    velocity: VelocityUnit;
    pressure: PressureUnit;
    temperature: TemperatureUnit;
    diameter: DistanceUnit;
    length: DistanceUnit;
    weight: WeightUnit;
    adjustment: AngularUnit;
    drop: DistanceUnit;
    energy: EnergyUnit;
    ogw: WeightUnit;
    sight_height: DistanceUnit;
    target_height: DistanceUnit;
    twist: DistanceUnit;
    defaults(): void;
    setUnits(units: Partial<IPreferredUnits>): void;
}
declare class PreferredUnits implements IPreferredUnits {
    angular: AngularUnit;
    distance: DistanceUnit;
    velocity: VelocityUnit;
    pressure: PressureUnit;
    temperature: TemperatureUnit;
    diameter: DistanceUnit;
    length: DistanceUnit;
    weight: WeightUnit;
    adjustment: AngularUnit;
    drop: DistanceUnit;
    energy: EnergyUnit;
    ogw: WeightUnit;
    sight_height: DistanceUnit;
    target_height: DistanceUnit;
    twist: DistanceUnit;
    defaults(): void;
    setUnits(units: Partial<IPreferredUnits>): void;
}
declare const preferredUnits: PreferredUnits;

declare class Atmo {
    protected _altitude: Distance;
    protected _pressure: Pressure;
    protected _temperature: Temperature;
    protected _powderTemp: Temperature;
    protected _humidity: number;
    protected _densityRatio: number;
    _mach: number;
    _a0: number;
    _t0: number;
    _p0: number;
    static cLowestTempC: number;
    protected _initializing: boolean;
    /**
     * Represents atmospheric conditions and performs density calculations.
     *
     * @param {Object} [options] - The options for initializing the atmospheric conditions.
     * @param {number | Distance} [options.altitude=undefined] - Altitude above sea level, or a distance object.
     * @param {number | Pressure} [options.pressure=undefined] - Atmospheric pressure, or a pressure object.
     * @param {number | Temperature} [options.temperature=undefined] - Temperature in Fahrenheit, or a temperature object.
     * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
     * @param {number | Temperature} [options.powderT=undefined] - Powder temperature (default: undefined).
     */
    constructor({ altitude, pressure, temperature, humidity, powderTemperature, }?: {
        altitude?: number | Distance;
        pressure?: number | Pressure;
        temperature?: number | Temperature;
        humidity?: number;
        powderTemperature?: number | Temperature;
    });
    get altitude(): Distance;
    get pressure(): Pressure;
    get temperature(): Temperature;
    get humidity(): number;
    get powderTemp(): Temperature;
    get mach(): Velocity;
    get densityRatio(): number;
    set humidity(value: number);
    updateDensityRatio(): void;
    get densityMetric(): number;
    get densityImperial(): number;
    temperatureAtAltitude(altitude: number): number;
    pressureAtAltitude(altitude: number): number;
    getDensityFactorAndMachForAltitude(altitude: number): [number, number];
    static standardTemperature(altitude: Distance): Temperature;
    static standardPressure(altitude: Distance): Pressure;
    static icao({ altitude, // Default altitude to 0 if not provided in the options object
    temperature, // No default here; handle undefined explicitly in the body
    humidity, }?: {
        altitude?: number | Distance;
        temperature?: number | Temperature;
        humidity?: number;
    }): Atmo;
    static standard: typeof Atmo.icao;
    static machF(fahrenheit: number): number;
    static machC(celsius: number): number;
    static machK(kelvin: number): number;
    static calculateAirDensity(t: number, p_hpa: number, humidity: number): number;
    toWasmAtmo(): _Atmosphere;
}
declare class Vacuum extends Atmo {
    static cLowestTempC: number;
    /**
     * Represents atmospheric conditions and performs density calculations.
     *
     * @param {Object} [options] - The options for initializing the atmospheric conditions.
     * @param {number | Distance} [options.altitude=undefined] - Altitude above sea level, or a distance object.
     * @param {number | Pressure} [options.pressure=undefined] - Atmospheric pressure, or a pressure object.
     * @param {number | Temperature} [options.temperature=undefined] - Temperature in Fahrenheit, or a temperature object.
     * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
     */
    constructor({ altitude, temperature, }?: {
        altitude?: number | Distance;
        temperature?: number | Temperature;
    });
    updateDensityRatio(): void;
}
declare class Wind {
    readonly velocity: Velocity;
    readonly directionFrom: Angular;
    readonly untilDistance: Distance;
    static MAX_DISTANCE_FEET: number;
    /**
     * Stores wind data at the desired distance.
     *
     * @param {Object} [options] - The options for initializing wind data.
     * @param {number | Velocity} [options.velocity=undefined] - Wind velocity. Can be a number, a `Velocity` object, or `undefined`.
     * @param {number | Angular} [options.directionFrom=undefined] - Wind direction in relation to the shooter. Can be a number, an `Angular` object, or `undefined`.
     * @param {number | Distance} [options.untilDistance=undefined] - Distance up to which the wind data is applicable. Can be a number, a `Distance` object, or `undefined`.
     * @param {number} [options.maxDistanceFeet=cMaxWindDistanceFeet] - Maximum distance in feet up to which the wind data is applicable. Defaults to `1e8`.
     */
    constructor({ velocity, directionFrom, untilDistance, maxDistanceFeet, }?: {
        velocity?: number | Velocity;
        directionFrom?: number | Angular;
        untilDistance?: number | Distance;
        maxDistanceFeet?: number;
    });
    toWasmWind(): _Wind;
}
/**
 * Precomputed Coriolis helpers for applying Earth's rotation.
 *
 * The calculator keeps ballistic state in a local range/up/cross (x, y, z) frame where:
 * - x axis points down-range
 * - y points up
 * - z points to the shooter's right
 *
 * Coriolis forces originate in the Earth-fixed East-North-Up (ENU) frame.
 * This class precomputes the scalars to transform between the two frames.
 *
 * If latitude is provided but not azimuth, falls back on a *flat-fire* approximation:
 * - North of equator: deflection is to the right
 * - South of equator: deflection is to the left
 *
 * Full 3D Coriolis acceleration (given azimuth A and latitude L):
 * ```
 * 2Ω * [
 *   -Vy * cos(L) * sin(A) - Vz * sin(L),
 *   Vx * cos(L) * sin(A) + Vz * cos(L) * cos(A),
 *   Vx * sin(L) - Vy * cos(L) * cos(A)
 * ]
 * ```
 *
 * @example
 * ```typescript
 * // Full 3D Coriolis with latitude and azimuth
 * const coriolis = new Coriolis({
 *     latitudeDeg: 45,
 *     azimuthDeg: 90,
 *     muzzleVelocityFps: 2800
 * });
 *
 * // Flat-fire approximation (latitude only)
 * const coriolisFlat = new Coriolis({
 *     latitudeDeg: 45,
 *     muzzleVelocityFps: 2800
 * });
 *
 * // No Coriolis (returns zero-filled instance)
 * const noCoriolis = new Coriolis({
 *     muzzleVelocityFps: 2800
 * });
 * ```
 */
declare class Coriolis {
    /** Sine of the firing latitude, used to project Earth's rotation vector */
    sin_lat: number;
    /** Cosine of the firing latitude */
    cos_lat: number;
    /** Sine of the firing azimuth (undefined in flat-fire mode) */
    sin_az: number;
    /** Cosine of the firing azimuth (undefined in flat-fire mode) */
    cos_az: number;
    /** Projection of local range axis onto geographic east (undefined in flat-fire mode) */
    range_east: number;
    /** Projection of local range axis onto geographic north (undefined in flat-fire mode) */
    range_north: number;
    /** Projection of local cross axis onto geographic east (undefined in flat-fire mode) */
    cross_east: number;
    /** Projection of local cross axis onto geographic north (undefined in flat-fire mode) */
    cross_north: number;
    /** True when no azimuth provided and only 2D flat-fire approximation should run */
    flat_fire_only: boolean;
    /** Muzzle velocity in feet per second (needed by flat-fire approximation) */
    muzzle_velocity_fps: number;
    /**
     * Creates a Coriolis instance for applying Earth's rotation effects.
     *
     * @param options - Configuration options
     * @param options.latitudeDeg - Latitude of shooting location in degrees [-90, 90]
     * @param options.azimuthDeg - Azimuth of shooting direction in degrees [0, 360).
     *        Geographic bearing: 0 = North, 90 = East, 180 = South, 270 = West
     * @param options.muzzleVelocityFps - Muzzle velocity in feet per second
     *
     * @remarks
     * - If `latitudeDeg` is undefined, creates zero-filled instance (no Coriolis effects)
     * - If `azimuthDeg` is undefined, uses flat-fire approximation (horizontal drift only)
     * - If both provided, computes full 3D Coriolis effects
     */
    constructor({ latitudeDeg, azimuthDeg, muzzleVelocityFps }: {
        latitudeDeg?: number;
        azimuthDeg?: number;
        muzzleVelocityFps: number;
    });
    /**
     * Converts to WASM-compatible Coriolis format.
     *
     * @returns Object with all Coriolis parameters, using 0.0 for undefined values
     */
    toWasmCoriolis(): _Coriolis;
}

/**
 * Represents a data point for drag calculation.
 */
interface DragDataPoint {
    /**
     * @param {number} Mach - Mach number at the data point.
     * @param {number} CD - Drag coefficient at the data point.
     */
    Mach: number;
    CD: number;
}
/**
 * Type alias for an array of DragDataPoint instances.
 */
type DragTable = DragDataPoint[];
declare const DragTables: Record<string, DragTable>;
/**
 * Input type that accepts drag data point objects or a table name string.
 */
type DragTableDataType = DragTable | keyof typeof DragTables;
/**
 * Converts a drag table into an array of `DragDataPoint` objects.
 *
 * @param dragTable - The input drag table data: either an array with `Mach` and `CD` properties, or a string name of a standard table (e.g., "G1", "G7")
 * @returns Array of `DragDataPoint` objects
 * @throws {TypeError} If any item in the drag table doesn't have `Mach` and `CD` properties
 * @throws {Error} If the table name string is not found in `Table`
 *
 * @example
 * ```typescript
 * // Using standard table name
 * const g1Table = makeDataPoints("G1");
 *
 * // Using custom data points
 * const customTable = makeDataPoints([
 *     { Mach: 0.0, CD: 0.2629 },
 *     { Mach: 0.5, CD: 0.2630 }
 * ]);
 * ```
 */
declare const makeDataPoints: (dragTable: DragTableDataType) => DragDataPoint[];

/**
 * Represents a ballistic coefficient point.
 */
declare class BCPoint {
    readonly BC: number;
    readonly Mach: number;
    readonly V: Velocity | null;
    /**
     * Creates an instance of BCPoint.
     * @param {Object} options - The parameters for initializing the ballistic coefficient point.
     * @param {number} options.BC - The ballistic coefficient. Must be positive.
     * @param {number} [options.Mach=null] - Mach number. Optional if velocity is provided.
     * @param {number | Velocity | null} [options.V=null] - Velocity. Optional if Mach number is provided.
     * @throws {Error} If BC is less than or equal to zero, or if both Mach and V are specified, or if neither Mach nor V is specified.
     */
    constructor({ BC, Mach, V, }: {
        BC: number;
        Mach?: number | null;
        V?: number | Velocity | null;
    });
    static _machC(): number;
}
declare class DragModel {
    /**
     * Constructor for DragModel class.
     * @param {number} bc - Coefficient value for drag.
     * @param {DragTable} dragTable - Custom drag table.
     * @param {number|Weight} weight - Weight value or Weight instance.
     * @param {number|Distance} diameter - Diameter value or Distance instance.
     * @param {number|Distance} length - Diameter value or Distance instance.
     */
    readonly bc: number;
    readonly dragTable: DragTable;
    readonly weight: Weight;
    readonly diameter: Distance;
    readonly length: Distance;
    protected sectionalDensity: number;
    protected formFactor: number;
    /**
     * Creates an instance of DragModel.
     * @param {Object} options - The options for initializing the drag model.
     * @param {number} options.bc - Coefficient value for drag.
     * @param {DragTable} options.dragTable - Custom drag table.
     * @param {number | Weight} [options.weight=0] - Weight value or Weight instance (default: 0).
     * @param {number | Distance} [options.diameter=0] - Diameter value or Distance instance (default: 0).
     * @param {number | Distance} [options.length=0] - Length value or Distance instance (default: 0).
     */
    constructor({ bc, dragTable, weight, diameter, length, }: {
        bc: number;
        dragTable: DragTableDataType;
        weight?: number | Weight;
        diameter?: number | Distance;
        length?: number | Distance;
    });
    /**
     * Calculate and return the form factor.
     * @param {number} bc - Drag coefficient value.
     * @returns {number} - Calculated form factor.
     * @private
     */
    _getFormFactor(bc: number): number;
    /**
     * Calculate and return the sectional density.
     * @returns {number} - Calculated sectional density.
     * @private
     */
    _getSectionalDensity(): number;
}
/**
 * Creates a `DragModel` instance with multiple ballistic coefficient (BC) points.
 * @param {Object} options - The options for initializing the `DragModel`.
 * @param {BCPoint[]} options.bcPoints - An array of `BCPoint` objects representing the ballistic coefficients.
 * @param {DragTableDataType} options.dragTable - The drag table data, which can be a mix of `DragDataPoint` instances and objects with `Mach` and `CD` properties.
 * @param {number | Weight} [options.weight=0] - The weight value or a `Weight` instance. Defaults to 0.
 * @param {number | Distance} [options.diameter=0] - The diameter value or a `Distance` instance. Defaults to 0.
 * @param {number | Distance} [options.length=0] - The length value or a `Distance` instance. Defaults to 0.
 * @returns {DragModel} - An instance of `DragModel` initialized with the provided options.
 */
declare const DragModelMultiBC: ({ bcPoints, dragTable, weight, diameter, length, }: {
    bcPoints: BCPoint[];
    dragTable: DragTableDataType;
    weight?: number | Weight;
    diameter?: number | Distance;
    length?: number | Distance;
}) => DragModel;

declare class Weapon {
    readonly sightHeight: Distance;
    readonly twist: Distance;
    zeroElevation: Angular;
    /**
     * Initializes a new instance of the Weapon class.
     * @param {Object} options - Parameters for initializing the weapon.
     * @param {number | Distance} [options.sightHeight=undefined] - Height of the sight above the bore axis.
     * @param {number | Distance} [options.twist=undefined] - The twist rate of the barrel.
     * @param {number | Angular} [options.zeroElevation=undefined] - The look angle for the zero distance.
     */
    constructor({ sightHeight, twist, zeroElevation, }?: {
        sightHeight?: number | Distance;
        twist?: number | Distance;
        zeroElevation?: number | Angular;
    });
}
declare class Ammo {
    dm: DragModel;
    mv: Velocity;
    powderTemp: Temperature;
    tempModifier: number;
    usePowderSensitivity: boolean;
    /**
     * Creates an instance of Ammo with specified properties.
     * @param {Object} options - Parameters for initializing the Ammo instance.
     * @param {DragModel} options.dm - Drag model instance.
     * @param {number | Velocity} options.mv - Velocity value.
     * @param {number} [options.tempModifier=0] - Temperature modifier value. Defaults to 0.
     * @param {number | Temperature} [options.powderTemp=undefined] - Powder temperature value. Defaults to undefined.
     * @param {boolean} [options.usePowderSensitivity=false] - Use powder sensitivity value. Defaults to false.
     */
    constructor({ dm, mv, powderTemp, tempModifier, usePowderSensitivity, }: {
        dm: DragModel;
        mv: number | Velocity;
        powderTemp?: number | Temperature;
        tempModifier?: number;
        usePowderSensitivity?: boolean;
    });
    /**
     * Calculates the velocity correction based on the change in temperature and assigns it to the temperature modifier.
     * @param {number | Velocity} otherVelocity - The velocity to compare with.
     * @param {number | Temperature} otherTemperature - The temperature to compare with.
     * @returns {number} - The calculated temperature sensitivity adjustment.
     */
    calcPowderSens(otherVelocity: number | Velocity, otherTemperature: number | Temperature): number;
    /**
     * Calculates the muzzle velocity at a given temperature based on the temperature modifier.
     * @param {number | Temperature} currentTemp - The current temperature for which to calculate the velocity.
     * @returns {Velocity} - The calculated muzzle velocity at the specified temperature.
     */
    getVelocityForTemp(currentTemp: number | Temperature): Velocity;
}

/**
 * Represents the parameters required for calculating a shot's trajectory.
 *
 * @example
 * ```typescript
 * const shot = new Shot({
 *     ammo: new Ammo(...),
 *     atmo: Atmo.icao(),
 *     weapon: new Weapon(...),
 *     winds: [new Wind(...)],
 *     lookAngle: UNew.Degree(5),
 *     cantAngle: UNew.Degree(0),
 *     relativeAngle: UNew.Degree(1),
 *     azimuthDeg: 90,  // East
 *     latitudeDeg: 45  // 45° North
 * });
 * ```
 */
declare class Shot {
    /** Ammunition used for the shot */
    ammo: Ammo;
    /** Atmospheric conditions in effect during shot */
    atmo: Atmo;
    /** Weapon used for the shot */
    weapon: Weapon;
    /**
     * Angle of sight line relative to horizontal (slant angle).
     *
     * If `lookAngle != 0` then any target in sight crosshairs will be at a different altitude:
     * - Horizontal distance X to target = cos(lookAngle) * target_distance
     * - Vertical distance Y to target = sin(lookAngle) * target_distance
     */
    lookAngle: Angular;
    /**
     * Elevation adjustment (a.k.a. "hold") added to `weapon.zeroElevation`.
     */
    relativeAngle: Angular;
    /**
     * Tilt of gun from vertical.
     *
     * If `weapon.sightHeight != 0` then this shifts any barrel elevation
     * from the vertical plane into the horizontal plane (as `barrelAzimuth`) by `sin(cantAngle)`.
     */
    cantAngle: Angular;
    protected _winds?: Wind[];
    protected _azimuthDeg?: number;
    protected _latitudeDeg?: number;
    /**
     * Creates an instance of the Shot class.
     *
     * @param options - The parameters for initializing the shot data
     * @param options.ammo - The ammunition used for the shot
     * @param options.weapon - The weapon used for the shot
     * @param options.atmo - Atmospheric conditions affecting the shot (defaults to ICAO standard)
     * @param options.winds - List of wind conditions affecting the shot
     * @param options.lookAngle - Angle of sight line relative to horizontal.
     *        If `lookAngle != 0` then target in crosshairs will be at different altitude:
     *        - Horizontal distance X = cos(lookAngle) * target_distance
     *        - Vertical distance Y = sin(lookAngle) * target_distance
     * @param options.relativeAngle - Elevation adjustment ("hold") added to `weapon.zeroElevation`
     * @param options.cantAngle - Tilt of gun from vertical. Shifts barrel elevation
     *        from vertical plane into horizontal plane by `sin(cantAngle)`
     * @param options.azimuthDeg - Azimuth of shooting direction in degrees [0, 360). Optional, for Coriolis effects.
     *        Geographic bearing: 0 = North, 90 = East, 180 = South, 270 = West
     * @param options.latitudeDeg - Latitude of shooting location in degrees [-90, 90]. Optional, for Coriolis effects
     *
     * @example
     * ```typescript
     * const shot = new Shot({
     *     ammo: new Ammo(...),
     *     weapon: new Weapon(...),
     *     lookAngle: UNew.Degree(5),
     *     azimuthDeg: 90,
     *     latitudeDeg: 45
     * });
     * ```
     */
    constructor({ weapon, ammo, lookAngle, relativeAngle, cantAngle, atmo, winds, azimuthDeg, latitudeDeg, }: {
        ammo: Ammo;
        atmo?: Atmo;
        weapon: Weapon;
        winds?: Wind[];
        lookAngle?: number | Angular;
        relativeAngle?: number | Angular;
        cantAngle?: number | Angular;
        azimuthDeg?: number;
        latitudeDeg?: number;
    });
    /**
     * Azimuth of the shooting direction in degrees [0, 360).
     *
     * Should be *geographic* bearing where 0 = North, 90 = East, 180 = South, 270 = West.
     * Difference from *magnetic* bearing is usually negligible.
     * Optional, used for Coriolis effects.
     */
    get azimuthDeg(): number | undefined;
    set azimuthDeg(value: number | undefined);
    /**
     * Latitude of the shooting location in degrees [-90, 90].
     *
     * Optional, used for Coriolis effects.
     */
    get latitudeDeg(): number | undefined;
    set latitudeDeg(value: number | undefined);
    /**
     * Sets wind conditions affecting the shot.
     * Winds will be automatically sorted by `untilDistance` when retrieved.
     */
    set winds(winds: Wind[] | undefined);
    /**
     * Gets wind conditions sorted by `untilDistance`.
     *
     * @returns Array of Wind instances sorted by until_distance, or empty array if none set
     */
    get winds(): Wind[];
    /**
     * Gets the horizontal angle of the barrel relative to the sight line.
     *
     * The azimuth angle is calculated based on the cant angle and the relative angle of the
     * weapon. The result is converted to radians.
     *
     * Calculated as: `sin(cantAngle) * (weapon.zeroElevation + relativeAngle)`
     *
     * @returns Angular value representing horizontal barrel angle
     */
    get barrelAzimuth(): Angular;
    /**
     * Gets the barrel elevation in the vertical plane from the horizontal.
     *
     * The elevation is calculated by adding the look angle to the vertical component of
     * the barrel's elevation based on the cant angle and relative angle. The result is
     * converted to radians.
     *
     * Calculated as: `lookAngle + cos(cantAngle) * (weapon.zeroElevation + relativeAngle)`
     *
     * @returns Angular value representing vertical barrel elevation
     */
    get barrelElevation(): Angular;
    /**
     * Sets barrel elevation by adjusting `relativeAngle`.
     *
     * This does not change `weapon.zeroElevation`.
     * Calculates required `relativeAngle` to achieve desired barrel elevation.
     *
     * @param value - Desired barrel elevation in vertical plane from horizontal
     */
    set barrelElevation(value: Angular | number);
    /**
     * Synonym for `lookAngle`.
     *
     * @returns Angle of sight line relative to horizontal
     */
    get slantAngle(): Angular;
    set slantAngle(value: Angular | number);
    /**
     * Converts Shot instance to WASM-compatible input format.
     *
     * Serializes all shot parameters into the format required by the WASM ballistic calculator.
     * Includes ballistic coefficient, angles, atmospheric conditions, winds, and calculation config.
     *
     * @param method - Integration method to use (RK4 or EULER)
     * @param config - Optional partial configuration to override defaults
     * @returns WASM-compatible shot properties object
     *
     * @example
     * ```typescript
     * const wasmInput = shot.toWasmShotPropsInput(IntegrationMethod.RK4, {
     *     maxIterations: 50,
     *     minimumVelocity: 100.0
     * });
     * ```
     */
    toWasmShotProps(method: IntegrationMethod, config: Config): _ShotPropsInput;
}

declare const trajFlagNames: Record<number, string>;
declare const trajFlagName: (value: TrajFlag) => string;
declare class TrajectoryData {
    readonly time: number;
    readonly distance: Distance;
    readonly velocity: Velocity;
    readonly mach: number;
    readonly height: Distance;
    readonly targetDrop: Distance;
    readonly dropAdjustment: Angular;
    readonly windage: Distance;
    readonly windageAdjustment: Angular;
    readonly lookDistance: Distance;
    readonly angle: Angular;
    readonly densityFactor: number;
    readonly drag: number;
    readonly energy: Energy;
    readonly ogw: Weight;
    readonly flag: TrajFlag;
    /**
     * Represents data related to a trajectory calculation.
     * This class is used solely as a return value from trajectory calculations.
     *
     * @class
     * @param {number} time - The time elapsed in the trajectory calculation.
     * @param {Distance} distance - The distance traveled.
     * @param {Velocity} velocity - The velocity at the given point.
     * @param {number} mach - The Mach number at the given point.
     * @param {Distance} height - The height above the reference point.
     * @param {Distance} targetDrop - The drop from the target elevation.
     * @param {Angular} dropAdjustment - Adjustment in angle due to drop.
     * @param {Distance} windage - The amount of windage correction.
     * @param {Angular} windageAdjustment - Adjustment in angle due to windage.
     * @param {Distance} lookDistance - The distance to the target.
     * @param {Angular} angle - The angle of the trajectory.
     * @param {number} densityFactor - Factor representing air density effects.
     * @param {number} drag - The drag experienced by the projectile.
     * @param {Energy} energy - The energy of the projectile.
     * @param {Weight} ogw - The optimal gun weight.
     * @param {TrajFlag} flag - Flags representing various trajectory characteristics.
     */
    constructor(time: number, distance: Distance, velocity: Velocity, mach: number, height: Distance, targetDrop: Distance, dropAdjustment: Angular, windage: Distance, windageAdjustment: Angular, lookDistance: Distance, angle: Angular, densityFactor: number, drag: number, energy: Energy, ogw: Weight, flag: TrajFlag);
    /**
     * Returns an array of numerical values representing the trajectory data in default units.
     *
     * @returns {number[]} An array where each element corresponds to a specific piece of trajectory data
     * converted to default units.
     */
    inDefUnits(): number[];
    /**
     * Returns an array of strings representing the trajectory data in a formatted manner.
     *
     * @returns {string[]} An array of formatted strings, each representing a piece of trajectory data.
     */
    formatted(): string[];
    static fromWasmTrajectoryData(data: _TrajectoryData): TrajectoryData;
}
declare class DangerSpace {
    readonly atRange: TrajectoryData;
    readonly targetHeight: Distance;
    readonly begin: TrajectoryData;
    readonly end: TrajectoryData;
    readonly lookAngle: Angular;
    /**
     * Stores the danger space data for a specified distance.
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     *
     * @param {TrajectoryData} atRange - The trajectory data at the specified range.
     * @param {Distance} targetHeight - The height of the target, or undefined if not applicable.
     * @param {TrajectoryData} begin - The starting trajectory data for the danger space.
     * @param {TrajectoryData} end - The ending trajectory data for the danger space.
     * @param {Angular} lookAngle - The look angle for the danger space, or undefined if not applicable.
     */
    constructor(atRange: TrajectoryData, targetHeight: Distance, begin: TrajectoryData, end: TrajectoryData, lookAngle: Angular);
    /**
     * Returns a string representation of the DangerSpace object.
     * @returns {string} - A string summarizing the DangerSpace data.
     */
    toString(): string;
}
declare class HitResult {
    /**
     * Results of the shot
     * ! DATACLASS, USES AS RETURNED VALUE ONLY
     * @param {Shot} shot
     * @param {TrajectoryData[]} _trajectory
     * @param {boolean} _extra
     */
    readonly shot: Shot;
    readonly trajectory: TrajectoryData[];
    extra: boolean;
    constructor(shot: Shot, trajectory: TrajectoryData[], extra?: boolean);
    /**
     * Returns an iterator for the trajectory data.
     * Allows iterating over the HitResult object directly.
     */
    [Symbol.iterator](): Iterator<TrajectoryData>;
    /**
     * Allows accessing trajectory elements by index.
     * @param {number} index - The index of the element.
     * @returns {TrajectoryData} - Trajectory data at the specified index.
     */
    at(index: number): TrajectoryData;
    protected _checkExtra(): void;
    get length(): number;
    zeros(): TrajectoryData[];
    /**
     * Finds the index of the TrajectoryData item closest to the given distance.
     * @param {Distance} distance - The distance to search for.
     * @returns {number} - The index of the closest TrajectoryData item.
     */
    indexAtDistance(distance: Distance): number;
    getAtDistance(d: Distance): TrajectoryData;
    /**
     * Calculates the danger space for the specified range and target height.
     * @param {number | Distance} atRange - The distance at which to calculate the danger space.
     * @param {number | Distance} targetHeight - The height of the target.
     * @param {number | Angular} lookAngle - The look angle for the calculation.
     * @returns {DangerSpace} - The computed DangerSpace object.
     */
    dangerSpace(atRange: number | Distance, targetHeight: number | Distance, lookAngle?: number | Angular): DangerSpace;
    static fromWasmHitOutput(shot: Shot, hit: HitOutput, extra_data: boolean): HitResult;
}

/**
 * py_ballisticcalc exception types for TypeScript
 *
 * This module provides a comprehensive exception hierarchy for handling various error conditions
 * that can occur during ballistic calculations.
 *
 * Exception Hierarchy
 * -------------------
 *
 * Exception (built-in)
 * ├── TypeError
 * │   └── UnitTypeError
 * │       └── UnitConversionError
 * ├── ValueError
 * │   └── UnitAliasError
 * └── SolverRuntimeError
 *     ├── ZeroFindingError
 *     ├── RangeError
 *     ├── OutOfRangeError
 *     └── InterceptionError
 */

/**
 * Base class for unit-related type errors.
 * Raised when invalid unit types are passed to unit conversion functions
 * or there are type mismatches in unit operations.
 */
declare class UnitTypeError extends TypeError {
    constructor(message?: string);
}
/**
 * Raised when unit conversion fails.
 * Occurs when attempting to convert between incompatible unit types
 * or when a unit is not supported in the conversion factor table.
 */
declare class UnitConversionError extends UnitTypeError {
    constructor(message?: string);
}
/**
 * Raised when unit alias parsing fails.
 * Occurs when invalid unit alias strings are provided
 * or when there are ambiguous unit abbreviations.
 */
declare class UnitAliasError extends Error {
    constructor(message?: string);
}
/**
 * Base class for all solver-related runtime errors.
 * This is the base class for all ballistic calculation errors
 * and is typically not raised directly.
 */
declare class SolverRuntimeError extends Error {
    constructor(message?: string);
}
/**
 * Raised when zero-finding algorithms fail to converge.
 */
declare class ZeroFindingError extends SolverRuntimeError {
    static readonly DISTANCE_NON_CONVERGENT = "Distance non-convergent";
    static readonly ERROR_NON_CONVERGENT = "Error non-convergent";
    zeroFindingError: number;
    iterationsCount: number;
    lastBarrelElevation: Angular;
    reason: string;
    /**
     * @param zeroFindingError - Error magnitude in feet
     * @param iterationsCount - Number of iterations performed
     * @param lastBarrelElevation - Last computed barrel elevation (Angular instance)
     * @param reason - Specific reason for failure
     */
    constructor(zeroFindingError: number, iterationsCount: number, lastBarrelElevation: Angular, reason?: string);
}
/**
 * Raised when trajectory doesn't reach the requested distance.
 */
declare class RangeError extends SolverRuntimeError {
    static readonly MinimumVelocityReached = "Minimum velocity reached";
    static readonly MaximumDropReached = "Maximum drop reached";
    static readonly MinimumAltitudeReached = "Minimum altitude reached";
    reason: string;
    incompleteTrajectory: TrajectoryData[];
    lastDistance: Distance | null;
    /**
     * @param reason - The error reason
     * @param ranges - The trajectory data before the exception occurred
     */
    constructor(reason: string, ranges: TrajectoryData[]);
}
/**
 * Raised when requested distance exceeds maximum possible range.
 */
declare class OutOfRangeError extends SolverRuntimeError {
    requestedDistance: Distance;
    maxRange?: Distance;
    lookAngle?: Angular;
    /**
     * @param requestedDistance - The distance that was requested
     * @param maxRange - Maximum achievable range (optional)
     * @param lookAngle - Look angle for the shot (optional)
     * @param note - Additional note (optional)
     */
    constructor(requestedDistance: Distance, maxRange?: Distance, lookAngle?: Angular, note?: string);
}
/**
 * Raised when interpolation can't find interception point
 * for target key and value during integration.
 */
declare class InterceptionError extends SolverRuntimeError {
    lastData: [BaseTrajData, TrajectoryData];
    /**
     * @param message - Error message
     * @param lastData - Tuple of [BaseTrajData, TrajectoryData]
     */
    constructor(message: string, lastData: [BaseTrajData, TrajectoryData]);
}

/** Maximum allowed slant-error in feet to end zero search */
declare const cZeroFindingAccuracy = 0.000005;
/** Maximum number of iterations for zero search */
declare const cMaxIterations = 40;
/** Minimum altitude in feet (below sea level) */
declare const cMinimumAltitude = -1500;
/** Maximum drop from muzzle in feet to continue trajectory */
declare const cMaximumDrop = -10000;
/** Minimum velocity in fps to continue trajectory */
declare const cMinimumVelocity = 50;
/** Gravity constant in feet per second squared */
declare const cGravityConstant: number;
/** Multiplier for engine's default step (changes integration speed & precision) */
declare const cStepMultiplier = 1;
/** Default configuration for shot calculations */
declare const DEFAULT_CONFIG: Config;
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
declare class Calculator {
    method: IntegrationMethod;
    config: Config;
    /**
     * Creates an instance of Calculator.
     *
     * @param options Configuration options
     * @param options.method The integration method to use
     * @param options.config The calculation configuration
     */
    constructor(options?: Partial<Pick<ShotPropsInput, 'config' | 'method'>>);
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
    barrelElevationForTarget(shot: Shot, targetDistance: number | Distance): Promise<Angular>;
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
    setWeaponZero(shot: Shot, zeroDistance: number | Distance): Promise<Angular>;
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
    fire({ shot, trajectoryRange, trajectoryStep, timeStep, filterFlags, denseOutput }: {
        shot: Shot;
        trajectoryRange: number | Distance;
        trajectoryStep?: number | Distance;
        timeStep?: number;
        filterFlags?: TrajFlag;
        denseOutput?: boolean;
    }): Promise<HitResult>;
}

export { Ammo, Angular, type AngularUnit, Atmo, type MainModule as BCLIBC, BCPoint, type BaseTrajData, Calculator, type ClassHandle, type Config, Coriolis, DEFAULT_CONFIG, DangerSpace, Dimension, Distance, type DistanceUnit, type DragDataPoint, DragModel, DragModelMultiBC, type DragTable, type DragTableDataType, DragTables, Energy, type EnergyUnit, type HitOutput, HitResult, type IPreferredUnits, IntegrationMethod, InterceptionError, type MainModule, Measure, OutOfRangeError, PreferredUnits, Pressure, type PressureUnit, RangeError, Shot, type ShotPropsInput, SolverRuntimeError, Temperature, type TemperatureUnit, TrajFlag, TrajectoryData, type TrajectoryRequest, UNew, Unit, UnitAliasError, UnitConversionError, UnitProps, UnitTypeError, Vacuum, Velocity, type VelocityUnit, Weapon, Weight, type WeightUnit, Wind, ZeroFindingError, type _Atmosphere, type _BaseTrajData, type _BaseTrajDataInterpKey, type _BaseTrajDataInterpKeyValue, type _Config, type _Coriolis, type _DragTable, type _DragTablePoint, type _HitOutput, type _IntegrationMethod, type _IntegrationMethodValue, type _Interception, type _InterpMethod, type _InterpMethodValue, type _MaxRangeResult, type _ShotPropsInput, type _TerminationReason, type _TerminationReasonValue, type _TrajFlag, type _TrajFlagValue, type _TrajectoryData, type _TrajectoryDataInterpKey, type _TrajectoryDataInterpKeyValue, type _TrajectoryRequest, type _Vector, type _Wind, type _WindList, cA0, cA1, cA2, cA3, cA4, cA5, cDegreesCtoK, cDegreesFtoR, cDensityImperialToMetric, cEarthAngularVelocityRadS, cGravityConstant, cGravityImperial, cLapseRateImperial, cLapseRateKperFoot, cLapseRateMetric, cLowestTempF, cMaxIterations, cMaxWindDistanceFeet, cMaximumDrop, cMinimumAltitude, cMinimumVelocity, cPressureExponent, cSpeedOfSoundImperial, cSpeedOfSoundMetric, cStandardDensity, cStandardDensityMetric, cStandardHumidity, cStandardPressure, cStandardPressureMetric, cStandardTemperatureC, cStandardTemperatureF, cStepMultiplier, cZeroFindingAccuracy, loadBclibc, makeDataPoints, preferredUnits, trajFlagName, trajFlagNames, unitTypeCoerce };
