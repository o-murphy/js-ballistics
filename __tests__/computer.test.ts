import { expect, describe, test, beforeEach } from "@jest/globals";
import {
    Calculator,
    Ammo,
    Wind,
    Atmo,
    DragModel,
    Table,
    UNew,
    Weapon,
    Shot,
    HitResult,
    EulerIntegrationEngine,
    RK4IntegrationEngine,
    TrajectoryRangeError,
    TrajectoryData,
} from "../src";

const calculators = [
    { engine: EulerIntegrationEngine }, // Assuming these are string identifiers or actual classes
    { engine: RK4IntegrationEngine },
];

describe.each(calculators)("TestComputer %s", ({ engine }) => {
    const calc: Calculator<any> = new Calculator({ engine });
    const range: number = 1000;
    const step: number = 100;
    const dm: DragModel = new DragModel({
        bc: 0.22,
        dragTable: Table.G7,
        weight: 168,
        diameter: 0.308,
        length: 1.22,
    });
    const weapon: Weapon = new Weapon({ sightHeight: 4, twist: 12 });
    const ammo: Ammo = new Ammo({ dm: dm, mv: UNew.FPS(2600) });
    const atmo: Atmo = Atmo.icao();
    const baselineShot: Shot = new Shot({
        weapon: weapon,
        ammo: ammo,
        atmo: atmo,
    });
    const baselineTrajectory: TrajectoryData[] = calc.fire({
        shot: baselineShot,
        trajectoryRange: range,
        trajectoryStep: step,
    }).trajectory;

    beforeEach(() => {});

    // region Cant_angle

    test("cant_zero_elevation", () => {
        // Create a copy of the baseline shot and apply the cant_angle
        const cantedShot = new Shot({
            ...baselineShot,
        });
        cantedShot.cantAngle = UNew.Degree(90);

        // Fire the canted shot
        const cantedTrajectory = calc.fire({
            shot: cantedShot,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Perform the assertion comparing height and windage adjustments
        // console.log(cantedTrajectory[5].height.rawValue);
        // console.log(baselineShot.weapon.sightHeight.rawValue);
        // console.log(baselineTrajectory[5].height.rawValue);
        expect(
            cantedTrajectory[5].height.rawValue -
                baselineShot.weapon.sightHeight.rawValue,
        ).toBeCloseTo(baselineTrajectory[5].height.rawValue, 1e-2);

        expect(
            cantedTrajectory[5].windage.rawValue +
                baselineShot.weapon.sightHeight.rawValue,
        ).toBeCloseTo(baselineTrajectory[5].windage.rawValue, 1e-2);
    });

    test("cant_positive_elevation", () => {
        const canted = new Shot({
            weapon: new Weapon({
                sightHeight: weapon.sightHeight,
                twist: 0,
                zeroElevation: UNew.MIL(2),
            }),
            ammo: ammo,
            cantAngle: UNew.Degree(90),
            atmo: atmo,
        });

        const t = calc.fire({
            shot: canted,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert height difference with baseline
        expect(t[5].height.rawValue - weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            2,
        );

        // Assert windage at muzzle
        expect(t[0].windage.rawValue).toBeCloseTo(-weapon.sightHeight.rawValue);

        // Assert increasing windage down-range
        expect(t[5].windage.rawValue).toBeGreaterThan(t[3].windage.rawValue);
    });

    // Cant_angle test with zero sight height and 90 degrees cant angle
    test("cant_zero_sight_height", () => {
        // Create a new shot with the same parameters but a cant angle of 90 degrees
        const cantedShot = new Shot({
            weapon: new Weapon({
                sightHeight: UNew.Inch(0),
                twist: weapon.twist,
            }),
            ammo: ammo,
            atmo: atmo,
            cantAngle: UNew.Degree(90),
        });

        const cantedTrajectory = calc.fire({
            shot: cantedShot,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that height difference matches the baseline with adjusted sight height
        expect(
            cantedTrajectory[5].height.rawValue - weapon.sightHeight.rawValue,
        ).toBeCloseTo(baselineTrajectory[5].height.rawValue, 2);

        // Assert windage has no significant change
        expect(cantedTrajectory[5].windage.rawValue).toBeCloseTo(
            baselineTrajectory[5].windage.rawValue,
            2,
        );
    });

    // end region Cant_angle

    // region Wind
    // Wind from left should increase windage
    test("wind_from_left", () => {
        // Create a shot with wind coming from the left
        const windFromLeft = new Wind({
            velocity: UNew.MPH(5),
            directionFrom: UNew.OClock(3), // Wind coming from the left (3 o'clock)
        });

        const shotWithWind = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: atmo,
            winds: [windFromLeft],
        });

        const trajectoryWithWind = calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the windage is greater due to wind from the left
        expect(trajectoryWithWind[5].windage.rawValue).toBeGreaterThan(
            baselineTrajectory[5].windage.rawValue,
        );
    });

    // Wind from right should decrease windage
    test("wind_from_right", () => {
        // Create a shot with wind coming from the right
        const windFromRight = new Wind({
            velocity: UNew.MPH(5),
            directionFrom: UNew.OClock(9), // Wind coming from the right (9 o'clock)
        });

        const shotWithWind = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: atmo,
            winds: [windFromRight],
        });

        const trajectoryWithWind = calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the windage is less due to wind from the right
        expect(trajectoryWithWind[5].windage.rawValue).toBeLessThan(
            baselineTrajectory[5].windage.rawValue,
        );
    });

    // Wind from behind should decrease drop
    test("wind_from_back", () => {
        // Create a shot with wind coming from behind
        const windFromBack = new Wind({
            velocity: UNew.MPH(5),
            directionFrom: UNew.OClock(0), // Wind coming from behind (0 o'clock)
        });

        const shotWithWind = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: atmo,
            winds: [windFromBack],
        });

        const trajectoryWithWind = calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the trajectory height is greater with wind from behind
        expect(trajectoryWithWind[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    // Wind from in front should increase drop
    test("wind_from_front", () => {
        // Create a shot with wind coming from the front
        const windFromFront = new Wind({
            velocity: UNew.MPH(5),
            directionFrom: UNew.OClock(6), // Wind coming from the front (6 o'clock)
        });

        const shotWithWind = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: atmo,
            winds: [windFromFront],
        });

        const trajectoryWithWind = calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the trajectory height is less with wind from the front
        expect(trajectoryWithWind[5].height.rawValue).toBeLessThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    // Wind from in front should increase drop
    test("multi_winds", () => {
        const shot = new Shot({
            weapon,
            ammo,
            atmo,
            winds: [
                new Wind({
                    velocity: UNew.MPS(4),
                    directionFrom: UNew.OClock(9),
                    untilDistance: UNew.Meter(500),
                }),
                new Wind({
                    velocity: UNew.MPS(4),
                    directionFrom: UNew.OClock(3),
                    untilDistance: UNew.Meter(800),
                }),
            ],
        });

        calc.fire({ shot, trajectoryRange: range, trajectoryStep: step });
        const t = calc.fire({
            shot,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        expect(t[5].windage.rawValue).toBeLessThan(
            baselineTrajectory[5].windage.rawValue,
        );
    });

    // Wind from in front should increase drop
    test("no_winds", () => {
        const shot1 = new Shot({
            weapon,
            ammo,
            atmo,
        });

        const shot2 = new Shot({
            weapon,
            ammo,
            atmo,
            winds: [],
        });

        calc.fire({
            shot: shot1,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        calc.fire({
            shot: shot2,
            trajectoryRange: range,
            trajectoryStep: step,
        });

        const trajectory1 = calc.fire({
            shot: shot1,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;
        const trajectory2 = calc.fire({
            shot: shot2,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        expect(trajectory1.length).toBeGreaterThan(0);
        expect(trajectory2.length).toBeGreaterThan(0);
    });

    // end region Wind

    // region Twist
    test("no_twist", () => {
        // Create a shot with no twist
        const shotWithNoTwist = new Shot({
            weapon: new Weapon({ twist: 0 }),
            ammo: ammo,
            atmo: atmo,
        });

        const trajectoryWithNoTwist = calc.fire({
            shot: shotWithNoTwist,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the windage is 0 with no twist
        expect(trajectoryWithNoTwist[5].windage.rawValue).toBe(0);
    });

    test("twist", () => {
        // Create a shot with right-hand twist
        const shotRightTwist = new Shot({
            weapon: new Weapon({ twist: 12 }), // Positive twist rate
            ammo: ammo,
            atmo: atmo,
        });

        // Calculate trajectory for right-hand twist
        const trajectoryRightTwist = calc.fire({
            shot: shotRightTwist,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that windage is positive with right-hand twist
        expect(trajectoryRightTwist[5].windage.rawValue).toBeGreaterThan(0);

        // Create a shot with left-hand twist
        const shotLeftTwist = new Shot({
            weapon: new Weapon({ twist: -8 }), // Negative twist rate
            ammo: ammo,
            atmo: atmo,
        });

        // Calculate trajectory for left-hand twist
        const trajectoryLeftTwist = calc.fire({
            shot: shotLeftTwist,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that windage is negative with left-hand twist
        expect(trajectoryLeftTwist[5].windage.rawValue).toBeLessThan(0);

        // Assert that faster twist (right-hand twist) produces less drift compared to slower twist (left-hand twist)
        expect(-trajectoryLeftTwist[5].windage.rawValue).toBeGreaterThan(
            trajectoryRightTwist[5].windage.rawValue,
        );
    });

    // end region Twist

    // region Atmo

    test("humidity", () => {
        // Create an atmosphere with 90% humidity
        const humidAtmo = new Atmo({ humidity: 0.9 });

        // Create a shot with the humid atmosphere
        const shotWithHumidity = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: humidAtmo,
        });

        // Calculate the trajectory for the shot with humidity
        const trajectoryWithHumidity = calc.fire({
            shot: shotWithHumidity,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that height is greater with increased humidity
        expect(trajectoryWithHumidity[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    test("temperature_atmo", () => {
        // Create an atmosphere with temperature at 0°C
        const coldAtmo = new Atmo({ temperature: UNew.Celsius(0) });

        // Create a shot with the cold atmosphere
        const shotInCold = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: coldAtmo,
        });

        // Calculate the trajectory for the shot in cold weather
        const trajectoryInCold = calc.fire({
            shot: shotInCold,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the height is less in colder temperature, indicating increased drop
        expect(trajectoryInCold[5].height.rawValue).toBeLessThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    test("altitude", () => {
        // Create an atmosphere with altitude at 5000 feet
        const highAtmo = Atmo.icao({ altitude: UNew.Foot(5000) });

        // Create a shot with the high-altitude atmosphere
        const shotAtHighAltitude = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: highAtmo,
        });

        // Calculate the trajectory for the shot at high altitude
        const trajectoryAtHighAltitude = calc.fire({
            shot: shotAtHighAltitude,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the height is greater at higher altitude, indicating decreased drop
        expect(trajectoryAtHighAltitude[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    test("pressure", () => {
        // Create an atmosphere with pressure at 20.0 inHg
        const thinAtmo = new Atmo({ pressure: UNew.InHg(20.0) });

        // Create a shot with the low-pressure atmosphere
        const shotInLowPressure = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: thinAtmo,
        });

        // Calculate the trajectory for the shot in low pressure
        const trajectoryInLowPressure = calc.fire({
            shot: shotInLowPressure,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the height is greater in lower pressure, indicating decreased drop
        expect(trajectoryInLowPressure[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    // end region Atmo

    // region Ammo

    test("ammo_drag", () => {
        // Create a new DragModel with increased ballistic coefficient (bc)
        const increasedDragModel = new DragModel({
            bc: dm.bc + 0.5,
            dragTable: dm.dragTable,
            weight: dm.weight,
            diameter: dm.diameter,
            length: dm.length,
        });

        // Create new ammo with the updated DragModel
        const slickAmmo = new Ammo({
            dm: increasedDragModel,
            mv: ammo.mv,
        });

        // Create a shot with the slick ammo
        const shotWithSlickAmmo = new Shot({
            weapon: weapon,
            ammo: slickAmmo,
            atmo: atmo,
        });

        // Calculate the trajectory for the shot with slick ammo
        const trajectoryWithSlickAmmo = calc.fire({
            shot: shotWithSlickAmmo,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the height is greater with the increased ballistic coefficient, indicating decreased drop
        expect(trajectoryWithSlickAmmo[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue,
        );
    });

    test("ammo_optional", () => {
        // Create a new DragModel with only the ballistic coefficient
        const reducedDragModel = new DragModel({
            bc: dm.bc,
            dragTable: dm.dragTable,
        });

        // Create new ammo with the reduced DragModel
        const reducedAmmo = new Ammo({
            dm: reducedDragModel,
            mv: ammo.mv,
        });

        // Create a shot with the reduced ammo
        const shotWithReducedAmmo = new Shot({
            weapon: weapon,
            ammo: reducedAmmo,
            atmo: atmo,
        });

        // Calculate the trajectory for the shot with the reduced ammo
        const trajectoryWithReducedAmmo = calc.fire({
            shot: shotWithReducedAmmo,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        // Assert that the height is the same as with the baseline, indicating no change in drop
        expect(trajectoryWithReducedAmmo[5].height.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            1e-2,
        );
    });

    test("powder_sensitivity", () => {
        ammo.calcPowderSens(UNew.FPS(2550), UNew.Celsius(0));

        // Test case 1: Don't use powder sensitivity
        ammo.usePowderSensitivity = false;
        const coldNoSens = new Atmo({ temperature: UNew.Celsius(-5) });
        const shotNoSens = new Shot({ weapon, ammo, atmo: coldNoSens });
        const tNoSens = calc.fire({
            shot: shotNoSens,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;
        expect(tNoSens[0].velocity.rawValue).toBeCloseTo(
            baselineTrajectory[0].velocity.rawValue,
        );

        // Test case 2: Powder temperature the same as atmosphere temperature
        ammo.usePowderSensitivity = true;
        const coldSameTemp = new Atmo({ temperature: UNew.Celsius(-5) });
        const shotSameTemp = new Shot({ weapon, ammo, atmo: coldSameTemp });
        const tSameTemp = calc.fire({
            shot: shotSameTemp,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;
        expect(tSameTemp[0].velocity.rawValue).toBeLessThan(
            baselineTrajectory[0].velocity.rawValue,
        );

        // Test case 3: Different powder temperature
        const coldDiffTemp = new Atmo({ powderT: UNew.Celsius(-5) });
        const shotDiffTemp = new Shot({ weapon, ammo, atmo: coldDiffTemp });
        const tDiffTemp = calc.fire({
            shot: shotDiffTemp,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;
        expect(tDiffTemp[0].velocity.rawValue).toBeLessThan(
            baselineTrajectory[0].velocity.rawValue,
        );

        ammo.usePowderSensitivity = false;
    });

    // end region Ammo

    test("zero_velocity", () => {
        const tdm = new DragModel({
            bc: dm.bc + 0.5,
            dragTable: dm.dragTable,
            weight: dm.weight,
            diameter: dm.diameter,
            length: dm.length,
        });
        const slick = new Ammo({ dm: tdm, mv: 0 });
        const tShot = new Shot({ weapon, ammo: slick, atmo: atmo });
        try {
            calc.fire({
                shot: tShot,
                trajectoryRange: range,
                trajectoryStep: step,
            });
        } catch (e: unknown) {
            if (e instanceof TrajectoryRangeError) {
                console.log("Passing");
            } else {
                throw e;
            }
        }
    });

    test("very_short_shot", () => {
        const tShot = new Shot({ weapon, ammo, atmo });
        const hitResult = calc.fire({ shot: tShot, trajectoryRange: range });
        expect(hitResult.length).toBeGreaterThan(1);
    });

    // region Shot
    test("winds_sort", () => {
        // Create an array of Wind instances with varying distances
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

        // Create a Shot instance with the winds array
        const shot = new Shot({
            weapon: undefined,
            ammo: undefined,
            lookAngle: 0,
            relativeAngle: 0,
            cantAngle: 0,
            winds: winds,
        });

        // Assert the order of the sorted winds
        expect(shot.winds[0]).toBe(winds[3]);
        expect(shot.winds[1]).toBe(winds[0]);
        expect(shot.winds[2]).toBe(winds[2]);
        expect(shot.winds[3]).toBe(winds[1]);
    });
    // end region Shot
});
