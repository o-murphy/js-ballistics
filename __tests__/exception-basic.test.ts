/**
 * Basic Exception Handling Test
 *
 * Tests C++ exception to JavaScript exception conversion
 */

import { expect, test } from "@jest/globals";
import { WasmManager } from "../src/_wasm";
import { describeWasm } from "./wasmAvailable";

interface CustomWasmError extends Error {
    customValue: number;
    customCount: number;
}

describeWasm("Basic Exception Handling", () => {
    test("C++ runtime_error should be caught as JavaScript Error", async () => {
        const bclibc = await WasmManager.init();

        const testMessage = "Test exception from C++";

        expect(() => {
            bclibc.testThrowRuntimeError(testMessage);
        }).toThrow();
    });

    test("C++ exception should contain the original message", async () => {
        const bclibc = await WasmManager.init();

        const testMessage = "Custom error message";

        let caughtError: unknown;
        try {
            bclibc.testThrowRuntimeError(testMessage);
        } catch (error) {
            caughtError = error;
        }

        expect(caughtError).toBeInstanceOf(Error);
        expect((caughtError as Error).message).toContain(testMessage);
    });

    test("C++ exception should have Error type", async () => {
        const bclibc = await WasmManager.init();

        let caughtError: unknown;
        try {
            bclibc.testThrowRuntimeError("test");
        } catch (error) {
            caughtError = error;
        }

        // In JavaScript, all C++ exceptions come through as Error objects
        expect(caughtError).toBeInstanceOf(Error);
        expect(typeof caughtError).toBe("object");
    });
});

describeWasm("Custom C++ Exception Handling", () => {
    test("Custom C++ exception should be caught as JavaScript Error", async () => {
        const bclibc = await WasmManager.init();

        expect(() => {
            bclibc.testThrowCustomException("Custom exception", 42.5, 100);
        }).toThrow();
    });

    test("Custom C++ exception should preserve custom fields", async () => {
        const bclibc = await WasmManager.init();

        const testMessage = "Exception with custom fields";
        const testValue = 123.456;
        const testCount = 999;

        let caughtError: CustomWasmError | undefined;
        try {
            bclibc.testThrowCustomException(testMessage, testValue, testCount);
        } catch (error) {
            caughtError = error as CustomWasmError;
        }

        expect(caughtError).toBeInstanceOf(Error);
        expect(caughtError?.message).toContain(testMessage);
        expect(caughtError?.customValue).toBe(testValue);
        expect(caughtError?.customCount).toBe(testCount);
    });

    test("Custom exception fields should have correct types", async () => {
        const bclibc = await WasmManager.init();

        let caughtError: CustomWasmError | undefined;
        try {
            bclibc.testThrowCustomException("test", 3.14, 42);
        } catch (error) {
            caughtError = error as CustomWasmError;
        }

        expect(typeof caughtError?.customValue).toBe("number");
        expect(typeof caughtError?.customCount).toBe("number");
        expect(caughtError?.customValue).toBeCloseTo(3.14);
        expect(caughtError?.customCount).toBe(42);
    });
});
