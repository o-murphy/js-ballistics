import {
    Calculator,
    HitResult,
    Ammo,
    UNew,
    DragModel,
    Shot,
    Table,
    Distance,
    Weapon,
    Wind,
    EulerIntegrationEngine,
    RK4IntegrationEngine,
} from "../src";
import { expect, describe, test, beforeEach } from "@jest/globals";

const calculators = [
    { engine: EulerIntegrationEngine }, // Assuming these are string identifiers or actual classes
    { engine: RK4IntegrationEngine },
];

describe.each(calculators)("TestDangerSpace %s", ({ engine }) => {
    let shotResult: HitResult; // Replace 'any' with the appropriate type if known
    let lookAngle = UNew.Degree(0);

    // Initialize the look angle

    // Create the DragModel
    const dm = new DragModel({
        bc: 0.223,
        dragTable: Table.G7,
        weight: UNew.Grain(168),
        diameter: UNew.Inch(0.308),
        length: UNew.Inch(1.282),
    });

    // Create Ammo and calculate powder sensitivity
    const ammo = new Ammo({
        dm: dm,
        mv: UNew.FPS(2750),
        powderTemp: UNew.Celsius(15),
    });
    // ammo.calcPowderSens(2723, 0);

    // Create current winds
    const currentWinds = [
        new Wind({ velocity: UNew.FPS(2), directionFrom: UNew.Degree(90) }),
    ];

    // Create Shot and Calculator
    const shot = new Shot({
        weapon: new Weapon(),
        ammo: ammo,
        winds: currentWinds,
    });

    const calc = new Calculator({ engine });
    calc.setWeaponZero(shot, UNew.Foot(300));

    // Fire the shot and store the result
    shotResult = calc.fire({
        shot: shot,
        trajectoryRange: UNew.Yard(1000),
        trajectoryStep: UNew.Yard(100),
        extraData: true,
    });

    test("danger_space", () => {
        // First test
        let dangerSpace = shotResult.dangerSpace(
            UNew.Yard(500),
            UNew.Meter(1.5),
            lookAngle,
        );

        expect(dangerSpace.begin.distance.In(Distance.Yard)).toBeCloseTo(
            393.6,
            1e-1,
        );
        expect(dangerSpace.end.distance.In(Distance.Yard)).toBeCloseTo(
            579.0,
            1e-1,
        );

        // Second test
        dangerSpace = shotResult.dangerSpace(
            UNew.Yard(500),
            UNew.Inch(10),
            lookAngle,
        );

        expect(dangerSpace.begin.distance.In(Distance.Yard)).toBeCloseTo(
            484.5,
            1e-1,
        );
        expect(dangerSpace.end.distance.In(Distance.Yard)).toBeCloseTo(
            514.8,
            1e-1,
        );
    });
});
