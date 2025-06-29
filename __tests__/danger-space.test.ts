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
    Angular, // Ensure Angular is imported for UNew.Degree
    TrajFlag, // Import TrajFlag for the extra data test
} from "../src";
import { expect, describe, test, beforeEach } from "@jest/globals"; // Import beforeEach

// Define the engine types to test with, similar to pytest's parameterized fixtures
const calculatorsToTest = [
    // Provide a name for better test output
    { engine: EulerIntegrationEngine },
    { engine: RK4IntegrationEngine },
];

// Use describe.each to iterate over different engine implementations
describe.each(calculatorsToTest)("TestDangerSpace with %s", ({ engine }) => {
    // Declare variables that will hold the setup state,
    // making them accessible across test cases within this describe block.
    let lookAngle: Angular;
    let shotResult: HitResult;

    // The beforeEach hook runs before each 'test' function in this describe block.
    // This effectively mimics pytest's `setup_method` fixture with `autouse=True` in Python.
    beforeEach(() => {
        // Initialize the look angle
        lookAngle = UNew.Degree(0);

        // Create the DragModel
        const dm = new DragModel({
            bc: 0.223,
            dragTable: Table.G7,
            weight: 168,
            diameter: 0.308,
            length: UNew.Inch(1.282),
        });

        // Create Ammo and calculate powder sensitivity
        const ammo = new Ammo({
            dm: dm,
            mv: UNew.FPS(2750),
            powderTemp: UNew.Celsius(15),
        });
        ammo.calcPowderSens(2723, 0);

        // Create current winds
        const currentWinds = [new Wind({ velocity: 2, directionFrom: 90 })];

        // Create Shot and Calculator
        const shot = new Shot({
            // ВИПРАВЛЕНО: Додано sightHeight: UNew.Inch(1) для узгодження з Python-тестом
            weapon: new Weapon({ sightHeight: UNew.Inch(1) }),
            ammo: ammo,
            winds: currentWinds,
        });

        // Instantiate the Calculator with the current engine class
        const calc = new Calculator({ engine });
        calc.setWeaponZero(shot, UNew.Foot(300));

        // Fire the shot and store the result in the shared 'shotResult' variable
        shotResult = calc.fire({
            shot: shot,
            trajectoryRange: UNew.Yard(1000),
            trajectoryStep: UNew.Yard(1),
            extraData: true,
        });
    });

    // Define the test case for danger space calculation.
    test("should calculate danger space correctly", () => {
        // First test case for danger space calculation (Target height: 1.5 meters)
        let dangerSpace = shotResult.dangerSpace(
            UNew.Yard(500),
            UNew.Meter(1.5),
            lookAngle,
        );

        // Assertions using Jest's toBeCloseTo, mirroring pytest.approx's behavior.
        // Precision `0` means checking to the nearest whole number (equivalent to abs=0.5).
        // Expected values are now reverted to the original Python test values.
        expect(dangerSpace.begin.distance.In(Distance.Yard)).toBeCloseTo(
            388.0, // Reverted to original Python test value
            0,
        );
        expect(dangerSpace.end.distance.In(Distance.Yard)).toBeCloseTo(
            581.0, // Reverted to original Python test value
            0,
        );

        // Second test case for danger space calculation with different target height (10 inches)
        dangerSpace = shotResult.dangerSpace(
            UNew.Yard(500),
            UNew.Inch(10),
            lookAngle,
        );

        // Expected values are now reverted to the original Python test values.
        expect(dangerSpace.begin.distance.In(Distance.Yard)).toBeCloseTo(
            483.0, // Reverted to original Python test value
            0,
        );
        expect(dangerSpace.end.distance.In(Distance.Yard)).toBeCloseTo(
            516.0, // Reverted to original Python test value
            0,
        );
    });

    // Additional test case to ensure extra data flags are present, mirroring Python's test_extra_data.
    test("should include extra data flags for zero and mach crossings", () => {
        let seenZeroUp = false;
        let seenZeroDown = false;
        let seenMach = false;

        for (const p of shotResult.trajectory) {
            // Use bitwise AND to check if the flag is set
            if ((p.flag & TrajFlag.ZERO_UP) === TrajFlag.ZERO_UP) {
                seenZeroUp = true;
            }
            if ((p.flag & TrajFlag.ZERO_DOWN) === TrajFlag.ZERO_DOWN) {
                seenZeroDown = true;
            }
            if ((p.flag & TrajFlag.MACH) === TrajFlag.MACH) {
                seenMach = true;
            }
        }
        // These expectations remain true as the previous fix for Weapon sightHeight
        // should have enabled these flags to be set.
        expect(seenZeroUp).toBe(true);
        expect(seenZeroDown).toBe(true);
        expect(seenMach).toBe(true);
    });
});
