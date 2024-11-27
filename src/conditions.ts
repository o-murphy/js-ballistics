// Classes to define zeroing or current environment conditions

import { Ammo, Weapon } from './munition';
import {
    Unit, unitTypeCoerce, UNew,
    Distance, Pressure, Temperature, Velocity, Angular,
    preferredUnits
} from './unit';

// Constants for standard atmospheric conditions
export const cStandardHumidity: number = 0.0  // Relative Humidity
export const cPressureExponent: number = 5.255876  // =g*M/R*L
export const cA0: number = 1.24871
export const cA1: number = 0.0988438;
export const cA2: number = 0.00152907;
export const cA3: number = -3.07031e-06;
export const cA4: number = 4.21329e-07;
export const cA5: number = 3.342e-04;

// ISA, metric prefer_units: (https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html)
export const cDegreesCtoK: number = 273.15;  // °K = °C + 273.15
export const cStandardTemperatureC: number = 15.0;  // °C
export const cLapseRateMetric: number = -6.5e-03;  // Lapse Rate, °C/m
export const cStandardPressureMetric: number = 1013.25;  // hPa
export const cSpeedOfSoundMetric: number = 331.3;  // Mach1 in m/s = cSpeedOfSound * sqrt(°K)
export const cStandardDensityMetric: number = 1.2250;  // kg/m^3
export const cDensityImperialToMetric: number = 16.0185;  // lb/ft^3 to kg/m^3

// ICAO standard atmosphere:
export const cDegreesFtoR: number = 459.67  // °R = °F + 459.67
export const cStandardTemperatureF: number = 59.0  // °F
export const cLapseRateImperial: number = -3.56616e-03  // Lapse rate, °F/ft
export const cStandardPressure: number = 29.92  // InHg
export const cSpeedOfSoundImperial: number = 49.0223  // Mach1 in fps = cSpeedOfSound * sqrt(°R)
export const cStandardDensity: number = 0.076474  // lb/ft^3



class Atmo {

    readonly altitude: Distance
    readonly pressure: Pressure
    readonly temperature: Temperature
    readonly humidity: number

    readonly densityRatio: number
    readonly mach: Velocity

    protected _mach1: number
    protected _a0: number
    protected _t0: number
    protected _p0: number
    protected _ta: number

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
        pressure = null,
        temperature = null,
        humidity = 0.0
    }: {
        altitude?: (number | Distance | null);
        pressure?: (number | Pressure | null);
        temperature?: (number | Temperature | null);
        humidity?: number
    }
    ) {
        // Ensure humidity is within the valid range [0, 1]
        this.humidity = humidity || 0.0;
        if (humidity > 1.0) {
            this.humidity = humidity / 100.0;
        }
        if (!(0.0 <= this.humidity && this.humidity <= 1.0)) {
            this.humidity = 0.0;
        }

        // Coerce input values to appropriate units
        this.altitude = unitTypeCoerce(altitude ?? 0, Distance, preferredUnits.distance);
        this.pressure = unitTypeCoerce(pressure ?? Atmo.standardPressure(this.altitude), Pressure, preferredUnits.pressure);
        this.temperature = unitTypeCoerce(temperature ?? Atmo.standardTemperature(this.altitude), Temperature, preferredUnits.temperature);

        // Constants and initializations
        this._t0 = this.temperature.In(Unit.Fahrenheit);
        this._p0 = this.pressure.In(Unit.InHg);
        this._a0 = this.altitude.In(Unit.Foot);
        this._ta = this._a0 * cLapseRateImperial + cStandardTemperatureF;
        this.densityRatio = this.calculateDensity({
            t: this._t0,
            p: this._p0
        }) / cStandardDensity
        this._mach1 = Atmo.machF(this._t0);
        this.mach = UNew.FPS(this._mach1)
    }

    /**
    * Calculates the ICAO standard temperature at a given altitude.
    * 
    * The standard temperature decreases with altitude at a fixed rate (lapse rate).
    * 
    * @param {Distance} altitude - The altitude above sea level.
    * @returns {Temperature} - The standard temperature at the given altitude in Fahrenheit.
    */
    static standardTemperature(altitude: Distance): Temperature {
        return UNew.Fahrenheit(cStandardTemperatureF + (altitude.In(Distance.Foot)) * cLapseRateImperial)
    }

    /**
    * Calculates the ICAO standard pressure at a given altitude.
    * 
    * The pressure decreases with altitude according to a fixed mathematical model.
    * 
    * @param {Distance} altitude - The altitude above sea level.
    * @returns {Pressure} - The standard atmospheric pressure at the given altitude in inches of mercury (InHg).
    */
    static standardPressure(altitude: Distance): Pressure {
        // ICAO standard pressure for altitude
        return UNew.InHg(0.02953 * Math.pow(3.73145 - 2.56555e-05 * altitude.In(Distance.Foot), cPressureExponent))
    }

    /**
    * Creates a standard ICAO atmosphere based on the given altitude and temperature.
    * 
    * If the temperature is not provided, the standard ICAO temperature for the given altitude is used.
    * 
    * @param {Object} options - Configuration options for the atmosphere.
    * @param {number | Distance | null} [options.altitude=null] - The altitude above sea level. If not provided, defaults to null.
    * @param {number | Temperature | null} [options.temperature=null] - The temperature in Fahrenheit. If not provided, defaults to the standard temperature for the given altitude.
    * @returns {Atmo} - An instance of the `Atmo` class representing the atmospheric conditions.
    */
    static standard({
        altitude = null,
        temperature = null
    }: {
        altitude?: (number | Distance | null);
        temperature?: (number | Temperature | null)
    }): Atmo {
        return Atmo.icao({ altitude: altitude, temperature: temperature })
    }

    /**
    * Creates an ICAO standard atmosphere based on the given altitude and temperature.
    * 
    * If the temperature is not specified, the standard ICAO temperature for the altitude is used.
    * The method also calculates the standard pressure for the given altitude.
    * 
    * @param {Object} options - Configuration options for the atmosphere.
    * @param {number | Distance | null} [options.altitude=null] - The altitude above sea level. If not provided, defaults to 0.
    * @param {number | Temperature | null} [options.temperature=null] - The temperature in Fahrenheit. If not provided, the standard temperature for the altitude is used.
    * @returns {Atmo} - An instance of the `Atmo` class representing the ICAO atmosphere with the given conditions.
    */
    static icao({
        altitude = null,
        temperature = null
    }: {
        altitude?: (number | Distance | null);
        temperature?: (number | Temperature | null)
    }): Atmo {
        const _altitude: Distance = unitTypeCoerce(altitude ?? 0, Distance, preferredUnits.distance)
        const _temperature: Temperature = unitTypeCoerce(temperature ?? Atmo.standardTemperature(_altitude), Temperature, preferredUnits.temperature)
        const _pressure: Pressure = Atmo.standardPressure(_altitude)
        return new Atmo({
            altitude: _altitude.In(preferredUnits.distance),
            pressure: _pressure.In(preferredUnits.pressure),
            temperature: _temperature.In(preferredUnits.temperature),
            humidity: cStandardHumidity
        }
        )
    }

    /**
    * Calculates the speed of sound (Mach 1) in feet per second (fps) at a given temperature in Fahrenheit.
    * 
    * @param {number} fahrenheit - The temperature in Fahrenheit.
    * @returns {number} - The speed of sound (Mach 1) in fps at the given temperature.
    */
    static machF(fahrenheit: number): number {
        return Math.sqrt(fahrenheit + cDegreesFtoR) * cSpeedOfSoundImperial
    }

    /**
    * Calculates the speed of sound (Mach 1) in meters per second (m/s) at a given temperature in Celsius.
    * 
    * @param {number} celsius - The temperature in Celsius.
    * @returns {number} - The speed of sound (Mach 1) in m/s at the given temperature.
    */
    static machC(celsius: number): number {
        return Math.sqrt(1 + celsius / cDegreesCtoK) * cSpeedOfSoundMetric
    }

    /**
    * Calculates the density of air based on temperature, pressure, and humidity.
    * 
    * The calculation uses the formula for humid air, considering the partial pressures of dry air and water vapor.
    * 
    * @param {Object} options - Parameters for air density calculation.
    * @param {Temperature} options.temperature - The air temperature.
    * @param {Pressure} options.pressure - The atmospheric pressure.
    * @param {number} options.humidity - The relative humidity as a decimal (where 1.0 is 100%).
    * @returns {number} - The air density in Imperial units (lb/ft³).
    * 
    * @see https://en.wikipedia.org/wiki/Density_of_air#Humid_air
    */
    static airDensity({
        temperature,
        pressure: pressure,
        humidity
    }: {
        temperature: Temperature,
        pressure: Pressure,
        humidity: number
    }): number {
        // Density in Imperial units (lb/ft^3)
        const tC = temperature.In(Temperature.Celsius)
        const pM = pressure.In(Pressure.hPa) * 100
        const psat = 6.1078 * Math.pow(10, 17.27 * tC / (tC + 237.3))
        const pv = humidity * psat  // Pressure of water vapor in Pascals
        const pd = pM - pv  // Partial pressure of dry air in Pascals
        // Density in metric units kg/m^3
        const density = (pd * 0.0289652 + pv * 0.018016) / (8.31446 * (tC + cDegreesCtoK))
        return density / cDensityImperialToMetric
    }

    /**
    * Gets the air density in metric units (kg/m³).
    * 
    * The density is calculated based on the `densityRatio` and the standard air density at sea level in metric units.
    * 
    * @returns {number} - The air density in kilograms per cubic meter (kg/m³).
    */
    get densityMetric(): number {
        const cStandardDensityMetric = 1.225; // Standard air density at sea level (kg/m^3)
        return this.densityRatio * cStandardDensityMetric;
    }

    /**
    * Gets the air density in imperial units (lb/ft³).
    * 
    * The density is calculated based on the `densityRatio` and the standard air density at sea level in imperial units.
    * 
    * @returns {number} - The air density in pounds per cubic foot (lb/ft³).
    */
    get densityImperial(): number {
        const cStandardDensity = 0.0765; // Standard air density at sea level (lb/ft^3)
        return this.densityRatio * cStandardDensity;
    }

    /**
    * Calculates the interpolated temperature at a given altitude above sea level (ASL).
    * 
    * This method uses the standard lapse rate to adjust the temperature based on the altitude difference from the reference altitude.
    * 
    * @param {number} altitude - The altitude above sea level (in feet).
    * @returns {number} - The temperature at the given altitude in degrees Fahrenheit (°F).
    */
    temperatureAtAltitude(altitude: number): number {
        return (altitude - this._a0) * cLapseRateImperial + this._t0
    }

    /**
    * Calculates air density based on the given temperature and pressure, adjusting for the specified atmosphere conditions.
    * 
    * The calculation accounts for humidity's effect on air density and uses temperature in degrees Fahrenheit and pressure in inches of mercury.
    * 
    * @param {Object} options - The parameters for the density calculation.
    * @param {number} options.t - The temperature in degrees Fahrenheit (°F).
    * @param {number} options.p - The atmospheric pressure in inches of mercury (inHg).
    * @returns {number} - The air density in pounds per cubic foot (lb/ft³).
    */
    calculateDensity({ t, p }: { t: number, p: number }): number {
        let hc
        if (t > 0) {
            const et0 = cA0 + t * (cA1 + t * (cA2 + t * (cA3 + t * cA4)))
            const et = cA5 * this.humidity * et0
            hc = (p - 0.3783 * et) / cStandardPressure
        } else {
            hc = 1.0
        }
        return cStandardDensity * ((cStandardTemperatureF + cDegreesFtoR) / (t + cDegreesFtoR)) * hc
    }

    /**
    * Gets the air density factor and Mach number for a given altitude.
    * 
    * If the altitude is within 30 feet of the current altitude, the method returns the current density ratio and Mach number.
    * For other altitudes, it uses an exponential approximation for the air density ratio and calculates the Mach number based on the interpolated temperature at the given altitude.
    * 
    * @param {number} altitude - The altitude above sea level in feet.
    * @returns {[number, number]} - A tuple containing:
    *   - The air density ratio relative to the standard density.
    *   - The Mach number at the given altitude.
    */
    getDensityFactorAndMachForAltitude(altitude: number): [number, number] {
        if (Math.abs(this._a0 - altitude) < 30) {
            return [this.densityRatio, this._mach1];
        } else {
            // Exponential approximation for air density ratio
            const densityRatio = Math.exp(-altitude / 34112.0);
            const temperature = this.temperatureAtAltitude(altitude);
            const mach = Atmo.machF(temperature);
            return [densityRatio, mach];
        }
    }
}


class Wind {

    readonly velocity: Velocity
    readonly directionFrom: Angular
    readonly untilDistance: Distance
    public static MAX_DISTANCE_FEET: number = 1e8

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
        maxDistanceFeet = 1e8
    }: {
        velocity?: (number | Velocity | null);
        directionFrom?: (number | Angular | null);
        untilDistance?: (number | Distance | null);
        maxDistanceFeet?: (number | null)
    }) {
        // Coerce input values to appropriate units
        Wind.MAX_DISTANCE_FEET = maxDistanceFeet ?? 1e8
        this.velocity = unitTypeCoerce(velocity ?? 0, Velocity, preferredUnits.velocity);
        this.directionFrom = unitTypeCoerce(directionFrom ?? 0, Angular, preferredUnits.angular);
        this.untilDistance = unitTypeCoerce(untilDistance ?? UNew.Foot(Wind.MAX_DISTANCE_FEET), Distance, preferredUnits.distance);
    }
}

/**
 * Represents the parameters required for calculating a shot's trajectory.
 */
class Shot {

    weapon: Weapon;
    ammo: Ammo;
    lookAngle: Angular;
    relativeAngle: Angular;
    cantAngle: Angular;
    atmo: Atmo;
    winds: Wind[];

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
        this.winds = (winds ?? [new Wind({})])
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


export { Atmo, Wind, Shot };
