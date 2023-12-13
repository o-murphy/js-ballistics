// Classes to define zeroing or current environment conditions

import calcSettings from './settings';
import { Distance, Pressure, Temperature, Unit, Velocity, unitTypeCoerce, Angular } from './units.js';

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
    constructor(
        altitude = new Distance(0, Unit.Foot),
        pressure = new Pressure(cStandardPressure, Unit.InHg),
        temperature = new Temperature(cStandardTemperature, Unit.Fahrenheit),
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
        this._a0 = this.altitude.in(Unit.Foot);
        this._t0 = this.temperature.in(Unit.Fahrenheit);
        this._p0 = this.pressure.in(Unit.InHg);
        this._ta = this._a0 * cTemperatureGradient + cIcaoTemperatureDeltaR;

        // Perform initial calculations
        this.calculate();
    }

    /**
     * Creates Atmosphere with ICAO standard values.
     * @param {number | Distance} altitude - Altitude above sea level (default: 0 foot).
     * @returns {Atmo} - Atmo instance with ICAO standard values.
     */
    static icao(altitude = new Distance(0, Unit.Foot)) {
        // Coerce altitude to appropriate units
        const _altitude = unitTypeCoerce(altitude, Distance, calcSettings.Units.distance);

        // Calculate temperature based on ICAO standard values
        const temperature = new Temperature(
            cIcaoStandardTemperatureR + (_altitude.in(Distance.Foot))
            * cTemperatureGradient - cIcaoFreezingPointTemperatureR,
            Unit.Fahrenheit
        );

        // Calculate pressure based on ICAO standard values
        const pressure = new Pressure(
            cStandardPressure * Math.pow(cIcaoStandardTemperatureR / (
                (temperature.in(Temperature.Fahrenheit) + cIcaoFreezingPointTemperatureR)),
                cPressureExponent
            ), Unit.InHg
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
    calculate() {
        const { density, mach } = this.calculate0(this._t0, this._p0);

        // Update instance properties with calculated values
        this.density = density;
        this._mach1 = mach;
        this.mach = new Velocity(this._mach1, Velocity.FPS);
    }

    /**
     * Calculates density and Mach number with specified atmosphere conditions.
     * @param {number} t - Temperature in Fahrenheit.
     * @param {number} p - Atmospheric pressure in InHg.
     * @returns {{density: number, mach: number}} - Calculated density and Mach number.
     */
    calculate0(t, p) {
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
        return { density, mach };
    }

    /**
     * Calculates and returns the projectile density factor.
     * @return {number} - Projectile density factor.
     */
    densityFactor() {
        return this.density / cStandardDensity;
    }

    /**
     * Calculates density factor and Mach number for the specified altitude.
     * @param {number} altitude - Altitude above sea level.
     * @return {{density: number, mach: number}} - Density factor and Mach number for the specified altitude.
     */
    getDensityFactorAndMachForAltitude(altitude) {
        if (Math.abs(this._a0 - altitude) < 30) {
            // Use pre-calculated values for nearby altitudes
            return { density: this.density / cStandardDensity, mach: this._mach1 };
        }

        // Calculate new atmosphere conditions for the specified altitude
        const tb = altitude * cTemperatureGradient + cIcaoTemperatureDeltaR;
        const t = this._t0 + this._ta - tb;
        const p = this._p0 * Math.pow(this._t0 / t, cPressureExponent);
        const { density, mach } = this.calculate0(t, p);

        // Return calculated values
        return { density: density / cStandardDensity, mach };
    }
}


class Wind {
    /**
     * Stores wind data at the desired distance.
     * @param {number | Velocity} velocity - Wind velocity.
     * @param {number | Angular} directionFrom - Wind direction in relation to the shooter.
     * @param {number | Distance} untilDistance - Distance up to which the wind data is applicable.
     */
    constructor(
        velocity = new Velocity(0, Unit.MPS),
        directionFrom = new Angular(0, Unit.MIL),
        untilDistance = new Distance(9999, Unit.Meter)
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
     * @param {number | Distance} maxRange - Downrange distance to stop computing trajectory.
     * @param {number | Angular} zeroAngle - The angle between the barrel and horizontal when zeroed.
     * @param {number | Angular} relativeAngle - Elevation adjustment added to zero_angle for a particular shot.
     * @param {number | Angular} cantAngle - Rotation of the gun around the barrel axis, relative to position when zeroed.
     *                                       (Only relevant when Weapon.sight_height !== 0)
     * @param {Atmo} atmo - Atmosphere conditions for the shot (default: ICAO standard atmosphere).
     * @param {Wind[]} winds - Array of wind conditions affecting the shot (default: no wind).
     */
    constructor(
        maxRange = new Distance(1000, Unit.Yard),
        zeroAngle = new Angular(0, Unit.Degree),
        relativeAngle = new Angular(0, Unit.Degree),
        cantAngle = new Angular(0, Unit.Degree),
        atmo = Atmo.icao(),
        winds = [new Wind()]
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


export { Atmo, Wind, Shot };
