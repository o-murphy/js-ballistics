/**
 * Dense output (the accepted steps of the integrator) and the interpolation in it, by bclibc: through the module
 * (`WasmManager`) and through `Calculator.fire({ denseOutput: true })` / `HitResult.getAt`.
 */

import { test, expect } from "@jest/globals";
import { WasmManager } from "../src/_wasm";
import type { _BaseTrajData } from "../src/wasm/types";
import { Ammo, DragModel, DragTables, Unit, UNew, Weapon, TrajFlag } from "../src";
import { Calculator } from "../src/interface";
import { Shot } from "../src/shot";
import { BclibcError, DomainError, InvalidArgumentError, OutOfBoundsError } from "../src/exceptions";
import { methods } from "./integrationMethods";
import { describeWasm, testWasm } from "./wasmAvailable";
import { plainShot } from "./_rawShot";

const FT = 3.28084;
const request = (denseOutput: boolean, extra = {}) => ({
    range_limit_ft: 1000 * FT,
    range_step_ft: 100 * FT,
    time_step: 0,
    dense_output: denseOutput,
    filter_flags: TrajFlag.RANGE,
    ...extra,
});

describeWasm.each(methods)("dense output, module, $name", ({ method }) => {
    const shot = () => plainShot({ method, barrel_elevation_rad: 0.005 });

    test("the steps: time-ordered, from the muzzle to the end; the rows are those of the plain integration", async () => {
        const bclibc = await WasmManager.init();
        const dense = bclibc.integrate(shot(), request(true));
        const plain = bclibc.integrate(shot(), request(false));

        expect(plain.dense_trajectory).toEqual([]);
        expect(dense.trajectory).toHaveLength(plain.trajectory.length);
        expect(dense.reason).toBe(plain.reason);
        expect(dense.trajectory.at(-1)!.distance_ft).toBeCloseTo(plain.trajectory.at(-1)!.distance_ft, 6);

        const steps = dense.dense_trajectory;
        expect(steps.length).toBeGreaterThanOrEqual(3);
        expect(steps[0].time).toBe(0);
        for (let i = 1; i < steps.length; i++) expect(steps[i].time).toBeGreaterThan(steps[i - 1].time);
        expect(steps.at(-1)!.px).toBeGreaterThanOrEqual(1000 * FT - 1e-6);
        expect(steps[0].position).toEqual({ x: steps[0].px, y: steps[0].py, z: steps[0].pz });
    });

    test("step statistics for the adaptive methods only", async () => {
        const bclibc = await WasmManager.init();
        const out = bclibc.integrate(shot(), request(true));
        const adaptive = [3, 4, 5].includes(method);
        expect(out.step_stats !== undefined).toBe(adaptive);
        expect(out.step_stats?.accepted ?? 1).toBeGreaterThan(0);
        expect(out.step_stats?.rejected ?? 0).toBeGreaterThanOrEqual(0);
    });

    test("denseGetAt: an exact step, a position; the slant height; the record of a step", async () => {
        const bclibc = await WasmManager.init();
        const base = bclibc._BaseTrajDataInterpKey;
        const out = bclibc.integrate(shot(), request(true));
        const steps = out.dense_trajectory;

        const exact = bclibc.denseGetAt(steps, base.TIME, steps[2].time, 0);
        expect(exact.px).toBe(steps[2].px);
        expect(exact.vy).toBe(steps[2].vy);

        const x = 500 * FT;
        const atX = bclibc.denseGetAt(steps, base.POS_X, x, 0);
        expect(atX.px).toBeCloseTo(x, 9);
        expect(atX.time).toBeGreaterThan(0);

        // the muzzle is below the line of sight, so the bullet crosses it going up
        const up = bclibc.denseGetAtSlantHeight(steps, 0, 0);
        expect(Math.abs(up.py)).toBeLessThan(1e-6);

        const row = 300 * FT; // 3 x 100 m: one of the requested rows
        const step = bclibc.denseGetAt(steps, base.POS_X, row, 0);
        const full = bclibc.trajectoryDataFromStep(shot(), step, TrajFlag.RANGE);
        expect(full.flag).toBe(TrajFlag.RANGE);
        expect(full.distance_ft).toBeCloseTo(row, 6);
        const same = out.trajectory.find((r) => Math.abs(r.distance_ft - row) < 1e-3)!;
        // the interpolation of the accepted steps (PCHIP) against the integrator's own at the row: the adaptive methods take
        // long steps, so they differ more (a centimetre or two)
        const adaptive = [3, 4, 5].includes(method);
        expect(Math.abs(full.height_ft - same.height_ft)).toBeLessThan(adaptive ? 0.1 : 0.01);
        expect(Math.abs(full.velocity_fps - same.velocity_fps)).toBeLessThan(adaptive ? 2 : 0.5);
    });
});

describeWasm("dense output, errors (bclibc 2.2: a type for every kind)", () => {
    const stream = async (): Promise<_BaseTrajData[]> => {
        const bclibc = await WasmManager.init();
        return bclibc.integrate(plainShot({ barrel_elevation_rad: 0.005 }), request(true)).dense_trajectory;
    };

    testWasm("a value beyond the stream is an OutOfBoundsError, with the range of the stream", async () => {
        const bclibc = await WasmManager.init();
        const steps = await stream();
        let caught: unknown;
        try {
            bclibc.denseGetAt(steps, bclibc._BaseTrajDataInterpKey.TIME, 1e6, 0);
        } catch (error) {
            caught = error;
        }
        expect(caught).toBeInstanceOf(OutOfBoundsError);
        expect(caught).toBeInstanceOf(BclibcError);
        expect(caught).toMatchObject({
            kind: "outOfBounds",
            requestedValue: 1e6,
            minimumValue: steps[0].time,
            maximumValue: steps.at(-1)!.time,
        });
    });

    testWasm("fewer than 3 steps is a DomainError", async () => {
        const bclibc = await WasmManager.init();
        const steps = await stream();
        expect(() => bclibc.denseGetAt(steps.slice(0, 2), bclibc._BaseTrajDataInterpKey.TIME, 0, 0)).toThrow(DomainError);
        expect(() => bclibc.denseGetAt([], bclibc._BaseTrajDataInterpKey.TIME, 0, 0)).toThrow(DomainError);
    });

    testWasm("a tolerance out of range is an InvalidArgumentError", async () => {
        const bclibc = await WasmManager.init();
        expect(() =>
            bclibc.integrate(plainShot({ method: 4 }), request(true, { relative_tolerance: -1 }))
        ).toThrow(InvalidArgumentError);
    });

    testWasm("a drag table of one point is an InvalidArgumentError", async () => {
        const bclibc = await WasmManager.init();
        const one = plainShot({ drag_table: [{ Mach: 1, CD: 0.3 }] });
        expect(() => bclibc.findZeroAngle(one, 300)).toThrow(InvalidArgumentError);
    });
});

const makeShot = () =>
    new Shot({
        weapon: new Weapon({ sightHeight: UNew.Inch(1), zeroElevation: UNew.Degree(0.06) }),
        ammo: new Ammo({
            dm: new DragModel({ bc: 0.223, dragTable: DragTables.G7, weight: 168, diameter: 0.308, length: 1.282 }),
            mv: UNew.FPS(2750),
            powderTemp: UNew.Celsius(15),
        }),
    });

describeWasm.each(methods)("dense output, Calculator and HitResult, $name", ({ method }) => {
    const fire = (denseOutput: boolean, step = 100) =>
        new Calculator({ method }).fire({
            shot: makeShot(),
            trajectoryRange: UNew.Meter(1000),
            trajectoryStep: UNew.Meter(step),
            denseOutput,
        });

    test("denseOutput keeps the steps, and the rows are the same", async () => {
        const dense = await fire(true);
        const plain = await fire(false);
        expect(plain.denseSteps).toBeUndefined();
        expect(dense.denseSteps!.length).toBeGreaterThan(dense.records.length);
        expect(dense.records).toHaveLength(plain.records.length);
    });

    test("getAt interpolates in the dense output: time, distance, slant height", async () => {
        const hit = await fire(true);
        const steps = hit.denseSteps!;

        const t = 0.5 * (steps[3].time + steps[4].time);
        expect((await hit.getAt(0, t)).time).toBeCloseTo(t, 12);

        const x = UNew.Meter(250).foot;
        expect((await hit.getAt(1, x)).distance.foot).toBeCloseTo(x, 6);

        expect(Math.abs((await hit.getAt(5, 0)).slantHeight.foot)).toBeLessThan(1e-6);
    });

    test("getAt for distance agrees with the interpolation between the rows (a few cm at most)", async () => {
        const x = UNew.Meter(150).foot;
        const viaDense = await (await fire(true)).getAt(1, x);
        const viaRows = await (await fire(false)).getAt(1, x);
        expect(viaRows.distance.foot).toBeCloseTo(x, 6);
        expect(Math.abs(viaRows.height.In(Unit.Meter) - viaDense.height.In(Unit.Meter))).toBeLessThan(0.02);
        expect(Math.abs(viaRows.velocity.fps - viaDense.velocity.fps)).toBeLessThan(1.0);
    });

    test("getAtDistance is still the nearest row", async () => {
        const hit = await fire(true);
        const near = hit.getAtDistance(UNew.Meter(150));
        expect(near.distance.In(Unit.Meter)).toBeCloseTo(200, 3);
    });

    test("a value the trajectory does not reach is an OutOfBoundsError", async () => {
        const hit = await fire(true);
        await expect(hit.getAt(0, 1e6)).rejects.toBeInstanceOf(OutOfBoundsError);
    });
});

describeWasm("dense output, adaptive tolerances", () => {
    test("fire passes the tolerances; a bad one is an InvalidArgumentError", async () => {
        const calc = new Calculator({ method: 4 });
        const hit = await calc.fire({
            shot: makeShot(),
            trajectoryRange: UNew.Meter(1000),
            trajectoryStep: UNew.Meter(100),
            denseOutput: true,
            relativeTolerance: 1e-9,
            absoluteTolerance: 1e-9,
        });
        expect(hit.denseSteps!.length).toBeGreaterThan(0);
        await expect(
            calc.fire({
                shot: makeShot(),
                trajectoryRange: UNew.Meter(1000),
                denseOutput: true,
                relativeTolerance: -1,
            })
        ).rejects.toBeInstanceOf(InvalidArgumentError);
    });
});
