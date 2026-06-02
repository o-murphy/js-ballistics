import { expect, describe, test, beforeAll, beforeEach } from "@jest/globals";
import { WASM_AVAILABLE } from "./wasmAvailable";
import {
    Ammo,
    Wind,
    Atmo,
    Vacuum,
    DragModel,
    DragTables,
    UNew,
    Weapon,
    RangeError,
    TrajectoryData,
    IntegrationMethod,
} from "../src";
import { Calculator } from "../src/interface";
import { Shot } from "../src/shot";

const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

(WASM_AVAILABLE ? describe : describe.skip).each(methods)("TestComputer $name", (obj) => {
    const { method } = obj;
    const calc: Calculator = new Calculator({ method });
    const range = UNew.Yard(1000);
    const step = UNew.Yard(100);
    const dm: DragModel = new DragModel({
        bc: 0.22,
        dragTable: DragTables.G7,
        weight: 168,
        diameter: 0.308,
        length: 1.22,
    });
    const weapon: Weapon = new Weapon({ sightHeight: 4, twist: 12 });
    const ammo: Ammo = new Ammo({ dm: dm, mv: UNew.FPS(2600) });
    const atmosphere: Atmo = Atmo.icao();
    const baselineShot: Shot = new Shot({ weapon, ammo, atmo: atmosphere });

    let baselineTrajectory: TrajectoryData[];

    beforeAll(async () => {
        const hit = await calc.fire({
            shot: baselineShot,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        baselineTrajectory = hit.trajectory;
    });

    beforeEach(() => {});

    // region Cant

    test("cant_zero_elevation", async () => {
        /**
         * Cant_angle = 90° with zero barrel elevation should match baseline with:
         * drop += sight_height, windage -= sight_height
         */
        const canted = new Shot({ ...baselineShot });
        canted.cantAngle = UNew.Degree(90);

        const hit = await calc.fire({
            shot: canted,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        const t = hit.trajectory;

        expect(t[5].height.rawValue - weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            1e-2
        );
        expect(t[5].windage.rawValue + weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].windage.rawValue,
            1e-2
        );
    });

    test("cant_positive_elevation", async () => {
        /**
         * Cant_angle = 90° with positive barrel elevation and zero twist:
         * drop += sight_height, windage -= sight_height at muzzle, increasingly positive down-range
         */
        const canted = new Shot({
            weapon: new Weapon({
                sightHeight: weapon.sightHeight,
                twist: 0,
                zeroElevation: UNew.MIL(2),
            }),
            ammo,
            cantAngle: UNew.Degree(90),
            atmo: atmosphere,
        });

        const hit = await calc.fire({
            shot: canted,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        const t = hit.trajectory;

        expect(t[5].height.rawValue - weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            2
        );
        expect(t[0].windage.rawValue).toBeCloseTo(-weapon.sightHeight.rawValue);
        expect(t[5].windage.rawValue).toBeGreaterThan(t[3].windage.rawValue);
    });

    test("cant_zero_sight_height", async () => {
        /**
         * Cant_angle = 90° with sight_height=0 and barrel_elevation=0:
         * drop += baseline.sight_height, windage no change
         */
        const canted = new Shot({
            weapon: new Weapon({ sightHeight: UNew.Inch(0), twist: weapon.twist }),
            ammo,
            atmo: atmosphere,
            cantAngle: UNew.Degree(90),
        });

        const hit = await calc.fire({
            shot: canted,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        const t = hit.trajectory;

        expect(t[5].height.rawValue - weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            2
        );
        expect(t[5].windage.rawValue).toBeCloseTo(baselineTrajectory[5].windage.rawValue, 2);
    });

    // endregion Cant

    // region Wind

    test("wind_from_left", async () => {
        /** Wind from left should increase windage */
        const shot = new Shot({
            weapon,
            ammo,
            atmo: atmosphere,
            winds: [new Wind({ velocity: UNew.MPH(5), directionFrom: UNew.OClock(3) })],
        });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].windage.rawValue).toBeGreaterThan(
            baselineTrajectory[5].windage.rawValue
        );
    });

    test("wind_from_right", async () => {
        /** Wind from right should decrease windage */
        const shot = new Shot({
            weapon,
            ammo,
            atmo: atmosphere,
            winds: [new Wind({ velocity: UNew.MPH(5), directionFrom: UNew.OClock(9) })],
        });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].windage.rawValue).toBeLessThan(
            baselineTrajectory[5].windage.rawValue
        );
    });

    test("wind_from_back", async () => {
        /** Wind from behind should decrease drop */
        const shot = new Shot({
            weapon,
            ammo,
            atmo: atmosphere,
            winds: [new Wind({ velocity: UNew.MPH(5), directionFrom: UNew.OClock(0) })],
        });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("wind_from_front", async () => {
        /** Wind from in front should increase drop */
        const shot = new Shot({
            weapon,
            ammo,
            atmo: atmosphere,
            winds: [new Wind({ velocity: UNew.MPH(5), directionFrom: UNew.OClock(6) })],
        });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeLessThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("wind_lag_rule", async () => {
        /** Lag rule: windage due to crosswind = t_lag * v_w */
        const vW = UNew.FPS(5); // crosswind velocity
        const crosswind = new Wind({ velocity: vW, directionFrom: UNew.OClock(3) });
        // No twist to eliminate spin drift
        const baseShot = new Shot({
            weapon: new Weapon({ twist: 0 }),
            ammo,
            atmo: Atmo.icao(),
            winds: [crosswind],
        });
        const baseHit = await calc.fire({
            shot: baseShot,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        const vacuumShot = new Shot({
            weapon: new Weapon({ twist: 0 }),
            ammo,
            atmo: new Vacuum(),
            winds: [crosswind],
        });
        const vacHit = await calc.fire({
            shot: vacuumShot,
            trajectoryRange: range,
            trajectoryStep: step,
        });

        const tLag = baseHit.trajectory[5].time - vacHit.trajectory[5].time;
        expect(baseHit.trajectory[5].windage.foot).toBeCloseTo(tLag * vW.fps);
    });

    test("multiple_wind", async () => {
        /** Multiple winds should be applied in order of distance */
        const noSpinWeapon = new Weapon({ twist: 0 });
        const shotRightWind = new Shot({
            weapon: noSpinWeapon,
            ammo,
            atmo: atmosphere,
            winds: [new Wind({ velocity: UNew.MPS(4), directionFrom: UNew.OClock(9) })],
        });
        const tRight = await calc.fire({
            shot: shotRightWind,
            trajectoryRange: range,
            trajectoryStep: step,
        });

        // List multiple winds out of order — should be sorted by untilDistance
        const shotMulti = new Shot({
            weapon: noSpinWeapon,
            ammo,
            atmo: atmosphere,
            winds: [
                new Wind({
                    velocity: UNew.MPS(4),
                    directionFrom: UNew.OClock(3),
                    untilDistance: UNew.Yard(700),
                }),
                new Wind({
                    velocity: UNew.MPS(4),
                    directionFrom: UNew.OClock(9),
                    untilDistance: UNew.Yard(550),
                }),
            ],
        });
        const tMulti = await calc.fire({
            shot: shotMulti,
            trajectoryRange: range,
            trajectoryStep: step,
        });

        // Multiple winds, last wind has no range limit
        const shotMultiMore = new Shot({
            weapon: noSpinWeapon,
            ammo,
            atmo: atmosphere,
            winds: [
                new Wind({
                    velocity: UNew.MPS(4),
                    directionFrom: UNew.OClock(9),
                    untilDistance: UNew.Yard(550),
                }),
                new Wind({ velocity: UNew.MPS(4), directionFrom: UNew.OClock(3) }),
            ],
        });
        const tMultiMore = await calc.fire({
            shot: shotMultiMore,
            trajectoryRange: range,
            trajectoryStep: step,
        });

        // Winds are the same to 500 yards
        expect(tMulti.trajectory[5].windage.rawValue).toBeCloseTo(
            tRight.trajectory[5].windage.rawValue
        );
        expect(tMulti.trajectory[7].windage.rawValue).toBeGreaterThan(
            tRight.trajectory[7].windage.rawValue
        );
        expect(tMultiMore.trajectory[9].windage.rawValue).toBeGreaterThan(
            tMulti.trajectory[9].windage.rawValue
        );
    });

    test("no_winds", async () => {
        const shot1 = new Shot({ weapon, ammo, atmo: atmosphere });
        const shot2 = new Shot({ weapon, ammo, atmo: atmosphere, winds: [] });

        const hit1 = await calc.fire({ shot: shot1, trajectoryRange: range, trajectoryStep: step });
        const hit2 = await calc.fire({ shot: shot2, trajectoryRange: range, trajectoryStep: step });

        expect(hit1.trajectory.length).toBeGreaterThan(0);
        expect(hit2.trajectory.length).toBeGreaterThan(0);
    });

    test("winds_sort", async () => {
        const winds = [
            new Wind({
                velocity: UNew.MPS(0),
                directionFrom: UNew.Degree(90),
                untilDistance: UNew.Meter(100),
            }),
            new Wind({
                velocity: UNew.MPS(1),
                directionFrom: UNew.Degree(60),
                untilDistance: UNew.Meter(300),
            }),
            new Wind({
                velocity: UNew.MPS(2),
                directionFrom: UNew.Degree(30),
                untilDistance: UNew.Meter(200),
            }),
            new Wind({
                velocity: UNew.MPS(2),
                directionFrom: UNew.Degree(30),
                untilDistance: UNew.Meter(50),
            }),
        ];
        const shot = new Shot({
            weapon: undefined as unknown as Weapon,
            ammo: undefined as unknown as Ammo,
            lookAngle: 0,
            relativeAngle: 0,
            cantAngle: 0,
            winds,
        });
        expect(shot.winds[0]).toBe(winds[3]);
        expect(shot.winds[1]).toBe(winds[0]);
        expect(shot.winds[2]).toBe(winds[2]);
        expect(shot.winds[3]).toBe(winds[1]);
    });

    // endregion Wind

    // region Twist

    test("no_twist", async () => {
        /** Barrel with no twist should have no spin drift */
        const shot = new Shot({ weapon: new Weapon({ twist: 0 }), ammo, atmo: atmosphere });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].windage.rawValue).toBe(0);
    });

    test("twist", async () => {
        /** Right-hand twist → positive drift; left-hand twist → negative drift; faster twist → more drift */
        const shotRight = new Shot({ weapon: new Weapon({ twist: 12 }), ammo, atmo: atmosphere });
        const hitRight = await calc.fire({
            shot: shotRight,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        expect(hitRight.trajectory[5].windage.rawValue).toBeGreaterThan(0);

        const shotLeft = new Shot({ weapon: new Weapon({ twist: -8 }), ammo, atmo: atmosphere });
        const hitLeft = await calc.fire({
            shot: shotLeft,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        expect(hitLeft.trajectory[5].windage.rawValue).toBeLessThan(0);

        // Slower twist (left=-8) produces more magnitude than faster (right=12)
        expect(-hitLeft.trajectory[5].windage.rawValue).toBeGreaterThan(
            hitRight.trajectory[5].windage.rawValue
        );
    });

    // endregion Twist

    // region Atmo

    test("humidity", async () => {
        /** Increasing relative humidity should decrease drop */
        const shot = new Shot({ weapon, ammo, atmo: new Atmo({ humidity: 0.9 }) });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("temperature_atmo", async () => {
        /** Dropping temperature should increase drop */
        const shot = new Shot({ weapon, ammo, atmo: new Atmo({ temperature: UNew.Celsius(0) }) });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeLessThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("altitude", async () => {
        /** Increasing altitude should decrease drop */
        const shot = new Shot({
            weapon,
            ammo,
            atmo: Atmo.icao({ altitude: UNew.Foot(5000) }),
        });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("pressure", async () => {
        /** Decreasing pressure should decrease drop */
        const shot = new Shot({ weapon, ammo, atmo: new Atmo({ pressure: UNew.InHg(20.0) }) });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    // endregion Atmo

    // region Ammo

    test("ammo_drag", async () => {
        /** Increasing ballistic coefficient should decrease drop */
        const tdm = new DragModel({
            bc: dm.bc + 0.5,
            dragTable: dm.dragTable,
            weight: dm.weight,
            diameter: dm.diameter,
            length: dm.length,
        });
        const slick = new Ammo({ dm: tdm, mv: ammo.mv });
        const shot = new Shot({ weapon, ammo: slick, atmo: atmosphere });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("ammo_optional", async () => {
        /** DragModel weight/diameter and Ammo length are only relevant for spin-drift; drop should match */
        const tdm = new DragModel({ bc: dm.bc, dragTable: dm.dragTable });
        const reducedAmmo = new Ammo({ dm: tdm, mv: ammo.mv });
        const shot = new Shot({ weapon, ammo: reducedAmmo, atmo: atmosphere });
        const hit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(hit.trajectory[5].height.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            1e-2
        );
    });

    test("powder_sensitivity", async () => {
        ammo.calcPowderSens(UNew.FPS(2550), UNew.Celsius(0));

        // Case 1: Don't use powder sensitivity → MV unchanged
        ammo.usePowderSensitivity = false;
        const shotNoSens = new Shot({
            weapon,
            ammo,
            atmo: new Atmo({ temperature: UNew.Celsius(-5) }),
        });
        const hitNoSens = await calc.fire({
            shot: shotNoSens,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        expect(hitNoSens.trajectory[0].velocity.rawValue).toBeCloseTo(
            baselineTrajectory[0].velocity.rawValue
        );

        // Case 2: Powder temperature = atmosphere temperature → MV reduced
        ammo.usePowderSensitivity = true;
        const shotSameTemp = new Shot({
            weapon,
            ammo,
            atmo: new Atmo({ temperature: UNew.Celsius(-5) }),
        });
        const hitSameTemp = await calc.fire({
            shot: shotSameTemp,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        expect(hitSameTemp.trajectory[0].velocity.rawValue).toBeLessThan(
            baselineTrajectory[0].velocity.rawValue
        );

        // Case 3: Different powder temperature → MV reduced
        const shotDiffTemp = new Shot({
            weapon,
            ammo,
            atmo: new Atmo({ powderTemperature: UNew.Celsius(-5) }),
        });
        const hitDiffTemp = await calc.fire({
            shot: shotDiffTemp,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        expect(hitDiffTemp.trajectory[0].velocity.rawValue).toBeLessThan(
            baselineTrajectory[0].velocity.rawValue
        );

        ammo.usePowderSensitivity = false;
    });

    // endregion Ammo

    // region Coriolis

    test("coriolis_flat_approximation", async () => {
        /** Flat-fire Coriolis approximation based on latitude only (no azimuth) */
        const shot = new Shot({ weapon: new Weapon({ twist: 0 }), ammo, atmo: atmosphere });
        const baseHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = baseHit.trajectory.length - 1;

        shot.latitudeDeg = 0.0; // At equator — no effect
        const equatorHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(equatorHit.trajectory[last].windage.rawValue).toBeCloseTo(
            baseHit.trajectory[last].windage.rawValue
        );
        expect(equatorHit.trajectory[last].height.rawValue).toBeCloseTo(
            baseHit.trajectory[last].height.rawValue
        );

        shot.latitudeDeg = -40.0; // South — deflects left
        const southHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(southHit.trajectory[last].windage.rawValue).toBeLessThan(
            baseHit.trajectory[last].windage.rawValue
        );

        shot.latitudeDeg = 80.0; // North — deflects right (more than south deflects left)
        const northHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(northHit.trajectory[last].windage.rawValue).toBeGreaterThan(
            -southHit.trajectory[last].windage.rawValue
        );
        expect(northHit.trajectory[last].height.rawValue).toBeCloseTo(
            baseHit.trajectory[last].height.rawValue
        );

        // Invalid latitude must throw
        expect(() => {
            shot.latitudeDeg = 91.0;
        }).toThrow();
    });

    test("full_coriolis_by_latitude", async () => {
        /** Shoot east at different latitudes — vertical effect greatest at equator */
        const shot = new Shot({ weapon: new Weapon({ twist: 0 }), ammo, atmo: atmosphere });
        const baseHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = baseHit.trajectory.length - 1;

        shot.azimuthDeg = 90.0; // East
        shot.latitudeDeg = 0.0;
        const equatorHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(equatorHit.trajectory[last].windage.rawValue).toBeCloseTo(
            baseHit.trajectory[last].windage.rawValue
        );
        expect(equatorHit.trajectory[last].height.rawValue).toBeGreaterThan(
            baseHit.trajectory[last].height.rawValue
        );

        shot.latitudeDeg = -40.0;
        const southHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(southHit.trajectory[last].windage.rawValue).toBeLessThan(
            equatorHit.trajectory[last].windage.rawValue
        );
        expect(southHit.trajectory[last].height.rawValue).toBeLessThan(
            equatorHit.trajectory[last].height.rawValue
        );

        shot.latitudeDeg = 80.0;
        const northHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(northHit.trajectory[last].windage.rawValue).toBeGreaterThan(
            -southHit.trajectory[last].windage.rawValue
        );
        expect(northHit.trajectory[last].height.rawValue).toBeLessThan(
            southHit.trajectory[last].height.rawValue
        );
    });

    test("full_coriolis_by_azimuth", async () => {
        /** Shoot different directions at equator — vertical Coriolis effect greatest */
        const shot = new Shot({ weapon: new Weapon({ twist: 0 }), ammo, atmo: atmosphere });
        const baseHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const last = baseHit.trajectory.length - 1;

        shot.latitudeDeg = 0.0;
        shot.azimuthDeg = 0.0; // North — no vertical effect at equator
        const northHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(northHit.trajectory[last].height.rawValue).toBeCloseTo(
            baseHit.trajectory[last].height.rawValue
        );

        shot.azimuthDeg = 45.0; // Northeast — increasingly positive vertical
        const northeastHit = await calc.fire({
            shot,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        expect(northeastHit.trajectory[last].height.rawValue).toBeGreaterThan(
            northHit.trajectory[last].height.rawValue
        );

        shot.azimuthDeg = 270.0; // West — increasingly negative vertical
        const westHit = await calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        expect(westHit.trajectory[last].height.rawValue).toBeLessThan(
            northHit.trajectory[last].height.rawValue
        );
    });

    test("full_coriolis_vertical", async () => {
        /** Shooting straight up — projectile drifts west; effect greatest at equator */
        const shot = new Shot({ weapon: new Weapon({ twist: 0 }), ammo, atmo: atmosphere });
        shot.relativeAngle = UNew.Degree(90); // Straight up
        const calcCoriolis = new Calculator({ method, config: { minimumVelocity: 1000 } });

        const baseHit = await calcCoriolis.fire({
            shot,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const last = baseHit.trajectory.length - 1;
        expect(baseHit.trajectory[last].windage.rawValue).toBe(0.0);

        shot.latitudeDeg = 0.0;
        shot.azimuthDeg = 0.0; // Face North — negative windage is west
        const equatorHit = await calcCoriolis.fire({
            shot,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const lastE = equatorHit.trajectory.length - 1;
        expect(equatorHit.trajectory[lastE].windage.rawValue).toBeLessThan(0);

        shot.latitudeDeg = 40.0;
        const northHit = await calcCoriolis.fire({
            shot,
            trajectoryRange: range,
            raiseRangeError: false,
        });
        const lastN = northHit.trajectory.length - 1;
        expect(equatorHit.trajectory[lastE].windage.rawValue).toBeLessThan(
            northHit.trajectory[lastN].windage.rawValue
        );
        expect(northHit.trajectory[lastN].windage.rawValue).toBeLessThan(0);
    });

    // endregion Coriolis

    // region Errors

    test("zero_velocity", async () => {
        /** Firing with zero muzzle velocity should raise a RangeError */
        const tdm = new DragModel({
            bc: dm.bc + 0.5,
            dragTable: dm.dragTable,
            weight: dm.weight,
            diameter: dm.diameter,
            length: dm.length,
        });
        const slick = new Ammo({ dm: tdm, mv: 0 });
        const shot = new Shot({ weapon, ammo: slick, atmo: atmosphere });
        await expect(
            calc.fire({ shot, trajectoryRange: range, trajectoryStep: step })
        ).rejects.toThrow();
    });

    test("very_short_shot", async () => {
        /** Should always return at least two trajectory points */
        const shot = new Shot({ weapon, ammo, atmo: atmosphere, winds: [] });
        const hitResult = await calc.fire({ shot, trajectoryRange: range });
        expect(hitResult.length).toBeGreaterThan(1);
    });

    // endregion Errors
});
