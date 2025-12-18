import { Shot, Atmo } from "../conditions";
import { _WindSock } from "../engines";
import { Vector } from "./vector";


export const cDegreesFtoR;
export const cDegreesCtoK;
export const cSpeedOfSoundImperial;


enum TerminationReason {
    // Solver specific flags (always include RANGE_ERROR)
    NO_TERMINATE,
    TARGET_RANGE_REACHED,
    MINIMUM_VELOCITY_REACHED,
    MAXIMUM_DROP_REACHED,
    MINIMUM_ALTITUDE_REACHED,
    // Special flag to terminate integration via handler's request
    HANDLER_REQUESTED_STOP,
}

enum TrajFlag {
    NONE = 0,
    ZERO_UP = 1,
    ZERO_DOWN = 2,
    ZERO = ZERO_UP | ZERO_DOWN,
    MACH = 4,
    RANGE = 8,
    APEX = 16,
    ALL = RANGE | ZERO_UP | ZERO_DOWN | MACH | APEX,
    MRT = 32
};

type Config = {
    cStepMultiplier: number;
    cZeroFindingAccuracy: number;
    cMinimumVelocity: number;
    cMaximumDrop: number;
    cMaxIterations: number;
    cGravityConstant: number;
    cMinimumAltitude: number;
}

type CurvePoint = {
    readonly a: number;
    readonly b: number;
    readonly c: number;
}

type Curve = CurvePoint[];
type MachList = number[];

class Atmosphere {
    public _t0: number;
    public _a0: number;
    public _p0: number;
    public _mach: number;
    public density_ratio: number;
    public cLowestTempC: number;

    constructor() {

    }

    density_factor_and_mach_for_altitude(altitude: number, density_ratio_out: number): number { };

    
}

class Termination {
    private _reason: TerminationReason = TerminationReason.NO_TERMINATE;
    constructor() { }
    get reason(): TerminationReason { return this._reason };
    set reason(reason: TerminationReason) { this._reason = reason };
    match(reason: TerminationReason): boolean { return this._reason === reason };
}

type Coriolis = {
    flat_fire_only: boolean;
    coriolisAccelerationLocal: (velocity_vector: Readonly<Vector>, coriolis_acc: Readonly<Vector>) => void;
}

class ShotProps extends Shot {
    wind_sock: _WindSock;
    coriolis: Coriolis;
    atmo: Atmo;
    alt0: number;
    drag_by_mach: (mach: number) => number;
}

export { Termination, TerminationReason, TrajFlag, Coriolis, ShotProps };
