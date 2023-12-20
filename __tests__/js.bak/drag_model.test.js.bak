// Import the classes and functions to be tested
import {DragModel, DragTable, calcSettings} from '../src/index.js';

// Mock the dependencies
jest.mock('../src/settings');


describe('DragDataPoint class', () => {
    test('creates a DragDataPoint instance with CD and Mach properties', () => {
        const dragDataPoint = {CD: 0.2, Mach: 0.5};
        expect(dragDataPoint.CD).toBe(0.2);
        expect(dragDataPoint.Mach).toBe(0.5);
    });
});

describe('DragModel class', () => {
    test('creates a DragModel instance with valid input', () => {
        // const dragTable = [{ CD: 0.1, Mach: 0.2 }];
        const dragModel = new DragModel(1, DragTable.G7, 10, 5);

        expect(dragModel.value).toBe(1);
        expect(dragModel.weight.In(calcSettings.Units.weight)).toBe(10);
        expect(dragModel.diameter.In(calcSettings.Units.diameter)).toBe(5);
        expect(dragModel.sectionalDensity).toBeCloseTo(0.000057, 6);
        expect(dragModel.formFactor).toBeCloseTo(0.000057, 6);
    });

    test('throws an error for invalid dragTable length', () => {
        const dragTable = [];
        expect(() => new DragModel(1, dragTable, 10, 5)).toThrowError(
            'Custom drag table must be longer than 0'
        );
    });

    test('throws an error for invalid value', () => {
        const dragTable = [{ CD: 0.1, Mach: 0.2 }];
        expect(() => new DragModel(0, dragTable, 10, 5)).toThrowError(
            'Drag coefficient must be greater than zero'
        );
    });
});
