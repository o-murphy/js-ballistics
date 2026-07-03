// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
interface WasmModule {}

type EmbindString = ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | string;
export interface ClassHandle {
    isAliasOf(other: ClassHandle): boolean;
    delete(): void;
    deleteLater(): this;
    isDeleted(): boolean;
    // @ts-ignore - If targeting lower than ESNext, this symbol might not exist.
    [Symbol.dispose](): void;
    clone(): this;
}
export type _InterpMethod = 0 | 1;

export type _TerminationReason = 0 | 1 | 2 | 3 | 4 | 5;

export type _TrajFlag = 0 | 1 | 2 | 3 | 4 | 8 | 16 | 31 | 32;

export type _IntegrationMethod = 0 | 1;

export type _BaseTrajDataInterpKey = 0 | 2 | 3 | 4 | 5 | 6 | 7 | 1;

export type _TrajectoryDataInterpKey =
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;

export interface _WindList extends ClassHandle, Iterable<_Wind> {
    size(): number;
    get(_0: number): _Wind | undefined;
    push_back(_0: _Wind): void;
    resize(_0: number, _1: _Wind): void;
    set(_0: number, _1: _Wind): boolean;
}

export interface _DragTable extends ClassHandle, Iterable<_DragTablePoint> {
    size(): number;
    get(_0: number): _DragTablePoint | undefined;
    push_back(_0: _DragTablePoint): void;
    resize(_0: number, _1: _DragTablePoint): void;
    set(_0: number, _1: _DragTablePoint): boolean;
}

export interface _Vector extends ClassHandle {
    x: number;
    y: number;
    z: number;
    add(_0: _Vector): _Vector;
    sub(_0: _Vector): _Vector;
    neg(): _Vector;
    norm(): _Vector;
    copy(): _Vector;
    iadd(_0: _Vector): void;
    isub(_0: _Vector): void;
    inorm(): void;
    mul(_0: number): _Vector;
    div(_0: number): _Vector;
    dot(_0: _Vector): number;
    imul(_0: number): void;
    idiv(_0: number): void;
    fusedMultiplyAdd(_0: _Vector, _1: number): _Vector;
    fusedMultiplySubtract(_0: _Vector, _1: number): _Vector;
    linearCombination(_0: _Vector, _1: number, _2: _Vector, _3: number): _Vector;
    linearCombination4(
        _0: _Vector,
        _1: number,
        _2: _Vector,
        _3: number,
        _4: _Vector,
        _5: number,
        _6: _Vector,
        _7: number
    ): _Vector;
    mag(): number;
    magSquared(): number;
    toString(): string;
}

export type _Config = {
    stepMultiplier: number;
    zeroFindingAccuracy: number;
    minimumVelocity: number;
    maximumDrop: number;
    maxIterations: number;
    gravityConstant: number;
    minimumAltitude: number;
};

export type _Wind = {
    velocity_fps: number;
    direction_from_rad: number;
    until_distance_ft: number;
    MAX_DISTANCE_FEET: number;
};

export type _DragTablePoint = {
    Mach: number;
    CD: number;
};

export type _TrajectoryRequest = {
    range_limit_ft: number;
    range_step_ft: number;
    time_step: number;
    dense_output: boolean;
    filter_flags: _TrajFlag;
};

export type _MaxRangeResult = {
    angle_at_max_rad: number;
    max_range_ft: number;
};

export type _TrajectoryData = {
    time: number;
    distance_ft: number;
    velocity_fps: number;
    mach: number;
    height_ft: number;
    slant_height_ft: number;
    drop_angle_rad: number;
    windage_ft: number;
    windage_angle_rad: number;
    slant_distance_ft: number;
    angle_rad: number;
    density_ratio: number;
    drag: number;
    energy_ft_lb: number;
    ogw_lb: number;
    flag: _TrajFlag;
};

export type _ShotPropsInput = {
    bc: number;
    look_angle_rad: number;
    twist_inch: number;
    length_inch: number;
    diameter_inch: number;
    weight_grain: number;
    barrel_elevation_rad: number;
    barrel_azimuth_rad: number;
    sight_height_ft: number;
    cant_angle_rad: number;
    muzzle_velocity_fps: number;
    drag_table: any;
    temp_c: number;
    pressure_hpa: number;
    altitude_ft: number;
    humidity: number;
    latitude_deg: number;
    azimuth_deg: number;
    winds: any;
    method: _IntegrationMethod;
    config: _Config;
};

export type _BaseTrajData = {
    time: number;
    px: number;
    py: number;
    pz: number;
    vx: number;
    vy: number;
    vz: number;
    mach: number;
    position: any;
    velocity: any;
};

export type _Interception = {
    raw_data: _BaseTrajData;
    full_data: _TrajectoryData;
};

export type _HitOutput = {
    trajectory: any;
    dense_trajectory: any;
    reason: _TerminationReason;
};

interface EmbindModule {
    _InterpMethod: { PCHIP: 0; LINEAR: 1 };
    _TerminationReason: {
        NO_TERMINATE: 0;
        TARGET_RANGE_REACHED: 1;
        MINIMUM_VELOCITY_REACHED: 2;
        MAXIMUM_DROP_REACHED: 3;
        MINIMUM_ALTITUDE_REACHED: 4;
        HANDLER_REQUESTED_STOP: 5;
    };
    _TrajFlag: {
        NONE: 0;
        ZERO_UP: 1;
        ZERO_DOWN: 2;
        ZERO: 3;
        MACH: 4;
        RANGE: 8;
        APEX: 16;
        ALL: 31;
        MRT: 32;
    };
    _IntegrationMethod: { RK4: 0; EULER: 1 };
    _BaseTrajDataInterpKey: {
        TIME: 0;
        POS_X: 2;
        POS_Y: 3;
        POS_Z: 4;
        VEL_X: 5;
        VEL_Y: 6;
        VEL_Z: 7;
        MACH: 1;
    };
    _TrajectoryDataInterpKey: {
        TIME: 0;
        DISTANCE: 1;
        VELOCITY: 2;
        MACH: 3;
        HEIGHT: 4;
        SLANT_HEIGHT: 5;
        DROP_ANGLE: 6;
        WINDAGE: 7;
        WINDAGE_ANGLE: 8;
        SLANT_DISTANCE: 9;
        ANGLE: 10;
        DENSITY_RATIO: 11;
        DRAG: 12;
        ENERGY: 13;
        OGW: 14;
        FLAG: 15;
    };
    _WindList: {
        new (): _WindList;
    };
    _DragTable: {
        new (): _DragTable;
    };
    _Vector: {
        new (): _Vector;
        new (_0: number, _1: number, _2: number): _Vector;
    };
    APEX_IS_MAX_RANGE_RADIANS: number;
    ALLOWED_ZERO_ERROR_FEET: number;
    interpolateTrajectoryData(
        _0: _TrajectoryDataInterpKey,
        _1: number,
        _2: _TrajectoryData,
        _3: _TrajectoryData,
        _4: _TrajectoryData,
        _5: _TrajFlag,
        _6: _InterpMethod
    ): _TrajectoryData;
    getCorrection(_0: number, _1: number): number;
    calculateEnergy(_0: number, _1: number): number;
    calculateOgw(_0: number, _1: number): number;
    hermite(
        _0: number,
        _1: number,
        _2: number,
        _3: number,
        _4: number,
        _5: number,
        _6: number
    ): number;
    interpolate3pt(
        _0: number,
        _1: number,
        _2: number,
        _3: number,
        _4: number,
        _5: number,
        _6: number
    ): number;
    interpolate2pt(_0: number, _1: number, _2: number, _3: number, _4: number): number;
    testThrowRuntimeError(_0: EmbindString): void;
    testThrowCustomException(_0: EmbindString, _1: number, _2: number): void;
    testThrowSolverError(_0: EmbindString): void;
    findApex(_0: _ShotPropsInput): _TrajectoryData;
    findMaxRange(_0: _ShotPropsInput, _1: number, _2: number): _MaxRangeResult;
    findZeroAngle(_0: _ShotPropsInput, _1: number): number;
    integrateRawAt(_0: _ShotPropsInput, _1: _BaseTrajDataInterpKey, _2: number): _Interception;
    interpolateBasetrajData(
        _0: _BaseTrajDataInterpKey,
        _1: number,
        _2: _BaseTrajData,
        _3: _BaseTrajData,
        _4: _BaseTrajData
    ): _BaseTrajData;
    integrate(_0: _ShotPropsInput, _1: _TrajectoryRequest): _HitOutput;
}

export type MainModule = WasmModule & EmbindModule;
export default function MainModuleFactory(options?: unknown): Promise<MainModule>;
