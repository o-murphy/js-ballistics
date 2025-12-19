import { BaseTrajData, TrajectoryData } from "./traj_data";

/**
 * @brief Base class for solver-related runtime errors
 *
 * Extends standard Error to provide context-specific error handling
 * for ballistic trajectory calculations.
 */
class SolverRuntimeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "SolverRuntimeError";

        // Maintains proper stack trace for where error was thrown (V8 only)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SolverRuntimeError);
        }
    }
}

/**
 * @brief Error thrown when requested trajectory distance exceeds calculated range
 *
 * Occurs when solver cannot reach the requested distance with given
 * initial conditions and look angle.
 *
 * TYPICAL CAUSES:
 * - Requested distance beyond maximum ballistic range
 * - Look angle too steep (positive or negative)
 * - Insufficient muzzle velocity
 * - Excessive atmospheric drag
 *
 * @property requestedDistanceFt Target distance that could not be reached (feet)
 * @property maxRangeFt Maximum range achieved by trajectory (feet)
 * @property lookAngleRad Look angle used in calculation (radians)
 */
class OutOfRangeError extends SolverRuntimeError {
    constructor(
        message: string,
        public requestedDistanceFt: number,
        public maxRangeFt: number,
        public lookAngleRad: number
    ) {
        super(message);
        this.name = "OutOfRangeError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, OutOfRangeError);
        }
    }

    /**
     * @brief Creates a formatted error message with context
     */
    static create(
        requestedDistanceFt: number,
        maxRangeFt: number,
        lookAngleRad: number
    ): OutOfRangeError {
        const lookAngleDeg = (lookAngleRad * 180 / Math.PI).toFixed(2);
        const shortage = (requestedDistanceFt - maxRangeFt).toFixed(1);

        const message =
            `Trajectory fell short of target.\n` +
            `Requested: ${requestedDistanceFt.toFixed(1)} ft\n` +
            `Maximum:   ${maxRangeFt.toFixed(1)} ft\n` +
            `Shortage:  ${shortage} ft\n` +
            `Look angle: ${lookAngleDeg}°`;

        return new OutOfRangeError(
            message,
            requestedDistanceFt,
            maxRangeFt,
            lookAngleRad
        );
    }
}

/**
 * @brief Error thrown when zero-finding algorithm fails to converge
 *
 * Occurs during trajectory zeroing when iterative solver cannot find
 * barrel elevation that produces desired point of impact within tolerance.
 *
 * TYPICAL CAUSES:
 * - Target distance beyond achievable range
 * - Accuracy tolerance too strict
 * - Maximum iterations exceeded
 * - Numerical instability in trajectory calculation
 * - Invalid initial conditions
 *
 * @property zeroFindingError Final error magnitude (feet) when convergence failed
 * @property iterationsCount Number of iterations performed before failure
 * @property lastBarrelElevationRad Last barrel elevation attempted (radians)
 */
class ZeroFindingError extends SolverRuntimeError {
    constructor(
        message: string,
        public zeroFindingError: number,
        public iterationsCount: number,
        public lastBarrelElevationRad: number
    ) {
        super(message);
        this.name = "ZeroFindingError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ZeroFindingError);
        }
    }

    /**
     * @brief Creates a formatted error message with convergence details
     */
    static create(
        zeroFindingError: number,
        iterationsCount: number,
        lastBarrelElevationRad: number,
        targetAccuracy: number
    ): ZeroFindingError {
        const elevationDeg = (lastBarrelElevationRad * 180 / Math.PI).toFixed(4);
        const elevationMOA = (lastBarrelElevationRad * 180 / Math.PI * 60).toFixed(2);
        const errorInches = (zeroFindingError * 12).toFixed(3);
        const targetInches = (targetAccuracy * 12).toFixed(3);

        const message =
            `Zero-finding algorithm failed to converge.\n` +
            `Iterations:     ${iterationsCount}\n` +
            `Final error:    ${errorInches}" (target: ${targetInches}")\n` +
            `Last elevation: ${elevationDeg}° (${elevationMOA} MOA)\n` +
            `Hint: Target may be beyond maximum range or accuracy too strict.`;

        return new ZeroFindingError(
            message,
            zeroFindingError,
            iterationsCount,
            lastBarrelElevationRad
        );
    }
}

/**
 * @brief Error thrown when trajectory intercepts an obstacle or ground
 *
 * Occurs when trajectory calculation detects intersection with terrain,
 * obstacle, or other constraint before reaching target.
 *
 * TYPICAL CAUSES:
 * - Trajectory passes below ground level
 * - Intersection with obstacle in path
 * - Minimum altitude constraint violated
 * - Target behind intervening terrain
 *
 * Contains snapshot of trajectory state at point of interception
 * for analysis and debugging.
 *
 * @property rawData Basic trajectory data at interception point
 * @property fullData Complete trajectory data with all derived quantities
 */
class InterceptionError extends SolverRuntimeError {
    constructor(
        message: string,
        public rawData: BaseTrajData,
        public fullData: TrajectoryData
    ) {
        super(message);
        this.name = "InterceptionError";

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, InterceptionError);
        }
    }

    /**
     * @brief Creates a formatted error message with interception details
     */
    static create(
        rawData: BaseTrajData,
        fullData: TrajectoryData,
        reason: string = "Unknown"
    ): InterceptionError {
        const time = rawData.time.toFixed(3);
        const distance = fullData.distance.toFixed(1);
        const height = fullData.height.toFixed(1);
        const velocity = fullData.velocity.toFixed(1);

        const message =
            `Trajectory intercepted obstacle or constraint.\n` +
            `Reason:   ${reason}\n` +
            `Time:     ${time} s\n` +
            `Distance: ${distance} ft\n` +
            `Height:   ${height} ft\n` +
            `Velocity: ${velocity} fps`;

        return new InterceptionError(message, rawData, fullData);
    }

    /**
     * @brief Get human-readable summary of interception
     */
    getSummary(): {
        time: number;
        distance: number;
        height: number;
        velocity: number;
        mach: number;
    } {
        return {
            time: this.rawData.time,
            distance: this.fullData.distance,
            height: this.fullData.height,
            velocity: this.fullData.velocity,
            mach: this.fullData.mach
        };
    }

    /**
     * @brief Get formatted string summary of interception
     */
    getSummaryString(): string {
        const summary = this.getSummary();
        return `Time: ${summary.time.toFixed(3)}s, ` +
            `Distance: ${summary.distance.toFixed(1)}ft, ` +
            `Height: ${summary.height.toFixed(1)}ft, ` +
            `Velocity: ${summary.velocity.toFixed(1)}fps, ` +
            `Mach: ${summary.mach.toFixed(2)}`;
    }
}

/**
 * @brief Type guard to check if error is solver-related
 */
function isSolverError(error: unknown): error is SolverRuntimeError {
    return error instanceof SolverRuntimeError;
}

/**
 * @brief Type guard for OutOfRangeError
 */
function isOutOfRangeError(error: unknown): error is OutOfRangeError {
    return error instanceof OutOfRangeError;
}

/**
 * @brief Type guard for ZeroFindingError
 */
function isZeroFindingError(error: unknown): error is ZeroFindingError {
    return error instanceof ZeroFindingError;
}

/**
 * @brief Type guard for InterceptionError
 */
function isInterceptionError(error: unknown): error is InterceptionError {
    return error instanceof InterceptionError;
}

export {
    SolverRuntimeError,
    OutOfRangeError,
    ZeroFindingError,
    InterceptionError,
    isSolverError,
    isOutOfRangeError,
    isZeroFindingError,
    isInterceptionError
};