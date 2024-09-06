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
    /**
    * Atmospheric conditions and density calculations
    * @param {number | Distance | null} altitude - Altitude above sea level.
    * @param {number | Pressure | null} pressure - Atmospheric pressure.
    * @param {number | Temperature | null} temperature - Temperature in Fahrenheit.
    * @param {number | null} humidity - Relative humidity (default: 0.78).
    */

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

    constructor(
        altitude: (number | Distance | null) = null,
        pressure: (number | Pressure | null) = null,
        temperature: (number | Temperature | null) = null,
        humidity = 0.0
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
        this.densityRatio = this.calculateDensity(this._t0, this._p0) / cStandardDensity
        this._mach1 = Atmo.machF(this._t0);
        this.mach = UNew.FPS(this._mach1)
    }

    static standardTemperature(altitude: Distance): Temperature {
        // ICAO standard temperature for altitude
        return UNew.Fahrenheit(cStandardTemperatureF + (altitude.In(Distance.Foot)) * cLapseRateImperial)
    }

    static standardPressure(altitude: Distance): Pressure {
        // ICAO standard pressure for altitude
        return UNew.InHg(0.02953 * Math.pow(3.73145 - 2.56555e-05 * altitude.In(Distance.Foot), cPressureExponent))
    }

    static standard(altitude: (number | Distance | null) = null, temperature: (number | Temperature | null) = null): Atmo {
        // Creates standard ICAO atmosphere at given altitude. If temperature not specified uses standard temperature.
        return Atmo.icao(altitude, temperature)
    }

    static icao(altitude: (number | Distance | null) = null, temperature: (number | Temperature | null) = null): Atmo {
        // Creates standard ICAO atmosphere at given altitude. If temperature not specified uses standard temperature.
        const _altitude: Distance = unitTypeCoerce(altitude ?? 0, Distance, preferredUnits.distance)
        const _temperature: Temperature = unitTypeCoerce(temperature ?? Atmo.standardTemperature(_altitude), Temperature, preferredUnits.temperature)
        const _pressure: Pressure = Atmo.standardPressure(_altitude)
        return new Atmo(
            _altitude.In(preferredUnits.distance),
            _pressure.In(preferredUnits.pressure),
            _temperature.In(preferredUnits.temperature),
            cStandardHumidity
        )
    }

    static machF(fahrenheit: number): number {
        // Mach 1 in fps for Fahrenheit temperature
        return Math.sqrt(fahrenheit + cDegreesFtoR) * cSpeedOfSoundImperial
    }

    static machC(celsius: number): number {
        // Mach 1 in m/s for Celsius temperature
        return Math.sqrt(1 + celsius / cDegreesCtoK) * cSpeedOfSoundMetric
    }

    static airDensity(t: Temperature, p: Pressure, humidity: number): number {
        // Source: https://en.wikipedia.org/wiki/Density_of_air#Humid_air
        // Density in Imperial units (lb/ft^3)
        const tC = t.In(Temperature.Celsius)
        const pM = p.In(Pressure.hPa) * 100
        const psat = 6.1078 * Math.pow(10, 17.27 * tC / (tC + 237.3))
        const pv = humidity * psat  // Pressure of water vapor in Pascals
        const pd = pM - pv  // Partial pressure of dry air in Pascals
        // Density in metric units kg/m^3
        const density = (pd * 0.0289652 + pv * 0.018016) / (8.31446 * (tC + cDegreesCtoK))
        return density / cDensityImperialToMetric
    }

    // Getter for density in kg/m^3 (Metric)
    get densityMetric(): number {
        const cStandardDensityMetric = 1.225; // Standard air density at sea level (kg/m^3)
        return this.densityRatio * cStandardDensityMetric;
    }

    // Getter for density in lb/ft^3 (Imperial)
    get densityImperial(): number {
        const cStandardDensity = 0.0765; // Standard air density at sea level (lb/ft^3)
        return this.densityRatio * cStandardDensity;
    }

    temperatureAtAltitude(altitude: number): number {
        // Interpolated temperature at altitude
        // altitude: ASL in ft
        // temperature in °F
        return (altitude - this._a0) * cLapseRateImperial + this._t0
    }

    calculateDensity(t: number, p: number): number {
        // temperature in °F
        // pressure in inHg
        // density with specified atmosphere
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

    getDensityFactorAndMachForAltitude(altitude: number): [number, number] {
        // Within 30 feet of the current altitude, return current values
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
    /**
     * Stores wind data at the desired distance.
     * @param {number | Velocity | Object | null} velocity - Wind velocity.
     * @param {number | Angular | Object | null} directionFrom - Wind direction in relation to the shooter.
     * @param {number | Distance | Object | null} untilDistance - Distance up to which the wind data is applicable.
     * @param {number | null} MAX_DISTANCE_FEET - Distance up to which the wind data is applicable.
     */

    readonly velocity: Velocity
    readonly directionFrom: Angular
    readonly untilDistance: Distance
    public static MAX_DISTANCE_FEET: number = 1e8

    constructor(
        velocity: (number | Velocity | null) = null,
        directionFrom: (number | Angular | null) = null,
        untilDistance: (number | Distance | null) = null,
        maxDistanceFeet: (number | null) = 1e8
    ) {
        // Coerce input values to appropriate units
        Wind.MAX_DISTANCE_FEET = maxDistanceFeet ?? 1e8
        this.velocity = unitTypeCoerce(velocity ?? 0, Velocity, preferredUnits.velocity);
        this.directionFrom = unitTypeCoerce(directionFrom ?? 0, Angular, preferredUnits.angular);
        this.untilDistance = unitTypeCoerce(untilDistance ?? UNew.Foot(Wind.MAX_DISTANCE_FEET), Distance, preferredUnits.distance);
    }
}


class Shot {
    /**
     * Stores shot parameters for the trajectory calculation.
     */

    lookAngle: Angular
    relativeAngle: Angular
    cantAngle: Angular
    weapon: Weapon
    ammo: Ammo
    atmo: Atmo
    winds: Wind[]

    constructor(
        weapon: Weapon,
        ammo: Ammo,
        lookAngle: (number | Angular | null) = null,
        relativeAngle: (number | Angular | null) = null,
        cantAngle: (number | Angular | null) = null,

        atmo: (Atmo | null) = null,
        winds: (Wind[] | null) = null
    ) {
        this.lookAngle = unitTypeCoerce(lookAngle ?? 0, Angular, preferredUnits.angular);
        this.relativeAngle = unitTypeCoerce(relativeAngle ?? 0, Angular, preferredUnits.angular);
        this.cantAngle = unitTypeCoerce(cantAngle ?? 0, Angular, preferredUnits.angular);
        this.weapon = weapon
        this.ammo = ammo;
        this.atmo = atmo ?? Atmo.icao()
        this.winds = (winds ?? [new Wind()]).sort((a, b) => a.untilDistance.rawValue - b.untilDistance.rawValue);
    }

    // Other methods and properties can be added here
    get barrelElevation(): Angular {
        // Barrel elevation in vertical plane from horizontal
        return UNew.Radian(
            this.lookAngle.In(Angular.Radian) + Math.cos(this.cantAngle.In(Angular.Radian)) * (
                this.weapon.zeroElevation.In(Angular.Radian) + this.relativeAngle.In(Angular.Radian)
            )
        )
    }

    get barrelAzimuth(): Angular {
        // Horizontal angle of barrel relative to sight line
        return UNew.Radian(
            Math.sin(this.cantAngle.In(Angular.Radian)) * (
                this.weapon.zeroElevation.In(Angular.Radian) + this.relativeAngle.In(Angular.Radian)
            )
        )
    }
}


export { Atmo, Wind, Shot };
