import { expect, describe, test, beforeAll } from "@jest/globals";
import { WASM_AVAILABLE } from "./wasmAvailable";
import {
    Ammo,
    DragModel,
    DragTables,
    UNew,
    Weapon,
    IntegrationMethod,
} from "../src";
import { Calculator } from "../src/interface";
import { Shot } from "../src/shot";

const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

// Matches Python's TestComputer Coriolis fixture:
// DragModel(0.22, G7), Weapon(sightHeight=4, twist=12), Ammo(2600 fps)
// No weapon twist used for Coriolis tests (gyroscopic drift would mix with Coriolis).
const makeBaseShot = () => {
    const dm = new DragModel({
        bc: 0.22,
        dragTable: DragTables.G7,
        weight: 168,
        diameter: 0.308,
        length: 1.22,
    });
    const ammo = new Ammo({ dm, mv: UNew.FPS(2600) });
    // No twist — so gyroscopic drift is absent and only Coriolis affects windage
    const weapon = new Weapon({ sightHeight: UNew.Inch(4) });
    return new Shot({ weapon, ammo });
};

(WASM_AVAILABLE ? describe : describe.skip).each(methods)("TestCoriolis $name", (obj) => {
    const { method } = obj;
    const range = UNew.Yard(1000);
    const step = UNew.Yard(100);
    let calc: Calculator;
    let baseWindage: number;
    let baseHeight: number;

    beforeAll(async () => {
        calc = new Calculator({ method });
        const base = await calc.fire({
            shot: makeBaseShot(),
            trajectoryRange: range,
            trajectoryStep: step,
        });
        const last = base.trajectory[base.trajectory.length - 1];
        baseWindage = last.windage.rawValue;
        baseHeight = last.height.rawValue;
    });

    // -------------------------------------------------------------------------
    // Flat-fire approximation (latitude only, no azimuth)
    // -------------------------------------------------------------------------

    test("test_coriolis_flat_equator_no_effect", async () => {
        // At equator, flat-fire Coriolis has no horizontal effect
        const shot = makeBaseShot();
        shot.latitudeDeg = 0.0;
        const result = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = result.trajectory[result.trajectory.length - 1];
        expect(last.windage.rawValue).toBeCloseTo(baseWindage, 5);
        expect(last.height.rawValue).toBeCloseTo(baseHeight, 5);
    });

    test("test_coriolis_flat_south_deflects_left", async () => {
        // South of equator — flat-fire Coriolis deflects to the left (negative windage)
        const shot = makeBaseShot();
        shot.latitudeDeg = -40.0;
        const result = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = result.trajectory[result.trajectory.length - 1];
        expect(last.windage.rawValue).toBeLessThan(baseWindage);
    });

    test("test_coriolis_flat_north_deflects_right", async () => {
        // North of equator — flat-fire Coriolis deflects to the right
        const shotNorth = makeBaseShot();
        shotNorth.latitudeDeg = 80.0;
        const resultNorth = await calc.fire({ shot: shotNorth, trajectoryRange: range, trajectoryStep: step });
        const lastNorth = resultNorth.trajectory[resultNorth.trajectory.length - 1];

        const shotSouth = makeBaseShot();
        shotSouth.latitudeDeg = -40.0;
        const resultSouth = await calc.fire({ shot: shotSouth, trajectoryRange: range, trajectoryStep: step });
        const lastSouth = resultSouth.trajectory[resultSouth.trajectory.length - 1];

        // North deflection magnitude exceeds south deflection (80° vs 40°)
        expect(lastNorth.windage.rawValue).toBeGreaterThan(-lastSouth.windage.rawValue);
        // Height should be unchanged by flat-fire approximation
        expect(lastNorth.height.rawValue).toBeCloseTo(baseHeight, 5);
    });

    test("test_coriolis_invalid_latitude_throws", () => {
        const shot = makeBaseShot();
        expect(() => { shot.latitudeDeg = 91.0; }).toThrow();
        expect(() => { shot.latitudeDeg = -91.0; }).toThrow();
    });

    // -------------------------------------------------------------------------
    // Full 3D Coriolis — vary latitude, shoot East
    // -------------------------------------------------------------------------

    test("test_full_coriolis_east_equator_no_windage_shift", async () => {
        // Shooting east at equator: windage == baseline (no horizontal shift from Coriolis)
        const shot = makeBaseShot();
        shot.azimuthDeg = 90.0;
        shot.latitudeDeg = 0.0;
        const result = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = result.trajectory[result.trajectory.length - 1];
        expect(last.windage.rawValue).toBeCloseTo(baseWindage, 5);
    });

    test("test_full_coriolis_east_equator_max_vertical_effect", async () => {
        // Shooting east at equator gives maximum upward vertical Coriolis effect
        const shotBase = makeBaseShot();
        const base = await calc.fire({ shot: shotBase, trajectoryRange: range, trajectoryStep: step });
        const lastBase = base.trajectory[base.trajectory.length - 1];

        const shot = makeBaseShot();
        shot.azimuthDeg = 90.0;
        shot.latitudeDeg = 0.0;
        const result = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = result.trajectory[result.trajectory.length - 1];

        expect(last.height.rawValue).toBeGreaterThan(lastBase.height.rawValue);
    });

    test("test_full_coriolis_windage_decreases_going_south", async () => {
        const shotEq = makeBaseShot();
        shotEq.azimuthDeg = 90.0;
        shotEq.latitudeDeg = 0.0;
        const resultEq = await calc.fire({ shot: shotEq, trajectoryRange: range, trajectoryStep: step });
        const lastEq = resultEq.trajectory[resultEq.trajectory.length - 1];

        const shotSouth = makeBaseShot();
        shotSouth.azimuthDeg = 90.0;
        shotSouth.latitudeDeg = -40.0;
        const resultSouth = await calc.fire({ shot: shotSouth, trajectoryRange: range, trajectoryStep: step });
        const lastSouth = resultSouth.trajectory[resultSouth.trajectory.length - 1];

        expect(lastSouth.windage.rawValue).toBeLessThan(lastEq.windage.rawValue);
        expect(lastSouth.height.rawValue).toBeLessThan(lastEq.height.rawValue);
    });

    test("test_full_coriolis_windage_increases_going_north", async () => {
        const shotSouth = makeBaseShot();
        shotSouth.azimuthDeg = 90.0;
        shotSouth.latitudeDeg = -40.0;
        const resultSouth = await calc.fire({ shot: shotSouth, trajectoryRange: range, trajectoryStep: step });
        const lastSouth = resultSouth.trajectory[resultSouth.trajectory.length - 1];

        const shotNorth = makeBaseShot();
        shotNorth.azimuthDeg = 90.0;
        shotNorth.latitudeDeg = 80.0;
        const resultNorth = await calc.fire({ shot: shotNorth, trajectoryRange: range, trajectoryStep: step });
        const lastNorth = resultNorth.trajectory[resultNorth.trajectory.length - 1];

        expect(lastNorth.windage.rawValue).toBeGreaterThan(-lastSouth.windage.rawValue);
        expect(lastNorth.height.rawValue).toBeLessThan(lastSouth.height.rawValue);
    });

    // -------------------------------------------------------------------------
    // Full 3D Coriolis — vary azimuth at equator
    // -------------------------------------------------------------------------

    test("test_full_coriolis_north_no_vertical_effect", async () => {
        // Shooting north at equator: no vertical Coriolis
        const shotBase = makeBaseShot();
        const base = await calc.fire({ shot: shotBase, trajectoryRange: range, trajectoryStep: step });
        const lastBase = base.trajectory[base.trajectory.length - 1];

        const shot = makeBaseShot();
        shot.latitudeDeg = 0.0;
        shot.azimuthDeg = 0.0;
        const result = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = result.trajectory[result.trajectory.length - 1];

        expect(last.height.rawValue).toBeCloseTo(lastBase.height.rawValue, 5);
    });

    test("test_full_coriolis_northeast_increases_height", async () => {
        const shotNorth = makeBaseShot();
        shotNorth.latitudeDeg = 0.0;
        shotNorth.azimuthDeg = 0.0;
        const resultNorth = await calc.fire({ shot: shotNorth, trajectoryRange: range, trajectoryStep: step });
        const lastNorth = resultNorth.trajectory[resultNorth.trajectory.length - 1];

        const shotNE = makeBaseShot();
        shotNE.latitudeDeg = 0.0;
        shotNE.azimuthDeg = 45.0;
        const resultNE = await calc.fire({ shot: shotNE, trajectoryRange: range, trajectoryStep: step });
        const lastNE = resultNE.trajectory[resultNE.trajectory.length - 1];

        expect(lastNE.height.rawValue).toBeGreaterThan(lastNorth.height.rawValue);
    });

    test("test_full_coriolis_west_decreases_height", async () => {
        const shotNorth = makeBaseShot();
        shotNorth.latitudeDeg = 0.0;
        shotNorth.azimuthDeg = 0.0;
        const resultNorth = await calc.fire({ shot: shotNorth, trajectoryRange: range, trajectoryStep: step });
        const lastNorth = resultNorth.trajectory[resultNorth.trajectory.length - 1];

        const shotWest = makeBaseShot();
        shotWest.latitudeDeg = 0.0;
        shotWest.azimuthDeg = 270.0;
        const resultWest = await calc.fire({ shot: shotWest, trajectoryRange: range, trajectoryStep: step });
        const lastWest = resultWest.trajectory[resultWest.trajectory.length - 1];

        expect(lastWest.height.rawValue).toBeLessThan(lastNorth.height.rawValue);
    });

    // -------------------------------------------------------------------------
    // Vertical shot — drift west of launch
    // -------------------------------------------------------------------------

    test("test_coriolis_vertical_no_coriolis_no_windage", async () => {
        const shot = makeBaseShot();
        shot.relativeAngle = UNew.Degree(90);
        const calcVert = new Calculator({
            method,
            config: { minimumVelocity: 1000 },
        });
        const result = await calcVert.fire({
            shot,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const last = result.trajectory[result.trajectory.length - 1];
        expect(last.windage.rawValue).toBeCloseTo(0.0, 5);
    });

    test("test_coriolis_vertical_equator_drifts_west", async () => {
        const calcVert = new Calculator({
            method,
            config: { minimumVelocity: 1000 },
        });
        const shot = makeBaseShot();
        shot.relativeAngle = UNew.Degree(90);
        shot.latitudeDeg = 0.0;
        shot.azimuthDeg = 0.0; // face North, so negative windage = west
        const result = await calcVert.fire({
            shot,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const last = result.trajectory[result.trajectory.length - 1];
        expect(last.windage.rawValue).toBeLessThan(0);
    });

    test("test_coriolis_vertical_north_less_drift_than_equator", async () => {
        const calcVert = new Calculator({
            method,
            config: { minimumVelocity: 1000 },
        });

        const shotEq = makeBaseShot();
        shotEq.relativeAngle = UNew.Degree(90);
        shotEq.latitudeDeg = 0.0;
        shotEq.azimuthDeg = 0.0;
        const resultEq = await calcVert.fire({
            shot: shotEq,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const lastEq = resultEq.trajectory[resultEq.trajectory.length - 1];

        const shotNorth = makeBaseShot();
        shotNorth.relativeAngle = UNew.Degree(90);
        shotNorth.latitudeDeg = 40.0;
        shotNorth.azimuthDeg = 0.0;
        const resultNorth = await calcVert.fire({
            shot: shotNorth,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const lastNorth = resultNorth.trajectory[resultNorth.trajectory.length - 1];

        // Both drift west (< 0), equator has stronger effect
        expect(lastEq.windage.rawValue).toBeLessThan(lastNorth.windage.rawValue);
    });
});
