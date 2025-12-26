import { describe, expect, test } from "@jest/globals";
import {
    Ammo,
    Atmo,
    DragModel,
    Table,
    Shot,
    UNew,
    Unit,
    Weapon,
    Wind,
    Angular,
    TrajFlag,
} from "../../src";

import { _TrajectoryData, _TrajectoryRequest, _TrajFlag } from "../../build/bclibc";
import { Calculator } from "../../src/interface1";
import { HitOutput, loadBclibc, IntegrationMethod } from "../../src/_wasm";


let bclibc: any;

function customAssertEqual(a: number, b: number, accuracy: number, name: string) {
    expect(Math.abs(a - b)).toBeLessThan(accuracy);
}

type _TEST_ITEM = [
    _TrajectoryData,  // data
    number,          // distance
    number,          // velocity
    number,          // mach
    number,          // energy
    number,          // path
    number,          // hold
    number,          // windage
    number,          // wind_adjustment
    number,          // time
    number,          // ogw
    number           // adjustment_unit
]

function validateOne(
    data: _TrajectoryData,
    distance: number,
    velocity: number,
    mach: number,
    energy: number,
    path: number,
    hold: number,
    windage: number,
    wind_adjustment: number,
    time: number,
    ogw: number,
    adjustment_unit: number
) {
    customAssertEqual(distance, UNew.Foot(data.distance_ft).In(Unit.Yard), 0.001, "Distance");
    customAssertEqual(velocity, data.velocity_fps, 5, "Velocity");
    customAssertEqual(mach, data.mach, 0.005, "Mach");
    customAssertEqual(energy, data.energy_ft_lb, 5, "Energy");
    customAssertEqual(time, data.time, 0.06, "Time");
    customAssertEqual(ogw, UNew.Pound(data.ogw_lb).In(Unit.Pound), 1, "OGW");

    const height_inch = UNew.Foot(data.height_ft).In(Unit.Inch)
    if (distance >= 800) {
        customAssertEqual(path, height_inch, 4, "Height");
    } else if (distance >= 500) {
        customAssertEqual(path, height_inch, 1, "Height");
    } else {
        customAssertEqual(path, height_inch, 0.5, "Height");
    }

    if (distance > 1) {
        customAssertEqual(hold, UNew.Radian(data.drop_angle_rad).In(adjustment_unit), 0.5, "Hold");
    }

    const windage_inch = UNew.Foot(data.windage_ft).In(Unit.Inch)
    if (distance >= 800) {
        customAssertEqual(windage, windage_inch, 1.5, "Windage");
    } else if (distance >= 500) {
        customAssertEqual(windage, windage_inch, 1, "Windage");
    } else {
        customAssertEqual(windage, windage_inch, 0.5, "Windage");
    }

    if (distance > 1) {
        customAssertEqual(
            wind_adjustment,
            UNew.Radian(data.windage_angle_rad).In(adjustment_unit),
            0.5,
            "WindageAdjustment"
        );
    }

    expect(data.flag.value & bclibc._TrajFlag.RANGE).toBeTruthy();
}

describe("BCLIBC", () => {

    const methods = [
        { method: IntegrationMethod.RK4 }, // Assuming these are string identifiers or actual classes
        { method: IntegrationMethod.EULER },
    ];


    beforeAll(async () => {
        bclibc = await loadBclibc();
    })

    describe.each(methods)("trajectory %s", ({ method }) => {
        test("zero1", async () => {
            const dm = new DragModel({
                bc: 0.365,
                dragTable: Table.G1,
                weight: 69,
                diameter: 0.223,
                length: 0.9,
            });
            const ammo = new Ammo({ dm: dm, mv: 2600 });
            const weapon = new Weapon({ sightHeight: UNew.Inch(3.2) });
            const atmo = Atmo.icao();

            const calc = new Calculator({ method: method });

            const zero_angle: Angular = await calc.barrelElevationForTarget(
                new Shot({ weapon, ammo, atmo }),
                UNew.Yard(100).In(Unit.Foot)
            );

            expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.001651, 1e-6);
        });

        test("zero2", async () => {
            const dm = new DragModel({
                bc: 0.223,
                dragTable: Table.G7,
                weight: 69,
                diameter: 0.223,
                length: 0.9,
            });
            const ammo = new Ammo({ dm: dm, mv: UNew.FPS(2750) });
            const weapon = new Weapon({ twist: UNew.Inch(2) });
            const atmo = Atmo.icao();

            const calc = new Calculator({ method: method });

            const zero_angle: Angular = await calc.barrelElevationForTarget(
                new Shot({ weapon, ammo, atmo }),
                UNew.Yard(100).In(Unit.Foot)
            );

            expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.0012286, 1e-6);
        });

        test("path_g1", async () => {
            const dm = new DragModel({
                bc: 0.223,
                dragTable: Table.G1,
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

            const shot = new Shot({
                weapon: weapon,
                ammo: ammo,
                atmo: atmo,
                winds: [
                    new Wind({
                        velocity: UNew.MPH(5),
                        directionFrom: UNew.OClock(10.5),
                    }),
                ],
            });

            const calc = new Calculator({ method: method });

            const hit: HitOutput = await calc.fire(
                {
                    shot: shot,
                    trajectoryRange: UNew.Yard(1000),
                    trajectoryStep: UNew.Yard(100),
                    timeStep: 0.0,
                    denseOutput: false,
                    filterFlags: TrajFlag.RANGE
                }
            )

            const tData = hit.trajectory;

            expect(tData.length).toEqual(11);

            const data: _TEST_ITEM[] = [
                [tData[0], 0, 2750, 2.463, 2820.6, -2, 0, 0, 0, 0, 880, Unit.MOA],
                [tData[1], 100, 2351.2, 2.106, 2061, 0, 0, -0.6, -0.6, 0.118, 550, Unit.MOA],
                [tData[5], 500, 1169.1, 1.047, 509.8, -87.9, -16.8, -19.5, -3.7, 0.857, 67, Unit.MOA],
                [tData[10], 1000, 776.4, 0.695, 224.9, -823.9, -78.7, -87.5, -8.4, 2.495, 20, Unit.MOA],
            ];

            data.forEach((item: _TEST_ITEM) => {
                validateOne(
                    ...item
                );
            });
        });

        test("path_g7", async () => {
            const dm = new DragModel({
                bc: 0.223,
                dragTable: Table.G7,
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

            const shot = new Shot({
                weapon: weapon,
                ammo: ammo,
                atmo: atmo,
                winds: [
                    new Wind({
                        velocity: UNew.MPH(5),
                        directionFrom: UNew.Degree(-45),
                    }),
                ],
            });

            const calc = new Calculator({ method: method });

            const hit: HitOutput = await calc.fire(
                {
                    shot: shot,
                    trajectoryRange: UNew.Yard(1000),
                    trajectoryStep: UNew.Yard(100),
                    timeStep: 0.0,
                    denseOutput: false,
                    filterFlags: bclibc._TrajFlag.RANGE
                }
            )
            const tData = hit.trajectory;

            expect(tData.length).toEqual(11);

            const data: _TEST_ITEM[] = [
                [tData[0], 0, 2750, 2.46, 2821, -2.0, 0.0, 0.0, 0.0, 0.0, 880, Unit.MIL],
                [tData[1], 100, 2545, 2.28, 2416, 0.0, 0.0, -0.2, -0.06, 0.113, 698, Unit.MIL],
                [tData[5], 500, 1814, 1.62, 1227, -56.2, -3.2, -6.3, -0.36, 0.672, 252, Unit.MIL],
                [tData[10], 1000, 1086, 0.97, 440, -399.9, -11.3, -31.6, -0.9, 1.748, 54, Unit.MIL],
            ];

            data.forEach((item: _TEST_ITEM) => {
                validateOne(...item);
            });
        });

    });

});