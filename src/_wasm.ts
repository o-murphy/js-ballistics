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

export type * from '@wasm/bclibc';
export * from '@wasm/bclibc';

export { type BCLIBC };

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

export type Config = bclibc._Config;
export type HitOutput = bclibc._HitOutput;
export type TrajectoryRequest = bclibc._TrajectoryRequest;
export type BaseTrajData = bclibc._BaseTrajData;
export type ShotPropsInput = bclibc._ShotPropsInput
