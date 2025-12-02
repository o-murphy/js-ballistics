import { Angular, Distance } from "./unit";
import { TrajectoryData } from "./trajectory_data";

export {
    ValueError,
    UnitTypeError,
    UnitConversionError,
    UnitAliasError,
    SolverRuntimeError,
    ZeroFindingError,
    IntegrationRangeError,
    OutOfRangeError,
};

/**
 * Base ValueError class for unit alias errors
 */
class ValueError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "ValueError";
    }
}

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
class UnitAliasError extends ValueError {
    constructor(message?: string) {
        super(message);
        this.name = "UnitAliasError";
    }
}

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
 * Exception for zero-finding issues.
 * Raised when zero-finding algorithms fail to converge.
 * 
 * Contains:
 * - zeroFindingError: Error magnitude in feet
 * - iterationsCount: Number of iterations performed
 * - lastBarrelElevation: Last computed barrel elevation (Angular instance)
 * - reason: Specific reason for failure
 */
class ZeroFindingError extends SolverRuntimeError {
    public static readonly DISTANCE_NON_CONVERGENT = "Distance non-convergent";
    public static readonly ERROR_NON_CONVERGENT = "Error non-convergent";

    public zeroFindingError: number;
    public iterationsCount: number;
    public lastBarrelElevation: Angular;
    public reason: string;

    constructor(
        zeroFindingError: number,
        iterationsCount: number,
        lastBarrelElevation: Angular,
        reason: string = "",
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
 * Exception for trajectories that don't reach requested distance.
 * 
 * Contains:
 * - reason: The error reason
 * - incompleteTrajectory: The trajectory data before the exception occurred
 * - lastDistance: Last distance before the exception occurred
 */
class IntegrationRangeError extends SolverRuntimeError {
    public static readonly MinimumVelocityReached = "Minimum velocity reached";
    public static readonly MaximumDropReached = "Maximum drop reached";
    public static readonly MinimumAltitudeReached = "Minimum altitude reached";

    public reason: string;
    public incompleteTrajectory: TrajectoryData[];
    public lastDistance: Distance | null;

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
 * Exception raised when the requested distance is outside the possible range for the shot.
 * 
 * Contains:
 * - requestedDistance: The distance that was requested
 * - maxRange: Maximum achievable range (optional)
 * - lookAngle: Look angle for the shot (optional)
 */
class OutOfRangeError extends SolverRuntimeError {
    public requestedDistance: Distance;
    public maxRange: Distance | null;
    public lookAngle: Angular | null;

    constructor(
        requestedDistance: Distance,
        maxRange: Distance | null = null,
        lookAngle: Angular | null = null,
        note: string = "",
    ) {
        let message = `Requested distance ${requestedDistance}`;

        if (maxRange !== null) {
            message += ` exceeds maximum possible range ${maxRange.In(Distance.Foot)} feet`;
        }

        if (lookAngle !== null && lookAngle.rawValue) {
            message += ` with look-angle ${lookAngle.In(Angular.Radian)} rad`;
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