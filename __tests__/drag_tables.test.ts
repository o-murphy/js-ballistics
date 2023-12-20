import {describe, expect, test} from '@jest/globals';
import { DragTable } from "../src/index.js";

describe("Drag Tables", () => {
    test("First element of TableG1 should have Mach: 0.00 and CD: 0.2629", () => {
        const firstElement = DragTable.G1[0];
        expect(firstElement.Mach).toBeCloseTo(0.00, 4); // Adjust the precision as needed
        expect(firstElement.CD).toBeCloseTo(0.2629, 4); // Adjust the precision as needed
    });
});