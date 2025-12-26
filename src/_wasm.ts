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
import * as bclibc from '@wasm/bclibc'
import BclibcFactory, {
    type MainModule as BCLIBC,
} from '@wasm/bclibc';

export type * from '@wasm/bclibc';
export * from '@wasm/bclibc';


let bclibcReady: Promise<BCLIBC> | null = null;

const loadBclibc = (): Promise<BCLIBC> => {
    if (!bclibcReady) {
        bclibcReady = BclibcFactory();
    }
    return bclibcReady;
}

export enum IntegrationMethod {
    RK4 = 0,
    EULER = 1,
}

// export interface ShotProps extends Omit<_ShotPropsInput, "winds" | "method"> {
//     winds: _Wind[];
//     method: IntegrationMethod;
// }


export type Config = bclibc._Config;
export type HitOutput = bclibc._HitOutput;
export type TrajectoryRequest = bclibc._TrajectoryRequest;
export type BaseTrajData = bclibc._BaseTrajData;

export interface ShotPropsInput {
    bc: number,
    look_angle: number,
    twist: number,
    length: number,
    diameter: number,
    weight: number,
    barrel_elevation: number,
    barrel_azimuth: number,
    sight_height: number,
    cant_angle: number,
    alt0: number,
    muzzle_velocity: number,
    drag_table: any,
    atmo: bclibc._Atmosphere,
    coriolis: bclibc._Coriolis,
    winds: bclibc._Wind[],
    method: IntegrationMethod,
    config: Config
}

export {
    loadBclibc,
    BclibcFactory,
    type BCLIBC,
};
