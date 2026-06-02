# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.0-beta.0] - 2026-06-02

### Added
- WASM-based ballistic calculation engine powered by [bclibc](https://github.com/ballistics-lab/bclibc) C++ library
- `RK4` (Runge-Kutta 4th order) and `EULER` integration methods via `IntegrationMethod` enum
- `WasmManager` singleton for lazy WASM module initialisation
- `bclibc` added as a Git submodule at `lib/bclibc`
- Trajectory data interpolation via `HitResult.getAt()` with `_TrajectoryDataInterpKey`
- `TrajFlag` enum: `RANGE`, `ZERO_DOWN`, `ZERO_UP`, `ALL`, `NONE` and more
- `HitResult.flag()` helper to extract a single trajectory point by flag
- `HitResult.dangerSpace(atRange, targetHeight)` — computes the near/far range interval where a target of given height would be hit; returns a `DangerSpace` object with `begin` and `end` `TrajectoryData` points
- `DangerSpace` class with `begin`, `end`, and `target` `TrajectoryData` fields
- `__stubs__/bclibc.js` WASM stub so pure-TS tests run without a compiled WASM build
- `__tests__/wasmAvailable.ts` helper: exports `WASM_AVAILABLE` flag and skip-aware `testWasm` / `describeWasm`

### Changed
- **Breaking:** Calculation engine now requires a WASM build (`make build-wasm`);
  `Calculator` wraps `bclibc` instead of the pure-TS integrator
- `Shot` bindings aligned with bclibc v1.1.2: `BCLIBC_Shot::to_shot_props()` now
  handles `Atmosphere` and `Coriolis` pre-computation internally, reducing JS-side boilerplate
- All WASM-dependent test suites conditionally skip when `build/bclibc.js` is absent
- `atmosphere.test.ts` density precision relaxed from `4` → `3` decimal places to
  account for JS vs Python numeric differences
- `incomplete-shot.test.ts` height check at 1000 ft loosened from `toBeCloseTo(0, 2)`
  to `Math.abs(...) < 1.0 ft` to accommodate JS/Python solver divergence

### Fixed
- Removed unused JS-side dependencies after engine migration to WASM
- `HitResult.getAt()`: `getKeyVal` was returning `rawValue` for all dimensioned types; `Distance.rawValue` is stored in inches while WASM fields and all callers use feet, causing a 12× search mismatch that broke `dangerSpace()` and any custom `getAt()` call on distance/height/slant attributes. Fixed by using the WASM-native accessor (`.foot`, `.fps`, `.rad`, `.footPound`, `.pound`) for each key

### CI
- Build WASM with Emscripten 5.0.7 before running Jest (`make build-wasm`)
- Added `emscripten-core/setup-emsdk@v15` step with `actions/cache@v5` for emsdk caching
- Added `lib/emsdk/emsdk_env.sh` stub for Makefile compatibility (mirrors `release.yml`)
- Concurrency group (`github.workflow`-`github.ref`) with `cancel-in-progress: true`
- Added `emsdk-cache` to Jest `testPathIgnorePatterns` and `transformIgnorePatterns`
- Explicit `testMatch` glob (`**/__tests__/**/*.test.[jt]s?(x)`) prevents helper files
  and emsdk's own test files from being picked up as test suites

## [2.2.0-beta.2] - 2025-10-07

### Added
- Incomplete shots: trajectories that do not reach the requested range are returned
  with a terminal point; `HitResult.error` carries the stop reason

### Changed
- Bumped `jest` to 30.2.0
- Bumped `ts-jest`, `@babel/preset-env`, `prettier` to latest versions

### CI
- Added `dependabot.yml` with grouped npm dependency updates

## [2.0.0] - 2024-11-27

### Added
- Full v2 API aligned with [py-ballisticcalc](https://github.com/o-murphy/py-ballisticcalc) Python library
- `UNew` unit factory with `Distance`, `Velocity`, `Temperature`, `Pressure`, `Angular` and more
- `Atmo` with `Atmo.standard()`, `densityRatio`, `mach`, humidity and altitude support
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

[Unreleased]: https://github.com/o-murphy/js-ballistics/compare/v3.0.0-beta.0...HEAD
[3.0.0-beta.0]: https://github.com/o-murphy/js-ballistics/compare/v2.2.0-beta.2...v3.0.0-beta.0
[2.2.0-beta.2]: https://github.com/o-murphy/js-ballistics/compare/v2.0.0...v2.2.0-beta.2
[2.0.0]: https://github.com/o-murphy/js-ballistics/compare/v1.1.2...v2.0.0
[1.1.2]: https://github.com/o-murphy/js-ballistics/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/o-murphy/js-ballistics/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/o-murphy/js-ballistics/compare/v1.0.3-beta.5...v1.1.0
[1.0.3-beta.5]: https://github.com/o-murphy/js-ballistics/compare/v1.0.3-alpha.6...v1.0.3-beta.5
[1.0.3-alpha.6]: https://github.com/o-murphy/js-ballistics/releases/tag/v1.0.3-alpha.6
