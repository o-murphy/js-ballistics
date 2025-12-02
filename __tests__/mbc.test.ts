import { expect, describe, test, beforeEach } from "@jest/globals";
import {
    Calculator,
    UNew,
    DragModel,
    DragTables,
    Ammo,
    Weapon,
    Shot,
    DragModelMultiBC,
    BCPoint,
    RK4IntegrationEngine,
    EulerIntegrationEngine,
} from "../src";

const calculators = [
    { engine: EulerIntegrationEngine }, // Assuming these are string identifiers or actual classes
    { engine: RK4IntegrationEngine },
];

describe.each(calculators)("TestMultiBC %s", ({ engine }) => {
    let range = 1000;
    let step = 100;
    let dm = new DragModel({ bc: 0.22, dragTable: DragTables.G7 });
    let ammo = new Ammo({ dm: dm, mv: UNew.FPS(2600) });
    let weapon = new Weapon({ sightHeight: 4, twist: 12 });
    let calc = new Calculator({ engine });
    let baseLineShot = new Shot({ weapon: weapon, ammo: ammo });
    let baselineTrajectory = calc.fire({
        shot: baseLineShot,
        trajectoryRange: range,
        trajectoryStep: step,
    }).trajectory;

    beforeEach(() => { });

    test("mbc1", () => {
        let dmMulti = DragModelMultiBC({
            bcPoints: [
                new BCPoint({ BC: 0.22, V: UNew.FPS(2500) }),
                new BCPoint({ BC: 0.22, V: UNew.FPS(1500) }),
                new BCPoint({ BC: 0.22, Mach: 3 }),
            ],
            dragTable: DragTables.G7,
        });
        let multiShot = new Shot({
            weapon: weapon,
            ammo: new Ammo({ dm: dmMulti, mv: ammo.mv }),
        });
        let multiTrajectory = calc.fire({
            shot: multiShot,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        for (let i = 0; i < multiTrajectory.length; i++) {
            expect(multiTrajectory[i].formatted()).toEqual(
                baselineTrajectory[i].formatted(),
            );
        }
    });

    test("mbc2", () => {
        let dmMulti = DragModelMultiBC({
            bcPoints: [
                new BCPoint({ BC: 0.22, V: UNew.FPS(2700) }),
                new BCPoint({ BC: 0.5, V: UNew.FPS(3500) }),
            ],
            dragTable: DragTables.G7,
        });
        let multiShot = new Shot({
            weapon: weapon,
            ammo: new Ammo({ dm: dmMulti, mv: ammo.mv }),
        });
        let multiTrajectory = calc.fire({
            shot: multiShot,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        for (let i = 0; i < multiTrajectory.length; i++) {
            expect(multiTrajectory[i].formatted()).toEqual(
                baselineTrajectory[i].formatted(),
            );
        }
    });

    test("mbc3", () => {
        let dmMulti = DragModelMultiBC({
            bcPoints: [
                new BCPoint({ BC: 0.5, V: baselineTrajectory[3].velocity }),
                new BCPoint({ BC: 0.22, V: baselineTrajectory[2].velocity }),
            ],
            dragTable: DragTables.G7,
        });
        let multiShot = new Shot({
            weapon: weapon,
            ammo: new Ammo({ dm: dmMulti, mv: ammo.mv }),
        });
        let multiTrajectory = calc.fire({
            shot: multiShot,
            trajectoryRange: range,
            trajectoryStep: step,
        }).trajectory;

        expect(multiTrajectory[1].velocity.rawValue).toBeCloseTo(
            baselineTrajectory[1].velocity.rawValue,
            1e-5,
        );
        expect(multiTrajectory[4].velocity.rawValue).toBeGreaterThan(
            baselineTrajectory[4].velocity.rawValue,
        );
    });

    test("mbc", () => {
        let dmMulti = DragModelMultiBC({
            bcPoints: [
                new BCPoint({ BC: 0.275, V: UNew.MPS(800) }),
                new BCPoint({ BC: 0.255, V: UNew.MPS(500) }),
                new BCPoint({ BC: 0.26, V: UNew.MPS(700) }),
            ],
            dragTable: DragTables.G7,
            weight: 178,
            diameter: 0.308,
        });

        expect(dmMulti.dragTable[0].CD).toBeCloseTo(0.1259323091692403, 1e-8);
        expect(dmMulti.dragTable[dmMulti.dragTable.length - 1].CD).toBeCloseTo(
            0.1577125859466895,
            1e-8,
        );
    });

    test("valid", () => {
        let dmMulti = DragModelMultiBC({
            bcPoints: [
                new BCPoint({ BC: 0.417, V: UNew.MPS(745) }),
                new BCPoint({ BC: 0.409, V: UNew.MPS(662) }),
                new BCPoint({ BC: 0.4, V: UNew.MPS(580) }),
            ],
            dragTable: DragTables.G7,
            weight: 285,
            diameter: 0.338,
        });

        let cds = dmMulti.dragTable.map((p) => p.CD);
        let machs = dmMulti.dragTable.map((p) => p.Mach);

        let reference = [
            [1, 0.3384895315],
            [2, 0.2585639866],
            [3, 0.2069547831],
            [4, 0.1652052415],
            [5, 0.1381406102],
        ];

        reference.forEach(([mach, cd]) => {
            const idx = machs.indexOf(mach);

            // Subtest equivalent using individual expect statements
            expect(cds[idx]).toBeCloseTo(cd, 1e-3); // Precision of 3 decimal places
        });
    });
});
