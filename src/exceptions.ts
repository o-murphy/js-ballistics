/**
 * py_ballisticcalc exception types for TypeScript
 *
 * This module provides a comprehensive exception hierarchy for handling various error conditions
 * that can occur during ballistic calculations.
 *
 * Exception Hierarchy
 * -------------------
 *
 * Exception (built-in)
 * ├── TypeError
 * │   └── UnitTypeError
 * │       └── UnitConversionError
 * ├── ValueError
 * │   └── UnitAliasError
 * └── SolverRuntimeError
 *     ├── ZeroFindingError
 *     ├── RangeError
 *     ├── OutOfRangeError
 *     └── InterceptionError
 */

import { Angular, Distance } from "./unit";
import { TrajectoryData } from "./trajectory_data";
import { BaseTrajData } from "./_wasm"

export {
    UnitTypeError,
    UnitConversionError,
    UnitAliasError,
    SolverRuntimeError,
    ZeroFindingError,
    RangeError,
    OutOfRangeError,
    InterceptionError,
};

// ============================================================================
// Unit-Related Exceptions
// ============================================================================

/**
 * Base class for unit-related type errors.
 * Raised when invalid unit types are passed to unit conversion functions
 * or there are type mismatches in unit operations.
 */
class UnitTypeError extends TypeError {
    constructor(message?: string) {
        super(message);
        this.name = "UnitTypeError";
    }
}

/**
 * Raised when unit conversion fails.
 * Occurs when attempting to convert between incompatible unit types
 * or when a unit is not supported in the conversion factor table.
 */
class UnitConversionError extends UnitTypeError {
    constructor(message?: string) {
        super(message);
        this.name = "UnitConversionError";
    }
}

/**
 * Raised when unit alias parsing fails.
 * Occurs when invalid unit alias strings are provided
 * or when there are ambiguous unit abbreviations.
 */
class UnitAliasError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "UnitAliasError";
    }
}

// ============================================================================
// Solver-Related Exceptions
// ============================================================================

/**
 * Base class for all solver-related runtime errors.
 * This is the base class for all ballistic calculation errors
 * and is typically not raised directly.
 */
class SolverRuntimeError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "SolverRuntimeError";
    }
}

/**
 * Raised when zero-finding algorithms fail to converge.
 */
class ZeroFindingError extends SolverRuntimeError {
    public static readonly DISTANCE_NON_CONVERGENT = "Distance non-convergent";
    public static readonly ERROR_NON_CONVERGENT = "Error non-convergent";

    public zeroFindingError: number;
    public iterationsCount: number;
    public lastBarrelElevation: Angular;
    public reason: string;

    /**
     * @param zeroFindingError - Error magnitude in feet
     * @param iterationsCount - Number of iterations performed
     * @param lastBarrelElevation - Last computed barrel elevation (Angular instance)
     * @param reason - Specific reason for failure
     */
    constructor(
        zeroFindingError: number,
        iterationsCount: number,
        lastBarrelElevation: Angular,
        reason: string = ""
    ) {
        let message = `Vertical error ${zeroFindingError} feet with ${lastBarrelElevation} elevation, after ${iterationsCount} iterations.`;

        if (reason) {
            message = `${reason}. ${message}`;
        }

        super(message);
        this.name = "ZeroFindingError";
        this.zeroFindingError = zeroFindingError;
        this.iterationsCount = iterationsCount;
        this.lastBarrelElevation = lastBarrelElevation;
        this.reason = reason;
    }
}

/**
 * Raised when trajectory doesn't reach the requested distance.
 */
class RangeError extends SolverRuntimeError {
    public static readonly MinimumVelocityReached = "Minimum velocity reached";
    public static readonly MaximumDropReached = "Maximum drop reached";
    public static readonly MinimumAltitudeReached = "Minimum altitude reached";

    public reason: string;
    public incompleteTrajectory: TrajectoryData[];
    public lastDistance: Distance | null;

    /**
     * @param reason - The error reason
     * @param ranges - The trajectory data before the exception occurred
     */
    constructor(reason: string, ranges: TrajectoryData[]) {
        let message = `Max range not reached: (${reason})`;
        let lastDistance: Distance | null = null;

        if (ranges.length > 0) {
            lastDistance = ranges[ranges.length - 1].distance;
            message += `, last distance: ${lastDistance}`;
        }

        super(message);
        this.name = "RangeError";
        this.reason = reason;
        this.incompleteTrajectory = ranges;
        this.lastDistance = lastDistance;
    }
}

/**
 * Raised when requested distance exceeds maximum possible range.
 */
class OutOfRangeError extends SolverRuntimeError {
    public requestedDistance: Distance;
    public maxRange?: Distance;
    public lookAngle?: Angular;

    /**
     * @param requestedDistance - The distance that was requested
     * @param maxRange - Maximum achievable range (optional)
     * @param lookAngle - Look angle for the shot (optional)
     * @param note - Additional note (optional)
     */
    constructor(
        requestedDistance: Distance,
        maxRange?: Distance,
        lookAngle?: Angular,
        note: string = ""
    ) {
        let message = `Requested distance ${requestedDistance}`;

        if (maxRange !== undefined) {
            message += ` exceeds maximum possible range ${maxRange.foot} feet`;
        }

        if (lookAngle !== undefined && lookAngle.rawValue) {
            message += ` with look-angle ${lookAngle.rad} rad`;
        }

        if (note) {
            message += `. ${note}`;
        }

        super(message);
        this.name = "OutOfRangeError";
        this.requestedDistance = requestedDistance;
        this.maxRange = maxRange;
        this.lookAngle = lookAngle;
    }
}

/**
 * Raised when interpolation can't find interception point
 * for target key and value during integration.
 */
class InterceptionError extends SolverRuntimeError {
    public lastData: [BaseTrajData, TrajectoryData];

    /**
     * @param message - Error message
     * @param lastData - Tuple of [BaseTrajData, TrajectoryData]
     */
    constructor(message: string, lastData: [BaseTrajData, TrajectoryData]) {
        super(message);
        this.name = "InterceptionError";
        this.lastData = lastData;
    }
}
