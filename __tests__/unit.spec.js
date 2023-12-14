import { UNew, Unit } from "../src/index";


describe('Ballistics Library Tests', () => {

  // describe("Coersion 2 tests", () => {
  //   test("Coerce2 test on number", () => {
  //     expect(unitTypeCoerce2(5, Unit.Yard)).toEqual(UNew.Yard(5))
  //   })
  //
  //   test("Coerce2 test on AbstractUnit", () => {
  //     expect(unitTypeCoerce2(UNew.Yard(5), Unit.Yard)).toEqual(UNew.Yard(5))
  //   })
  // })

  // Test cases for Angular class
  describe('Angular', () => {

    test('Convert Radian to Degree', () => {
      const angle = UNew[Unit.Newton](1);
      expect(angle.in(Unit.Newton)).toBeCloseTo(1, 4);
    });

    test('Convert Radian to Degree', () => {
      const angle = UNew.Radian(1);
      expect(angle.in(Unit.Degree)).toBeCloseTo(57.2958, 4);
    });

    test('Convert Degree to Radian', () => {
      const angle = UNew.Degree(180, Unit.Degree);
      expect(angle.in(Unit.Radian)).toBeCloseTo(Math.PI, 4);
    });

  });

  // Test cases for Distance class
  describe('Distance', () => {
    test('Convert Meters to Kilometers', () => {
      const distance = UNew.Meter(1000);
      expect(distance.in(Unit.Kilometer)).toBeCloseTo(1, 1);
    });

    test('Convert Kilometers to Miles', () => {
      const distance = UNew.Kilometer(1);
      expect(distance.in(Unit.Mile)).toBeCloseTo(0.621371, 6);
    });

  });

  // Test cases for Velocity class
  describe('Velocity', () => {
    test('Convert Meters per Second to Kilometers per Hour', () => {
      const velocity = UNew.MPS(10);
      expect(velocity.in(Unit.KMH)).toBe(36);
    });

    test('Convert Kilometers per Hour to Feet per Second', () => {
      const velocity = UNew.KMH(10);
      expect(velocity.in(Unit.FPS)).toBeCloseTo(9.11344, 5);
    });

  });

  // Test cases for Weight class
  describe('Weight', () => {
    test('Convert Kilograms to Pounds', () => {
      const weight = UNew.Kilogram(10);
      expect(weight.in(Unit.Pound)).toBeCloseTo(22.0462, 4);
    });

    test('Convert Pounds to Grams', () => {
      const weight = UNew.Pound(1);
      expect(weight.in(Unit.Gram)).toBeCloseTo(453.592, 3);
    });

  });

  // Test cases for Pressure class
  describe('Pressure', () => {
    test('Convert Millimeters of Mercury to Hectopascals', () => {
      const pressureMmHg = UNew.MmHg(760);
      expect(pressureMmHg.in(Unit.hPa)).toBeCloseTo(1013.25, 2);
    });
  
    test('Convert Hectopascals to Millimeters of Mercury', () => {
      const pressureHpa = UNew.hPa(1013.25);
      expect(pressureHpa.in(Unit.MmHg)).toBeCloseTo(760, 0);
    });

  });

  // Test cases for Temperature class
  describe('Temperature', () => {
    test('Convert Celsius to Fahrenheit', () => {
      const temperature = UNew.Celsius(0);
      expect(temperature.in(Unit.Fahrenheit)).toBeCloseTo(32, 0);
    });

    test('Convert Fahrenheit to Kelvin', () => {
      const temperature = UNew.Fahrenheit(32);
      expect(temperature.in(Unit.Kelvin)).toBeCloseTo(273.15, 2);
    });

  });

  // Test cases for Energy class
  describe('Energy', () => {
    test('Convert Joules to Foot-Pounds', () => {
      const energy = UNew.Joule(1);
      expect(energy.in(Unit.FootPound)).toBeCloseTo(0.737562, 6);
    });
  
    test('Convert Foot-Pounds to Joules', () => {
      const energy = UNew.FootPound(1, Unit.FootPound);
      expect(energy.in(Unit.Joule)).toBeCloseTo(1.35582, 5);
    });

  });

});