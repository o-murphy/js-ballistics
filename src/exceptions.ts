import { Angular, Distance } from "./unit"; // Assuming 'unit.ts' exists
import { TrajectoryData } from "./trajectory_data"; // Assuming 'trajectory_data.ts' exists

export {
    ValueError,
    UnitTypeError,
    UnitConversionError,
    UnitAliasError,
    ZeroFindingError,
    TrajectoryRangeError,
};

// You might need a base ValueError if you don't have one, or extend from a standard Error
class ValueError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "ValueError";
    }
}

class UnitTypeError extends TypeError {
    constructor(message?: string) {
        super(message);
        this.name = "UnitTypeError";
    }
}

class UnitConversionError extends UnitTypeError {
    constructor(message?: string) {
        super(message);
        this.name = "UnitConversionError";
    }
}

class UnitAliasError extends ValueError {
    // Assuming ValueError is a base custom error or standard JS Error
    constructor(message?: string) {
        super(message);
        this.name = "UnitAliasError";
    }
}

class ZeroFindingError extends Error {
    public zeroFindingError: number;
    public iterationsCount: number;
    public lastBarrelElevation: Angular;

    constructor(
        zeroFindingError: number,
        iterationsCount: number,
        lastBarrelElevation: Angular,
    ) {
        super(
            `Zero vertical error ${zeroFindingError} feet, after ${iterationsCount} iterations.`,
        );
        this.name = "ZeroFindingError";
        this.zeroFindingError = zeroFindingError;
        this.iterationsCount = iterationsCount;
        this.lastBarrelElevation = lastBarrelElevation;
    }
}

class TrajectoryRangeError extends Error {
    public reason: string;
    public incompleteTrajectory: TrajectoryData[];
    public lastDistance: Distance | null;

    public static readonly MinimumVelocityReached: string =
        "Minimum velocity reached";
    public static readonly MaximumDropReached: string = "Maximum drop reached";
    public static readonly MinimumAltitudeReached: string =
        "Minimum altitude reached";

    constructor(reason: string, trajectory: TrajectoryData[]) {
        let message = `Max range not reached: (${reason})`;
        let lastDistance: Distance | null = null;

        if (trajectory.length > 0) {
            lastDistance = trajectory[trajectory.length - 1].distance;
            message += `, last distance: ${lastDistance}`;
        }

        super(message);
        this.name = "RangeError";
        this.reason = reason;
        this.incompleteTrajectory = trajectory;
        this.lastDistance = lastDistance;
    }
}
