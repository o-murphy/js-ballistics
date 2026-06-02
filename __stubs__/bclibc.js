/**
 * Stub for @wasm/bclibc when WASM is not built.
 * Run 'make build-wasm' to build the real WASM module.
 *
 * This stub allows pure-TypeScript tests (unit, atmosphere, mbc validation, etc.)
 * to run in CI without a WASM build. Tests that call WasmManager.init() will fail
 * with a clear "WASM not built" error.
 */
const notBuilt = () =>
    Promise.reject(
        new Error("WASM module not built. Run 'make build-wasm' to build it, then re-run tests.")
    );

export default notBuilt;
