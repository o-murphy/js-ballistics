# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Bump `emscripten-core/setup-emsdk` to `v16`

## [3.0.0-beta.2] - 2026-06-02

### Added

- `eslint.config.js` flat config (ESLint v9/v10 format); replaces
  `.eslintignore` + old rc-style config
- `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin` dev
  dependencies for TypeScript linting
- `github-actions` ecosystem in `.github/dependabot.yml` for automatic GitHub
  Actions version updates
- `Development` section in README: prerequisites, clone, Emscripten setup, build
  commands, test, lint, deploy

### Changed

- Upgraded ESLint `^9` → `^10`
- Upgraded TypeScript `^5.9` → `^6.0`
- `tsconfig.json`: removed deprecated `baseUrl` (TS6), added
  `ignoreDeprecations: "6.0"` (silences tsup DTS build) and explicit
  `rootDir: "./"` (required by TS6 when ts-jest compiles `__tests__/` alongside
  `src/`)
- `__stubs__/bclibc.d.ts` rewritten to match real Emscripten-generated types:
  all enum types are now numeric unions (`_TrajectoryDataInterpKey`,
  `_TerminationReason`, etc.), `_HitOutput` field renamed `termination_reason` →
  `reason`, full `_TrajectoryData`, `_BaseTrajData`, `_Vector`, `_WindList`,
  `_DragTable` and `EmbindModule` interfaces added
- `Makefile` `build-wasm` target now copies
  `build/bclibc.d.ts → __stubs__/bclibc.d.ts` automatically so the stub stays in
  sync with the WASM API without manual maintenance

### Fixed

- `src/trajectory_data.ts`: `getAt()` parameter type corrected to
  `_TrajectoryDataInterpKey` (was accidentally widened to `number`);
  `hit.reason` field reference restored (was incorrectly changed to
  `hit.termination_reason`)
- `package-lock.json` added to `.gitignore` (project uses Yarn; npm lock file
  was polluting the working tree)

## [3.0.0-beta.1] - 2026-06-02

### Added

- WASM-based ballistic calculation engine powered by
  [bclibc](https://github.com/ballistics-lab/bclibc) C++ library
- `RK4` (Runge-Kutta 4th order) and `EULER` integration methods via
  `IntegrationMethod` enum
- `WasmManager` singleton for lazy WASM module initialisation
- `bclibc` added as a Git submodule at `lib/bclibc`
- Trajectory data interpolation via `HitResult.getAt()` with
  `_TrajectoryDataInterpKey`
- `TrajFlag` enum: `RANGE`, `ZERO_DOWN`, `ZERO_UP`, `ALL`, `NONE` and more
- `HitResult.flag()` helper to extract a single trajectory point by flag
- `HitResult.dangerSpace(atRange, targetHeight)` — computes the near/far range
  interval where a target of given height would be hit; returns a `DangerSpace`
  object with `begin` and `end` `TrajectoryData` points
- `DangerSpace` class with `begin`, `end`, and `target` `TrajectoryData` fields
- `__stubs__/bclibc.js` WASM stub so pure-TS tests run without a compiled WASM
  build
- `__tests__/wasmAvailable.ts` helper: exports `WASM_AVAILABLE` flag and
  skip-aware `testWasm` / `describeWasm`

### Changed

- **Breaking:** Calculation engine now requires a WASM build
  (`make build-wasm`); `Calculator` wraps `bclibc` instead of the pure-TS
  integrator
- `Shot` bindings aligned with bclibc v1.1.2: `BCLIBC_Shot::to_shot_props()` now
  handles `Atmosphere` and `Coriolis` pre-computation internally, reducing
  JS-side boilerplate
- All WASM-dependent test suites conditionally skip when `build/bclibc.js` is
  absent
- `atmosphere.test.ts` density precision relaxed from `4` → `3` decimal places
  to account for JS vs Python numeric differences
- `incomplete-shot.test.ts` height check at 1000 ft loosened from
  `toBeCloseTo(0, 2)` to `Math.abs(...) < 1.0 ft` to accommodate JS/Python
  solver divergence

### Fixed

- Removed unused JS-side dependencies after engine migration to WASM
- `HitResult.getAt()`: `getKeyVal` was returning `rawValue` for all dimensioned
  types; `Distance.rawValue` is stored in inches while WASM fields and all
  callers use feet, causing a 12× search mismatch that broke `dangerSpace()` and
  any custom `getAt()` call on distance/height/slant attributes. Fixed by using
  the WASM-native accessor (`.foot`, `.fps`, `.rad`, `.footPound`, `.pound`) for
  each key

### CI

- Build WASM with Emscripten 5.0.7 before running Jest (`make build-wasm`)
- Added `emscripten-core/setup-emsdk@v15` step with `actions/cache@v5` for emsdk
  caching
- Added `lib/emsdk/emsdk_env.sh` stub for Makefile compatibility (mirrors
  `release.yml`)
- Concurrency group (`github.workflow`-`github.ref`) with
  `cancel-in-progress: true`
- Added `emsdk-cache` to Jest `testPathIgnorePatterns` and
  `transformIgnorePatterns`
- Explicit `testMatch` glob (`**/__tests__/**/*.test.[jt]s?(x)`) prevents helper
  files and emsdk's own test files from being picked up as test suites

## [2.2.0-beta.2] - 2025-10-07

### Added

- Incomplete shots: trajectories that do not reach the requested range are
  returned with a terminal point; `HitResult.error` carries the stop reason

### Changed

- Bumped `jest` to 30.2.0
- Bumped `ts-jest`, `@babel/preset-env`, `prettier` to latest versions

### CI

- Added `dependabot.yml` with grouped npm dependency updates

## [2.0.0] - 2024-11-27

### Added

- Full v2 API aligned with
  [py-ballisticcalc](https://github.com/o-murphy/py-ballisticcalc) Python
  library
- `UNew` unit factory with `Distance`, `Velocity`, `Temperature`, `Pressure`,
  `Angular` and more
- `Atmo` with `Atmo.standard()`, `densityRatio`, `mach`, humidity and altitude
  support
- Multi-BC drag model (`DragModel` with `bcPoints`)
- `Wind`, `Weapon`, `Shot` typed data classes
- `Calculator` interface: `fire()`, zeroing, `getAtDistance()`
- `HitResult` / `TrajectoryData` typed result objects
- Comprehensive test suite: atmosphere, trajectory, computer, MBC, zero-finding,
  incomplete shots, danger space

### Changed

- **Breaking:** Complete rewrite from plain JS to TypeScript with strict typing
- **Breaking:** Package API v2.x is incompatible with v1.x

## [1.1.2] - 2023-12-29

### Fixed

- Type annotation fixes

### Changed

- Encapsulated trajectory calculation internals

## [1.1.1] - 2023-12-25

### Fixed

- Include `.d.ts` type declaration files in the published package

## [1.1.0] - 2023-12-25

### Added

- First stable TypeScript release (identical to `v1.0.3-beta.5`)

## [1.0.3-beta.5] - 2023-12-21

### Added

- TypeScript reimplementation (`v1.0.3-beta.1`)
- Multi-BC (`bcPoints`) support with debug fixes
- `DragDataPoint` type corrections

## [1.0.3-alpha.6] - 2023-12-17

### Fixed

- Multi-BC (`bcPoints`) debug and fix

---

[Unreleased]:
    https://github.com/o-murphy/js-ballistics/compare/v3.0.0-beta.2...HEAD
[3.0.0-beta.2]:
    https://github.com/o-murphy/js-ballistics/compare/v3.0.0-beta.1...v3.0.0-beta.2
[3.0.0-beta.1]:
    https://github.com/o-murphy/js-ballistics/compare/v2.2.0-beta.2...v3.0.0-beta.1
[2.2.0-beta.2]:
    https://github.com/o-murphy/js-ballistics/compare/v2.0.0...v2.2.0-beta.2
[2.0.0]: https://github.com/o-murphy/js-ballistics/compare/v1.1.2...v2.0.0
[1.1.2]: https://github.com/o-murphy/js-ballistics/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/o-murphy/js-ballistics/compare/v1.1.0...v1.1.1
[1.1.0]:
    https://github.com/o-murphy/js-ballistics/compare/v1.0.3-beta.5...v1.1.0
[1.0.3-beta.5]:
    https://github.com/o-murphy/js-ballistics/compare/v1.0.3-alpha.6...v1.0.3-beta.5
[1.0.3-alpha.6]:
    https://github.com/o-murphy/js-ballistics/releases/tag/v1.0.3-alpha.6
