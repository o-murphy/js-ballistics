import {describe, expect, test} from '@jest/globals';
import Calculator, {
    calcSettings, Unit, UNew, Weapon, DragModel, Table, Ammo, Atmo, Wind, Shot,
} from "../src/index.js";


describe("Test interface", () => {

    // set global library settings
    calcSettings.Units.velocity = Unit.FPS;
    calcSettings.Units.temperature = Unit.Celsius;
    // Set.Units.distance = Unit.Meter
    calcSettings.Units.sight_height = Unit.Centimeter;

    calcSettings.USE_POWDER_SENSITIVITY = true;  // enable muzzle velocity correction my powder temperature

    // define params with default units
    const [weight, diameter,] = [168, 0.308];

    // or define with specified units
    const length = UNew.Inch(1.282);

    const weapon = new Weapon(9, 100, 2);
    const dm = new DragModel(0.223, Table.G7, weight, diameter);

    const ammo = new Ammo(dm, length, 2750, 15);
    ammo.calcPowderSens(2723, 0);

    const zeroAtmo = Atmo.icao(100);

    // define calculator instance
    const calc = new Calculator(weapon, ammo, zeroAtmo);

    const currentAtmo = new Atmo(110, 1000, 15, 72);
    const currentWinds = [new Wind(2, 90)];
    const shot = new Shot(1500, 0, 0, 0, currentAtmo, currentWinds);

    const shotResult = calc.fire(shot, UNew.Yard(100));
    const trajectory = shotResult.trajectory;

    describe("Create", () => {
        const trajectory_ = trajectory.slice(1, )

        trajectory_.forEach(p => {

            const retVal = p.inDefUnits()
            const retValFmt = p.formatted()

            test(`Check retval type ${trajectory_.indexOf(p)}`, () => {
                retVal.forEach(v => {
                    expect(v).not.toBe(NaN)
                    expect(typeof v).toBe("number");
                });

                retValFmt.forEach(v => {
                    expect(typeof v).toBe("string");
                });
            })

        });
    });
});
