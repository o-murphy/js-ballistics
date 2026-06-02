import { existsSync } from "fs";
import { resolve } from "path";

export const WASM_AVAILABLE = existsSync(resolve(process.cwd(), "build/bclibc.js"));
export const testWasm = WASM_AVAILABLE ? test : test.skip;
export const describeWasm = WASM_AVAILABLE ? describe : describe.skip;
