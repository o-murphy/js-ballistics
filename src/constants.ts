// Global Constants

export const cStandardHumidity: number = 0.0;  // Relative Humidity
export const cPressureExponent: number = 5.255876;  // =g*M/R*L

// ISA, metric preferred units: (https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html)
export const cDegreesCtoK: number = 273.15;  // °K = °C + 273.15
export const cStandardTemperatureC: number = 15.0;  // °C
export const cLapseRateKperFoot: number = -0.0019812;  // Lapse Rate, °K/ft
export const cLapseRateMetric: number = -6.5e-03;  // Lapse Rate, °C/m
export const cStandardPressureMetric: number = 1013.25;  // hPa
export const cSpeedOfSoundMetric: number = 20.0467;  // Mach1 in m/s = cSpeedOfSound * sqrt(°K)
export const cStandardDensityMetric: number = 1.2250;  // kg/m^3
export const cDensityImperialToMetric: number = 16.0185;  // lb/ft^3 to kg/m^3

// ICAO standard atmosphere:
export const cDegreesFtoR: number = 459.67;  // °R = °F + 459.67
export const cStandardTemperatureF: number = 59.0;  // °F
export const cLapseRateImperial: number = -3.56616e-03;  // Lapse rate, °F/ft
export const cStandardPressure: number = 29.92;  // InHg
export const cSpeedOfSoundImperial: number = 49.0223;  // Mach1 in fps = cSpeedOfSound * sqrt(°R)
export const cStandardDensity: number = 0.076474;  // lb/ft^3

// Runtime constants
export const cLowestTempF: number = -130;  // °F
export const cMaxWindDistanceFeet: number = 1e8; // From python

// CIPM 2007 Air Density Constants (from calculate_air_density in conditions.py)
// These constants are internal to the calculate_air_density function in Python,
// but for TypeScript, we'll export them as global constants to maintain consistency
// and enable easier refactoring if needed.
export const CIPM_A0: number = 1.2378847e-5;
export const CIPM_A1: number = -1.9121316e-2;
export const CIPM_A2: number = 33.93711047;
export const CIPM_A3: number = -6.3431645e3;

export const CIPM_a0: number = 1.58123e-6;
export const CIPM_a1: number = -2.9331e-8;
export const CIPM_a2: number = 1.1043e-10;
export const CIPM_b0: number = 5.707e-6;
export const CIPM_b1: number = -2.051e-8;
export const CIPM_c0: number = 1.9898e-4;
export const CIPM_c1: number = -2.376e-6;
export const CIPM_d: number = 1.83e-11;
export const CIPM_e: number = -0.765e-8;