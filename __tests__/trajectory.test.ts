import { describe, expect, test } from "@jest/globals";
import {
    Calculator,
    Ammo,
    Atmo,
    DragModel,
    Table,
    Shot,
    UNew,
    Unit,
    Weapon,
    Wind,
    TrajFlag,
    EulerIntegrationEngine,
    RK4IntegrationEngine,
} from "../src";

function customAssertEqual(a, b, accuracy, name) {
    test(name, () => {
        expect(Math.abs(a - b)).toBeLessThan(accuracy);
    });
}

function validateOne(
    data,
    distance,
    velocity,
    mach,
    energy,
    path,
    hold,
    windage,
    wind_adjustment,
    time,
    ogw,
    adjustment_unit,
) {
    customAssertEqual(distance, data.distance.In(Unit.Yard), 0.001, "Distance");
    customAssertEqual(velocity, data.velocity.In(Unit.FPS), 5, "Velocity");
    customAssertEqual(mach, data.mach, 0.005, "Mach");
    customAssertEqual(energy, data.energy.In(Unit.FootPound), 5, "Energy");
    customAssertEqual(time, data.time, 0.06, "Time");
    customAssertEqual(ogw, data.ogw.In(Unit.Pound), 1, "OGW");

    if (distance >= 800) {
        customAssertEqual(path, data.height.In(Unit.Inch), 4, "Height");
    } else if (distance >= 500) {
        customAssertEqual(path, data.height.In(Unit.Inch), 1, "Height");
    } else {
        customAssertEqual(path, data.height.In(Unit.Inch), 0.5, "Height");
    }

    if (distance > 1) {
        customAssertEqual(
            hold,
            data.dropAdjustment.In(adjustment_unit),
            0.5,
            "Hold",
        );
    }

    if (distance >= 800) {
        customAssertEqual(windage, data.windage.In(Unit.Inch), 1.5, "Windage");
    } else if (distance >= 500) {
        customAssertEqual(windage, data.windage.In(Unit.Inch), 1, "Windage");
    } else {
        customAssertEqual(windage, data.windage.In(Unit.Inch), 0.5, "Windage");
    }

    if (distance > 1) {
        customAssertEqual(
            wind_adjustment,
            data.windageAdjustment.In(adjustment_unit),
            0.5,
            "WindageAdjustment",
        );
    }

    test("Flag check", () => {
        expect(data.flag & TrajFlag.RANGE).toBeTruthy();
    });
}

const calculators = [
    { engine: EulerIntegrationEngine }, // Assuming these are string identifiers or actual classes
    { engine: RK4IntegrationEngine },
];

describe.each(calculators)("zero1 %s", ({ engine }) => {
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
    const calc = new Calculator({ engine });

    const zero_angle = calc.barrelElevationForTarget(
        new Shot({ weapon, ammo, atmo }),
        UNew.Yard(100),
    );

    test("check_zero", () => {
        expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.001651, 1e-6);
    });
});

describe.each(calculators)("zero2 %s", ({ engine }) => {
    const dm = new DragModel({
        bc: 0.223,
        dragTable: Table.G1,
        weight: 69,
        diameter: 0.223,
        length: 0.9,
    });
    const ammo = new Ammo({ dm: dm, mv: 2750 });
    const weapon = new Weapon({ twist: UNew.Inch(2) });

    const atmo = Atmo.icao();
    const calc = new Calculator({ engine });

    const zero_angle = calc.barrelElevationForTarget(
        new Shot({ weapon, ammo, atmo }),
        UNew.Yard(100),
    );

    test("check_zero", () => {
        expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.001228, 1e-6);
    });
});

describe.each(calculators)("path_g1 %s", ({ engine }) => {
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

    const shot_info = new Shot({
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

    const calc = new Calculator({ engine });
    const data = calc.fire({
        shot: shot_info,
        trajectoryRange: UNew.Yard(1000),
        trajectoryStep: UNew.Yard(100),
    }).trajectory;

    expect(data.length).toEqual(11);

    const data = [
        [data[0], 0, 2750, 2.463, 2820.6, -2, 0, 0, 0, 0, 880, Unit.MOA],
        [
            data[1],
            100,
            2351.2,
            2.106,
            2061,
            0,
            0,
            -0.6,
            -0.6,
            0.118,
            550,
            Unit.MOA,
        ],
        [
            data[5],
            500,
            1169.1,
            1.047,
            509.8,
            -87.9,
            -16.8,
            -19.5,
            -3.7,
            0.857,
            67,
            Unit.MOA,
        ],
        [
            data[10],
            1000,
            776.4,
            0.695,
            224.9,
            -823.9,
            -78.7,
            -87.5,
            -8.4,
            2.495,
            20,
            Unit.MOA,
        ],
    ];

    data.forEach((item) => {
        describe(`validateOne ${data.indexOf(item)}`, () => {
            validateOne(...item);
        });
    });
});

describe.each(calculators)("path_g7 %s", ({ engine }) => {
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

    const shot_info = new Shot({
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

    const calc = new Calculator({ engine });
    const data = calc.fire({
        shot: shot_info,
        trajectoryRange: UNew.Yard(1000),
        trajectoryStep: UNew.Yard(100),
    }).trajectory;

    expect(data.length).toEqual(11);

    const data = [
        [data[0], 0, 2750, 2.46, 2821, -2.0, 0.0, 0.0, 0.0, 0.0, 880, Unit.MIL],
        [
            data[1],
            100,
            2545,
            2.28,
            2416,
            0.0,
            0.0,
            -0.2,
            -0.06,
            0.113,
            698,
            Unit.MIL,
        ],
        [
            data[5],
            500,
            1814,
            1.62,
            1227,
            -56.2,
            -3.2,
            -6.3,
            -0.36,
            0.672,
            252,
            Unit.MIL,
        ],
        [
            data[10],
            1000,
            1086,
            0.97,
            440,
            -399.9,
            -11.3,
            -31.6,
            -0.9,
            1.748,
            54,
            Unit.MIL,
        ],
    ];

    data.forEach((item) => {
        describe(`validateOne ${data.indexOf(item)}`, () => {
            validateOne(...item);
        });
    });
});
