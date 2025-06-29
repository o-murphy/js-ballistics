import { describe, expect, test } from "@jest/globals";
import Vector from "../src/vector";

describe("VectorJs module", () => {
    test("Create", () => {
        const v = new Vector(1, 2, 3);
        const c = v.copy();
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(3);
        expect(c.x).toBe(1);
        expect(c.y).toBe(2);
        expect(c.z).toBe(3);
    });

    test("Unary", () => {
        let v1 = new Vector(1, 2, 3);
        expect(Math.abs(v1.magnitude() - 3.74165738677)).toBeLessThanOrEqual(
            1e-7,
        );

        let v2 = v1.negate();
        expect(v2.x).toBe(-1);
        expect(v2.y).toBe(-2);
        expect(v2.z).toBe(-3);

        v2 = v1.normalize();
        expect(v2.x).toBeLessThanOrEqual(1);
        expect(v2.y).toBeLessThanOrEqual(1);
        expect(v2.z).toBeLessThanOrEqual(1);

        v1 = new Vector(0, 0, 0);
        v2 = v1.normalize();
        expect(v2.x).toBe(0);
        expect(v2.y).toBe(0);
        expect(v2.z).toBe(0);
    });

    test("Binary", () => {
        let v1 = new Vector(1, 2, 3);
        let v2 = v1.add(v1.copy());
        expect(v2.x).toBe(2);
        expect(v2.y).toBe(4);
        expect(v2.z).toBe(6);

        v2 = v1.subtract(v2);
        expect(v2.x).toBe(-1);
        expect(v2.y).toBe(-2);
        expect(v2.z).toBe(-3);

        let mul = v1.mulByVector(v1.copy());
        expect(mul).toBe(1 + 4 + 9);

        v2 = v1.mulByConst(3);
        expect(v2.x).toBe(3);
        expect(v2.y).toBe(6);
        expect(v2.z).toBe(9);
    });
});
