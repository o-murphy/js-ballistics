/**
 * Exception Type Verification Test
 *
 * Tests that C++ exceptions are converted to proper JavaScript exception types
 * from src/exceptions.ts
 */

import { loadBclibc } from "../src/_wasm";
import {
    SolverRuntimeError,
    ZeroFindingError,
    OutOfRangeError,
    InterceptionError,
} from "../src/exceptions";

describe("Exception Type Conversion", () => {
    test("globalThis should have exception classes registered", () => {
        expect((globalThis as any).SolverRuntimeError).toBe(SolverRuntimeError);
        expect((globalThis as any).ZeroFindingError).toBe(ZeroFindingError);
        expect((globalThis as any).OutOfRangeError).toBe(OutOfRangeError);
        expect((globalThis as any).InterceptionError).toBe(InterceptionError);
    });

    test("C++ SolverRuntimeError should become JS SolverRuntimeError", async () => {
        const bclibc = await loadBclibc();

        try {
            (bclibc as any).testThrowSolverError("Test solver error");
            fail("Should have thrown an error");
        } catch (error: any) {
            console.log("Error name:", error.name);
            console.log("Error constructor:", error.constructor.name);
            console.log("Is Error:", error instanceof Error);
            console.log("Is SolverRuntimeError:", error instanceof SolverRuntimeError);

            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(SolverRuntimeError);
            expect(error.name).toBe("SolverRuntimeError");
        }
    });
});
