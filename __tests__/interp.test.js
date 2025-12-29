// tests/wasm/interp.test.js

import { loadBclibc } from "../src";

describe("BCLIBC Interpolation Tests (WASM)", () => {
    let BCLIBC;

    beforeAll(async () => {
        BCLIBC = await loadBclibc();
    });

    // =========================================================================
    // Enums
    // =========================================================================
    describe("Enums", () => {
        test("InterpMethod values", () => {
            expect(BCLIBC._InterpMethod.PCHIP.value).toBe(0);
            expect(BCLIBC._InterpMethod.LINEAR.value).toBe(1);
        });
    });

    // =========================================================================
    // Linear interpolation (2pt)
    // =========================================================================
    describe("Linear interpolation (2pt)", () => {
        test("success case", () => {
            const r = BCLIBC.interpolate2pt(5, 0, 0, 10, 100);
            expect(r).toBe(50);
        });

        test("left boundary", () => {
            const r = BCLIBC.interpolate2pt(0, 0, 0, 10, 100);
            expect(r).toBe(0);
        });

        test("right boundary", () => {
            const r = BCLIBC.interpolate2pt(10, 0, 0, 10, 100);
            expect(r).toBe(100);
        });

        test("zero division", () => {
            expect(() => BCLIBC.interpolate2pt(5, 10, 0, 10, 100)).toThrow();
        });
    });

    // =========================================================================
    // 3-point PCHIP interpolation
    // =========================================================================
    describe("PCHIP interpolation (3pt)", () => {
        test("first segment", () => {
            const v = BCLIBC.interpolate3pt(2.5, 0, 5, 10, 0, 25, 100);
            expect(v).toBeGreaterThan(0);
            expect(v).toBeLessThan(25);
        });

        test("second segment", () => {
            const v = BCLIBC.interpolate3pt(7.5, 0, 5, 10, 0, 25, 100);
            expect(v).toBeGreaterThan(25);
            expect(v).toBeLessThan(100);
        });

        test("middle point", () => {
            const v = BCLIBC.interpolate3pt(5, 0, 5, 10, 0, 25, 100);
            expect(v).toBeCloseTo(25, 2);
        });
    });

    // =========================================================================
    // Hermite interpolation
    // =========================================================================
    describe("Hermite interpolation", () => {
        test("linear case (slopes = 1)", () => {
            const v = BCLIBC.hermite(0.5, 0, 1, 0, 1, 1, 1);
            expect(v).toBeCloseTo(0.5, 2);
        });

        test("flat slopes (S-curve)", () => {
            const v = BCLIBC.hermite(0.5, 0, 1, 0, 1, 0, 0);
            expect(v).toBeGreaterThan(0);
            expect(v).toBeLessThan(1);
        });

        test("left boundary", () => {
            const v = BCLIBC.hermite(0, 0, 1, 0, 1, 0.5, 0.5);
            expect(v).toBeCloseTo(0, 5);
        });

        test("right boundary", () => {
            const v = BCLIBC.hermite(1, 0, 1, 0, 1, 0.5, 0.5);
            expect(v).toBeCloseTo(1, 5);
        });
    });

    // =========================================================================
    // Real-world ballistics example
    // =========================================================================
    describe("Ballistics example", () => {
        test("velocity at 250m", () => {
            const v = BCLIBC.interpolate3pt(250, 0, 500, 1000, 850, 800, 750);
            expect(v).toBeGreaterThan(800);
            expect(v).toBeLessThan(850);
        });

        test("velocity at 750m", () => {
            const v = BCLIBC.interpolate3pt(750, 0, 500, 1000, 850, 800, 750);
            expect(v).toBeGreaterThan(750);
            expect(v).toBeLessThan(800);
        });
    });

    // =========================================================================
    // Performance (smoke only, no asserts on time)
    // =========================================================================
    describe("Performance (smoke)", () => {
        test("interpolation calls do not throw", () => {
            expect(() => {
                for (let i = 0; i < 10_000; i++) {
                    BCLIBC.interpolate2pt(5, 0, 0, 10, 100);
                    BCLIBC.interpolate3pt(2.5, 0, 5, 10, 0, 25, 100);
                    BCLIBC.hermite(0.5, 0, 1, 0, 1, 0, 0);
                }
            }).not.toThrow();
        });
    });
});
