// Classes to define zeroing or current environment conditions

import calcSettings from './settings';
import {
    Unit, unitTypeCoerce, UNew,
    Distance, Pressure, Temperature, Velocity, Angular
} from './unit';

// Constants for standard atmospheric conditions
export const cIcaoStandardTemperatureR = 518.67;
export const cIcaoFreezingPointTemperatureR = 459.67;
export const cTemperatureGradient = -3.56616e-03;
export const cIcaoStandardHumidity = 0.0;
export const cPressureExponent = -5.255876;
export const cSpeedOfSound = 49.0223;
export const cA0 = 1.24871;
export const cA1 = 0.0988438;
export const cA2 = 0.00152907;
export const cA3 = -3.07031e-06;
export const cA4 = 4.21329e-07;
export const cA5 = 3.342e-04;
export const cStandardTemperature = 59.0;
export const cStandardPressure = 29.92;
export const cStandardDensity = 0.076474;

// Temperature difference between ICAO standard temperature and freezing point
const cIcaoTemperatureDeltaR = cIcaoStandardTemperatureR - cIcaoFreezingPointTemperatureR;


class Atmo {
    /**
     * Stores atmosphere data for the trajectory calculation.
     * @param {number | Distance} altitude - Altitude above sea level.
     * @param {number | Pressure} pressure - Atmospheric pressure.
     * @param {number | Temperature} temperature - Temperature in Fahrenheit.
     * @param {number} humidity - Relative humidity (default: 0.78).
     */

    readonly altitude: Distance
    readonly pressure: Pressure
    readonly temperature: Temperature
    readonly humidity: number

    protected _mach1: number
    protected _a0: number
    protected _t0: number
    protected _p0: number
    protected _ta: number
    // @ts-ignore
    protected density: number
    // @ts-ignore
    public mach: Velocity

    constructor(
        altitude: (number | Distance) = UNew.Foot(0),
        pressure: (number | Pressure) = UNew.InHg(cStandardPressure),
        temperature: (number | Temperature) = UNew.Fahrenheit(cStandardTemperature),
        humidity = 0.78
    ) {
        // Coerce input values to appropriate units
        this.altitude = unitTypeCoerce(altitude, Distance, calcSettings.Units.distance);
        this.pressure = unitTypeCoerce(pressure, Pressure, calcSettings.Units.pressure);
        this.temperature = unitTypeCoerce(temperature, Temperature, calcSettings.Units.temperature);

        // Ensure humidity is within the valid range [0, 1]
        this.humidity = humidity > 1 ? humidity / 100 : humidity;
        if (!(0 <= this.humidity && this.humidity <= 1)) {
            this.humidity = 0.78;
        }

        // Constants and initializations
        this._mach1 = cSpeedOfSound;
        this._a0 = this.altitude.In(Unit.Foot);
        this._t0 = this.temperature.In(Unit.Fahrenheit);
        this._p0 = this.pressure.In(Unit.InHg);
        this._ta = this._a0 * cTemperatureGradient + cIcaoTemperatureDeltaR;

        // Perform initial calculations
        this.calculate();
    }

    /**
     * Creates Atmosphere with ICAO standard values.
     * @param {number | Distance} altitude - Altitude above sea level (default: 0 foot).
     * @returns {Atmo} - Atmo instance with ICAO standard values.
     */
    static icao(altitude: (number|Distance) = UNew.Foot(0)): Atmo {
        // Coerce altitude to appropriate units
        const _altitude = unitTypeCoerce(altitude, Distance, calcSettings.Units.distance);

        // Calculate temperature based on ICAO standard values
        const temperature = UNew.Fahrenheit(
            cIcaoStandardTemperatureR + (_altitude.In(Unit.Foot))
            * cTemperatureGradient - cIcaoFreezingPointTemperatureR
        );

        // Calculate pressure based on ICAO standard values
        const pressure = UNew.InHg(
            cStandardPressure * Math.pow(cIcaoStandardTemperatureR / (
                (temperature.In(Unit.Fahrenheit) + cIcaoFreezingPointTemperatureR)),
                cPressureExponent
            )
        );

        // Create and return Atmo instance with ICAO values
        return new Atmo(
            altitude,
            pressure,
            temperature,
            cIcaoStandardHumidity
        );
    }

    /**
     * Prepares the data for trajectory calculation.
     * Calculates density and Mach number using the current atmosphere conditions.
     */
    calculate(): void {
        const {density, mach} = this.calculate0(this._t0, this._p0);

        // Update instance properties with calculated values
        this.density = density;
        this._mach1 = mach;
        this.mach = UNew.FPS(this._mach1);
    }

    /**
     * Calculates density and Mach number with specified atmosphere conditions.
     * @param {number} t - Temperature in Fahrenheit.
     * @param {number} p - Atmospheric pressure in InHg.
     * @returns {{density: number, mach: number}} - Calculated density and Mach number.
     */
    calculate0(t: number, p: number): { density: number, mach: number } {
        let hc = 0;

        // Calculate humidity correction factor
        if (t > 0) {
            let et0 = cA0 + t * (cA1 + t * (cA2 + t * (cA3 + t * cA4)));
            let et = cA5 * this.humidity * et0;
            hc = (p - 0.3783 * et) / cStandardPressure;
        }

        // Calculate density and Mach number
        let density = cStandardDensity * (
            cIcaoStandardTemperatureR / (t + cIcaoFreezingPointTemperatureR)
        ) * hc;
        let mach = Math.sqrt(t + cIcaoFreezingPointTemperatureR) * cSpeedOfSound;

        // Return calculated values
        return {density, mach};
    }

    /**
     * Calculates and returns the projectile density factor.
     * @return {number} - Projectile density factor.
     */
    densityFactor(): number {
        return this.density / cStandardDensity;
    }

    /**
     * Calculates density factor and Mach number for the specified altitude.
     * @param {number} altitude - Altitude above sea level.
     * @return {{density: number, mach: number}} - Density factor and Mach number for the specified altitude.
     */
    getDensityFactorAndMachForAltitude(altitude: number): [density: number, mach: number] {
        if (Math.abs(this._a0 - altitude) < 30) {
            // Use pre-calculated values for nearby altitudes
            return [this.density / cStandardDensity, this._mach1];
        }

        // Calculate new atmosphere conditions for the specified altitude
        const tb: number = altitude * cTemperatureGradient + cIcaoTemperatureDeltaR;
        const t: number = this._t0 + this._ta - tb;
        const p: number = this._p0 * Math.pow(this._t0 / t, cPressureExponent);
        const {density, mach} = this.calculate0(t, p);

        // Return calculated values
        return [density / cStandardDensity, mach];
    }
}


class Wind {
    /**
     * Stores wind data at the desired distance.
     * @param {number | Velocity | Object} velocity - Wind velocity.
     * @param {number | Angular | Object} directionFrom - Wind direction in relation to the shooter.
     * @param {number | Distance | Object} untilDistance - Distance up to which the wind data is applicable.
     */

    readonly velocity: Velocity
    readonly directionFrom: Angular
    readonly untilDistance: Distance

    constructor(
        velocity: (number | Velocity) = UNew.MPS(0),
        directionFrom: (number | Angular) = UNew.MIL(0),
        untilDistance: (number | Distance) = UNew.Meter(9999)
    ) {
        // Coerce input values to appropriate units
        this.velocity = unitTypeCoerce(velocity, Velocity, calcSettings.Units.velocity);
        this.directionFrom = unitTypeCoerce(directionFrom, Angular, calcSettings.Units.angular);
        this.untilDistance = unitTypeCoerce(untilDistance, Distance, calcSettings.Units.distance);
    }

}


class Shot {
    /**
     * Stores shot parameters for the trajectory calculation.
     * @param {number | Distance | Object} maxRange - Downrange distance to stop computing trajectory.
     * @param {number | Angular | Object} zeroAngle - The angle between the barrel and horizontal when zeroed.
     * @param {number | Angular | Object} relativeAngle - Elevation adjustment added to zero_angle for a particular shot.
     * @param {number | Angular | Object} cantAngle - Rotation of the gun around the barrel axis, relative to position when zeroed.
     *                                       (Only relevant when Weapon.sight_height !== 0)
     * @param {Atmo} atmo - Atmosphere conditions for the shot (default: ICAO standard atmosphere).
     * @param {Wind[]} winds - Array of wind conditions affecting the shot (default: no wind).
     */

    maxRange: Distance
    zeroAngle: Angular
    relativeAngle: Angular
    cantAngle: Angular
    atmo: Atmo
    winds: Wind[]

    constructor(
        maxRange: (number | Distance) = UNew.Yard(1000),
        zeroAngle: (number | Angular) = UNew.Degree(0),
        relativeAngle: (number | Angular) = UNew.Degree(0),
        cantAngle: (number | Angular) = UNew.Degree(0),
        atmo: Atmo = Atmo.icao(),
        winds: Wind[] = [new Wind()]
    ) {
        // Coerce input values to appropriate units
        this.maxRange = unitTypeCoerce(maxRange, Distance, calcSettings.Units.distance);
        this.zeroAngle = unitTypeCoerce(zeroAngle, Angular, calcSettings.Units.angular);
        this.relativeAngle = unitTypeCoerce(relativeAngle, Angular, calcSettings.Units.angular);
        this.cantAngle = unitTypeCoerce(cantAngle, Angular, calcSettings.Units.angular);

        // Set atmosphere and wind conditions
        this.atmo = atmo;
        this.winds = winds;
    }

    // Other methods and properties can be added here
}


export {Atmo, Wind, Shot};
