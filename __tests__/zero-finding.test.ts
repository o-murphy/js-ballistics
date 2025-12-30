import { expect } from "@jest/globals";
import {
    Ammo,
    DragModel,
    IntegrationMethod,
    DragTables,
    TrajFlag,
    UNew,
    Unit,
    Weapon,
} from "../src";
import { Shot } from "../src/shot";
import { Calculator } from "../src/interface";

const createShot = () => {
    const dm = new DragModel({
        bc: 0.759,
        dragTable: DragTables.G1,
        weight: UNew.Gram(108),
        diameter: UNew.Millimeter(23),
        length: UNew.Millimeter(108.2),
    });
    const ammo = new Ammo({ dm, mv: UNew.MPS(930) });
    const weapon = new Weapon();
    return new Shot({ weapon, ammo });
};

const DISTANCES_FOR_CHECKING = [100, 500, 1000];

const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

const testCases = methods.flatMap((obj) =>
    DISTANCES_FOR_CHECKING.map((distance) => ({ obj, distance }))
);

describe("Unit test for zero finding in ballistic calculator", () => {
    // Using test.each with named properties for clearer type inference
    // The test name now uses Jest's $propertyName syntax for interpolation
    test.each(testCases)(
        "test_set_weapon_zero with $engineObj.name and distance $distance",
        async ({ obj, distance }) => {
            // Destructure the properties from the single test case object
            const { method } = obj;
            const zeroMinVelocityCalc = new Calculator({
                method,
                config: { cMinimumVelocity: 0 }
            });

            const shot = createShot(); // Create a new shot for each test run
            await zeroMinVelocityCalc.setWeaponZero(shot, UNew.Meter(distance));
            console.log(
                `${method} - barrelElevation for ${distance}m: ${shot.barrelElevation.In(Unit.Degree)} degrees`
            );
            const hit = await zeroMinVelocityCalc.fire({
                shot,
                trajectoryRange: UNew.Meter(distance),
                filterFlags: TrajFlag.ALL,
            })
            const t = hit.trajectory;

            const finalHitDistance = t[t.length - 1].distance.In(Unit.Meter);
            expect(Math.abs(finalHitDistance - distance)).toBeLessThanOrEqual(1.0);
        }
    );
});
