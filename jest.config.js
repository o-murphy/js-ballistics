export default {
    preset: "ts-jest/presets/js-with-ts-esm",
    testEnvironment: "node",
    moduleNameMapper: {
        // Try real WASM build first; fall back to stub when build/ doesn't exist
        "^@wasm/(.*)$": ["<rootDir>/build/$1", "<rootDir>/__stubs__/$1"],
        "^@src/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/src/_wasm.ts"],
    // Only pick up *.test.ts / *.test.js files (excludes helper files like wasmAvailable.ts)
    testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
    testPathIgnorePatterns: ["/node_modules/", "/emsdk/", "emsdk-cache"],
    transformIgnorePatterns: ["/node_modules/", "/emsdk/", "emsdk-cache"],
    transform: {
        "^.+\\.ts$": ["ts-jest", { useESM: true }],
        "^.+\\.tsx?$": ["ts-jest", { useESM: true }],
        "^.+\\.js$": "babel-jest", // <- для ES6 JS (dist/bclibc.js)
    },
};
