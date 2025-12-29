import { expect, describe, test, beforeEach } from "@jest/globals";
import {
    Ammo,
    Wind,
    Atmo,
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

describe.each(methods)("TestComputer $name", (obj) => {
    const { method } = obj
    const calc: Calculator = new Calculator({ method });
    const range: number = 1000;
    const step: number = 100;
    const dm: DragModel = new DragModel({
        bc: 0.22,
        dragTable: DragTables.G7,
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


    let baselineTrajectory: TrajectoryData[];

    beforeAll(async () => {
        const hit = await calc.fire({
            shot: baselineShot,
            trajectoryRange: range,
            trajectoryStep: step,
        });
        baselineTrajectory = hit.trajectory
    })

    beforeEach(() => { });

    // region Cant_angle

    test("cant_zero_elevation", async () => {
        // Create a copy of the baseline shot and apply the cant_angle
        const cantedShot = new Shot({
            ...baselineShot,
        });
        cantedShot.cantAngle = UNew.Degree(90);

        // Fire the canted shot
        const hit = await calc.fire({
            shot: cantedShot,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const cantedTrajectory = hit.trajectory;

        // Perform the assertion comparing height and windage adjustments
        // console.log(cantedTrajectory[5].height.rawValue);
        // console.log(baselineShot.weapon.sightHeight.rawValue);
        // console.log(baselineTrajectory[5].height.rawValue);
        expect(
            cantedTrajectory[5].height.rawValue - baselineShot.weapon.sightHeight.rawValue
        ).toBeCloseTo(baselineTrajectory[5].height.rawValue, 1e-2);

        expect(
            cantedTrajectory[5].windage.rawValue + baselineShot.weapon.sightHeight.rawValue
        ).toBeCloseTo(baselineTrajectory[5].windage.rawValue, 1e-2);
    });

    test("cant_positive_elevation", async () => {
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

        const hit = await calc.fire({
            shot: canted,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const t = hit.trajectory;

        // Assert height difference with baseline
        expect(t[5].height.rawValue - weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            2
        );

        // Assert windage at muzzle
        expect(t[0].windage.rawValue).toBeCloseTo(-weapon.sightHeight.rawValue);

        // Assert increasing windage down-range
        expect(t[5].windage.rawValue).toBeGreaterThan(t[3].windage.rawValue);
    });

    // Cant_angle test with zero sight height and 90 degrees cant angle
    test("cant_zero_sight_height", async () => {
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

        const hit = await calc.fire({
            shot: cantedShot,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const cantedTrajectory = hit.trajectory;

        // Assert that height difference matches the baseline with adjusted sight height
        expect(cantedTrajectory[5].height.rawValue - weapon.sightHeight.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            2
        );

        // Assert windage has no significant change
        expect(cantedTrajectory[5].windage.rawValue).toBeCloseTo(
            baselineTrajectory[5].windage.rawValue,
            2
        );
    });

    // end region Cant_angle

    // region Wind
    // Wind from left should increase windage
    test("wind_from_left", async () => {
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

        const hit = await calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithWind = hit.trajectory;

        // Assert that the windage is greater due to wind from the left
        expect(trajectoryWithWind[5].windage.rawValue).toBeGreaterThan(
            baselineTrajectory[5].windage.rawValue
        );
    });

    // Wind from right should decrease windage
    test("wind_from_right", async () => {
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

        const hit = await calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithWind = hit.trajectory;

        // Assert that the windage is less due to wind from the right
        expect(trajectoryWithWind[5].windage.rawValue).toBeLessThan(
            baselineTrajectory[5].windage.rawValue
        );
    });

    // Wind from behind should decrease drop
    test("wind_from_back", async () => {
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

        const hit = await calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithWind = hit.trajectory;

        // Assert that the trajectory height is greater with wind from behind
        expect(trajectoryWithWind[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    // Wind from in front should increase drop
    test("wind_from_front", async () => {
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

        const hit = await calc.fire({
            shot: shotWithWind,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithWind = hit.trajectory;

        // Assert that the trajectory height is less with wind from the front
        expect(trajectoryWithWind[5].height.rawValue).toBeLessThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    // Wind from in front should increase drop
    test("multi_winds", async () => {
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

        const hit = await calc.fire({
            shot,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const t = hit.trajectory;

        expect(t[5].windage.rawValue).toBeLessThan(baselineTrajectory[5].windage.rawValue);
    });

    // Wind from in front should increase drop
    test("no_winds", async () => {
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

        const hit1 = await calc.fire({
            shot: shot1,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const hit2 = await calc.fire({
            shot: shot2,
            trajectoryRange: range,
            trajectoryStep: step,
        })

        const trajectory1 = hit1.trajectory;
        const trajectory2 = hit2.trajectory;

        expect(trajectory1.length).toBeGreaterThan(0);
        expect(trajectory2.length).toBeGreaterThan(0);
    });

    // end region Wind

    // region Twist
    test("no_twist", async () => {
        // Create a shot with no twist
        const shotWithNoTwist = new Shot({
            weapon: new Weapon({ twist: 0 }),
            ammo: ammo,
            atmo: atmo,
        });

        const hit = await calc.fire({
            shot: shotWithNoTwist,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithNoTwist = hit.trajectory;

        // Assert that the windage is 0 with no twist
        expect(trajectoryWithNoTwist[5].windage.rawValue).toBe(0);
    });

    test("twist", async () => {
        // Create a shot with right-hand twist
        const shotRightTwist = new Shot({
            weapon: new Weapon({ twist: 12 }), // Positive twist rate
            ammo: ammo,
            atmo: atmo,
        });

        // Calculate trajectory for right-hand twist
        const hit1 = await calc.fire({
            shot: shotRightTwist,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryRightTwist = hit1.trajectory;

        // Assert that windage is positive with right-hand twist
        expect(trajectoryRightTwist[5].windage.rawValue).toBeGreaterThan(0);

        // Create a shot with left-hand twist
        const shotLeftTwist = new Shot({
            weapon: new Weapon({ twist: -8 }), // Negative twist rate
            ammo: ammo,
            atmo: atmo,
        });

        // Calculate trajectory for left-hand twist
        const hit2 = await calc.fire({
            shot: shotLeftTwist,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryLeftTwist = hit2.trajectory;

        // Assert that windage is negative with left-hand twist
        expect(trajectoryLeftTwist[5].windage.rawValue).toBeLessThan(0);

        // Assert that faster twist (right-hand twist) produces less drift compared to slower twist (left-hand twist)
        expect(-trajectoryLeftTwist[5].windage.rawValue).toBeGreaterThan(
            trajectoryRightTwist[5].windage.rawValue
        );
    });

    // end region Twist

    // region Atmo

    test("humidity", async () => {
        // Create an atmosphere with 90% humidity
        const humidAtmo = new Atmo({ humidity: 0.9 });

        // Create a shot with the humid atmosphere
        const shotWithHumidity = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: humidAtmo,
        });

        // Calculate the trajectory for the shot with humidity
        const hit = await calc.fire({
            shot: shotWithHumidity,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithHumidity = hit.trajectory;

        // Assert that height is greater with increased humidity
        expect(trajectoryWithHumidity[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("temperature_atmo", async () => {
        // Create an atmosphere with temperature at 0°C
        const coldAtmo = new Atmo({ temperature: UNew.Celsius(0) });

        // Create a shot with the cold atmosphere
        const shotInCold = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: coldAtmo,
        });

        // Calculate the trajectory for the shot in cold weather
        const hit = await calc.fire({
            shot: shotInCold,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryInCold = hit.trajectory;

        // Assert that the height is less in colder temperature, indicating increased drop
        expect(trajectoryInCold[5].height.rawValue).toBeLessThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("altitude", async () => {
        // Create an atmosphere with altitude at 5000 feet
        const highAtmo = Atmo.icao({ altitude: UNew.Foot(5000) });

        // Create a shot with the high-altitude atmosphere
        const shotAtHighAltitude = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: highAtmo,
        });

        // Calculate the trajectory for the shot at high altitude
        const hit = await calc.fire({
            shot: shotAtHighAltitude,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryAtHighAltitude = hit.trajectory;

        // Assert that the height is greater at higher altitude, indicating decreased drop
        expect(trajectoryAtHighAltitude[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("pressure", async () => {
        // Create an atmosphere with pressure at 20.0 inHg
        const thinAtmo = new Atmo({ pressure: UNew.InHg(20.0) });

        // Create a shot with the low-pressure atmosphere
        const shotInLowPressure = new Shot({
            weapon: weapon,
            ammo: ammo,
            atmo: thinAtmo,
        });

        // Calculate the trajectory for the shot in low pressure
        const hit = await calc.fire({
            shot: shotInLowPressure,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryInLowPressure = hit.trajectory;

        // Assert that the height is greater in lower pressure, indicating decreased drop
        expect(trajectoryInLowPressure[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    // end region Atmo

    // region Ammo

    test("ammo_drag", async () => {
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
        const hit = await calc.fire({
            shot: shotWithSlickAmmo,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithSlickAmmo = hit.trajectory;

        // Assert that the height is greater with the increased ballistic coefficient, indicating decreased drop
        expect(trajectoryWithSlickAmmo[5].height.rawValue).toBeGreaterThan(
            baselineTrajectory[5].height.rawValue
        );
    });

    test("ammo_optional", async () => {
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
        const hit = await calc.fire({
            shot: shotWithReducedAmmo,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const trajectoryWithReducedAmmo = hit.trajectory;

        // Assert that the height is the same as with the baseline, indicating no change in drop
        expect(trajectoryWithReducedAmmo[5].height.rawValue).toBeCloseTo(
            baselineTrajectory[5].height.rawValue,
            1e-2
        );
    });

    test("powder_sensitivity", async () => {
        ammo.calcPowderSens(UNew.FPS(2550), UNew.Celsius(0));

        // Test case 1: Don't use powder sensitivity
        ammo.usePowderSensitivity = false;
        const coldNoSens = new Atmo({ temperature: UNew.Celsius(-5) });
        const shotNoSens = new Shot({ weapon, ammo, atmo: coldNoSens });
        const hit1 = await calc.fire({
            shot: shotNoSens,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const tNoSens = hit1.trajectory;
        expect(tNoSens[0].velocity.rawValue).toBeCloseTo(baselineTrajectory[0].velocity.rawValue);

        // Test case 2: Powder temperature the same as atmosphere temperature
        ammo.usePowderSensitivity = true;
        const coldSameTemp = new Atmo({ temperature: UNew.Celsius(-5) });
        const shotSameTemp = new Shot({ weapon, ammo, atmo: coldSameTemp });
        const hit2 = await calc.fire({
            shot: shotSameTemp,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const tSameTemp = hit2.trajectory;
        expect(tSameTemp[0].velocity.rawValue).toBeLessThan(
            baselineTrajectory[0].velocity.rawValue
        );

        // Test case 3: Different powder temperature
        const coldDiffTemp = new Atmo({ powderTemperature: UNew.Celsius(-5) });
        const shotDiffTemp = new Shot({ weapon, ammo, atmo: coldDiffTemp });
        const hit3 = await calc.fire({
            shot: shotDiffTemp,
            trajectoryRange: range,
            trajectoryStep: step,
        })
        const tDiffTemp = hit3.trajectory;
        expect(tDiffTemp[0].velocity.rawValue).toBeLessThan(
            baselineTrajectory[0].velocity.rawValue
        );

        ammo.usePowderSensitivity = false;
    });

    // end region Ammo

    test("zero_velocity", async () => {
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
            if (e instanceof RangeError) {
                console.log("Passing");
            } else {
                throw e;
            }
        }
    });

    test("very_short_shot", async () => {
        const tShot = new Shot({ weapon, ammo, atmo });
        const hitResult = await calc.fire({ shot: tShot, trajectoryRange: range });
        expect(hitResult.length).toBeGreaterThan(1);
    });

    // region Shot
    test("winds_sort", async () => {
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
            weapon: undefined as unknown as Weapon,
            ammo: undefined as unknown as Ammo,
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
