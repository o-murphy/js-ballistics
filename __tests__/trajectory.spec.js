import {Ammo, Atmo, DragModel, DragTable, Shot, TrajectoryCalc, UNew, Unit, Weapon, Wind} from "../src/index.js";

describe("TrajectoryCalc", () => {

    function customAssertEqual( a, b, accuracy, name) {
        test(name, () => {
            expect(Math.abs(a-b)).toBeLessThan(accuracy)
        })
    }

    function validateOne(data, distance, velocity,
                         mach, energy, path, hold,
                         windage, wind_adjustment, time, ogw,
                         adjustment_unit) {

        customAssertEqual(distance, data.distance.In(Unit.Yard), 0.001, "Distance")
        customAssertEqual(velocity, data.velocity.In(Unit.FPS), 5, "Velocity")
        customAssertEqual(mach, data.mach, 0.005, "Mach")
        customAssertEqual(energy, data.energy.In(Unit.FootPound), 5, "Energy")
        customAssertEqual(time, data.time, 0.06, "Time")
        customAssertEqual(ogw, data.ogw.In(Unit.Pound), 1, "OGW")

        if (distance >= 800) {
            customAssertEqual(path, data.drop.In(Unit.Inch), 4, 'Drop');
        } else if (distance >= 500) {
            customAssertEqual(path, data.drop.In(Unit.Inch), 1, 'Drop');
        } else {
            customAssertEqual(path, data.drop.In(Unit.Inch), 0.5, 'Drop');
        }

        if (distance > 1) {
            customAssertEqual(hold, data.dropAdjustment.In(adjustment_unit), 0.5, 'Hold')
        }

        if (distance >= 800) {
            customAssertEqual(windage, data.windage.In(Unit.Inch), 1.5, "Windage")
        } else if (distance >= 500) {
            customAssertEqual(windage, data.windage.In(Unit.Inch), 1, "Windage")
        } else {
            customAssertEqual(windage, data.windage.In(Unit.Inch), 0.5, "Windage")
        }

        if (distance > 1) {
            customAssertEqual(wind_adjustment,
                data.windageAdjustment.In(adjustment_unit), 0.5, "WindageAdjustment")
        }

    }

    describe("test_zero1", () => {
        const dm = new DragModel(0.365, DragTable.G1, 69, 0.223)
        const ammo = new Ammo(dm, 0.9, 2600)
        const weapon = new Weapon(UNew.Inch(3.2), UNew.Yard(100))
        const atmosphere = Atmo.icao()
        const calc = new TrajectoryCalc(ammo)

        const zero_angle = calc.zeroAngle(weapon, atmosphere)

        test("check_zero", () => {
            expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.001651, 6)
        })

    })

    describe("test_zero2", () => {
        const dm = new DragModel(0.223, DragTable.G7, 69, 0.223)
        const ammo = new Ammo(dm, 0.9, 2750)
        const weapon = new Weapon(UNew.Inch(2), UNew.Yard(100))
        const atmosphere = Atmo.icao()
        const calc = new TrajectoryCalc(ammo)

        const zero_angle = calc.zeroAngle(weapon, atmosphere)

        test("check_zero", () => {
            expect(zero_angle.In(Unit.Radian)).toBeCloseTo(0.001228, 6)
        })

    })

    describe("test_path_g1", () => {
        const dm = new DragModel(0.223, DragTable.G1, 168, 0.308)
        const ammo = new Ammo(dm, 1.282, UNew.FPS(2750))
        const weapon = new Weapon(UNew.Inch(2), UNew.Yard(100))
        const shot_info = new Shot(
                1000,
                UNew.Radian(0.001228),
                0, 0,
                Atmo.icao(),
                [new Wind(UNew.MPH(5), UNew.OClock(10.5))]
        )
        const calc = new TrajectoryCalc(ammo)
        const data = calc.trajectory(
            weapon,
            shot_info,
            UNew.Yard(100)
        )

        customAssertEqual(data.length, 11, 0.1, "Length")

        const test_data = [
            [data[0], 0, 2750, 2.463, 2820.6, -2, 0, 0, 0, 0, 880, Unit.MOA],
            [data[1], 100, 2351.2, 2.106, 2061, 0, 0, -0.6, -0.6, 0.118, 550, Unit.MOA],
            [data[5], 500, 1169.1, 1.047, 509.8, -87.9, -16.8, -19.5, -3.7, 0.857, 67, Unit.MOA],
            [data[10], 1000, 776.4, 0.695, 224.9, -823.9, -78.7, -87.5, -8.4, 2.495, 20, Unit.MOA]
        ]

        test_data.forEach(item => {
            describe(`validateOne ${test_data.indexOf(item)}`, () => {
                    validateOne(
                        ...item
                    )
                }
            )

        })

    })

    describe("test_path_g7", () => {
        const dm = new DragModel(0.223, DragTable.G7, 168, 0.308)
        const ammo = new Ammo(dm, 1.282, UNew.FPS(2750))
        const weapon = new Weapon(
            UNew.Inch(2),
            UNew.Yard(100),
            UNew.Inch(11.24)
        )
        const shot_info = new Shot(
                UNew.Yard(1000),
                UNew.MOA(4.221),
                0, 0,
                Atmo.icao(),
                [new Wind(UNew.MPH(5), -45)]
        )
        const calc = new TrajectoryCalc(ammo)
        const data = calc.trajectory(
            weapon,
            shot_info,
            UNew.Yard(100)
        )

        customAssertEqual(data.length, 11, 0.1, "Length")

        const test_data = [
            [data[0], 0, 2750, 2.463, 2820.6, -2, 0, 0, 0, 0, 880, Unit.MIL],
            [data[1], 100, 2544.3, 2.279, 2416, 0, 0, -0.35, -0.09, 0.113, 698, Unit.MIL],
            [data[5], 500, 1810.7, 1.622, 1226, -56.3, -3.18, -9.96, -0.55, 0.673, 252, Unit.MIL],
            [data[10], 1000, 1081.3, 0.968, 442, -401.6, -11.32, -50.98, -1.44, 1.748, 55, Unit.MIL]
        ]

        test_data.forEach(item => {
            describe(`validateOne ${test_data.indexOf(item)}`, () => {
                    validateOne(
                        ...item
                    )
                }
            )

        })

    })


});