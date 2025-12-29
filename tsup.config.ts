import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    clean: true,
    shims: true,
    noExternal: [
        '../build/bclibc.js',
        /bclibc/
    ],
    bundle: true,
    esbuildOptions(options) {
        options.alias = {
            '@wasm': path.resolve(__dirname, './build'),
        };
        options.mainFields = ['module', 'main'];
    }
});