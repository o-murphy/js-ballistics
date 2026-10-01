/**
 * Exception Type Verification Test
 *
 * The status codes of the C ABI become the exception types of src/exceptions.ts.
 */

import { describe, test, expect } from "@jest/globals";
import { WasmManager } from "../src/_wasm";
import {
    SolverRuntimeError,
    ZeroFindingError,
    OutOfRangeError,
    InterceptionError,
} from "../src/exceptions";
import { errorFromStatus, LAYOUT_FIELD_COUNT, parseLayout, Status } from "../src/wasm/abi";
import { testWasm } from "./wasmAvailable";
import { plainShot } from "./_rawShot";

// A BCLIBCFFI_Error in memory, by a layout of our own (the offsets are only needed to be consistent).
const values = new Array<number>(LAYOUT_FIELD_COUNT).fill(0);
values.splice(LAYOUT_FIELD_COUNT - 7, 7, 560, 0, 4, 520, 528, 536, 544); // size, code, message, f64_0..2, i32_0
const layout = parseLayout(values);

function errorOf(code: number, message: string, f64: [number, number, number] = [0, 0, 0], i32 = 0): Error {
    const buffer = new ArrayBuffer(560);
    const view = new DataView(buffer);
    view.setInt32(0, code, true);
    new TextEncoder().encodeInto(message, new Uint8Array(buffer, 4, 512));
    f64.forEach((x, i) => view.setFloat64(520 + i * 8, x, true));
    view.setInt32(544, i32, true);
    return errorFromStatus(view, 0, layout);
}

describe("Exception Type Conversion", () => {
    test("SolverRuntimeError", () => {
        const e = errorOf(Status.SOLVER_RUNTIME, "solver failed");
        expect(e).toBeInstanceOf(SolverRuntimeError);
        expect(e.name).toBe("SolverRuntimeError");
        expect(e.message).toContain("solver failed");
    });

    test("OutOfRangeError keeps the fields of the C++ exception", () => {
        const e = errorOf(Status.OUT_OF_RANGE, "too far", [1000.5, 900.25, 0.125]);
        expect(e).toBeInstanceOf(OutOfRangeError);
        expect(e).toBeInstanceOf(SolverRuntimeError);
        expect(e.name).toBe("OutOfRangeError");
        expect(e).toMatchObject({ requestedDistanceFt: 1000.5, maxRangeFt: 900.25, lookAngleRad: 0.125 });
    });

    test("ZeroFindingError keeps the fields of the C++ exception", () => {
        const e = errorOf(Status.ZERO_FINDING, "no zero", [0.5, 0.0123, 0], 17);
        expect(e).toBeInstanceOf(ZeroFindingError);
        expect(e.name).toBe("ZeroFindingError");
        expect(e).toMatchObject({ zeroFindingError: 0.5, lastBarrelElevationRad: 0.0123, iterationsCount: 17 });
    });

    test("InterceptionError", () => {
        const e = errorOf(Status.INTERCEPTION, "no intercept");
        expect(e).toBeInstanceOf(InterceptionError);
        expect(e.name).toBe("InterceptionError");
    });

    test("any other status is a plain Error, with the message", () => {
        const e = errorOf(Status.GENERIC, "something else");
        expect(e).toBeInstanceOf(Error);
        expect(e).not.toBeInstanceOf(SolverRuntimeError);
        expect(e.message).toBe("something else");
        expect(errorOf(99, "unknown code").message).toBe("unknown code");
    });

    test("a message of the whole 512 bytes has no terminator to look for", () => {
        expect(errorOf(Status.GENERIC, "x".repeat(512)).message).toHaveLength(512);
    });

    testWasm("SolverRuntimeError comes out of the module", async () => {
        const bclibc = await WasmManager.init();
        let caught: unknown;
        try {
            bclibc.findZeroAngle(plainShot(), 60000);
        } catch (error) {
            caught = error;
        }
        expect(caught).toBeInstanceOf(SolverRuntimeError);
        expect((caught as Error).name).toBe("SolverRuntimeError");
    });

    testWasm("InterceptionError comes out of the module", async () => {
        const bclibc = await WasmManager.init();
        expect(() => bclibc.integrateRawAt(plainShot(), bclibc._BaseTrajDataInterpKey.POS_X, 1e9)).toThrow(
            InterceptionError
        );
    });
});
