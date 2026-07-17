/**
 * Exception Type Verification Test
 *
 * Tests that C++ exceptions are converted to proper JavaScript exception types
 * from src/exceptions.ts
 */

import { WasmManager } from "../src/_wasm";
import {
    SolverRuntimeError,
    ZeroFindingError,
    OutOfRangeError,
    InterceptionError,
} from "../src/exceptions";
import { testWasm } from "./wasmAvailable";

type GlobalWithExceptions = typeof globalThis & {
    SolverRuntimeError: typeof SolverRuntimeError;
    ZeroFindingError: typeof ZeroFindingError;
    OutOfRangeError: typeof OutOfRangeError;
    InterceptionError: typeof InterceptionError;
};

describe("Exception Type Conversion", () => {
    test("globalThis should have exception classes registered", () => {
        const globalWithExceptions = globalThis as GlobalWithExceptions;
        expect(globalWithExceptions.SolverRuntimeError).toBe(SolverRuntimeError);
        expect(globalWithExceptions.ZeroFindingError).toBe(ZeroFindingError);
        expect(globalWithExceptions.OutOfRangeError).toBe(OutOfRangeError);
        expect(globalWithExceptions.InterceptionError).toBe(InterceptionError);
    });

    testWasm("C++ SolverRuntimeError should become JS SolverRuntimeError", async () => {
        const bclibc = await WasmManager.init();

        let caughtError: unknown;
        try {
            bclibc.testThrowSolverError("Test solver error");
        } catch (error) {
            caughtError = error;
        }

        expect(caughtError).toBeInstanceOf(Error);
        expect(caughtError).toBeInstanceOf(SolverRuntimeError);
        expect((caughtError as Error).name).toBe("SolverRuntimeError");
    });
});
