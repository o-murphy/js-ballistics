import { Distance, calcSettings } from '../src/index';


describe('Settings', () => {

    test('should initialize with default values', () => {
        expect(calcSettings.USE_POWDER_SENSITIVITY).toBe(false);
        expect(calcSettings._MAX_CALC_STEP_SIZE).toBe(1);
        // Add more assertions for default unit values if needed
    });

    test('should set MAX_CALC_STEP_SIZE', () => {
        const distanceValue = new Distance(100, Distance.Meter); // Replace with an appropriate value
        calcSettings.setMaxCalcStepSize(distanceValue);
        // Adjust the expectation based on the calculation in your implementation
        expect(calcSettings._MAX_CALC_STEP_SIZE).toEqual(new Distance(100, Distance.Meter));
    });

    test('should set MAX_CALC_STEP_SIZE', () => {
        const distanceValue = 100; // Replace with an appropriate value
        calcSettings.setMaxCalcStepSize(distanceValue);
        // Adjust the expectation based on the calculation in your implementation
        expect(calcSettings._MAX_CALC_STEP_SIZE).toEqual(new Distance(100, calcSettings.Units.distance));
    });

    test('should throw error for invalid MAX_CALC_STEP_SIZE value', () => {
        const invalidValue = 'invalid'; // Replace with an invalid value
        expect(() => calcSettings.setMaxCalcStepSize(invalidValue)).toThrowError("MAX_CALC_STEP_SIZE must be a type of 'Distance'");
    });

    test('should modify USE_POWDER_SENSITIVITY', () => {
        calcSettings.USE_POWDER_SENSITIVITY = true;
        expect(calcSettings.USE_POWDER_SENSITIVITY).toBe(true);
    });

    // Add more tests as needed for other methods or scenarios
});
