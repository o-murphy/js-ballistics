import {describe, expect, test} from '@jest/globals';
import {Measure, UNew, Unit, UnitProps, unitTypeCoerce} from '../src';

describe("Unit back'n'forth", () => {


  function backAndForth(value: number, units: Unit): void {
      const u = UNew[units](value);
      const v = u.In(units);

      expect(v).toBeCloseTo(value, 7)

      test(`Read back failed for ${UnitProps[units].name}`, () => {
          expect(v).toBeCloseTo(value, 7)
      })

      test(`Conversion ${UnitProps[units].name}`, () => {
          expect(u.to(units).rawValue).toBeCloseTo(u.rawValue, 7)
      })
  }

  function backAndForthAll(unitList: Unit[]): void {
      unitList.forEach((unit) => {
          backAndForth(3, unit);
      });
  }

  describe('Angular', () => {
      backAndForthAll([
          Unit.Degree,
          Unit.MOA,
          Unit.MRad,
          Unit.MIL,
          Unit.Radian,
          Unit.Thousand,
      ]);
  });

  describe('Distance', () => {
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

  describe('Energy', () => {
      backAndForthAll([
          Unit.FootPound,
          Unit.Joule,
      ]);
  });

  describe('Pressure', () => {
      backAndForthAll([
          Unit.Bar,
          Unit.hPa,
          Unit.MmHg,
          Unit.InHg,
      ]);
  });

  describe('Temperature', () => {
      backAndForthAll([
          Unit.Fahrenheit,
          Unit.Kelvin,
          Unit.Celsius,
          Unit.Rankin,
      ]);
  });

  describe('Velocity', () => {
      backAndForthAll([
          Unit.FPS,
          Unit.KMH,
          Unit.KT,
          Unit.MPH,
          Unit.MPS,
      ]);
  });

  describe('Weight', () => {
      backAndForthAll([
          Unit.Grain,
          Unit.Gram,
          Unit.Kilogram,
          Unit.Newton,
          Unit.Ounce,
          Unit.Pound
      ]);
  });
});


describe("Unit coercion", () => {

  test("As number", () => {
    const unit = unitTypeCoerce(10, Measure.Distance, Unit.Yard)
    expect(unit.In(Unit.Yard)).toBeCloseTo(10, 7)
  });

  test("As AbstractUnit", () => {
    const unit = unitTypeCoerce(UNew.Yard(10), Measure.Distance, Unit.Yard)
    expect(unit.In(Unit.Yard)).toBeCloseTo(10, 7)
  });

  test("As invalid value", () => {
    // @ts-ignore
      expect(() => unitTypeCoerce("invalid", Measure.Distance, Unit.Yard))
      .toThrowError(`Instance must be a type of ${
        Measure.Distance.name
      } or 'number'`);
  });

  test("As undefined", () => {
      //@ts-ignore
    expect(() => unitTypeCoerce(undefined, Measure.Distance, Unit.Yard))
      .toThrowError(`Instance must be a type of ${
        Measure.Distance.name
      } or 'number'`);
  });

});
