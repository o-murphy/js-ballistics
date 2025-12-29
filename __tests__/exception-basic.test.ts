/**
 * Basic Exception Handling Test
 *
 * Tests C++ exception to JavaScript exception conversion
 */

import { loadBclibc } from "../src/_wasm";

describe("Basic Exception Handling", () => {
    test("C++ runtime_error should be caught as JavaScript Error", async () => {
        const bclibc = await loadBclibc();

        const testMessage = "Test exception from C++";

        expect(() => {
            bclibc.testThrowRuntimeError(testMessage);
        }).toThrow();
    });

    test("C++ exception should contain the original message", async () => {
        const bclibc = await loadBclibc();

        const testMessage = "Custom error message";

        try {
            bclibc.testThrowRuntimeError(testMessage);
            fail("Should have thrown an error");
        } catch (error) {
            // Debug: see what we actually get
            console.log("Caught error:", error);
            console.log("Error type:", typeof error);
            console.log("Error constructor:", error?.constructor?.name);

            expect(error).toBeInstanceOf(Error);
            expect((error as Error).message).toContain(testMessage);
        }
    });

    test("C++ exception should have Error type", async () => {
        const bclibc = await loadBclibc();

        try {
            bclibc.testThrowRuntimeError("test");
            fail("Should have thrown an error");
        } catch (error) {
            // In JavaScript, all C++ exceptions come through as Error objects
            expect(error).toBeInstanceOf(Error);
            expect(typeof error).toBe("object");
        }
    });
});

describe("Custom C++ Exception Handling", () => {
    test("Custom C++ exception should be caught as JavaScript Error", async () => {
        const bclibc = await loadBclibc();

        expect(() => {
            bclibc.testThrowCustomException("Custom exception", 42.5, 100);
        }).toThrow();
    });

    test("Custom C++ exception should preserve custom fields", async () => {
        const bclibc = await loadBclibc();

        const testMessage = "Exception with custom fields";
        const testValue = 123.456;
        const testCount = 999;

        try {
            bclibc.testThrowCustomException(testMessage, testValue, testCount);
            fail("Should have thrown an error");
        } catch (error: any) {
            // Check it's an Error
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toContain(testMessage);

            // Check custom fields are preserved
            expect(error.customValue).toBe(testValue);
            expect(error.customCount).toBe(testCount);
        }
    });

    test("Custom exception fields should have correct types", async () => {
        const bclibc = await loadBclibc();

        try {
            bclibc.testThrowCustomException("test", 3.14, 42);
            fail("Should have thrown an error");
        } catch (error: any) {
            expect(typeof error.customValue).toBe("number");
            expect(typeof error.customCount).toBe("number");
            expect(error.customValue).toBeCloseTo(3.14);
            expect(error.customCount).toBe(42);
        }
    });
});
