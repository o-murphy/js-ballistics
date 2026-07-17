import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginJest from "eslint-plugin-jest";

export default [
    {
        ignores: [
            "node_modules/",
            "dist/",
            "build/",
            "coverage/",
            "__stubs__/",
            "lib/",
            "**/*.min.js",
            "**/*.bundle.js",
            "wasm/bclibc.js",
        ],
    },
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        ...js.configs.recommended,
        ...eslintConfigPrettier,
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
    {
        files: ["**/__tests__/**/*.{js,ts}", "**/*.test.{js,ts}"],
        plugins: { jest: pluginJest },
        rules: {
            ...pluginJest.configs.recommended.rules,
            "jest/no-standalone-expect": [
                "warn",
                { additionalTestBlockFunctions: ["testWasm", "testWasm.each"] },
            ],
            "jest/no-conditional-expect": "warn",
            "jest/no-jasmine-globals": "warn",
            "jest/expect-expect": [
                "warn",
                { assertFunctionNames: ["expect", "customAssertEqual"] },
            ],
        },
        languageOptions: {
            globals: pluginJest.environments.globals.globals,
        },
    },
];
