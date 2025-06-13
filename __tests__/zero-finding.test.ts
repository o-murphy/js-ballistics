import { expect } from "@jest/globals";
import {
    Ammo,
    BaseEngineConfig,
    Calculator,
    DragModel,
    EulerIntegrationEngine,
    RK4IntegrationEngine,
    Shot,
    Table,
    UNew,
    Unit,
    Weapon,
} from "../src";

const createShot = () => {
    const dm = new DragModel({
        bc: 0.759,
        dragTable: Table.G1,
        weight: UNew.Gram(108),
        diameter: UNew.Millimeter(23),
        length: UNew.Millimeter(108.2),
    });
    const ammo = new Ammo({ dm, mv: UNew.MPS(930) });
    const weapon = new Weapon();
    return new Shot({ weapon, ammo });
};

const DISTANCES_FOR_CHECKING = [7126.05];

const engines = [
    { engine: EulerIntegrationEngine },
    { engine: RK4IntegrationEngine },
];

const testCases = engines.flatMap((engineObj) =>
    DISTANCES_FOR_CHECKING.map((distance) => ({ engineObj, distance })),
);

describe("Unit test for zero finding in ballistic calculator", () => {
    // Using test.each with named properties for clearer type inference
    // The test name now uses Jest's $propertyName syntax for interpolation
    test.each(testCases)(
        "test_set_weapon_zero with $engineObj.name and distance $distance",
        ({ engineObj, distance }) => {
            // Destructure the properties from the single test case object
            const { engine } = engineObj;
            const config: Partial<BaseEngineConfig> = {
                cMinimumVelocity: 0,
            };
            const zeroMinVelocityCalc = new Calculator({ engine, config });

            const shot = createShot(); // Create a new shot for each test run
            zeroMinVelocityCalc.setWeaponZero(shot, UNew.Meter(distance));
            console.log(
                `${engine} - barrelElevation for ${distance}m: ${shot.barrelElevation.In(Unit.Degree)} degrees`,
            );
            const t = zeroMinVelocityCalc.fire({
                shot,
                trajectoryRange: UNew.Meter(distance),
                extraData: true,
            }).trajectory;

            const finalHitDistance = t[
                t.length - 1
            ].distance.In(Unit.Meter);
            expect(Math.abs(finalHitDistance - distance)).toBeLessThanOrEqual(
                1.0,
            );
        },
    );
});
