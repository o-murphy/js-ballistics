import { Vector } from "./vector";

// ============================================================================
// Constants
// ============================================================================

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
 */
const cSpeedOfSoundImperial: number = 49.0223;

/**
 * @brief Constant for speed of sound calculation in Metric units.
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

const cZeroFindingAccuracy = 0.000005;  // Max allowed slant-error in feet
const cMaxIterations = 40;              // Maximum iterations for zero search
const cMinimumAltitude = -1500;         // feet, below sea level
const cMaximumDrop = -10000;            // feet, maximum drop from muzzle
const cMinimumVelocity = 50.0;          // fps, minimum velocity
const cGravityConstant = -cGravityImperial;  // feet per second squared
const cStepMultiplier = 1.0;

// ============================================================================
// Enums and Types
// ============================================================================

enum TerminationReason {
    NO_TERMINATE,
    TARGET_RANGE_REACHED,
    MINIMUM_VELOCITY_REACHED,
    MAXIMUM_DROP_REACHED,
    MINIMUM_ALTITUDE_REACHED,
    HANDLER_REQUESTED_STOP,
}

class Termination {
    private _reason: TerminationReason = TerminationReason.NO_TERMINATE;

    constructor() { }

    get reason(): TerminationReason {
        return this._reason;
    }

    set reason(reason: TerminationReason) {
        this._reason = reason;
    }

    match(reason: TerminationReason): boolean {
        return this._reason === reason;
    }
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
}

type Config = {
    cStepMultiplier: number;
    cZeroFindingAccuracy: number;
    cMinimumVelocity: number;
    cMaximumDrop: number;
    cMaxIterations: number;
    cGravityConstant: number;
    cMinimumAltitude: number;
};

const DEFAULT_CONFIG_DATA: Config = {
    cZeroFindingAccuracy: cZeroFindingAccuracy,
    cMaxIterations: cMaxIterations,
    cMinimumAltitude: cMinimumAltitude,
    cMaximumDrop: cMaximumDrop,
    cMinimumVelocity: cMinimumVelocity,
    cGravityConstant: cGravityConstant,
    cStepMultiplier: cStepMultiplier,
};

const createConfig = (config: Partial<Config> = {}): Config => {
    return { ...DEFAULT_CONFIG_DATA, ...config };
};

type CurvePoint = {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
};

type Curve = CurvePoint[];
type MachList = number[];

// ============================================================================
// Atmosphere
// ============================================================================

class Atmosphere {
    constructor(
        public _t0: number = 0.0,
        public _a0: number = 0.0,
        public _p0: number = 0.0,
        public _mach: number = 0.0,
        public density_ratio: number = 0.0,
        public cLowestTempC: number = 0.0,
    ) { }

    /**
     * @brief Updates the density ratio and speed of sound (Mach 1) for a given altitude.
     *
     * Calculates atmospheric pressure, temperature, and resulting density ratio
     * and speed of sound at a given altitude using Standard Atmosphere model.
     *
     * @param altitude The altitude in feet.
     * @return Tuple of [density_ratio, mach] where:
     *         - density_ratio: ρ/ρ_std
     *         - mach: speed of sound in fps
     */
    getDensityFactorAndMachForAltitude(altitude: number): [number, number] {
        const altDiff = altitude - this._a0;

        // Fast path: if altitude is close to base altitude, use cached values
        if (Math.abs(altDiff) < 30.0) {
            return [this.density_ratio, this._mach];
        }

        let celsius = altDiff * cLapseRateKperFoot + this._t0;

        // Warning for altitude above troposphere
        if (altitude > 36089.0) {
            console.warn("Density request for altitude above troposphere. Model not valid.");
        }

        // Clamp temperature to prevent non-physical results
        const minTemp = -cDegreesCtoK;
        if (celsius < minTemp) {
            console.warn(`Invalid temperature ${celsius.toFixed(2)}°C. Adjusted to ${minTemp.toFixed(2)}°C.`);
            celsius = minTemp;
        } else if (celsius < this.cLowestTempC) {
            celsius = this.cLowestTempC;
            console.warn(`Reached minimum temperature limit. Adjusted to ${celsius.toFixed(2)}°C.`);
        }

        const kelvin = celsius + cDegreesCtoK;
        const baseKelvin = this._t0 + cDegreesCtoK;

        // Barometric formula for troposphere pressure
        const pressure = this._p0 * Math.pow(
            1.0 + cLapseRateKperFoot * altDiff / baseKelvin,
            cPressureExponent
        );

        // Density ratio calculation
        const densityDelta = (baseKelvin * pressure) / (this._p0 * kelvin);
        const densityRatioOut = this.density_ratio * densityDelta;

        // Mach 1 speed at altitude (fps)
        const machOut = Math.sqrt(kelvin) * cSpeedOfSoundMetric * mToFeet;

        return [densityRatioOut, machOut];
    }
}

// ============================================================================
// Wind
// ============================================================================

class Wind {
    constructor(
        public velocity: number = 0.0,
        public directionFrom: number = 0.0,
        public untilDistance: number = 0.0,
        public MAX_DISTANCE_FEET: number = cMaxWindDistanceFeet
    ) { }

    /**
     * @brief Converts Wind to a Vector.
     *
     * Wind direction is 'from' the specified direction:
     * - 0° is tailwind
     * - 90° is wind from the right
     *
     * @return Vector with components (x=downrange, y=vertical, z=crossrange)
     */
    toVector(): Vector {
        const dir = this.directionFrom;
        const vel = this.velocity;

        return new Vector(
            vel * Math.cos(dir),  // Downrange (tailwind positive)
            0.0,                   // Vertical (no vertical wind)
            vel * Math.sin(dir)    // Crossrange (from right positive)
        );
    }
}

// ============================================================================
// WindSock
// ============================================================================

class WindSock {
    public winds: Wind[] = [];
    public current: number = 0;
    public nextRange: number = cMaxWindDistanceFeet;
    public lastVectorCache: Vector = new Vector();

    constructor() {
        this.updateCache();
    }

    /**
     * @brief Add a wind segment to the WindSock
     */
    push(wind: Wind): void {
        this.winds.push(wind);
    }

    /**
     * @brief Returns the current wind vector
     */
    currentVector(): Vector {
        return this.lastVectorCache;
    }

    /**
     * @brief Updates the internal wind vector cache and next range threshold
     */
    updateCache(): void {
        if (this.current < this.winds.length) {
            const curWind = this.winds[this.current];
            this.lastVectorCache = curWind.toVector();
            this.nextRange = curWind.untilDistance;
        } else {
            this.lastVectorCache = new Vector(0, 0, 0);
            this.nextRange = cMaxWindDistanceFeet;
        }
    }

    /**
     * @brief Gets the current wind vector, updating to next segment if necessary
     *
     * @param nextRangeParam Current range (distance from muzzle)
     * @return Wind velocity vector for current or next applicable segment
     */
    vectorForRange(nextRangeParam: number): Vector {
        if (nextRangeParam >= this.nextRange) {
            this.current += 1;

            if (this.current >= this.winds.length) {
                // Reached end of wind segments
                this.lastVectorCache = new Vector(0, 0, 0);
                this.nextRange = cMaxWindDistanceFeet;
            } else {
                // Move to next wind segment
                this.updateCache();
            }
        }

        return this.lastVectorCache;
    }
}

// ============================================================================
// Coriolis
// ============================================================================

class Coriolis {
    constructor(
        public sinLat: number = 0.0,
        public cosLat: number = 0.0,
        public sinAz: number = 0.0,
        public cosAz: number = 0.0,
        public rangeEast: number = 0.0,
        public rangeNorth: number = 0.0,
        public crossEast: number = 0.0,
        public crossNorth: number = 0.0,
        public flatFireOnly: boolean = false,
        public muzzleVelocityFps: number = 0.0,
    ) { }

    /**
     * @brief Calculates flat-fire Coriolis offsets
     *
     * @param time Flight time in seconds
     * @param distanceFt Downrange distance in feet
     * @param dropFt Vertical drop in feet
     * @return Tuple of [deltaY, deltaZ] in feet
     */
    flatFireOffsets(
        time: number,
        distanceFt: number,
        dropFt: number,
    ): [number, number] {
        if (!this.flatFireOnly) {
            return [0.0, 0.0];
        }

        const horizontal = cEarthAngularVelocityRadS * distanceFt * this.sinLat * time;

        let vertical = 0.0;
        if (this.sinAz !== 0) {
            const verticalFactor = -2.0 * cEarthAngularVelocityRadS *
                this.muzzleVelocityFps * this.cosLat * this.sinAz;
            vertical = dropFt * (verticalFactor / cGravityImperial);
        }

        return [vertical, horizontal];
    }

    /**
     * @brief Adjusts range vector for Coriolis effect
     *
     * @param time Flight time in seconds
     * @param rangeVector Position vector
     * @return Adjusted position vector
     */
    adjustRange(time: number, rangeVector: Readonly<Vector>): Vector {
        if (!this.flatFireOnly) {
            return rangeVector.copy();
        }

        const [deltaY, deltaZ] = this.flatFireOffsets(time, rangeVector.x, rangeVector.y);

        if (deltaY === 0.0 && deltaZ === 0.0) {
            return rangeVector.copy();
        }

        return new Vector(
            rangeVector.x,
            rangeVector.y + deltaY,
            rangeVector.z + deltaZ
        );
    }

    /**
     * @brief Calculate Coriolis acceleration in local coordinates
     *
     * Transforms velocity to ENU (East-North-Up), calculates Coriolis acceleration,
     * and transforms back to local coordinates (range, up, crossrange).
     *
     * Formula: a_coriolis = -2 * ω_earth × v_ENU
     *
     * @param velocityVector Projectile's velocity in local coordinates
     * @param coriolisAcc Output vector for Coriolis acceleration
     */
    coriolisAccelerationLocal(
        velocityVector: Readonly<Vector>,
        coriolisAcc: Vector
    ): void {
        // Early exit for flat fire
        if (this.flatFireOnly) {
            coriolisAcc.set(0, 0, 0);
            return;
        }

        // Cache frequently used values
        const vx = velocityVector.x;
        const vy = velocityVector.y;
        const vz = velocityVector.z;

        // Transform velocity to ENU (East, North, Up)
        const velEast = vx * this.rangeEast + vz * this.crossEast;
        const velNorth = vx * this.rangeNorth + vz * this.crossNorth;
        const velUp = vy;

        // Coriolis acceleration in ENU
        const factor = -2.0 * cEarthAngularVelocityRadS;

        // ω_earth = ω_e * (0, cos(lat), sin(lat))
        const accelEast = factor * (this.cosLat * velUp - this.sinLat * velNorth);
        const accelNorth = factor * this.sinLat * velEast;
        const accelUp = factor * (-this.cosLat * velEast);

        // Transform back to local coordinates
        coriolisAcc.set(
            accelEast * this.rangeEast + accelNorth * this.rangeNorth,
            coriolisAcc.y = accelUp,
            coriolisAcc.z = accelEast * this.crossEast + accelNorth * this.crossNorth
        )
    }
}

// ============================================================================
// ShotProps
// ============================================================================

/**
 * @brief Interpolates drag coefficient from curve using PCHIP spline
 *
 * Uses hybrid search (linear for small datasets, binary for large)
 * and Horner's method for polynomial evaluation.
 *
 * @param machList Mach number breakpoints (must be monotonically increasing)
 * @param curve PCHIP cubic polynomial coefficients for each segment
 * @param mach Mach number at which to interpolate
 * @return Interpolated drag coefficient value
 */
const calculateByCurveAndMachList = (
    machList: MachList,
    curve: Curve,
    mach: number
): number => {
    // Validate data
    const nm1 = curve.length;        // Number of segments (n-1)
    const n = machList.length;       // Number of breakpoints (n)

    if (n < 2 || n !== nm1 + 1) {
        throw new Error("Invalid drag curve data: requires at least 2 points and consistent sizes.");
    }

    let i: number;  // Segment index

    // Boundary handling
    if (mach <= machList[0]) {
        i = 0;
    } else if (mach >= machList[n - 1]) {
        i = nm1 - 1;
    } else {
        // Interior point search
        if (n <= 15) {
            // Linear search for small datasets
            i = 0;
            while (i < nm1 && machList[i + 1] < mach) {
                i++;
            }
        } else {
            // Binary search for large datasets
            let lo = 0;
            let hi = n - 1;

            while (lo < hi) {
                const mid = lo + ((hi - lo) >> 1);

                if (machList[mid] < mach) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }

            i = lo - 1;

            // Boundary protection
            if (i < 0) i = 0;
            else if (i > nm1 - 1) i = nm1 - 1;
        }
    }

    // Evaluate cubic polynomial using Horner's method
    const seg = curve[i];
    const dx = mach - machList[i];

    // y = d + dx*(c + dx*(b + dx*a))
    return seg.d + dx * (seg.c + dx * (seg.b + dx * seg.a));
};

class ShotProps {
    constructor(
        public bc: number = 0.0,
        public lookAngle: number = 0.0,
        public twist: number = 0.0,
        public length: number = 0.0,
        public diameter: number = 0.0,
        public weight: number = 0.0,
        public barrelElevation: number = 0.0,
        public barrelAzimuth: number = 0.0,
        public sightHeight: number = 0.0,
        public cantCosine: number = 0.0,
        public cantSine: number = 0.0,
        public alt0: number = 0.0,
        public calcStep: number = 0.0,
        public muzzleVelocity: number = 0.0,
        public stabilityCoefficient: number = 0.0,
        public curve: Curve = [],
        public machList: MachList = [],
        public atmo: Atmosphere = new Atmosphere(),
        public coriolis: Coriolis = new Coriolis(),
        public windSock: WindSock = new WindSock(),
        public filterFlags: TrajFlag = TrajFlag.NONE,
    ) {
        this.updateStabilityCoefficient();
    }

    /**
     * @brief Litz spin-drift approximation
     *
     * Calculates lateral displacement due to spin drift.
     * Formula: SpinDrift(ft) = sign * (1.25 * (Sg + 1.2) * time^1.83) / 12.0
     *
     * @param time Time of flight in seconds
     * @return Windage due to spin drift in feet
     */
    spinDrift(time: number): number {
        if (this.twist === 0 || this.stabilityCoefficient === 0) {
            return 0.0;
        }

        const sign = this.twist > 0 ? 1.0 : -1.0;

        return sign * (1.25 * (this.stabilityCoefficient + 1.2) * Math.pow(time, 1.83)) / 12.0;
    }

    /**
     * @brief Updates Miller stability coefficient (Sg)
     *
     * Calculates stability based on bullet dimensions, weight, velocity,
     * and atmospheric conditions.
     */
    updateStabilityCoefficient(): void {
        // Check for valid input
        if (this.twist === 0.0 || this.length === 0.0 ||
            this.diameter === 0.0 || this.atmo._p0 === 0.0) {
            this.stabilityCoefficient = 0.0;
            return;
        }

        const twistRate = Math.abs(this.twist) / this.diameter;
        const length = this.length / this.diameter;

        // Check denominators
        const denomPart1 = Math.pow(twistRate, 2);
        const denomPart2 = Math.pow(this.diameter, 3);
        const denomPart3 = length;
        const denomPart4 = 1 + Math.pow(length, 2);

        if (denomPart1 === 0.0 || denomPart2 === 0.0 ||
            denomPart3 === 0.0 || denomPart4 === 0.0) {
            this.stabilityCoefficient = 0.0;
            throw new Error("Division by zero in stability coefficient calculation.");
        }

        const sd = 30.0 * this.weight /
            (denomPart1 * denomPart2 * denomPart3 * denomPart4);

        const fv = Math.pow(this.muzzleVelocity / 2800.0, 1.0 / 3.0);

        // Convert Celsius to Fahrenheit
        const ft = (this.atmo._t0 * 9.0 / 5.0) + 32.0;

        // Convert hPa to inHg
        const pt = this.atmo._p0 / 33.863881565591;

        if (pt === 0.0) {
            this.stabilityCoefficient = 0.0;
            throw new Error("Division by zero in ftp calculation.");
        }

        const ftp = ((ft + 460.0) / (59.0 + 460.0)) * (29.92 / pt);

        this.stabilityCoefficient = sd * fv * ftp;
    }

    /**
     * @brief Computes scaled drag force coefficient (Cd) at given Mach number
     *
     * Uses cubic spline interpolation and scales by BC.
     * Formula: Scaled_Cd = Cd(Mach) * 2.08551e-04 / BC
     *
     * @param mach Mach number
     * @return Drag coefficient scaled by BC
     */
    dragByMach(mach: number): number {
        const cd = calculateByCurveAndMachList(this.machList, this.curve, mach);
        return cd * 2.08551e-04 / this.bc;
    }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * @brief Calculates angular correction for shot adjustment
 *
 * Computes angle (radians) to correct shot based on linear offset.
 * Formula: arctan(offset/distance)
 *
 * @param distance Distance to target
 * @param offset Linear offset (drop or windage)
 * @return Correction angle in radians
 */
const getCorrection = (distance: number, offset: number): number => {
    if (distance === 0.0) {
        console.error("Division by zero in getCorrection.");
        return 0.0;
    }
    return Math.atan2(offset, distance);
};

/**
 * @brief Calculates kinetic energy of projectile
 *
 * Formula: Energy(ft-lbs) = Weight(grains) * Velocity(fps)^2 / 450400
 *
 * @param bulletWeight Bullet weight in grains
 * @param velocity Velocity in fps
 * @return Kinetic energy in ft-lbs
 */
const calculateEnergy = (bulletWeight: number, velocity: number): number => {
    return bulletWeight * velocity * velocity / 450400.0;
};

/**
 * @brief Calculates Optimum Game Weight (OGW) factor
 *
 * Combines kinetic energy and momentum into single metric.
 * Formula: OGW = Weight^2 * Velocity^3 * 1.5e-12
 *
 * @param bulletWeight Bullet weight in grains
 * @param velocity Velocity in fps
 * @return OGW factor
 */
const calculateOgw = (bulletWeight: number, velocity: number): number => {
    return bulletWeight * bulletWeight * velocity * velocity * velocity * 1.5e-12;
};

// ============================================================================
// Exports
// ============================================================================

export {
    Termination,
    TerminationReason,
    TrajFlag,
    Config,
    createConfig,
    Wind,
    WindSock,
    Coriolis,
    Atmosphere,
    ShotProps,
    getCorrection,
    calculateEnergy,
    calculateOgw,
    type CurvePoint,
    type Curve,
    type MachList
};