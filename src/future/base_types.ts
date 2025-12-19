import { Vector } from "./vector";


// Constants for unit conversions and atmospheric calculations
/**
 * @brief Earth's angular velocity in radians per second.
 */
const cEarthAngularVelocityRadS: number = 7.2921159e-5;
/**
 * @brief Conversion factor from degrees Fahrenheit to degrees Rankine.
 */
const cDegreesFtoR: number = 459.67;
/**
 * @brief Conversion factor from degrees Celsius to Kelvin.
 */
const cDegreesCtoK: number = 273.15;
/**
 * @brief Constant for speed of sound calculation in Imperial units (fps).
 *
 * (Approx. $\sqrt{\gamma R}$)
 */
const cSpeedOfSoundImperial: number = 49.0223;
/**
 * @brief Constant for speed of sound calculation in Metric units.
 *
 * (Approx. $\sqrt{\gamma R}$)
 */
const cSpeedOfSoundMetric: number = 20.0467;
/**
 * @brief Standard lapse rate in Kelvin per foot in the troposphere.
 */
const cLapseRateKperFoot: number = -0.0019812;
/**
 * @brief Standard lapse rate in Imperial units (degrees per foot).
 */
const cLapseRateImperial: number = -0.00356616;
/**
 * @brief Exponent used in the barometric formula for pressure calculation.
 *
 * (Approx. $g / (L \cdot R)$)
 */
const cPressureExponent: number = 5.255876;
/**
 * @brief Lowest allowed temperature in Fahrenheit for atmospheric model.
 */
const cLowestTempF: number = -130.0;
/**
 * @brief Conversion factor from meters to feet.
 */
const mToFeet: number = 3.280839895;
/**
 * @brief Maximum distance in feet for a wind segment (used as a sentinel value).
 */
const cMaxWindDistanceFeet: number = 1e8;

const cGravityImperial: number = 32.17405;


const cZeroFindingAccuracy = 0.000005  // Max allowed slant-error in feet to end zero search
const cMaxIterations = 40  // maximum number of iterations for zero search
const cMinimumAltitude = -1500  // feet, below sea level
const cMaximumDrop = -10000  // feet, maximum drop from the muzzle to continue trajectory
const cMinimumVelocity = 50.0  // fps, minimum velocity to continue trajectory
const cGravityConstant = -cGravityImperial  // feet per second squared
const cStepMultiplier = 1.0


enum TerminationReason {
    // Solver specific flags (always include RANGE_ERROR)
    NO_TERMINATE,
    TARGET_RANGE_REACHED,
    MINIMUM_VELOCITY_REACHED,
    MAXIMUM_DROP_REACHED,
    MINIMUM_ALTITUDE_REACHED,
    // Special flag to terminate integration via handler's request
    HANDLER_REQUESTED_STOP,
}

class Termination {
    private _reason: TerminationReason = TerminationReason.NO_TERMINATE;
    constructor() { };
    get reason(): TerminationReason { return this._reason };
    set reason(reason: TerminationReason) { this._reason = reason };
    match(reason: TerminationReason): boolean { return this._reason === reason };
}

enum TrajFlag {
    NONE = 0,
    ZERO_UP = 1,
    ZERO_DOWN = 2,
    ZERO = ZERO_UP | ZERO_DOWN,
    MACH = 4,
    RANGE = 8,
    APEX = 16,
    ALL = RANGE | ZERO_UP | ZERO_DOWN | MACH | APEX,
    MRT = 32
};

type Config = {
    cStepMultiplier: number;
    cZeroFindingAccuracy: number;
    cMinimumVelocity: number;
    cMaximumDrop: number;
    cMaxIterations: number;
    cGravityConstant: number;
    cMinimumAltitude: number;
}

const DEFAULT_CONFIG_DATA: Config = {
    cZeroFindingAccuracy: cZeroFindingAccuracy,
    cMaxIterations: cMaxIterations,
    cMinimumAltitude: cMinimumAltitude,
    cMaximumDrop: cMaximumDrop,
    cMinimumVelocity: cMinimumVelocity,
    cGravityConstant: cGravityConstant,
    cStepMultiplier: cStepMultiplier,
}

const create_config = (config: Partial<Config> = {}) => {
    return { ...DEFAULT_CONFIG_DATA, ...config }
}

type CurvePoint = {
    readonly a: number;
    readonly b: number;
    readonly c: number;
}

type Curve = CurvePoint[];
type MachList = number[];

class Atmosphere {
    constructor(
        public _t0: number = 0.0,
        public _a0: number = 0.0,
        public _p0: number = 0.0,
        public _mach: number = 0.0,
        public density_ratio: number = 0.0,
        public cLowestTempC: number = 0.0,
    ) { }
    getDensityFactorAndMachForAltitude(altitude: number): [number, number] { };
}


class Coriolis {
    constructor(
        public sin_lat: number = 0.0,
        public cos_lat: number = 0.0,
        public sin_az: number = 0.0,
        public cos_az: number = 0.0,
        public range_east: number = 0.0,
        public range_north: number = 0.0,
        public cross_east: number = 0.0,
        public cross_north: number = 0.0,
        public flat_fire_only: boolean = false,
        public muzzle_velocity_fps: number = 0.0,
    ) { };
    flatFireOffsets(
        time: number,
        distance_ft: number,
        drop_ft: number,
    ): [number, number] { };
    adjustRange(time: number, range_vector: Readonly<Vector>): Vector { };
    coriolisAccelerationLocal(velocity_vector: Readonly<Vector>, coriolis_acc: Vector): void { };
}

class Wind {
    constructor(
        public velocity: number = 0.0,
        public direction_from: number = 0.0,
        public until_distance: number = 0.0,
        public MAX_DISTANCE_FEET: number = 0.0
    ) { }

    toVector(): Vector { }
}

class WindSock {
    constructor(
        public winds: Wind[] = [],
        public current: number = 0,
        public next_range: number = 0.0,
        public last_vector_cache: Vector = new Vector()
    ) { }
    updateCache(): void { };
    currentVector(): Vector { };
    vectorForRange(next_range_param: number): Vector { };
}

class ShotProps {

    constructor(
        public bc: number = 0.0,
        public look_angle: number = 0.0,
        public twist: number = 0.0,
        public length: number = 0.0,
        public diameter: number = 0.0,
        public weight: number = 0.0,
        public barrel_elevation: number = 0.0,
        public barrel_azimuth: number = 0.0,
        public sight_height: number = 0.0,
        public cant_cosine: number = 0.0,
        public cant_sine: number = 0.0,
        public alt0: number = 0.0,
        public calc_step: number = 0.0,
        public muzzle_velocity: number = 0.0,
        public stability_coefficient: number = 0.0,
        public curve: Curve = [],
        public mach_list: MachList = [],
        public atmo: Atmosphere = new Atmosphere(),
        public coriolis: Coriolis = new Coriolis(),
        public wind_sock: WindSock = new WindSock(),
        public filter_flags: TrajFlag = TrajFlag.NONE,
    ) { }
    updateStabilityCoefficient(): void { };
    spinDrift(time: number): number { };
    dragByMach(mach: number): number { };
}

const getCorrection = (distance: number, double: number): number => {

}

const calculateEnergy = (bullet_weight: number, velocity: number): number => {

}

const calculateOgw = (bullet_weight: number, velocity: number): number => {

}

export { Termination, TerminationReason, TrajFlag, Config, create_config, Wind, WindSock, Coriolis, ShotProps, getCorrection, calculateEnergy, calculateOgw };
