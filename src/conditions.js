// Classes to define zeroing or current environment conditions

import calcSettings from './settings';
import {Distance, Pressure, Temperature, Unit, Velocity, unitTypeCoerce, Angular} from "./units.js";

const cIcaoStandardTemperatureR = 518.67;
const cIcaoFreezingPointTemperatureR = 459.67;
const cTemperatureGradient = -3.56616e-03;
export const cIcaoStandardHumidity = 0.0;
const cPressureExponent = -5.255876;
export const cSpeedOfSound = 49.0223;
const cA0 = 1.24871;
const cA1 = 0.0988438;
const cA2 = 0.00152907;
const cA3 = -3.07031e-06;
const cA4 = 4.21329e-07;
const cA5 = 3.342e-04;
export const cStandardTemperature = 59.0;
export const cStandardPressure = 29.92;
export const cStandardDensity = 0.076474;

const cIcaoTemperatureDeltaR = cIcaoStandardTemperatureR - cIcaoFreezingPointTemperatureR;


class Atmo {
    // Stores atmosphere data for the trajectory calculation

    constructor(altitude = new Distance(0, Unit.Foot),
                pressure = new Pressure(cStandardPressure, Unit.InHg),
                temperature = new Temperature(cStandardTemperature, Unit.Fahrenheit),
                humidity = 0.78) {

        this.altitude = unitTypeCoerce(altitude, Distance, calcSettings.Units.distance);
        this.pressure = unitTypeCoerce(pressure, Pressure, calcSettings.Units.pressure);
        this.temperature = unitTypeCoerce(temperature, Temperature, calcSettings.Units.temperature);
        this.humidity = humidity > 1 ? humidity / 100 : humidity;

        if (!(0 <= this.humidity <= 1)) {
            this.humidity = 0.78
        }

        this._mach1 = cSpeedOfSound;
        this._a0 = this.altitude.in(Unit.Foot);
        this._t0 = this.temperature.in(Unit.Fahrenheit);
        this._p0 = this.pressure.in(Unit.InHg);
        this._ta = this._a0 * cTemperatureGradient + cIcaoTemperatureDeltaR;
        this.calculate();
    }

    static icao(altitude = new Distance(0, Unit.Foot)) {
        // Creates Atmosphere with ICAO values

        const _altitude = unitTypeCoerce(altitude, Distance, calcSettings.Units.distance);
        const temperature = new Temperature(
            cIcaoStandardTemperatureR + (_altitude.in(Distance.Foot))
            * cTemperatureGradient - cIcaoFreezingPointTemperatureR,
            Unit.Fahrenheit
        )
        const pressure = new Pressure(
            cStandardPressure * Math.pow(cIcaoStandardTemperatureR / (
                (temperature.in(Temperature.Fahrenheit) + cIcaoFreezingPointTemperatureR)),
                cPressureExponent
            ), Unit.InHg
        )

        return new Atmo(
            altitude,
            pressure,
            temperature,
            cIcaoStandardHumidity
        )
    }

    calculate() {
        // prepare the data for the calculation

        const {density, mach} = this.calculate0(this._t0, this._p0);
        this.density = density;
        this._mach1 = mach;
        this.mach = new Velocity(this._mach1, Velocity.FPS);
    }

    calculate0(t, p) {
        // :return: density and mach with specified atmosphere

        let hc = 0;
        if (t > 0) {
            let et0 = cA0 + t * (cA1 + t * (cA2 + t * (cA3 + t * cA4)));
            let et = cA5 * this.humidity * et0;
            hc = (p - 0.3783 * et) / cStandardPressure;
        }
        let density = cStandardDensity * (
            cIcaoStandardTemperatureR / (t + cIcaoFreezingPointTemperatureR)
        ) * hc;
        let mach = Math.sqrt(t + cIcaoFreezingPointTemperatureR) * cSpeedOfSound;
        return {density: density, mach: mach}
    }

    densityFactor() {
        // :return: projectile density_factor

        return this.density / cStandardDensity
    }

    getDensityFactorAndMachForAltitude(altitude) {
        // :return: density factor for the specified altitude

        if (Math.abs(this._a0 - altitude) < 30) {
            return {density: this.density / cStandardDensity, mach: this._mach1}
        }

        const tb = altitude * cTemperatureGradient + cIcaoTemperatureDeltaR;
        const t = this._t0 + this._ta - tb;
        const p = this._p0 * Math.pow(this._t0 / t, cPressureExponent);
        const {density, mach} = this.calculate0(t, p);
        return {density: density / cStandardDensity, mach: mach}
    }

}


class Wind {
    // Stores wind data at the desired distance

    constructor(velocity = new Velocity(0, Unit.MPS),
                directionFrom = new Angular(0, Unit.MIL),
                untilDistance = new Distance(9999, Unit.Meter)) {
        this.velocity = unitTypeCoerce(velocity, Velocity, calcSettings.Units.velocity);
        this.directionFrom = unitTypeCoerce(directionFrom, Angular, calcSettings.Units.angular);
        this.untilDistance = unitTypeCoerce(untilDistance, Distance, calcSettings.Units.distance);
    }
}


class Shot {
    // Stores shot parameters for the trajectory calculation
    //
    // :param maxRange: Downrange distance to stop computing trajectory
    // :param zeroAngle: The angle between the barrel and horizontal when zeroed
    // :param relativeAngle: Elevation adjustment added to zero_angle for a particular shot
    // :param cantAngle: Rotation of gun around barrel axis, relative to position when zeroed.
    // (Only relevant when Weapon.sight_height != 0)

    constructor(maxRange = new Distance(1000, Unit.Yard),
                zeroAngle = new Angular(0, Unit.Degree),
                relativeAngle = new Angular(0, Unit.Degree),
                cantAngle = new Angular(0, Unit.Degree),
                atmo = Atmo.icao(), winds = [new Wind()]) {

        this.maxRange = unitTypeCoerce(maxRange, Distance, calcSettings.Units.distance);
        this.zeroAngle = unitTypeCoerce(zeroAngle, Angular, calcSettings.Units.angular);
        this.relativeAngle = unitTypeCoerce(relativeAngle, Angular, calcSettings.Units.angular);
        this.cantAngle = unitTypeCoerce(cantAngle, Angular, calcSettings.Units.angular);

        this.atmo = atmo
        this.winds = winds
    }

}


export {Atmo, Wind, Shot};
