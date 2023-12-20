import {describe, expect, test} from '@jest/globals';
import { calcSettings, UNew } from '../src/index.js';


describe('Settings', () => {

    test('should initialize with default values', () => {
        expect(calcSettings.USE_POWDER_SENSITIVITY).toBe(false);
        expect(calcSettings.maxCalcStepSize).toBe(1);
        // Add more assertions for default unit values if needed
    });

    test('should set MAX_CALC_STEP_SIZE', () => {
        calcSettings.maxCalcStepSize = UNew.Meter(100);
        // Adjust the expectation based on the calculation in your implementation
        expect(calcSettings.maxCalcStepSize).toEqual(UNew.Meter(100));
    });

    test('should set MAX_CALC_STEP_SIZE', () => {
        calcSettings.maxCalcStepSize = 100;
        // Adjust the expectation based on the calculation in your implementation
        expect(calcSettings.maxCalcStepSize).toEqual(UNew[calcSettings.Units.distance](100));
    });

    test('should modify USE_POWDER_SENSITIVITY', () => {
        calcSettings.USE_POWDER_SENSITIVITY = true;
        expect(calcSettings.USE_POWDER_SENSITIVITY).toBe(true);
    });

    // Add more tests as needed for other methods or scenarios
});
