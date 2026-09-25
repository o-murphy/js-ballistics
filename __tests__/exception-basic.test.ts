/**
 * Basic Exception Handling Test
 *
 * The errors of the C++ core come back from the module as status codes and are thrown here as JavaScript errors.
 */

import { expect, test } from "@jest/globals";
import { WasmManager } from "../src/_wasm";
import { SolverRuntimeError } from "../src/exceptions";
import { describeWasm } from "./wasmAvailable";
import { plainShot } from "./_rawShot";

describeWasm("Basic Exception Handling", () => {
    test("a std::exception of the core is a JavaScript Error with its message", async () => {
        const bclibc = await WasmManager.init();
        let caught: unknown;
        try {
            bclibc.interpolate2pt(5, 10, 0, 10, 100); // x0 == x1
        } catch (error) {
            caught = error;
        }
        expect(caught).toBeInstanceOf(Error);
        expect(caught).not.toBeInstanceOf(SolverRuntimeError);
        expect((caught as Error).message).toContain("Zero division");
    });

    test("an invalid argument is a JavaScript Error too", async () => {
        const bclibc = await WasmManager.init();
        expect(() => bclibc.findZeroAngle(plainShot({ drag_table: [{ Mach: 0, CD: 0.3 }] }), 300)).toThrow(
            "PCHIP requires at least 2 points"
        );
    });

    test("the module keeps working after an error", async () => {
        const bclibc = await WasmManager.init();
        const before = bclibc.findZeroAngle(plainShot(), 300);
        for (let i = 0; i < 50; i++) {
            expect(() => bclibc.findZeroAngle(plainShot(), 60000)).toThrow(SolverRuntimeError);
        }
        expect(bclibc.findZeroAngle(plainShot(), 300)).toBe(before);
    });
});
