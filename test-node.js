// test-node.js
import BclibcFactory from './dist/bclibc.js';

async function test() {
    console.log('🚀 Loading WASM module...');
    const Module = await BclibcFactory();
    console.log('✅ Module loaded!\n');

    // Тест створення векторів
    console.log('Creating vectors...');
    const v1 = Module.v3dCreate(1.0, 2.0, 3.0);
    console.log('v1:', v1);

    const v2 = Module.v3dCreate(4.0, 5.0, 6.0);
    console.log('v2:', v2);

    // Тест додавання
    console.log('\nTesting addition...');
    const v3 = Module.v3dAdd(v1, v2);
    console.log('v1 + v2 =', v3);
    console.log('Expected: { x: 5, y: 7, z: 9 }');

    // Тест множення
    console.log('\nTesting scalar multiplication...');
    const v4 = Module.v3dMultiply(v1, 2.0);
    console.log('v1 * 2 =', v4);
    console.log('Expected: { x: 2, y: 4, z: 6 }');

    // Тест dot product
    console.log('\nTesting dot product...');
    const dot = Module.v3dDot(v1, v2);
    console.log('v1 · v2 =', dot);
    console.log('Expected: 32 (1*4 + 2*5 + 3*6)');

    // Тест magnitude
    console.log('\nTesting magnitude...');
    const mag = Module.v3dMagnitude(v1);
    console.log('|v1| =', mag);
    console.log('Expected: ~3.742 (sqrt(1² + 2² + 3²))');

    // Тест нормалізації
    console.log('\nTesting normalization...');
    const normalized = Module.v3dNormalized(v1);
    console.log('normalized v1 =', normalized);
    const normMag = Module.v3dMagnitude(normalized);
    console.log('|normalized v1| =', normMag);
    console.log('Expected: ~1.0');

    // Тест in-place операцій
    console.log('\nTesting in-place operations...');
    const v5 = Module.v3dCreate(10, 20, 30);
    console.log('v5 before:', v5);
    Module.v3dMultiplyInPlace(v5, 0.5);
    console.log('v5 after *= 0.5:', v5);
    console.log('Expected: { x: 5, y: 10, z: 15 }');

    console.log('\n✅ All tests completed!');
}

test().catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
});