// test-class.ts
import BclibcFactory from './dist/bclibc.js';
import { Vector } from './wasm/vector';

async function test() {
    const Module = await BclibcFactory();

    // Створення векторів як класи
    const v1 = new Vector(Module, 1, 2, 3);
    const v2 = new Vector(Module, 4, 5, 6);

    console.log('v1:', v1.toString());
    console.log('v2:', v2.toString());

    // Методи класу
    const v3 = v1.add(v2);
    console.log('v1 + v2 =', v3.toString());

    const v4 = v1.multiply(2);
    console.log('v1 * 2 =', v4.toString());

    // Властивості
    console.log('v1.x =', v1.x);
    console.log('|v1| =', v1.magnitude());

    const dot = v1.dot(v2);
    console.log('v1 · v2 =', dot);

    // In-place операції (швидші!)
    const velocity = new Vector(Module, 100, 0, 0);
    const acceleration = new Vector(Module, -9.8, 0, 0);

    console.log('Before:', velocity.toString());
    velocity.fusedMultiplyAdd(acceleration, 0.1);
    console.log('After:', velocity.toString());

    // Chain operations
    const result = new Vector(Module, 1, 2, 3)
        .multiplyMut(2)
        .addMut(new Vector(Module, 1, 1, 1))
        .normalizeMut();

    console.log('Chained result:', result.toString());
}

test();