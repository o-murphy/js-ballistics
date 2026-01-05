import { describe, expect, test } from "@jest/globals";
import { Calculator } from "../src/interface";
import {
    Ammo,
    Atmo,
    DragModel,
    DragTables,
    UNew,
    Unit,
    Weapon,
    Wind,
    Angular,
    HitResult,
    TrajectoryData,
} from "../src";
import { Shot } from "../src/shot";
import { _TrajectoryRequest } from "../build/bclibc";
import { IntegrationMethod, TrajFlag } from "../src/_wasm";

type TestItem = [
    number, // idx
    number, // distance
    number, // velocity
    number, // mach
    number, // energy
    number, // path
    number, // hold
    number, // windage
    number, // windAdj
    number, // time
    number, // ogw
    number  // unit
];

function customAssertEqual(a: number, b: number, accuracy: number, name: string) {
    expect(Math.abs(a - b)).toBeLessThan(accuracy);
}

function getAccuracy(distance: number, isWindage: boolean): number {
    if (distance >= 800) return isWindage ? 1.5 : 4;
    if (distance >= 500) return 1;
    return 0.5;
}

type Validation = {
    name: string;
    get: (d: TrajectoryData, unit?: number) => number;
    expected: (item: TestItem) => number;
    accuracy: number | ((item: TestItem) => number);
    skip?: (item: TestItem) => boolean;
};

const allValidations: Validation[] = [
    {
        name: "distance",
        get: (d) => d.distance.In(Unit.Yard),
        expected: (item) => item[1],
        accuracy: 0.001
    },
    {
        name: "velocity",
        get: (d) => d.velocity.In(Unit.FPS),
        expected: (item) => item[2],
        accuracy: 5
    },
    {
        name: "mach",
        get: (d) => d.mach,
        expected: (item) => item[3],
        accuracy: 0.005
    },
    {
        name: "energy",
        get: (d) => d.energy.In(Unit.FootPound),
        expected: (item) => item[4],
        accuracy: 5
    },
    {
        name: "time",
        get: (d) => d.time,
        expected: (item) => item[9],
        accuracy: 0.06
    },
    {
        name: "ogw",
        get: (d) => d.ogw.In(Unit.Pound),
        expected: (item) => item[10],
        accuracy: 1
    },
    {
        name: "height",
        get: (d) => d.height.In(Unit.Inch),
        expected: (item) => item[5],
        accuracy: (item) => getAccuracy(item[1], false)
    },
    {
        name: "hold",
        get: (d, unit) => d.dropAngle.In(unit!),
        expected: (item) => item[6],
        accuracy: 0.5,
        skip: (item) => item[1] <= 1
    },
    {
        name: "windage",
        get: (d) => d.windage.In(Unit.Inch),
        expected: (item) => item[7],
        accuracy: (item) => getAccuracy(item[1], true)
    },
    {
        name: "wind adjust",
        get: (d, unit) => d.windageAngle.In(unit!),
        expected: (item) => item[8],
        accuracy: 0.5,
        skip: (item) => item[1] <= 1
    },
];

const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

describe.each(methods)("trajectory $name", (obj) => {
    const { method } = obj;

    describe("zero", () => {
        test("G1", async () => {
            const dm = new DragModel({
                bc: 0.365,
                dragTable: DragTables.G1,
                weight: 69,
                diameter: 0.223,
                length: 0.9,
            });
            const ammo = new Ammo({ dm: dm, mv: 2600 });
            const weapon = new Weapon({ sightHeight: UNew.Inch(3.2) });
            const atmo = Atmo.icao();
            const calc = new Calculator({ method });

            const zero_angle: Angular = await calc.barrelElevationForTarget(
                new Shot({ weapon, ammo, atmo }),
                UNew.Yard(100)
            );

            expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.001651, 1e-6);
        });

        test("G7", async () => {
            const dm = new DragModel({
                bc: 0.223,
                dragTable: DragTables.G7,
                weight: 69,
                diameter: 0.223,
                length: 0.9,
            });
            const ammo = new Ammo({ dm: dm, mv: UNew.FPS(2750) });
            const weapon = new Weapon({ twist: UNew.Inch(2) });
            const atmo = Atmo.icao();
            const calc = new Calculator({ method });

            const zero_angle: Angular = await calc.barrelElevationForTarget(
                new Shot({ weapon, ammo, atmo }),
                UNew.Yard(100).In(Unit.Foot)
            );

            expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.0012286, 1e-6);
        });
    });

    describe("path G1", () => {
        let tData: TrajectoryData[];

        beforeAll(async () => {
            const dm = new DragModel({
                bc: 0.223,
                dragTable: DragTables.G1,
                weight: 168,
                diameter: 0.308,
                length: 1.282,
            });
            const ammo = new Ammo({ dm: dm, mv: 2750 });
            const weapon = new Weapon({
                sightHeight: UNew.Inch(2),
                zeroElevation: UNew.Radian(0.001228),
            });
            const atmo = Atmo.icao();
            const shot_info = new Shot({
                weapon,
                ammo,
                atmo,
                winds: [new Wind({
                    velocity: UNew.MPH(5),
                    directionFrom: UNew.OClock(10.5),
                })],
            });

            const calc = new Calculator({ method });
            const hit: HitResult = await calc.fire({
                shot: shot_info,
                trajectoryRange: UNew.Yard(1000),
                trajectoryStep: UNew.Yard(100),
                timeStep: 0.0,
                denseOutput: false,
            });
            tData = hit.trajectory;
        });

        test("length", () => {
            expect(tData.length).toEqual(11);
        });

        const items: TestItem[] = [
            [0, 0, 2750, 2.463, 2820.6, -2, 0, 0, 0, 0, 880, Unit.MOA],
            [1, 100, 2351.2, 2.106, 2061, 0, 0, -0.6, -0.6, 0.118, 550, Unit.MOA],
            [5, 500, 1169.1, 1.047, 509.8, -87.9, -16.8, -19.5, -3.7, 0.857, 67, Unit.MOA],
            [10, 1000, 776.4, 0.695, 224.9, -823.9, -78.7, -87.5, -8.4, 2.495, 20, Unit.MOA],
        ];

        describe.each(items)("index %i", (...item) => {
            test.each(allValidations)("$name", (val) => {
                if (val.skip && val.skip(item)) return;

                const data = tData[item[0]];
                const expectedValue = val.expected(item);
                const accuracy = typeof val.accuracy === 'function' ? val.accuracy(item) : val.accuracy;

                customAssertEqual(expectedValue, val.get(data, item[11]), accuracy, val.name);
            });

            test("flag", () => {
                expect(tData[item[0]].flag & TrajFlag.RANGE).toBeTruthy();
            });
        });
    });

    describe("path G7", () => {
        let tData: TrajectoryData[];

        beforeAll(async () => {
            const dm = new DragModel({
                bc: 0.223,
                dragTable: DragTables.G7,
                weight: 168,
                diameter: 0.308,
                length: 1.282,
            });
            const ammo = new Ammo({ dm: dm, mv: UNew.FPS(2750) });
            const weapon = new Weapon({
                sightHeight: UNew.Inch(2),
                twist: UNew.Inch(12),
                zeroElevation: UNew.MOA(4.221),
            });
            const atmo = Atmo.icao();
            const shot_info = new Shot({
                weapon,
                ammo,
                atmo,
                winds: [new Wind({
                    velocity: UNew.MPH(5),
                    directionFrom: UNew.Degree(-45),
                })],
            });

            const calc = new Calculator({ method });
            const hit: HitResult = await calc.fire({
                shot: shot_info,
                trajectoryRange: UNew.Yard(1000),
                trajectoryStep: UNew.Yard(100),
                timeStep: 0.0,
                denseOutput: false,
            });
            tData = hit.trajectory;
        });

        test("length", () => {
            expect(tData.length).toEqual(11);
        });

        const items: TestItem[] = [
            [0, 0, 2750, 2.46, 2821, -2.0, 0.0, 0.0, 0.0, 0.0, 880, Unit.MIL],
            [1, 100, 2545, 2.28, 2416, 0.0, 0.0, -0.2, -0.06, 0.113, 698, Unit.MIL],
            [5, 500, 1814, 1.62, 1227, -56.2, -3.2, -6.3, -0.36, 0.672, 252, Unit.MIL],
            [10, 1000, 1086, 0.97, 440, -399.9, -11.3, -31.6, -0.9, 1.748, 54, Unit.MIL],
        ];

        describe.each(items)("index %i", (...item) => {
            test.each(allValidations)("$name", (val) => {
                if (val.skip && val.skip(item)) return;

                const data = tData[item[0]];
                const expectedValue = val.expected(item);
                const accuracy = typeof val.accuracy === 'function' ? val.accuracy(item) : val.accuracy;

                customAssertEqual(expectedValue, val.get(data, item[11]), accuracy, val.name);
            });

            test("flag", () => {
                expect(tData[item[0]].flag & TrajFlag.RANGE).toBeTruthy();
            });
        });
    });
});
