// Classes to define zeroing or current environment conditions

import { _Atmosphere, _Coriolis, _Wind } from "./_wasm";
import {
    cLapseRateImperial,
    cStandardTemperatureF,
    cStandardDensity,
    cPressureExponent,
    cStandardHumidity,
    cDegreesFtoR,
    cSpeedOfSoundImperial,
    cDegreesCtoK,
    cMaxWindDistanceFeet,
    cLowestTempF,
    cStandardDensityMetric,
    cStandardPressureMetric,
    cLapseRateMetric,
    cStandardTemperatureC,
} from "./constants";
import {
    unitTypeCoerce,
    UNew,
    Distance,
    Pressure,
    Temperature,
    Velocity,
    Angular,
    preferredUnits,
} from "./unit";

export { Atmo, Vacuum, Wind, Coriolis };


class Atmo {
    protected _altitude: Distance;
    protected _pressure: Pressure;
    protected _temperature: Temperature;
    protected _powderTemp: Temperature;
    protected _humidity: number;

    protected _densityRatio: number;
    // readonly mach: Velocity

    public _mach: number;
    public _a0: number;
    public _t0: number;
    public _p0: number;
    public static cLowestTempC: number = UNew.Fahrenheit(cLowestTempF).In(Temperature.Celsius);

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
    constructor({
        altitude = undefined,
        pressure = undefined,
        temperature = undefined,
        humidity = 0.0,
        powderTemperature = undefined,
    }: {
        altitude?: number | Distance;
        pressure?: number | Pressure;
        temperature?: number | Temperature;
        humidity?: number;
        powderTemperature?: number | Temperature;
    } = {}) {
        this._initializing = true;
        this._altitude = unitTypeCoerce(altitude ?? 0, Distance, preferredUnits.distance);
        this._pressure = unitTypeCoerce(
            pressure ?? Atmo.standardPressure(this.altitude),
            Pressure,
            preferredUnits.pressure
        );
        this._temperature = unitTypeCoerce(
            temperature ?? Atmo.standardTemperature(this.altitude),
            Temperature,
            preferredUnits.temperature
        );
        // If powder_temperature not provided we use atmospheric temperature:

        this._powderTemp = unitTypeCoerce(
            powderTemperature ?? this.temperature,
            Temperature,
            preferredUnits.temperature
        );
        this._t0 = this.temperature.In(Temperature.Celsius);
        this._p0 = this.pressure.In(Pressure.hPa);
        this._a0 = this.altitude.foot;
        this._mach = Atmo.machF(this._temperature.In(Temperature.Fahrenheit));
        this.humidity = humidity;
        this._initializing = false;
        this.updateDensityRatio();
    }

    get altitude(): Distance {
        return this._altitude;
    }

    get pressure(): Pressure {
        return this._pressure;
    }

    get temperature(): Temperature {
        return this._temperature;
    }

    get humidity(): number {
        return this._humidity;
    }

    get powderTemp(): Temperature {
        return this._powderTemp;
    }

    get mach(): Velocity {
        return UNew.FPS(this._mach);
    }

    get densityRatio(): number {
        return this._densityRatio;
    }

    set humidity(value: number) {
        if (value < 0 || value > 100) {
            throw new Error("Humidity must be between 0% and 100%.");
        }
        if (value > 1) {
            value = value / 100.0;
        }
        this._humidity = value;
        if (!this._initializing) {
            this.updateDensityRatio();
        }
    }

    updateDensityRatio() {
        this._densityRatio =
            Atmo.calculateAirDensity(this._t0, this._p0, this.humidity) / cStandardDensityMetric;
    }

    get densityMetric(): number {
        return this._densityRatio * cStandardDensityMetric;
    }

    get densityImperial(): number {
        return this._densityRatio * cStandardDensity;
    }

    static standardTemperature(altitude: Distance): Temperature {
        return UNew.Fahrenheit(
            cStandardTemperatureF + altitude.foot * cLapseRateImperial
        );
    }

    static standardPressure(altitude: Distance): Pressure {
        return UNew.hPa(
            cStandardPressureMetric *
            Math.pow(
                1 +
                (cLapseRateMetric * altitude.In(Distance.Meter)) /
                (cStandardTemperatureC + cDegreesCtoK),
                cPressureExponent
            )
        );
    }

    static icao({
        // Destructure directly in the parameter list
        altitude = 0, // Default altitude to 0 if not provided in the options object
        temperature = undefined, // No default here; handle undefined explicitly in the body
        humidity = cStandardHumidity, // Default humidity to cStandardHumidity if not provided
    }: {
        // Type of the destructured options object
        altitude?: number | Distance;
        temperature?: number | Temperature;
        humidity?: number;
    } = {}) {
        const _altitude = unitTypeCoerce(altitude, Distance, preferredUnits.distance);
        if (temperature === undefined) {
            temperature = Atmo.standardTemperature(_altitude);
        }
        const pressure = Atmo.standardPressure(_altitude);
        return new Atmo({ altitude, pressure, temperature, humidity });
    }

    static standard = Atmo.icao;

    static machF(fahrenheit: number): number {
        if (fahrenheit < -cDegreesFtoR) {
            console.warn(`Invalid temperature: ${fahrenheit}°F. Adjusted to (${cLowestTempF}°F).`);
            fahrenheit = cLowestTempF;  // ← ДОДАНО: коригування
        }
        return Math.sqrt(fahrenheit + cDegreesFtoR) * cSpeedOfSoundImperial;
    }

    static calculateAirDensity(t: number, p_hpa: number, humidity: number): number {
        const R = 8.314472;  // J/(mol·K), universal gas constant
        const M_a = 28.96546e-3;  // kg/mol, molar mass of dry air
        const M_v = 18.01528e-3;  // kg/mol, molar mass of water vapor

        const saturationVaporPressure = (T: number): number => {
            const A = [1.2378847e-5, -1.9121316e-2, 33.93711047, -6.3431645e3];
            return Math.exp(A[0] * T ** 2 + A[1] * T + A[2] + A[3] / T);
        };

        const enchancementFactor = (p: number, T: number): number => {
            const alpha = 1.00062;
            const beta = 3.14e-8;
            const gamma = 5.6e-7;
            return alpha + beta * p + gamma * T ** 2;
        };

        const compressibilityFactor = (p: number, T: number, x_v: number): number => {
            const a0 = 1.58123e-6;
            const a1 = -2.9331e-8;
            const a2 = 1.1043e-10;
            const b0 = 5.707e-6;
            const b1 = -2.051e-8;
            const c0 = 1.9898e-4;
            const c1 = -2.376e-6;
            const d = 1.83e-11;
            const e = -0.765e-8;

            const t_l = T - cDegreesCtoK;
            const Z =
                1 -
                (p / T) *
                (a0 + a1 * t_l + a2 * t_l ** 2 + (b0 + b1 * t_l) * x_v + (c0 + c1 * t_l) * x_v ** 2) +
                (p / T) ** 2 * (d + e * x_v ** 2);
            return Z;
        };

        // Normalize humidity to fraction [0..1]
        let rh_frac = humidity > 1.0 ? humidity / 100.0 : humidity;
        rh_frac = Math.max(0.0, Math.min(1.0, rh_frac));

        // Convert inputs for CIPM equations
        const T_K = t + cDegreesCtoK;
        const p = p_hpa * 100.0;  // hPa -> Pa

        // Calculation of saturated vapor pressure and enhancement factor
        const p_sv = saturationVaporPressure(T_K);  // Pa (saturated vapor pressure)
        const f = enchancementFactor(p, t);  // Enhancement factor (p in Pa, t in °C)

        // Partial pressure of water vapor and mole fraction
        const p_v = rh_frac * f * p_sv;
        const x_v = p_v / p;

        // Calculation of compressibility factor
        const Z = compressibilityFactor(p, T_K, x_v);
        return ((p * M_a) / (Z * R * T_K)) * (1 - x_v * (1 - M_v / M_a));
    }

    toWasmAtmo(): _Atmosphere {
        return {
            t0: this._t0,
            a0: this._a0,
            p0: this._p0,
            mach: this._mach,
            density_ratio: this.densityRatio,
            cLowestTempC: Atmo.cLowestTempC
        }
    }
}

class Vacuum extends Atmo {
    public static cLowestTempC: number = cDegreesCtoK;

    /**
     * Represents atmospheric conditions and performs density calculations.
     *
     * @param {Object} [options] - The options for initializing the atmospheric conditions.
     * @param {number | Distance} [options.altitude=undefined] - Altitude above sea level, or a distance object.
     * @param {number | Pressure} [options.pressure=undefined] - Atmospheric pressure, or a pressure object.
     * @param {number | Temperature} [options.temperature=undefined] - Temperature in Fahrenheit, or a temperature object.
     * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
     */
    constructor({
        altitude = undefined,
        temperature = undefined,
    }: {
        altitude?: number | Distance;
        temperature?: number | Temperature;
    } = {}) {
        super({ altitude, pressure: 0, temperature, humidity: 0 });
        this._pressure = unitTypeCoerce(0, Pressure, preferredUnits.pressure);
        this._densityRatio = 0;
    }

    updateDensityRatio() { }
}

class Wind {
    readonly velocity: Velocity;
    readonly directionFrom: Angular;
    readonly untilDistance: Distance;
    public static MAX_DISTANCE_FEET: number = cMaxWindDistanceFeet;

    /**
     * Stores wind data at the desired distance.
     *
     * @param {Object} [options] - The options for initializing wind data.
     * @param {number | Velocity} [options.velocity=undefined] - Wind velocity. Can be a number, a `Velocity` object, or `undefined`.
     * @param {number | Angular} [options.directionFrom=undefined] - Wind direction in relation to the shooter. Can be a number, an `Angular` object, or `undefined`.
     * @param {number | Distance} [options.untilDistance=undefined] - Distance up to which the wind data is applicable. Can be a number, a `Distance` object, or `undefined`.
     * @param {number} [options.maxDistanceFeet=cMaxWindDistanceFeet] - Maximum distance in feet up to which the wind data is applicable. Defaults to `1e8`.
     */
    constructor({
        velocity = undefined,
        directionFrom = undefined,
        untilDistance = undefined,
        maxDistanceFeet = cMaxWindDistanceFeet,
    }: {
        velocity?: number | Velocity;
        directionFrom?: number | Angular;
        untilDistance?: number | Distance;
        maxDistanceFeet?: number;
    } = {}) {
        // Coerce input values to appropriate units
        Wind.MAX_DISTANCE_FEET = maxDistanceFeet ?? cMaxWindDistanceFeet;
        this.velocity = unitTypeCoerce(velocity ?? 0, Velocity, preferredUnits.velocity);
        this.directionFrom = unitTypeCoerce(directionFrom ?? 0, Angular, preferredUnits.angular);
        this.untilDistance = unitTypeCoerce(
            untilDistance ?? UNew.Foot(Wind.MAX_DISTANCE_FEET),
            Distance,
            preferredUnits.distance
        );
    }

    toWasmWind(): _Wind {
        return {
            velocity_fps: this.velocity.fps,
            direction_from_rad: this.directionFrom.rad,
            until_distance_ft: this.untilDistance.foot,
            MAX_DISTANCE_FEET: Wind.MAX_DISTANCE_FEET,
        }
    }
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
class Coriolis {
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
    constructor({
        latitudeDeg,
        azimuthDeg,
        muzzleVelocityFps
    }: {
        latitudeDeg?: number,
        azimuthDeg?: number,
        muzzleVelocityFps: number
    }) {
        // No Coriolis - fill with zeros
        if (latitudeDeg === undefined) {
            this.sin_lat = 0.0;
            this.cos_lat = 0.0;
            this.sin_az = 0.0;
            this.cos_az = 0.0;
            this.range_east = 0.0;
            this.range_north = 0.0;
            this.cross_east = 0.0;
            this.cross_north = 0.0;
            this.flat_fire_only = false;
            this.muzzle_velocity_fps = muzzleVelocityFps;
            return;
        }

        const lat_rad = latitudeDeg * Math.PI / 180;
        const sin_lat = Math.sin(lat_rad);
        const cos_lat = Math.cos(lat_rad);

        // Flat-fire approximation (no azimuth)
        if (azimuthDeg === undefined) {
            this.sin_lat = sin_lat;
            this.cos_lat = cos_lat;
            this.muzzle_velocity_fps = muzzleVelocityFps;
            this.sin_az = 0.0;
            this.cos_az = 0.0;
            this.range_east = 0.0;
            this.range_north = 0.0;
            this.cross_east = 0.0;
            this.cross_north = 0.0;
            this.flat_fire_only = true;
            return;
        }

        // Full 3D Coriolis
        const azimuth_rad = azimuthDeg * Math.PI / 180;
        const azimuth_sin = Math.sin(azimuth_rad);
        const azimuth_cos = Math.cos(azimuth_rad);

        this.sin_lat = sin_lat;
        this.cos_lat = cos_lat;
        this.muzzle_velocity_fps = muzzleVelocityFps;
        this.sin_az = azimuth_sin;
        this.cos_az = azimuth_cos;
        this.range_east = azimuth_sin;
        this.range_north = azimuth_cos;
        this.cross_east = azimuth_cos;
        this.cross_north = -azimuth_sin;
        this.flat_fire_only = false;
    }

    /**
     * Converts to WASM-compatible Coriolis format.
     *
     * @returns Object with all Coriolis parameters, using 0.0 for undefined values
     */
    toWasmCoriolis(): _Coriolis {
        return {
            sin_lat: this.sin_lat,
            cos_lat: this.cos_lat,
            sin_az: this.sin_az ?? 0.0,
            cos_az: this.cos_az ?? 0.0,
            range_east: this.range_east ?? 0.0,
            range_north: this.range_north ?? 0.0,
            cross_east: this.cross_east ?? 0.0,
            cross_north: this.cross_north ?? 0.0,
            flat_fire_only: this.flat_fire_only,
            muzzle_velocity_fps: this.muzzle_velocity_fps,
        };
    }
}
