/**
 * WASM Module Manager
 *
 * Centralized singleton manager for the BCLIBC WebAssembly module.
 *
 * Usage:
 * ```typescript
 * import { WasmManager } from './_wasm';
 *
 * // Initialize once
 * await WasmManager.init();
 *
 * // Use synchronously everywhere
 * const bclibc = WasmManager.get();
 * const result = bclibc.findZeroAngle(...);
 * ```
 */
import MainModuleFactory, * as bclibc from '@wasm/bclibc'
import {
    type MainModule as BCLIBC,
} from '@wasm/bclibc';
import {
    SolverRuntimeError,
    ZeroFindingError,
    OutOfRangeError,
    InterceptionError,
} from './exceptions';

export type * from '@wasm/bclibc';
export * from '@wasm/bclibc';

export { type BCLIBC };

// Register exception classes in globalThis for WASM access
if (typeof globalThis !== 'undefined') {
    (globalThis as any).SolverRuntimeError = SolverRuntimeError;
    (globalThis as any).ZeroFindingError = ZeroFindingError;
    (globalThis as any).OutOfRangeError = OutOfRangeError;
    (globalThis as any).InterceptionError = InterceptionError;
}

const BclibcFactory = MainModuleFactory

let bclibcReady: Promise<BCLIBC> | null = null;

export const loadBclibc = (): Promise<BCLIBC> => {
    if (!bclibcReady) {
        bclibcReady = BclibcFactory();
    }
    return bclibcReady;
}

export const IntegrationMethod = {
    RK4: { value: 0 } as const,
    EULER: { value: 1 } as const,
} as const;

export type IntegrationMethod = typeof IntegrationMethod[keyof typeof IntegrationMethod];


export enum TrajFlag {
    NONE = 0,
    ZERO_UP = 1,
    ZERO_DOWN = 2,
    ZERO = ZERO_UP | ZERO_DOWN,
    MACH = 4,
    RANGE = 8,
    APEX = 16,
    ALL = RANGE | ZERO_UP | ZERO_DOWN | MACH | APEX,
    MRT = 32
}

export enum TerminationReason {
    NO_TERMINATE = 0,
    TARGET_RANGE_REACHED = 1,
    MINIMUM_VELOCITY_REACHED = 2,
    MAXIMUM_DROP_REACHED = 3,
    MINIMUM_ALTITUDE_REACHED = 4,
    HANDLER_REQUESTED_STOP = 5
}

export type Config = bclibc._Config;
export type HitOutput = bclibc._HitOutput;
export type TrajectoryRequest = bclibc._TrajectoryRequest;
export type BaseTrajData = bclibc._BaseTrajData;
export type ShotPropsInput = bclibc._ShotPropsInput
