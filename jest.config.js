export default {
    preset: 'ts-jest/presets/js-with-ts-esm',
    testEnvironment: "node",
    moduleNameMapper: {
        // Регулярка має збігатися з твоїм аліасом
        '^@wasm/(.*)$': '<rootDir>/build/$1',
        '^@src/(.*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: ["<rootDir>/src/_wasm.ts"],
    // Ignore tests in emsdk
    testPathIgnorePatterns: ["/node_modules/", "/emsdk/"],
    // If here is JS, not need transform
    transformIgnorePatterns: ["/node_modules/", "/emsdk/"],
    transform: {
        "^.+\\.ts$": ['ts-jest', { useESM: true }],
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }],
        "^.+\\.js$": "babel-jest"  // <- для ES6 JS (dist/bclibc.js)
    }
};
