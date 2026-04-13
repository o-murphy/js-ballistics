/**
 * WASM Module Manager
 *
 * Centralized singleton manager for the BCLIBC WebAssembly module.
 *
 * Usage:
 * ```typescript
 * import { WasmManager } from './_wasm';
 * await WasmManager.init();
 * const bclibc = WasmManager.get();
 * ```
 */

import MainModuleFactory from "@wasm/bclibc";
import type {
    MainModule as BCLIBC,
    _TrajFlag,
    _IntegrationMethod,
    _TerminationReason,
} from "@wasm/bclibc";
import * as Exceptions from "./exceptions";

// Export all raw types from the WASM module
export type * from "@wasm/bclibc";

// Register exception classes in globalThis for C++ Embind access
if (typeof globalThis !== "undefined") {
    Object.assign(globalThis, Exceptions);
}

let bclibcReady: Promise<BCLIBC> | null = null;
let instance: BCLIBC | null = null;

/**
 * Initializes the WASM module factory
 */
export const loadBclibc = (): Promise<BCLIBC> => {
    if (!bclibcReady) {
        bclibcReady = MainModuleFactory().then((module) => {
            instance = module;
            return module;
        });
    }
    return bclibcReady;
};

/**
 * Singleton Manager for BCLIBC WASM
 */
export const WasmManager = {
    init: loadBclibc,
    get: (): BCLIBC => {
        if (!instance) {
            throw new Error(
                "BCLIBC_WasmManager: WASM module not initialized. Call await WasmManager.init() first."
            );
        }
        return instance;
    },
};

/**
 * Ballistic Solver Integration Methods
 */
export const IntegrationMethod = {
    RK4: 0 as any,
    EULER: 1 as any,
} as const;

/**
 * Trajectory Data Flags
 */
export const TrajFlag = {
    NONE: 0 as any,
    ZERO_UP: 1 as any,
    ZERO_DOWN: 2 as any,
    ZERO: 3 as any, // ZERO_UP | ZERO_DOWN
    MACH: 4 as any,
    RANGE: 8 as any,
    APEX: 16 as any,
    ALL: 31 as any,
    MRT: 32 as any,
} as const;

/**
 * Trajectory Termination Reasons
 */
export const TerminationReason = {
    NO_TERMINATE: 0 as any,
    TARGET_RANGE_REACHED: 1 as any,
    MINIMUM_VELOCITY_REACHED: 2 as any,
    MAXIMUM_DROP_REACHED: 3 as any,
    MINIMUM_ALTITUDE_REACHED: 4 as any,
    HANDLER_REQUESTED_STOP: 5 as any,
} as const;

// Clean type exports for TypeScript
export type IntegrationMethod = _IntegrationMethod;
export type TrajFlag = _TrajFlag;
export type TerminationReason = _TerminationReason;

export type Config = import("@wasm/bclibc")._Config;
export type HitOutput = import("@wasm/bclibc")._HitOutput;
export type TrajectoryRequest = import("@wasm/bclibc")._TrajectoryRequest;
export type BaseTrajData = import("@wasm/bclibc")._BaseTrajData;
export type ShotPropsInput = import("@wasm/bclibc")._ShotPropsInput;
