import { Shot, Atmo } from "../conditions";
import { _WindSock } from "../engines";
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

type CurvePoint = {
    readonly a: number;
    readonly b: number;
    readonly c: number;
}

type Curve = CurvePoint[];
type MachList = number[];

class Atmosphere {
    public _t0: number;
    public _a0: number;
    public _p0: number;
    public _mach: number;
    public density_ratio: number;
    public cLowestTempC: number;

    constructor() {

    }

    density_factor_and_mach_for_altitude(altitude: number, density_ratio_out: number): number { };


}

class Termination {
    private _reason: TerminationReason = TerminationReason.NO_TERMINATE;
    constructor() { }
    get reason(): TerminationReason { return this._reason };
    set reason(reason: TerminationReason) { this._reason = reason };
    match(reason: TerminationReason): boolean { return this._reason === reason };
}

type Coriolis = {
    flat_fire_only: boolean;
    coriolisAccelerationLocal: (velocity_vector: Readonly<Vector>, coriolis_acc: Readonly<Vector>) => void;
}

class ShotProps extends Shot {
    wind_sock: _WindSock;
    coriolis: Coriolis;
    atmo: Atmo;
    alt0: number;
    drag_by_mach: (mach: number) => number;
}

export { Termination, TerminationReason, TrajFlag, Config, Coriolis, ShotProps };
