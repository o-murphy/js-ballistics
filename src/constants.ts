// Global Constants

export const cGravityImperial: number = 32.17405  // Standard gravity (g) in ft/s²
export const cEarthAngularVelocityRadS: number = 7.2921159e-5 // Earth's rotational speed (Ω) in radians per second (rad/s)

export const cStandardHumidity: number = 0.0; // Standard relative humidity used in atmospheric calculations (%)
export const cPressureExponent: number = 5.255876; // Pressure exponent constant for barometric formula (dimensionless) =g*M/R*L

// Atmospheric model coefficients (used in air density calculations)
// CIPM 2007 Air Density Constants (from calculate_air_density in conditions.py)
// These constants are internal to the calculate_air_density function in Python,
// but for TypeScript, we'll export them as global constants to maintain consistency
// and enable easier refactoring if needed.
export const cA0: number = 1.24871
export const cA1: number = 0.0988438
export const cA2: number = 0.00152907
export const cA3: number = -3.07031e-06
export const cA4: number = 4.21329e-07
export const cA5: number = 3.342e-04

// ISA, metric preferred units: (https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html)
export const cStandardTemperatureC: number = 15.0; // Standard temperature at sea level in Celsius (°C)
export const cLapseRateKperFoot: number = -0.0019812; // Temperature lapse rate in Kelvin per foot (°K/ft)
export const cLapseRateMetric: number = -6.5e-3; // Temperature lapse rate in metric units (°C/m)
export const cStandardPressureMetric: number = 1013.25; // Standard atmospheric pressure at sea level (hPa)
export const cSpeedOfSoundMetric: number = 20.0467; // Speed of sound coefficient in metric units (m/s per √K)c
export const cStandardDensityMetric: number = 1.225; // Standard air density at sea level in metric units (kg/m³)

// ICAO standard atmosphere:
export const cStandardTemperatureF: number = 59.0; // Standard temperature at sea level in Fahrenheit (°F)
export const cLapseRateImperial: number = -3.56616e-3; // Temperature lapse rate in imperial units (°F/ft)
export const cStandardPressure: number = 29.92; // Standard atmospheric pressure at sea level (InHg)
export const cSpeedOfSoundImperial: number = 49.0223; // Speed of sound coefficient in imperial units (fps per √°R)
export const cStandardDensity: number = 0.076474; // Standard air density at sea level in imperial units (lb/ft³)

// Conversion factors
export const cDegreesCtoK: number = 273.15; // Celsius to Kelvin conversion constant (°K) = °C + 273.15
export const cDegreesFtoR: number = 459.67; // Fahrenheit to Rankine conversion constant (°R) = °F + 459.67
export const cDensityImperialToMetric: number = 16.0185; // Density conversion factor from imperial to metric units (kg/m³ per lb/ft³)

// Runtime Limits and Validation Constants
export const cLowestTempF: number = -130; // Minimum allowed temperature for atmospheric calculations (°F)
export const cMaxWindDistanceFeet: number = 1e8; // Maximum wind effect distance for computational limits (ft)
