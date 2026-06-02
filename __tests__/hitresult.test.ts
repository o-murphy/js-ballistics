import { expect, describe, test, beforeAll } from "@jest/globals";
import { WASM_AVAILABLE } from "./wasmAvailable";
import {
    Ammo,
    DragModel,
    DragTables,
    Distance,
    UNew,
    Weapon,
    Wind,
    IntegrationMethod,
    TrajFlag,
} from "../src";
import { Calculator } from "../src/interface";
import { Shot } from "../src/shot";
import { HitResult, DangerSpace } from "../src/trajectory_data";

const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

// Matches Python's TestHitResult fixture (without powder sensitivity)
const makeShotAndCalc = (method: typeof IntegrationMethod.RK4) => {
    const dm = new DragModel({
        bc: 0.223,
        dragTable: DragTables.G7,
        weight: 168,
        diameter: 0.308,
        length: 1.282,
    });
    const ammo = new Ammo({ dm, mv: UNew.FPS(2750), powderTemp: UNew.Celsius(15) });
    const shot = new Shot({
        weapon: new Weapon({ sightHeight: UNew.Inch(1) }),
        ammo,
        winds: [new Wind({ velocity: 2, directionFrom: 90 })],
    });
    const calc = new Calculator({ method });
    return { shot, calc };
};

(WASM_AVAILABLE ? describe : describe.skip).each(methods)("TestHitResult $name", (obj) => {
    const { method } = obj;
    let shot: Shot;
    let calc: Calculator;
    let shotResult: HitResult;

    beforeAll(async () => {
        ({ shot, calc } = makeShotAndCalc(method));
        await calc.setWeaponZero(shot, UNew.Foot(300));
        shotResult = await calc.fire({
            shot,
            trajectoryRange: UNew.Yard(1000),
            trajectoryStep: UNew.Yard(10),
            filterFlags: TrajFlag.ALL,
        });
    });

    // -------------------------------------------------------------------------
    // Flag accessors
    // -------------------------------------------------------------------------

    test("test_flags_zero_up", () => {
        const zeroUp = shotResult.flag(TrajFlag.ZERO_UP);
        expect(zeroUp).not.toBeUndefined();
        // Should be near the muzzle (first zero before apex)
        expect(zeroUp!.distance.In(Distance.Yard)).toBeCloseTo(40.5, 0);
    });

    test("test_flags_zero_down", () => {
        const zeroDn = shotResult.flag(TrajFlag.ZERO_DOWN);
        expect(zeroDn).not.toBeUndefined();
        // Should be near the zero distance
        expect(zeroDn!.distance.In(Distance.Yard)).toBeCloseTo(100.0, 0);
    });

    test("test_flags_apex", () => {
        const apex = shotResult.flag(TrajFlag.APEX);
        expect(apex).not.toBeUndefined();
        // Apex lies between ZERO_UP and ZERO_DOWN
        const zeroUp = shotResult.flag(TrajFlag.ZERO_UP)!;
        const zeroDn = shotResult.flag(TrajFlag.ZERO_DOWN)!;
        expect(apex!.distance.In(Distance.Yard)).toBeGreaterThan(
            zeroUp.distance.In(Distance.Yard)
        );
        expect(apex!.distance.In(Distance.Yard)).toBeLessThan(
            zeroDn.distance.In(Distance.Yard)
        );
        expect(apex!.distance.In(Distance.Yard)).toBeCloseTo(70.5, 0);
    });

    test("test_flags_mach", () => {
        const mach = shotResult.flag(TrajFlag.MACH);
        expect(mach).not.toBeUndefined();
        expect(mach!.distance.In(Distance.Yard)).toBeCloseTo(963.0, 0);
    });

    test("test_flags_ordering", () => {
        const zeroUp = shotResult.flag(TrajFlag.ZERO_UP)!;
        const zeroDn = shotResult.flag(TrajFlag.ZERO_DOWN)!;
        const apex = shotResult.flag(TrajFlag.APEX)!;
        const mach = shotResult.flag(TrajFlag.MACH)!;

        expect(zeroUp.distance.rawValue).toBeLessThan(apex.distance.rawValue);
        expect(apex.distance.rawValue).toBeLessThan(zeroDn.distance.rawValue);
        expect(zeroDn.distance.rawValue).toBeLessThan(mach.distance.rawValue);
    });

    test("test_get_at_unrequested_flag throws", async () => {
        const hr = await calc.fire({
            shot,
            trajectoryRange: UNew.Meter(100),
            filterFlags: TrajFlag.RANGE,
        });
        expect(() => hr.flag(TrajFlag.ZERO)).toThrow();
    });

    // -------------------------------------------------------------------------
    // DangerSpace
    // -------------------------------------------------------------------------

    test("test_danger_space_downward_trajectory", async () => {
        const ds = await shotResult.dangerSpace(UNew.Yard(500), UNew.Meter(1.5));
        expect(ds).toBeInstanceOf(DangerSpace);
        expect(ds.begin.distance.In(Distance.Yard)).toBeCloseTo(388.7, 0);
        expect(ds.end.distance.In(Distance.Yard)).toBeCloseTo(580.8, 0);
        // begin must precede end
        expect(ds.begin.distance.rawValue).toBeLessThan(ds.end.distance.rawValue);
    });

    test("test_danger_space_begin_at_muzzle", async () => {
        // Target too close to muzzle — begin clamps to trajectory[0]
        const ds = await shotResult.dangerSpace(UNew.Yard(200), UNew.Inch(10));
        expect(ds.begin.distance.In(Distance.Yard)).toBeCloseTo(0.0, 0);
        expect(ds.end.distance.In(Distance.Yard)).toBeCloseTo(254.7, 0);
    });

    test("test_danger_space_extending_past_end", async () => {
        // Target near trajectory end — end clamps to last point
        const ds = await shotResult.dangerSpace(UNew.Yard(990), UNew.Yard(1));
        expect(ds.begin.distance.In(Distance.Yard)).toBeCloseTo(974.9, 0);
        expect(ds.end.distance.In(Distance.Yard)).toBeCloseTo(1000.0, 0);
    });

    test("test_danger_space_upward_with_slant", async () => {
        const { shot: highShot, calc: highCalc } = makeShotAndCalc(method);
        await highCalc.setWeaponZero(highShot, UNew.Foot(300));
        highShot.lookAngle = UNew.Degree(10);
        highShot.relativeAngle = UNew.Degree(2);
        const hr = await highCalc.fire({
            shot: highShot,
            trajectoryRange: UNew.Yard(300),
            trajectoryStep: UNew.Yard(10),
            filterFlags: TrajFlag.ALL,
        });
        const ds = await hr.dangerSpace(UNew.Yard(100), UNew.Yard(1));
        expect(ds.begin.slantDistance.In(Distance.Yard)).toBeCloseTo(85.6, 0);
        expect(ds.end.slantDistance.In(Distance.Yard)).toBeCloseTo(114.5, 0);
    });

    test("test_danger_space_returns_look_angle", async () => {
        const ds = await shotResult.dangerSpace(UNew.Yard(500), UNew.Meter(1.5));
        expect(ds.lookAngle.rad).toBeCloseTo(shot.lookAngle.rad, 10);
    });
});
