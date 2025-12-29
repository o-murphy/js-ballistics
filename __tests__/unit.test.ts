import { describe, expect, test } from "@jest/globals";
import {
    Dimension,
    Angular,
    Distance,
    Energy,
    Pressure,
    Temperature,
    Velocity,
    Weight,
    UNew,
    Unit,
    type AngularUnit,
    type DistanceUnit,
    type VelocityUnit,
    type WeightUnit,
    type TemperatureUnit,
    type PressureUnit,
    type EnergyUnit,
    UnitProps,
    unitTypeCoerce
} from "../src";

describe("Unit back'n'forth", () => {
    function backAndForth<AllowedUnitT extends Unit>(value: number, units: AllowedUnitT): void {
        const u = UNew[units](value);
        const v = u.In(units);

        expect(v).toBeCloseTo(value, 7);

        test(`Read back failed for ${UnitProps[units].name}`, () => {
            expect(v).toBeCloseTo(value, 7);
        });

        test(`Conversion ${UnitProps[units].name}`, () => {
            expect(u.to(units).rawValue).toBeCloseTo(u.rawValue, 7);
        });
    }

    function backAndForthAll(unitList: Unit[]): void {
        unitList.forEach((unit) => {
            backAndForth(3, unit);
        });
    }

    describe("Angular", () => {
        backAndForthAll([Unit.Degree, Unit.MOA, Unit.MRad, Unit.MIL, Unit.Radian, Unit.Thousand]);
    });

    describe("Distance", () => {
        backAndForthAll([
            Unit.Centimeter,
            Unit.Foot,
            Unit.Inch,
            Unit.Kilometer,
            Unit.Line,
            Unit.Meter,
            Unit.Millimeter,
            Unit.Mile,
            Unit.NauticalMile,
            Unit.Yard,
        ]);
    });

    describe("Energy", () => {
        backAndForthAll([Unit.FootPound, Unit.Joule]);
    });

    describe("Pressure", () => {
        backAndForthAll([Unit.Bar, Unit.hPa, Unit.MmHg, Unit.InHg]);
    });

    describe("Temperature", () => {
        backAndForthAll([Unit.Fahrenheit, Unit.Kelvin, Unit.Celsius, Unit.Rankin]);
    });

    describe("Velocity", () => {
        backAndForthAll([Unit.FPS, Unit.KMH, Unit.KT, Unit.MPH, Unit.MPS]);
    });

    describe("Weight", () => {
        backAndForthAll([
            Unit.Grain,
            Unit.Gram,
            Unit.Kilogram,
            Unit.Newton,
            Unit.Ounce,
            Unit.Pound,
        ]);
    });
});

describe("Unit coercion", () => {
    test("Distance as number", () => {
        const unit = unitTypeCoerce<DistanceUnit, Distance>(10, Distance, Unit.Yard);
        expect(unit.In(Unit.Yard)).toBeCloseTo(10, 7);
    });

    test("Distance as instance", () => {
        const unit = unitTypeCoerce<DistanceUnit, Distance>(UNew.Yard(10), Distance, Unit.Yard);
        expect(unit.In(Unit.Yard)).toBeCloseTo(10, 7);
    });

    test("Angular as number", () => {
        const unit = unitTypeCoerce<AngularUnit, Angular>(45, Angular, Unit.Degree);
        expect(unit.In(Unit.Degree)).toBeCloseTo(45, 7);
    });

    test("Angular as instance", () => {
        const unit = unitTypeCoerce<AngularUnit, Angular>(UNew.Degree(45), Angular, Unit.Degree);
        expect(unit.In(Unit.Degree)).toBeCloseTo(45, 7);
    });

    test("Velocity as number", () => {
        const unit = unitTypeCoerce<VelocityUnit, Velocity>(2800, Velocity, Unit.FPS);
        expect(unit.In(Unit.FPS)).toBeCloseTo(2800, 7);
    });

    test("Weight as instance", () => {
        const unit = unitTypeCoerce<WeightUnit, Weight>(UNew.Grain(150), Weight, Unit.Grain);
        expect(unit.In(Unit.Grain)).toBeCloseTo(150, 7);
    });

    test("Temperature as number", () => {
        const unit = unitTypeCoerce<TemperatureUnit, Temperature>(59, Temperature, Unit.Fahrenheit);
        expect(unit.In(Unit.Fahrenheit)).toBeCloseTo(59, 7);
    });

    test("Pressure as instance", () => {
        const unit = unitTypeCoerce<PressureUnit, Pressure>(UNew.InHg(29.92), Pressure, Unit.InHg);
        expect(unit.In(Unit.InHg)).toBeCloseTo(29.92, 7);
    });

    test("Energy as number", () => {
        const unit = unitTypeCoerce<EnergyUnit, Energy>(2500, Energy, Unit.FootPound);
        expect(unit.In(Unit.FootPound)).toBeCloseTo(2500, 7);
    });

    test("Invalid value (string)", () => {
        // @ts-expect-error - Testing invalid input
        expect(() => unitTypeCoerce<DistanceUnit, Distance>("invalid", Distance, Unit.Yard)).toThrow(
            `Instance must be a type of Distance or 'number'`
        );
    });

    test("Undefined value", () => {
        // @ts-expect-error - Testing invalid input
        expect(() => unitTypeCoerce<DistanceUnit, Distance>(undefined, Distance, Unit.Yard)).toThrow(
            `Instance must be a type of Distance or 'number'`
        );
    });

    test("Null value", () => {
        // @ts-expect-error - Testing invalid input
        expect(() => unitTypeCoerce<DistanceUnit, Distance>(null, Distance, Unit.Yard)).toThrow(
            `Instance must be a type of Distance or 'number'`
        );
    });
});