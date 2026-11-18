/**
 * The shape of `BCLIBCFFI_get_layout()` as src/wasm/abi.ts reads it: for each struct its size, then the offset of each
 * field, the structs in the order they joined the ABI, the newest at the end.
 */

import { describe, test, expect } from "@jest/globals";
import { WasmManager } from "../src/_wasm";
import { LAYOUT_FIELD_COUNT, layoutIndex, parseLayout } from "../src/wasm/abi";
import { testWasm } from "./wasmAvailable";

describe("ABI layout", () => {
    test("96 values: the 85 of the structs of the first ABI, StepStats (3) and ZeroInit (8) after them", () => {
        expect(LAYOUT_FIELD_COUNT).toBe(96);
    });

    test("a struct that joins the ABI goes at the end: StepStats and ZeroInit follow Error", () => {
        expect(layoutIndex("config")).toBe(0);
        expect(layoutIndex("error")).toBe(78);
        expect(layoutIndex("stepStats")).toBe(85);
        expect(layoutIndex("zeroInit")).toBe(88);
    });

    test("parseLayout reads StepStats and ZeroInit", () => {
        const values = Array.from({ length: LAYOUT_FIELD_COUNT }, (_, i) => i);
        values.splice(layoutIndex("stepStats"), 3, 8, 0, 4); // size, accepted, rejected
        values.splice(layoutIndex("zeroInit"), 8, 56, 0, 4, 8, 16, 24, 32, 40);
        const layout = parseLayout(values);
        expect(layout.stepStats).toEqual({ size: 8, accepted: 0, rejected: 4 });
        expect(layout.zeroInit).toEqual({
            size: 56,
            status: 0,
            reserved: 4,
            look_angle_rad: 8,
            slant_range_ft: 16,
            target_x_ft: 24,
            target_y_ft: 32,
            start_height_ft: 40,
        });
    });

    testWasm("the module's BCLIBCFFI_get_layout has the same count (it throws on a mismatch)", async () => {
        await expect(WasmManager.init()).resolves.toBeDefined();
    });
});
