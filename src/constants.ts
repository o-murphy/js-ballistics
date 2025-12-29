/**
 * Global physical and atmospheric constants for ballistic calculations.
 *
 * This module defines scientific constants used throughout the ballistic calculations,
 * including atmospheric model constants, physical constants, and runtime limits.
 * All constants follow international standards (ISA, ICAO) where applicable.
 *
 * Constant Categories:
 *   - Global atmosphere constants: Standard conditions and coefficients
 *   - ISA metric constants: International Standard Atmosphere in metric units
 *   - ICAO constants: International Civil Aviation Organization standards
 *   - Conversion factors: Unit conversion constants
 *   - Runtime limits: Computational bounds and validation limits
 *
 * References:
 *   - ISA: https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html
 *   - ICAO: International Civil Aviation Organization standards
 *   - Physical constants: NIST and other authoritative sources
 */

/** Standard gravity (g) in ft/s² */
export const cGravityImperial = 32.17405 as const;

/** Earth's rotational speed (Ω) in radians per second (rad/s) */
export const cEarthAngularVelocityRadS = 7.2921159e-5 as const;

// =============================================================================
// Global Atmosphere Constants
// =============================================================================

/** Standard relative humidity used in atmospheric calculations (%) */
export const cStandardHumidity = 0.0 as const;

/** Pressure exponent constant for barometric formula (dimensionless) */
export const cPressureExponent = 5.255876 as const; // =g*M/R*L

// Atmospheric model coefficients (used in air density calculations)
export const cA0 = 1.24871 as const;
export const cA1 = 0.0988438 as const;
export const cA2 = 0.00152907 as const;
export const cA3 = -3.07031e-06 as const;
export const cA4 = 4.21329e-07 as const;
export const cA5 = 3.342e-04 as const;

// =============================================================================
// ISA Metric Constants (International Standard Atmosphere)
// =============================================================================

/** Standard temperature at sea level in Celsius (°C) */
export const cStandardTemperatureC = 15.0 as const;

/** Temperature lapse rate in Kelvin per foot (K/ft) */
export const cLapseRateKperFoot = -0.0019812 as const;

/** Temperature lapse rate in metric units (°C/m) */
export const cLapseRateMetric = -6.5e-03 as const;

/** Standard atmospheric pressure at sea level (hPa) */
export const cStandardPressureMetric = 1013.25 as const;

/** Speed of sound coefficient in metric units (m/s per √K) */
export const cSpeedOfSoundMetric = 20.0467 as const; // Mach1 in m/s = cSpeedOfSound * sqrt(K)

/** Standard air density at sea level in metric units (kg/m³) */
export const cStandardDensityMetric = 1.2250 as const;

// =============================================================================
// ICAO Standard Atmosphere Constants
// =============================================================================

/** Standard temperature at sea level in Fahrenheit (°F) */
export const cStandardTemperatureF = 59.0 as const;

/** Temperature lapse rate in imperial units (°F/ft) */
export const cLapseRateImperial = -3.56616e-03 as const;

/** Standard atmospheric pressure at sea level (InHg) */
export const cStandardPressure = 29.92 as const;

/** Speed of sound coefficient in imperial units (fps per √°R) */
export const cSpeedOfSoundImperial = 49.0223 as const; // Mach1 in fps = cSpeedOfSound * sqrt(°R)

/** Standard air density at sea level in imperial units (lb/ft³) */
export const cStandardDensity = 0.076474 as const;

// =============================================================================
// Conversion Factors
// =============================================================================

/** Celsius to Kelvin conversion constant (K) */
export const cDegreesCtoK = 273.15 as const; // K = °C + 273.15

/** Fahrenheit to Rankine conversion constant (°R) */
export const cDegreesFtoR = 459.67 as const; // °R = °F + 459.67

/** Density conversion factor from imperial to metric units (kg/m³ per lb/ft³) */
export const cDensityImperialToMetric = 16.0185 as const;

// =============================================================================
// Runtime Limits and Validation Constants
// =============================================================================

/** Minimum allowed temperature for atmospheric calculations (°F) */
export const cLowestTempF = -130 as const;

/** Maximum wind effect distance for computational limits (ft) */
export const cMaxWindDistanceFeet = 1e8 as const;
