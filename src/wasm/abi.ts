/**
 * The flat C ABI of bclibc (`bclibc_ffi.h`, `BCLIBCFFI_*`) as a WebAssembly module that imports nothing and has
 * its own memory: layout of its structs, memory helpers, and the errors it returns.
 *
 * Nothing here is generated: the byte offsets of the fields are asked of the module itself once, at load time
 * (`BCLIBCFFI_get_layout`, computed with `offsetof`/`sizeof` by the compiler that built it), so this file cannot
 * drift from the C structs.
 */

import * as Exceptions from "../exceptions";

/** Exports of the module (a reactor, built by bclibc's `make wasm`). */
export interface BclibcExports {
    memory: WebAssembly.Memory;
    malloc(size: number): number;
    free(ptr: number): void;
    _initialize?(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

/**
 * Order of the fields of `BCLIBCFFI_get_layout()`: for each struct its size, then the offset of each field. The
 * names are the ones of the JavaScript objects (`_Config`, `_TrajectoryData`, ...) where there is one.
 */
const LAYOUT = {
    config: [
        "stepMultiplier",
        "zeroFindingAccuracy",
        "minimumVelocity",
        "maximumDrop",
        "maxIterations",
        "gravityConstant",
        "minimumAltitude",
    ],
    wind: ["velocity_fps", "direction_from_rad", "until_distance_ft", "max_distance_ft"],
    shot: [
        "bc",
        "weight_grain",
        "diameter_inch",
        "length_inch",
        "muzzle_velocity_fps",
        "sight_height_ft",
        "twist_inch",
        "temp_c",
        "pressure_hpa",
        "altitude_ft",
        "humidity",
        "mach_data",
        "cd_data",
        "drag_table_size",
        "winds",
        "wind_count",
        "look_angle_rad",
        "barrel_elevation_rad",
        "barrel_azimuth_rad",
        "cant_angle_rad",
        "latitude_deg",
        "azimuth_deg",
        "config",
        "method",
    ],
    request: ["range_limit_ft", "range_step_ft", "time_step", "filter_flags"],
    traj: [
        "time",
        "distance_ft",
        "velocity_fps",
        "mach",
        "height_ft",
        "slant_height_ft",
        "drop_angle_rad",
        "windage_ft",
        "windage_angle_rad",
        "slant_distance_ft",
        "angle_rad",
        "density_ratio",
        "drag",
        "energy_ft_lb",
        "ogw_lb",
        "flag",
    ],
    maxRange: ["max_range_ft", "angle_at_max_rad"],
    baseTraj: ["time", "px", "py", "pz", "vx", "vy", "vz", "mach"],
    interception: ["raw_data", "full_data"],
    zeroPoint: ["angle_rad", "point"],
    error: ["code", "message", "f64_0", "f64_1", "f64_2", "i32_0"],
} as const;

type LayoutName = keyof typeof LAYOUT;
export type StructLayout<N extends LayoutName> = { size: number } & Record<(typeof LAYOUT)[N][number], number>;
export type Layout = { [N in LayoutName]: StructLayout<N> };

/** Number of int32 that `BCLIBCFFI_get_layout` writes. */
export const LAYOUT_FIELD_COUNT = Object.values(LAYOUT).reduce((n, fields) => n + 1 + fields.length, 0);

export function parseLayout(values: ArrayLike<number>): Layout {
    const layout: Record<string, Record<string, number>> = {};
    let i = 0;
    for (const [name, fields] of Object.entries(LAYOUT)) {
        const struct: Record<string, number> = { size: values[i++] };
        for (const field of fields) struct[field] = values[i++];
        layout[name] = struct;
    }
    return layout as unknown as Layout;
}

/** The status codes of `BCLIBCFFI_Status`. */
export const Status = {
    OK: 0,
    SOLVER_RUNTIME: 1,
    OUT_OF_RANGE: 2,
    ZERO_FINDING: 3,
    INTERCEPTION: 4,
    GENERIC: 5,
} as const;

const utf8 = new TextDecoder();

/**
 * A view of the module's memory and the allocations made in it for one call. The memory is looked at again after
 * every call into the module: it may have grown, and a grown memory detaches the old `ArrayBuffer`.
 */
export class Memory {
    constructor(private readonly ex: BclibcExports) {}

    view(): DataView {
        return new DataView(this.ex.memory.buffer);
    }

    /** Runs `fn` with an arena: what it allocates is freed when it is done, whatever happens. */
    withArena<T>(fn: (arena: Arena) => T): T {
        const arena = new Arena(this.ex);
        try {
            return fn(arena);
        } finally {
            arena.free();
        }
    }
}

export class Arena {
    private readonly pointers: number[] = [];

    constructor(private readonly ex: BclibcExports) {}

    /** `size` zeroed bytes (0 is a null pointer, for an array that is empty). */
    alloc(size: number): number {
        if (size <= 0) return 0;
        const ptr = this.ex.malloc(size);
        if (!ptr) throw new Error(`bclibc: out of memory (${size} bytes)`);
        new Uint8Array(this.ex.memory.buffer, ptr, size).fill(0);
        this.pointers.push(ptr);
        return ptr;
    }

    view(): DataView {
        return new DataView(this.ex.memory.buffer);
    }

    free(): void {
        for (const ptr of this.pointers) this.ex.free(ptr);
        this.pointers.length = 0;
    }
}

/**
 * The error a call returned, converted to the JavaScript error exposed by this package: the class of the error is made
 * with the message (the same construction it had), the fields of the C++ exception are set on it.
 */
export function errorFromStatus(view: DataView, errPtr: number, layout: Layout): Error {
    const e = layout.error;
    const code = view.getInt32(errPtr + e.code, true);
    const bytes = new Uint8Array(view.buffer, errPtr + e.message, 512);
    const end = bytes.indexOf(0);
    const message = utf8.decode(end < 0 ? bytes : bytes.subarray(0, end));

    // The classes take other arguments than a message; they were always made with one, and given their fields after.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const make = (Class: new (...args: any[]) => Error, name: string, fields: Record<string, unknown> = {}): Error => {
        const error = new Class(message);
        Object.setPrototypeOf(error, Class.prototype);
        error.name = name;
        Object.assign(error, fields);
        return error;
    };

    switch (code) {
        case Status.OUT_OF_RANGE:
            return make(Exceptions.OutOfRangeError, "OutOfRangeError", {
                requestedDistanceFt: view.getFloat64(errPtr + e.f64_0, true),
                maxRangeFt: view.getFloat64(errPtr + e.f64_1, true),
                lookAngleRad: view.getFloat64(errPtr + e.f64_2, true),
            });
        case Status.ZERO_FINDING:
            return make(Exceptions.ZeroFindingError, "ZeroFindingError", {
                zeroFindingError: view.getFloat64(errPtr + e.f64_0, true),
                iterationsCount: view.getInt32(errPtr + e.i32_0, true),
                lastBarrelElevationRad: view.getFloat64(errPtr + e.f64_1, true),
            });
        case Status.INTERCEPTION:
            return make(Exceptions.InterceptionError, "InterceptionError");
        case Status.SOLVER_RUNTIME:
            return make(Exceptions.SolverRuntimeError, "SolverRuntimeError");
        default:
            return new Error(message);
    }
}

/** base64 (what `build/bclibc.js` holds) to bytes. */
export function decodeBase64(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}
