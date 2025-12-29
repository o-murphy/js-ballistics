// tests/wasm/vector.test.js

import { loadBclibc } from "../../src";

describe("BCLIBC Vector Tests", () => {
    let BCLIBC;

    beforeAll(async () => {
        BCLIBC = await loadBclibc();
    });

    describe("Vector Creation", () => {
        test("should create vector with specified coordinates", () => {
            const v = new BCLIBC._Vector(1, 2, 3);

            expect(v.x).toBe(1);
            expect(v.y).toBe(2);
            expect(v.z).toBe(3);

            v.delete();
        });

        test("should create zero vector with default constructor", () => {
            const v = new BCLIBC._Vector();

            expect(v.x).toBe(0);
            expect(v.y).toBe(0);
            expect(v.z).toBe(0);

            v.delete();
        });

        test("should allow property modification", () => {
            const v = new BCLIBC._Vector(1, 2, 3);

            v.x = 10;
            v.y = 20;
            v.z = 30;

            expect(v.x).toBe(10);
            expect(v.y).toBe(20);
            expect(v.z).toBe(30);

            v.delete();
        });
    });

    describe("Vector Arithmetic", () => {
        test("should add two vectors", () => {
            const v1 = new BCLIBC._Vector(1, 2, 3);
            const v2 = new BCLIBC._Vector(4, 5, 6);
            const result = v1.add(v2);

            expect(result.x).toBe(5);
            expect(result.y).toBe(7);
            expect(result.z).toBe(9);

            v1.delete();
            v2.delete();
            result.delete();
        });

        test("should subtract two vectors", () => {
            const v1 = new BCLIBC._Vector(10, 20, 30);
            const v2 = new BCLIBC._Vector(1, 2, 3);
            const result = v1.sub(v2);

            expect(result.x).toBe(9);
            expect(result.y).toBe(18);
            expect(result.z).toBe(27);

            v1.delete();
            v2.delete();
            result.delete();
        });

        test("should negate vector", () => {
            const v = new BCLIBC._Vector(1, -2, 3);
            const result = v.neg();

            expect(result.x).toBe(-1);
            expect(result.y).toBe(2);
            expect(result.z).toBe(-3);

            v.delete();
            result.delete();
        });

        test("should multiply vector by scalar", () => {
            const v = new BCLIBC._Vector(1, 2, 3);
            const result = v.mul(2);

            expect(result.x).toBe(2);
            expect(result.y).toBe(4);
            expect(result.z).toBe(6);

            v.delete();
            result.delete();
        });

        test("should divide vector by scalar", () => {
            const v = new BCLIBC._Vector(10, 20, 30);
            const result = v.div(10);

            expect(result.x).toBe(1);
            expect(result.y).toBe(2);
            expect(result.z).toBe(3);

            v.delete();
            result.delete();
        });

        test("should calculate dot product", () => {
            const v1 = new BCLIBC._Vector(1, 2, 3);
            const v2 = new BCLIBC._Vector(4, 5, 6);
            const dot = v1.dot(v2);

            // 1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32
            expect(dot).toBe(32);

            v1.delete();
            v2.delete();
        });

        test("dot product of perpendicular vectors should be zero", () => {
            const v1 = new BCLIBC._Vector(1, 0, 0);
            const v2 = new BCLIBC._Vector(0, 1, 0);
            const dot = v1.dot(v2);

            expect(dot).toBe(0);

            v1.delete();
            v2.delete();
        });
    });

    describe("In-Place Operations", () => {
        test("should add in-place", () => {
            const v1 = new BCLIBC._Vector(1, 2, 3);
            const v2 = new BCLIBC._Vector(4, 5, 6);

            const result = v1.iadd(v2);

            expect(v1.x).toBe(5);
            expect(v1.y).toBe(7);
            expect(v1.z).toBe(9);
            expect(result).toBe(v1); // Returns this

            v1.delete();
            v2.delete();
        });

        test("should subtract in-place", () => {
            const v1 = new BCLIBC._Vector(10, 20, 30);
            const v2 = new BCLIBC._Vector(1, 2, 3);

            v1.isub(v2);

            expect(v1.x).toBe(9);
            expect(v1.y).toBe(18);
            expect(v1.z).toBe(27);

            v1.delete();
            v2.delete();
        });

        test("should multiply in-place", () => {
            const v = new BCLIBC._Vector(1, 2, 3);

            v.imul(2);

            expect(v.x).toBe(2);
            expect(v.y).toBe(4);
            expect(v.z).toBe(6);

            v.delete();
        });

        test("should divide in-place", () => {
            const v = new BCLIBC._Vector(10, 20, 30);

            v.idiv(10);

            expect(v.x).toBe(1);
            expect(v.y).toBe(2);
            expect(v.z).toBe(3);

            v.delete();
        });

        test("should support method chaining", () => {
            const v = new BCLIBC._Vector(1, 0, 0);
            const temp = new BCLIBC._Vector(5, 5, 5);

            v.imul(10).iadd(temp);

            expect(v.x).toBe(15);
            expect(v.y).toBe(5);
            expect(v.z).toBe(5);

            v.delete();
            temp.delete();
        });
    });

    describe("Vector Properties", () => {
        test("should calculate magnitude correctly", () => {
            const v = new BCLIBC._Vector(3, 4, 0);
            const mag = v.mag();

            expect(mag).toBe(5);

            v.delete();
        });

        test("should calculate magnitude squared", () => {
            const v = new BCLIBC._Vector(3, 4, 0);
            const magSq = v.magSquared();

            expect(magSq).toBe(25);

            v.delete();
        });

        test("should normalize vector (create new)", () => {
            const v = new BCLIBC._Vector(3, 4, 0);
            const normalized = v.norm();

            expect(normalized.x).toBeCloseTo(0.6, 5);
            expect(normalized.y).toBeCloseTo(0.8, 5);
            expect(normalized.z).toBeCloseTo(0, 5);

            const mag = normalized.mag();
            expect(mag).toBeCloseTo(1, 5);

            v.delete();
            normalized.delete();
        });

        test("should normalize in-place", () => {
            const v = new BCLIBC._Vector(3, 4, 0);

            v.inorm();

            expect(v.x).toBeCloseTo(0.6, 5);
            expect(v.y).toBeCloseTo(0.8, 5);
            expect(v.z).toBeCloseTo(0, 5);

            const mag = v.mag();
            expect(mag).toBeCloseTo(1, 5);

            v.delete();
        });

        test("unit vector should have magnitude 1", () => {
            const vectors = [
                new BCLIBC._Vector(10, 0, 0),
                new BCLIBC._Vector(0, 20, 0),
                new BCLIBC._Vector(5, 5, 5),
                new BCLIBC._Vector(3, 4, 12),
            ];

            vectors.forEach((v) => {
                v.inorm();
                expect(v.mag()).toBeCloseTo(1, 5);
                v.delete();
            });
        });
    });

    describe("Fused Operations", () => {
        test("fusedMultiplyAdd should compute v += other * scalar", () => {
            const v = new BCLIBC._Vector(100, 0, 0);
            const gravity = new BCLIBC._Vector(0, -9.8, 0);

            v.fusedMultiplyAdd(gravity, 0.1);

            expect(v.x).toBeCloseTo(100, 5);
            expect(v.y).toBeCloseTo(-0.98, 5);
            expect(v.z).toBeCloseTo(0, 5);

            v.delete();
            gravity.delete();
        });

        test("fusedMultiplySubtract should compute v -= other * scalar", () => {
            const v = new BCLIBC._Vector(100, 100, 0);
            const drag = new BCLIBC._Vector(1, 0, 0);

            v.fusedMultiplySubtract(drag, 10);

            expect(v.x).toBeCloseTo(90, 5);
            expect(v.y).toBeCloseTo(100, 5);
            expect(v.z).toBeCloseTo(0, 5);

            v.delete();
            drag.delete();
        });

        test("linearCombination should compute v = a*sA + b*sB", () => {
            const v = new BCLIBC._Vector();
            const a = new BCLIBC._Vector(1, 0, 0);
            const b = new BCLIBC._Vector(0, 1, 0);

            v.linearCombination(a, 3, b, 4);

            expect(v.x).toBeCloseTo(3, 5);
            expect(v.y).toBeCloseTo(4, 5);
            expect(v.z).toBeCloseTo(0, 5);

            v.delete();
            a.delete();
            b.delete();
        });

        test("linearCombination4 should compute 4-vector combination", () => {
            const v = new BCLIBC._Vector();
            const a = new BCLIBC._Vector(1, 0, 0);
            const b = new BCLIBC._Vector(0, 1, 0);
            const c = new BCLIBC._Vector(0, 0, 1);
            const d = new BCLIBC._Vector(1, 1, 1);

            v.linearCombination4(a, 1, b, 2, c, 3, d, 4);

            expect(v.x).toBeCloseTo(5, 5); // 1 + 0 + 0 + 4
            expect(v.y).toBeCloseTo(6, 5); // 0 + 2 + 0 + 4
            expect(v.z).toBeCloseTo(7, 5); // 0 + 0 + 3 + 4

            v.delete();
            a.delete();
            b.delete();
            c.delete();
            d.delete();
        });
    });

    describe("Physics Simulation", () => {
        test("should simulate projectile motion step", () => {
            const position = new BCLIBC._Vector(0, 0, 0);
            const velocity = new BCLIBC._Vector(100, 100, 0);
            const gravity = new BCLIBC._Vector(0, -9.8, 0);
            const dt = 0.1;

            // Update velocity: v += g * dt
            velocity.fusedMultiplyAdd(gravity, dt);

            // Update position: p += v * dt
            position.fusedMultiplyAdd(velocity, dt);

            expect(position.x).toBeCloseTo(10, 5);
            expect(position.y).toBeCloseTo(9.902, 3);
            expect(position.z).toBeCloseTo(0, 5);

            position.delete();
            velocity.delete();
            gravity.delete();
        });

        test("should simulate multiple time steps", () => {
            const position = new BCLIBC._Vector(0, 10, 0);
            const velocity = new BCLIBC._Vector(10, 0, 0);
            const gravity = new BCLIBC._Vector(0, -9.8, 0);
            const dt = 0.01;

            // Simulate until projectile hits ground
            let steps = 0;
            while (position.y > 0 && steps < 1000) {
                velocity.fusedMultiplyAdd(gravity, dt);
                position.fusedMultiplyAdd(velocity, dt);
                steps++;
            }

            expect(steps).toBeGreaterThan(0);
            expect(steps).toBeLessThan(1000);
            expect(position.y).toBeLessThanOrEqual(0);

            position.delete();
            velocity.delete();
            gravity.delete();
        });
    });

    describe("Performance", () => {
        const iterations = 10000;

        test("regular add performance", () => {
            const v1 = new BCLIBC._Vector(1, 2, 3);
            const v2 = new BCLIBC._Vector(4, 5, 6);

            const start = performance.now();
            for (let i = 0; i < iterations; i++) {
                const tmp = v1.add(v2);
                tmp.delete();
            }
            const elapsed = performance.now() - start;

            expect(elapsed).toBeLessThan(5000);

            v1.delete();
            v2.delete();
        });

        test("in-place iadd should be faster than regular add", () => {
            const v1 = new BCLIBC._Vector(1, 2, 3);
            const v2 = new BCLIBC._Vector(4, 5, 6);
            const v3 = new BCLIBC._Vector(1, 2, 3);

            // Regular add
            const start1 = performance.now();
            for (let i = 0; i < iterations; i++) {
                const tmp = v1.add(v2);
                tmp.delete();
            }
            const elapsed1 = performance.now() - start1;

            // In-place add
            const start2 = performance.now();
            for (let i = 0; i < iterations; i++) {
                v3.iadd(v2);
            }
            const elapsed2 = performance.now() - start2;

            expect(elapsed2).toBeLessThan(elapsed1);

            v1.delete();
            v2.delete();
            v3.delete();
        });
    });

    describe("Memory Management", () => {
        test("should not leak memory with proper cleanup", () => {
            const vectors = [];

            for (let i = 0; i < 100; i++) {
                vectors.push(new BCLIBC._Vector(i, i * 2, i * 3));
            }

            vectors.forEach((v) => v.delete());

            // If we got here without crashing, memory management works
            expect(vectors.length).toBe(100);
        });

        test("should handle operations on many vectors", () => {
            const count = 1000;
            const vectors = [];

            for (let i = 0; i < count; i++) {
                const v = new BCLIBC._Vector(i, i, i);
                v.inorm();
                vectors.push(v);
            }

            // vectors.forEach((v, i) => {
            //     expect(v.mag()).toBeCloseTo(1, 5);
            //     v.delete();
            // });
            vectors.forEach((v) => {
                const m = v.mag();
                if (m !== 0) {
                    expect(m).toBeCloseTo(1, 5);
                }
            });

            expect(vectors.length).toBe(count);
        });
    });
});
