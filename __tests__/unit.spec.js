import { AbstractUnit, Angular, Distance, Velocity, Weight, Temperature, Pressure, Energy, Unit, UnitPropsDict } from "../src/units.js";


describe('js-ballistics unit tests', () => {
    test('Example test case', () => {
      // Your test assertions go here
      expect(true).toBe(true);
    });
  });


  describe('Ballistics Library Tests', () => {
    // Test cases for Angular class
    describe('Angular', () => {
      test('Convert Radian to Degree', () => {
        const angle = new Angular(1, Angular.Radian);
        expect(angle.in(Angular.Degree)).toBeCloseTo(57.2958, 4);
      });
  
      // Add more test cases for Angular conversions
    });
  
    // Test cases for Distance class
    describe('Distance', () => {
      // Add test cases for Distance class
    });
  
    // Test cases for Velocity class
    describe('Velocity', () => {
      // Add test cases for Velocity class
    });
  
    // Test cases for Weight class
    describe('Weight', () => {
      // Add test cases for Weight class
    });
  
    // Test cases for Pressure class
    describe('Pressure', () => {
      // Add test cases for Pressure class
    });
  
    // Test cases for Temperature class
    describe('Temperature', () => {
      // Add test cases for Temperature class
    });
  
    // Test cases for Energy class
    describe('Energy', () => {
      // Add test cases for Energy class
    });
  });