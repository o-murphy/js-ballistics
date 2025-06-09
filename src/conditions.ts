// Classes to define zeroing or current environment conditions

import {
    cLapseRateImperial, cStandardTemperatureF, cStandardDensity,
    cPressureExponent, cStandardHumidity, cDegreesFtoR, cSpeedOfSoundImperial, cDegreesCtoK,
    cMaxWindDistanceFeet,
    cLowestTempF,
    cStandardDensityMetric,
    cLapseRateKperFoot,
    cStandardPressureMetric,
    cLapseRateMetric,
    cStandardTemperatureC,
    cSpeedOfSoundMetric
} from './constants';
import { Ammo, Weapon } from './munition';
import {
    unitTypeCoerce, UNew,
    Distance, Pressure, Temperature, Velocity, Angular,
    preferredUnits
} from './unit';
import Vector from './vector';


class Atmo {

    protected _altitude: Distance
    protected _pressure: Pressure
    protected _temperature: Temperature
    protected _powderTemp: Temperature
    protected _humidity: number

    protected _densityRatio: number
    // readonly mach: Velocity

    protected _mach: number
    protected _a0: number
    protected _t0: number
    protected _p0: number
    public static cLowestTempC: number = UNew.Fahrenheit(cLowestTempF).In(Temperature.Celsius)

    protected _initializing: boolean

    /**
     * Represents atmospheric conditions and performs density calculations.
     * 
     * @param {Object} [options] - The options for initializing the atmospheric conditions.
     * @param {number | Distance | null} [options.altitude=null] - Altitude above sea level, or a distance object.
     * @param {number | Pressure | null} [options.pressure=null] - Atmospheric pressure, or a pressure object.
     * @param {number | Temperature | null} [options.temperature=null] - Temperature in Fahrenheit, or a temperature object.
     * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
     * @param {number | Temperature | null} [options.powderT=null] - Powder temperature (default: null).
     */
    constructor({
        altitude = null,
        pressure = null,
        temperature = null,
        humidity = 0.0,
        powderT = null,
    }: {
        altitude?: (number | Distance | null);
        pressure?: (number | Pressure | null);
        temperature?: (number | Temperature | null);
        humidity?: number;
        powderT?: (number | Temperature | null);
    }
    ) {
        this._initializing = true
        this._altitude = unitTypeCoerce(altitude ?? 0, Distance, preferredUnits.distance);
        this._pressure = unitTypeCoerce(pressure ?? Atmo.standardPressure(this.altitude), Pressure, preferredUnits.pressure);
        this._temperature = unitTypeCoerce(temperature ?? Atmo.standardTemperature(this.altitude), Temperature, preferredUnits.temperature);
        // If powder_temperature not provided we use atmospheric temperature:

        this._powderTemp = unitTypeCoerce(powderT ?? this.temperature, Temperature, preferredUnits.temperature)
        this._t0 = this.temperature.In(Temperature.Celsius)
        this._p0 = this.pressure.In(Pressure.hPa)
        this._a0 = this.altitude.In(Distance.Foot)
        this._mach = Atmo.machF(this._temperature.In(Temperature.Fahrenheit))
        this.humidity = humidity
        this._initializing = false
        this.updateDensityRatio()
    }

    get altitude(): Distance {
        return this._altitude
    }

    get pressure(): Pressure {
        return this._pressure
    }

    get temperature(): Temperature {
        return this._temperature
    }

    get humidity(): number {
        return this._humidity
    }

    get powderTemp(): Temperature {
        return this._powderTemp
    }

    get mach(): Velocity {
        return UNew.FPS(this._mach)
    }

    get densityRatio(): number {
        return this._densityRatio
    }

    set humidity(value: number) {
        if (value < 0 || value > 100) {
            throw new Error("Humidity must be between 0% and 100%.")
        }
        if (value > 1) {
            value = value / 100.0
        }
        this._humidity = value
        if (!this._initializing) {
            this.updateDensityRatio()
        }
    }

    updateDensityRatio() {
        this._densityRatio = Atmo.calculateAirDensity(this._t0, this._p0, this.humidity) / cStandardDensityMetric
    }

    get densityMetric(): number {
        return this._densityRatio * cStandardDensityMetric
    }

    get densityImperial(): number {
        return this._densityRatio * cStandardDensity
    }

    temperatureAtAltitude(altitude: number): number {
        let t = (altitude - this._a0) * cLapseRateKperFoot + this._t0
        if (t < Atmo.cLowestTempC) {
            t = Atmo.cLowestTempC
            console.warn(`Temperature interpolated from altitude fell below minimum temperature limit. 
                Model not accurate here.  Temperature bounded at cLowestTempF: ${cLowestTempF}°F.`)
        }
        return t
    }

    pressureAtAltitude(altitude: number): number {
        return this._p0 * Math.pow(
            1 + cLapseRateKperFoot * (altitude - this._a0) / (this._t0 + cDegreesCtoK),
            cPressureExponent
        )
    }

    getDensityFactorAndMachForAltitude(altitude: number): [number, number] {
        // Within 30 ft of initial altitude use initial values to save compute
        if (Math.abs(this._a0 - altitude) < 30) {
            return [this._densityRatio, this._mach]
        }
        if (altitude > 36089) {
            console.warn("Density request for altitude above troposphere. Atmospheric model not valid here.")
        }
        const t = this.temperatureAtAltitude(altitude) + cDegreesCtoK
        const mach = UNew.MPS(Atmo.machK(t)).In(Velocity.FPS)
        const p = this.pressureAtAltitude(altitude)
        const densityDelta = ((this._t0 + cDegreesCtoK) * p) / (this._p0 * t)
        const densityRatio = this._densityRatio * densityDelta
        return [densityRatio, mach]
    }

    static standardTemperature(altitude: Distance): Temperature {
        return UNew.Fahrenheit(cStandardTemperatureF + (altitude.In(Distance.Foot) * cLapseRateImperial))
    }

    static standardPressure(altitude: Distance): Pressure {
        return UNew.hPa(
            cStandardPressureMetric * Math.pow(
                1 + cLapseRateMetric * altitude.In(Distance.Meter) / (cStandardTemperatureC + cDegreesCtoK),
                cPressureExponent
            )
        )
    }

    static icao({
        altitude = 0,
        temperature = null,
        humidity = cStandardHumidity
    }: {
        altitude?: number | Distance,
        temperature?: number | Temperature | null,
        humidity?: number
    }
    ) {
        const _altitude = unitTypeCoerce(altitude, Distance, preferredUnits.distance)
        if (temperature === null || temperature === undefined) {
            temperature = Atmo.standardTemperature(_altitude)
        }
        const pressure = Atmo.standardPressure(_altitude)
        return new Atmo({ altitude, pressure, temperature, humidity })
    }

    static standard = Atmo.icao

    static machF(fahrenheit: number): number {
        if (fahrenheit < -cDegreesFtoR) {
            console.warn(`Invalid temperature: ${fahrenheit}°F. Adjusted to (${cLowestTempF}°F).`)
        }
        return Math.sqrt(fahrenheit + cDegreesFtoR) * cSpeedOfSoundImperial
    }

    static machC(celsius: number): number {
        if (celsius < -cDegreesCtoK) {
            const badTemp = celsius
            celsius = Atmo.cLowestTempC
            console.warn(`Invalid temperature: ${badTemp}°C. Adjusted to (${celsius}°C).`)
        }
        return Atmo.machK(celsius + cDegreesCtoK)
    }

    static machK(kelvin: number): number {
        return Math.sqrt(kelvin) * cSpeedOfSoundMetric
    }

    static calculateAirDensity(t: number, p: number, humidity: number): number {
        const R = 8.314472  // J/(mol·K), universal gas constant
        const M_a = 28.96546e-3  // kg/mol, molar mass of dry air
        const M_v = 18.01528e-3  // kg/mol, molar mass of water vapor

        const saturationVaporPressure = (T: number): number => {
            const A = [1.2378847e-5, -1.9121316e-2, 33.93711047, -6.3431645e3]
            return Math.exp(A[0] * T ** 2 + A[1] * T + A[2] + A[3] / T)
        }

        const enchancementFactor = (p: number, T: number): number => {
            const alpha = 1.00062
            const beta = 3.14e-8
            const gamma = 5.6e-7
            return alpha + beta * p + gamma * T ** 2
        }

        const compressibilityFactor = (p: number, T: number, x_v: number): number => {
            const a0 = 1.58123e-6
            const a1 = -2.9331e-8
            const a2 = 1.1043e-10
            const b0 = 5.707e-6
            const b1 = -2.051e-8
            const c0 = 1.9898e-4
            const c1 = -2.376e-6
            const d = 1.83e-11
            const e = -0.765e-8

            const t = T - cDegreesCtoK
            const Z = 1 - (p / T) * (a0 + a1 * t + a2 * t ** 2 + (b0 + b1 * t) * x_v + (c0 + c1 * t) * x_v ** 2) + (p / T) ** 2 * (d + e * x_v ** 2)
            return Z
        }

        // Temperature in Kelvin
        const T_K = t + cDegreesCtoK

        // Calculation of saturated vapor pressure and enhancement factor
        const p_sv = saturationVaporPressure(T_K)
        const f = enchancementFactor(p, t)

        // Calculation of partial pressure and mole fraction of water vapor
        const p_v = humidity / 100 * f * p_sv
        const x_v = p_v / p

        // Calculation of compressibility factor
        const Z = compressibilityFactor(p, T_K, x_v)

        const density = (p * M_a) / (Z * R * T_K) * (1 - x_v * (1 - M_v / M_a))
        return 100 * density
    }
}


class Vacuum extends Atmo {

    public static cLowestTempC: number = cDegreesCtoK

    /**
 * Represents atmospheric conditions and performs density calculations.
 * 
 * @param {Object} [options] - The options for initializing the atmospheric conditions.
 * @param {number | Distance | null} [options.altitude=null] - Altitude above sea level, or a distance object.
 * @param {number | Pressure | null} [options.pressure=null] - Atmospheric pressure, or a pressure object.
 * @param {number | Temperature | null} [options.temperature=null] - Temperature in Fahrenheit, or a temperature object.
 * @param {number} [options.humidity=0.0] - Relative humidity as a decimal (default: 0.0, where 1.0 is 100%).
 */
    constructor({
        altitude = null,
        temperature = null,
    }: {
        altitude?: (number | Distance | null);
        temperature?: (number | Temperature | null);
    }
    ) {
        super({ altitude, pressure: 0, temperature, humidity: 0 })
        this._pressure = unitTypeCoerce(0, Pressure, preferredUnits.pressure)
        this._densityRatio = 0
    }

    updateDensityRatio() {

    }
}


class Wind {

    readonly velocity: Velocity
    readonly directionFrom: Angular
    readonly untilDistance: Distance
    public static MAX_DISTANCE_FEET: number = cMaxWindDistanceFeet

    /**
     * Stores wind data at the desired distance.
     * 
     * @param {Object} [options] - The options for initializing wind data.
     * @param {number | Velocity | null} [options.velocity=null] - Wind velocity. Can be a number, a `Velocity` object, or `null`.
     * @param {number | Angular | null} [options.directionFrom=null] - Wind direction in relation to the shooter. Can be a number, an `Angular` object, or `null`.
     * @param {number | Distance | null} [options.untilDistance=null] - Distance up to which the wind data is applicable. Can be a number, a `Distance` object, or `null`.
     * @param {number} [options.maxDistanceFeet=1e8] - Maximum distance in feet up to which the wind data is applicable. Defaults to `1e8`.
     */
    constructor({
        velocity = null,
        directionFrom = null,
        untilDistance = null,
        maxDistanceFeet = cMaxWindDistanceFeet
    }: {
        velocity?: (number | Velocity | null);
        directionFrom?: (number | Angular | null);
        untilDistance?: (number | Distance | null);
        maxDistanceFeet?: (number | null)
    }) {
        // Coerce input values to appropriate units
        Wind.MAX_DISTANCE_FEET = maxDistanceFeet ?? cMaxWindDistanceFeet;
        this.velocity = unitTypeCoerce(velocity ?? 0, Velocity, preferredUnits.velocity);
        this.directionFrom = unitTypeCoerce(directionFrom ?? 0, Angular, preferredUnits.angular);
        this.untilDistance = unitTypeCoerce(untilDistance ?? UNew.Foot(Wind.MAX_DISTANCE_FEET), Distance, preferredUnits.distance);
    }

    get vector(): Vector {
        const windVelocityFps = this.velocity.In(Velocity.FPS)
        const windDirectionRad = this.directionFrom.In(Angular.Radian)
        const rangeComponent = windVelocityFps * Math.cos(windDirectionRad)
        const crossComponent = windVelocityFps * Math.sin(windDirectionRad)
        return new Vector(rangeComponent, 0, crossComponent)
    }
}

/**
 * Represents the parameters required for calculating a shot's trajectory.
 */
class Shot {

    lookAngle: Angular;
    relativeAngle: Angular;
    cantAngle: Angular;

    weapon: Weapon;
    ammo: Ammo;
    atmo: Atmo;
    protected _winds: Wind[];

    /**
     * Creates an instance of the Shot class.
     * 
     * @param {Object} options - The parameters for initializing the shot data.
     * @param {Weapon} options.weapon - The weapon used for the shot.
     * @param {Ammo} options.ammo - The ammunition used for the shot.
     * @param {number | Angular | null} [options.lookAngle=null] - The angle of the shot relative to the horizontal plane. Can be a number, an `Angular` object, or `null`.
     * @param {number | Angular | null} [options.relativeAngle=null] - The angle between the shot's trajectory and the intended target line. Can be a number, an `Angular` object, or `null`.
     * @param {number | Angular | null} [options.cantAngle=null] - The angle of cant or tilt of the weapon. Can be a number, an `Angular` object, or `null`.
     * @param {Atmo | null} [options.atmo=null] - The atmospheric conditions affecting the shot. Can be an `Atmo` object or `null`.
     * @param {Wind[] | null} [options.winds=null] - List of wind conditions affecting the shot. Can be an array of `Wind` objects or `null`.
     */
    constructor({
        weapon,
        ammo,
        lookAngle = null,
        relativeAngle = null,
        cantAngle = null,
        atmo = null,
        winds = null
    }: {
        weapon: Weapon;
        ammo: Ammo;
        lookAngle?: number | Angular | null;
        relativeAngle?: number | Angular | null;
        cantAngle?: number | Angular | null;
        atmo?: Atmo | null;
        winds?: Wind[] | null;
    }) {
        this.lookAngle = unitTypeCoerce(lookAngle ?? 0, Angular, preferredUnits.angular);
        this.relativeAngle = unitTypeCoerce(relativeAngle ?? 0, Angular, preferredUnits.angular);
        this.cantAngle = unitTypeCoerce(cantAngle ?? 0, Angular, preferredUnits.angular);
        this.weapon = weapon
        this.ammo = ammo;
        this.atmo = atmo ?? Atmo.icao({})
        this.winds = winds;
    }

    set winds(winds: Wind[] | null) { // Changed type to allow null
        this._winds = (winds === null || winds.length === 0) ? [new Wind({})] : winds;
    }

    get winds(): Wind[] {
        return (this._winds ?? [new Wind({})])
            .slice()  // Create a copy of the array
            .sort((a, b) => a.untilDistance.rawValue - b.untilDistance.rawValue);
    }

    /**
     * Gets the barrel elevation in the vertical plane from the horizontal.
     * 
     * The elevation is calculated by adding the look angle to the vertical component of
     * the barrel's elevation based on the cant angle and relative angle. The result is
     * converted to radians.
     * 
     * @returns {Angular} The barrel elevation in radians.
     */
    get barrelElevation(): Angular {
        return UNew.Radian(
            this.lookAngle.In(Angular.Radian) + Math.cos(this.cantAngle.In(Angular.Radian)) * (
                this.weapon.zeroElevation.In(Angular.Radian) + this.relativeAngle.In(Angular.Radian)
            )
        )
    }

    /**
     * Gets the horizontal angle of the barrel relative to the sight line.
     * 
     * The azimuth angle is calculated based on the cant angle and the relative angle of the
     * weapon. The result is converted to radians.
     * 
     * @returns {Angular} The barrel azimuth in radians.
     */
    get barrelAzimuth(): Angular {
        return UNew.Radian(
            Math.sin(this.cantAngle.In(Angular.Radian)) * (
                this.weapon.zeroElevation.In(Angular.Radian) + this.relativeAngle.In(Angular.Radian)
            )
        )
    }
}


export { Atmo, Vacuum, Wind, Shot };
