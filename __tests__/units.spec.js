import { AbstractUnit, Angular, Distance, Velocity, Weight, Temperature, Pressure, Energy, Unit, UnitPropsDict } from "../src/units.js";


describe('Ballistics Library Tests', () => {
  // Test cases for Angular class
  describe('Angular', () => {
    test('Convert Radian to Degree', () => {
      const angle = new Angular(1, Angular.Radian);
      expect(angle.in(Angular.Degree)).toBeCloseTo(57.2958, 4);
    });

    test('Convert Degree to Radian', () => {
      const angle = new Angular(180, Angular.Degree);
      expect(angle.in(Angular.Radian)).toBeCloseTo(Math.PI, 4);
    });

  });

  // Test cases for Distance class
  describe('Distance', () => {
    test('Convert Meters to Kilometers', () => {
      const distance = new Distance(1000, Distance.Meter);
      expect(distance.in(Distance.Kilometer)).toBeCloseTo(1, 1);
    });

    test('Convert Kilometers to Miles', () => {
      const distance = new Distance(1, Distance.Kilometer);
      expect(distance.in(Distance.Mile)).toBeCloseTo(0.621371, 6);
    });

  });

  // Test cases for Velocity class
  describe('Velocity', () => {
    test('Convert Meters per Second to Kilometers per Hour', () => {
      const velocity = new Velocity(10, Velocity.MPS);
      expect(velocity.in(Velocity.KMH)).toBe(36);
    });

    test('Convert Kilometers per Hour to Feet per Second', () => {
      const velocity = new Velocity(10, Velocity.KMH);
      expect(velocity.in(Velocity.FPS)).toBeCloseTo(9.11344, 5);
    });

  });

  // Test cases for Weight class
  describe('Weight', () => {
    test('Convert Kilograms to Pounds', () => {
      const weight = new Weight(10, Weight.Kilogram);
      expect(weight.in(Weight.Pound)).toBeCloseTo(22.0462, 4);
    });

    test('Convert Pounds to Grams', () => {
      const weight = new Weight(1, Weight.Pound);
      expect(weight.in(Weight.Gram)).toBeCloseTo(453.592, 3);
    });

  });

  // Test cases for Pressure class
  describe('Pressure', () => {
    test('Convert Millimeters of Mercury to Hectopascals', () => {
      const pressureMmHg = new Pressure(760, Pressure.MmHg);
      expect(pressureMmHg.in(Pressure.hPa)).toBeCloseTo(1013.25, 2);
    });
  
    test('Convert Hectopascals to Millimeters of Mercury', () => {
      const pressureHpa = new Pressure(1013.25, Pressure.hPa);
      expect(pressureHpa.in(Pressure.MmHg)).toBeCloseTo(760, 0);
    });

  });

  // Test cases for Temperature class
  describe('Temperature', () => {
    test('Convert Celsius to Fahrenheit', () => {
      const temperature = new Temperature(0, Temperature.Celsius);
      expect(temperature.in(Temperature.Fahrenheit)).toBeCloseTo(32, 0);
    });

    test('Convert Fahrenheit to Kelvin', () => {
      const temperature = new Temperature(32, Temperature.Fahrenheit);
      expect(temperature.in(Temperature.Kelvin)).toBeCloseTo(273.15, 2);
    });

  });

  // Test cases for Energy class
  describe('Energy', () => {
    test('Convert Joules to Foot-Pounds', () => {
      const energy = new Energy(1, Energy.Joule);
      expect(energy.in(Energy.FootPound)).toBeCloseTo(0.737562, 6);
    });
  
    test('Convert Foot-Pounds to Joules', () => {
      const energy = new Energy(1, Energy.FootPound);
      expect(energy.in(Energy.Joule)).toBeCloseTo(1.35582, 5);
    });

  });

});