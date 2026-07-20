# [js-ballistics](https://github.com/o-murphy/js-ballistics)

JavaScript/TypeScript library for small arms ballistic trajectory calculations,
powered by a C++ engine compiled to WebAssembly via Emscripten.

![NPM version][npm version badge]
![License][license badge]
[![powered by bclibc]][bclibc repo]
[![Jest][jest badge]][jest workflow]
[![codecov][codecov badge]][codecov]
[![Demo][demo badge]][demo]

[![SWUbanner]][SWUBadge]

## Related projects

**js-ballistics** is part of the [**Ballistics Lab**](https://github.com/ballistics-lab) ecosystem —
one C++/C99 physics core, bindings for every platform (Python, TypeScript, Dart,
MicroPython) and the [**eBalistyka**](https://github.com/ballistics-lab/ebalistyka) app built on
top of it.

---

## Table of Contents

- [js-ballistics](#js-ballistics)
  - [Related projects](#related-projects)
  - [Table of Contents](#table-of-contents)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Clone](#clone)
    - [Emscripten setup](#emscripten-setup)
    - [Build](#build)
    - [Run tests](#run-tests)
    - [Lint \& type-check](#lint--type-check)
    - [Deploy to GitHub Pages](#deploy-to-github-pages)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [Core Concepts](#core-concepts)
  - [Usage Examples](#usage-examples)
    - [Basic Trajectory](#basic-trajectory)
    - [Zero-Finding](#zero-finding)
    - [Wind Layers](#wind-layers)
    - [Custom Atmosphere](#custom-atmosphere)
    - [Multi-BC Drag Model](#multi-bc-drag-model)
    - [Coriolis Effect](#coriolis-effect)
    - [Trajectory Flags](#trajectory-flags)
    - [Danger Space](#danger-space)
    - [Powder Temperature Sensitivity](#powder-temperature-sensitivity)
    - [Integration Method](#integration-method)
    - [Custom Calculator Config](#custom-calculator-config)
  - [Browser / CDN Usage](#browser--cdn-usage)
    - [Via jsDelivr](#via-jsdelivr)
    - [Via unpkg](#via-unpkg)
    - [Interactive HTML Example](#interactive-html-example)
  - [API Reference](#api-reference)
    - [`Calculator`](#calculator)
    - [`HitResult`](#hitresult)
    - [`TrajectoryData` fields](#trajectorydata-fields)
    - [Unit system](#unit-system)
  - [Risk Notice](#risk-notice)

---

## Development

### Prerequisites

- Node.js 18+
- Yarn (`npm install -g yarn`)
- Emscripten (for WASM build — see below)

### Clone

```bash
git clone --recursive https://github.com/o-murphy/js-ballistics.git
cd js-ballistics
yarn install
```

If you already cloned without `--recursive`:

```bash
git submodule update --init --recursive
```

### Emscripten setup

```bash
make install-emsdk                  # clone & install Emscripten SDK
source lib/emsdk/emsdk_env.sh       # activate in current shell
```

Add the `source` line to your `~/.bashrc` / `~/.zshrc` to avoid running it every
time.

### Build

```bash
make build          # WASM + TypeScript (full build)
make build-wasm     # WASM only  → generates build/bclibc.{js,d.ts} and updates __stubs__/bclibc.d.ts
make build-ts       # TypeScript only  → generates dist/
```

### Run tests

```bash
yarn test           # requires WASM to be built first (make build-wasm)
```

### Lint & type-check

```bash
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript type check
```

### Deploy to GitHub Pages

```bash
make build
npm run deploy      # pushes dist/ to the gh-pages branch
```

Then enable GitHub Pages in **Settings → Pages → Branch: `gh-pages`**.

---

## Installation

```bash
npm install js-ballistics
# or
yarn add js-ballistics
```

The WASM engine is bundled inside the package — no separate build step required.

---

## Quick Start

```typescript
import {
    Calculator,
    Shot,
    Weapon,
    Ammo,
    DragModel,
    DragTables,
    Atmo,
    Wind,
    UNew,
    Distance,
    Velocity,
    Angular,
} from "js-ballistics";

const dm = new DragModel({
    bc: 0.223,
    dragTable: DragTables.G7,
    weight: 168,
    diameter: 0.308,
});
const ammo = new Ammo({ dm, mv: UNew.FPS(2750) });
const weapon = new Weapon({ sightHeight: UNew.Inch(2) });
const shot = new Shot({ weapon, ammo });

const calc = new Calculator();
await calc.setWeaponZero(shot, UNew.Yard(100));

const result = await calc.fire({
    shot,
    trajectoryRange: UNew.Yard(1000),
    trajectoryStep: UNew.Yard(100),
});

result.trajectory.forEach((p) => {
    console.log(
        `${p.distance.In(Distance.Yard).toFixed(0)} yd` +
            `  drop: ${p.height.In(Distance.Inch).toFixed(1)} in` +
            `  vel: ${p.velocity.In(Velocity.FPS).toFixed(0)} fps`
    );
});
```

---

## Core Concepts

| Class            | Purpose                                                                         |
| ---------------- | ------------------------------------------------------------------------------- |
| `DragModel`      | Ballistic coefficient + drag table (G1, G7, …)                                  |
| `Ammo`           | Bullet + muzzle velocity + powder temperature                                   |
| `Weapon`         | Sight height, twist rate, zero elevation                                        |
| `Atmo`           | Atmospheric conditions (altitude, temp, pressure, humidity)                     |
| `Wind`           | Wind layer (velocity, direction, until-distance)                                |
| `Shot`           | Combines all inputs; holds look/relative/cant angles and Coriolis               |
| `Calculator`     | Engine wrapper; async `fire()`, `setWeaponZero()`, `barrelElevationForTarget()` |
| `HitResult`      | Trajectory array + error + flag helpers                                         |
| `TrajectoryData` | Per-point data: distance, height, velocity, windage, energy, OGW, …             |

---

## Usage Examples

### Basic Trajectory

```typescript
import {
    Calculator,
    Shot,
    Weapon,
    Ammo,
    DragModel,
    DragTables,
    UNew,
} from "js-ballistics";

const shot = new Shot({
    weapon: new Weapon({ sightHeight: UNew.Inch(1.5) }),
    ammo: new Ammo({
        dm: new DragModel({ bc: 0.295, dragTable: DragTables.G7 }),
        mv: UNew.MPS(900),
    }),
});

const calc = new Calculator();
await calc.setWeaponZero(shot, UNew.Meter(100));

const hit = await calc.fire({
    shot,
    trajectoryRange: UNew.Meter(1000),
    trajectoryStep: UNew.Meter(100),
});

hit.trajectory.forEach((p) => console.log(p.formatted().join("  ")));
```

---

### Zero-Finding

```typescript
// setWeaponZero modifies shot.weapon.zeroElevation in place
await calc.setWeaponZero(shot, UNew.Meter(200));

// or get the elevation angle without modifying the shot
const elevation = await calc.barrelElevationForTarget(shot, UNew.Meter(200));
console.log(`Elevation: ${elevation.In(Angular.MOA).toFixed(2)} MOA`);
```

---

### Wind Layers

```typescript
import { Wind, UNew } from "js-ballistics";

// 5 m/s from the right up to 300 m, then 3 m/s head-on beyond
const winds = [
    new Wind({
        velocity: UNew.MPS(5),
        directionFrom: UNew.Degree(90),
        untilDistance: UNew.Meter(300),
    }),
    new Wind({ velocity: UNew.MPS(3), directionFrom: UNew.Degree(0) }),
];

const shot = new Shot({ weapon, ammo, winds });
```

---

### Custom Atmosphere

```typescript
import { Atmo, Vacuum, UNew } from "js-ballistics";

// ICAO standard at sea level
const standard = Atmo.standard();

// Custom conditions
const hot_dry = new Atmo({
    altitude: UNew.Meter(500),
    temperature: UNew.Celsius(35),
    pressure: UNew.hPa(1000),
    humidity: 0.2,
});

// Vacuum (no drag — useful for testing)
const vac = new Vacuum({ altitude: UNew.Foot(0) });

const shot = new Shot({ weapon, ammo, atmo: hot_dry });
```

---

### Multi-BC Drag Model

Use measured BCs at several velocity/Mach nodes for better accuracy:

```typescript
import { DragModelMultiBC, BCPoint, DragTables, UNew } from "js-ballistics";

const dm = DragModelMultiBC({
    bcPoints: [
        new BCPoint({ BC: 0.275, V: UNew.MPS(900) }),
        new BCPoint({ BC: 0.26, V: UNew.MPS(700) }),
        new BCPoint({ BC: 0.245, V: UNew.MPS(500) }),
    ],
    dragTable: DragTables.G7,
    weight: 175,
    diameter: 0.308,
});
```

---

### Coriolis Effect

```typescript
const shot = new Shot({
    weapon,
    ammo,
    coriolis: {
        latitudeDeg: 48.5, // Kyiv latitude
        azimuthDeg: 90.0, // shooting East
    },
});

// Or set after construction:
shot.latitudeDeg = 48.5;
shot.azimuthDeg = 90.0;
```

Omit `azimuthDeg` for the flat-fire approximation (horizontal drift only). Omit
`latitudeDeg` entirely to disable Coriolis.

---

### Trajectory Flags

Request specific event points and look them up by flag:

```typescript
import { TrajFlag } from "js-ballistics";

const hit = await calc.fire({
    shot,
    trajectoryRange: UNew.Yard(1000),
    trajectoryStep: UNew.Yard(10),
    filterFlags: TrajFlag.ALL,
});

const zeroDown = hit.flag(TrajFlag.ZERO_DOWN);
const apex = hit.flag(TrajFlag.APEX);
const mach1 = hit.flag(TrajFlag.MACH);

console.log(
    `Zero crossing: ${zeroDown?.distance.In(Distance.Yard).toFixed(1)} yd`
);
console.log(`Apex at:       ${apex?.distance.In(Distance.Yard).toFixed(1)} yd`);
console.log(
    `Mach 1 at:     ${mach1?.distance.In(Distance.Yard).toFixed(1)} yd`
);
```

Available flags: `NONE`, `ZERO_UP`, `ZERO_DOWN`, `ZERO`, `MACH`, `RANGE`,
`APEX`, `ALL`, `MRT`.

---

### Danger Space

```typescript
// How much ranging error is tolerable for a 1.5 m tall target at 500 m?
const ds = await hit.dangerSpace(UNew.Meter(500), UNew.Meter(1.5));

console.log(
    `Danger space begin: ${ds.begin.distance.In(Distance.Meter).toFixed(1)} m`
);
console.log(
    `Danger space end:   ${ds.end.distance.In(Distance.Meter).toFixed(1)} m`
);
console.log(
    `Depth:              ${(
        ds.end.slantDistance.In(Distance.Meter) -
        ds.begin.slantDistance.In(Distance.Meter)
    ).toFixed(1)} m`
);
```

---

### Powder Temperature Sensitivity

```typescript
const ammo = new Ammo({ dm, mv: UNew.FPS(2750), powderTemp: UNew.Celsius(15) });

// Compute sensitivity from two measurements
ammo.calcPowderSens(UNew.FPS(2723), UNew.Celsius(0));
ammo.usePowderSensitivity = true;

// Velocity is now automatically adjusted for the atmosphere's powder temperature
const shot = new Shot({
    weapon,
    ammo,
    atmo: new Atmo({ temperature: UNew.Celsius(-10) }),
});
```

---

### Integration Method

Choose between RK4 (more accurate, default) and Euler (faster):

```typescript
import { Calculator, IntegrationMethod } from "js-ballistics";

const calcRK4 = new Calculator({ method: IntegrationMethod.RK4 });
const calcEuler = new Calculator({ method: IntegrationMethod.EULER });
```

---

### Custom Calculator Config

```typescript
const calc = new Calculator({
    method: IntegrationMethod.RK4,
    config: {
        minimumVelocity: 100, // fps — stop when velocity drops below this
        minimumAltitude: -1000, // ft  — stop when altitude drops below this
        maximumDrop: -5000, // ft  — stop when drop exceeds this
        stepMultiplier: 0.5, // halve integration step for higher precision
    },
});
```

---

## Browser / CDN Usage

### Via jsDelivr

```html
<script type="module">
    import {
        Calculator,
        Shot,
        Weapon,
        Ammo,
        DragModel,
        DragTables,
        UNew,
    } from "https://cdn.jsdelivr.net/npm/js-ballistics/dist/index.js";

    const calc = new Calculator();
    // ... use as in Node.js examples above
</script>
```

### Via unpkg

```html
<script type="module">
    import * as Ballistics from "https://unpkg.com/js-ballistics/dist/index.js";
    const { Calculator, UNew, DragTables } = Ballistics;
</script>
```

### Interactive HTML Example

**[Live demo →](https://o-murphy.github.io/js-ballistics/)**

A full browser demo with trajectory chart is included in the package at
[`dist/index.html`](src/index.html). Open it directly or serve with any static
file server after running `yarn build`.

```bash
yarn build
npx serve dist/
```

---

## API Reference

### `Calculator`

```typescript
new Calculator(options?: { method?: IntegrationMethod; config?: Partial<Config> })

calc.fire({
    shot:             Shot,
    trajectoryRange:  number | Distance,
    trajectoryStep?:  number | Distance,   // default: same as range (one output point)
    timeStep?:        number,              // integration sub-step in seconds
    filterFlags?:     TrajFlag,            // default: TrajFlag.RANGE
    raiseRangeError?: boolean,             // default: true
}): Promise<HitResult>

calc.setWeaponZero(shot: Shot, distance: number | Distance): Promise<Angular>
calc.barrelElevationForTarget(shot: Shot, distance: number | Distance): Promise<Angular>
```

### `HitResult`

```typescript
hit.trajectory: TrajectoryData[]
hit.error?:     Error              // set when raiseRangeError=false and shot is incomplete
hit.flag(flag: TrajFlag): TrajectoryData | undefined
hit.zeros():    TrajectoryData[]
hit.getAtDistance(d: Distance): TrajectoryData
hit.getAt(key, value, epsilon?, startFromTime?): Promise<TrajectoryData>
hit.dangerSpace(atRange, targetHeight): Promise<DangerSpace>
```

### `TrajectoryData` fields

`time`, `distance`, `velocity`, `mach`, `height`, `slantHeight`, `dropAngle`,
`windage`, `windageAngle`, `slantDistance`, `angle`, `densityRatio`, `drag`,
`energy`, `ogw`, `flag`

### Unit system

```typescript
// Construct a unit value
UNew.Meter(100)      UNew.Foot(328)    UNew.Yard(109)
UNew.MPS(900)        UNew.FPS(2953)    UNew.MPH(35)
UNew.Celsius(15)     UNew.Fahrenheit(59)
UNew.hPa(1013.25)    UNew.InHg(29.92)
UNew.Degree(5)       UNew.MOA(17.2)    UNew.Radian(0.0873)
UNew.Grain(168)      UNew.Gram(10.9)
UNew.Inch(0.308)

// Convert
value.In(Distance.Meter)   // → number
value.foot                 // shorthand for .In(Distance.Foot)
value.meter                // shorthand for .In(Distance.Meter)
```

---

## Risk Notice

The library performs a limited simulation of a complex physical process and uses
many approximations. Calculation results **must not** be considered as
completely or reliably reflecting actual projectile behavior.

Results may be used for educational purposes only. They **must not** be
considered reliable for applications where incorrect results could cause
financial harm or endanger human life.

THE CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.


<!-- REUSABLE LINKS -->

[npm version badge]: https://img.shields.io/npm/v/js-ballistics?style=flat-square&logo=npm
[license badge]: https://img.shields.io/npm/l/js-ballistics?style=flat-square
[jest badge]:
    https://github.com/o-murphy/js-ballistics/actions/workflows/test.yml/badge.svg
[jest workflow]: https://github.com/o-murphy/js-ballistics/actions/workflows/test.yml
[codecov badge]: https://codecov.io/gh/o-murphy/js-ballistics/graph/badge.svg
[codecov]: https://codecov.io/gh/o-murphy/js-ballistics
[demo badge]: https://img.shields.io/badge/demo-live-blue
[demo]: https://o-murphy.github.io/js-ballistics/
[SWUbanner]:
    https://img.shields.io/badge/made_in-Ukraine-ffd700.svg?labelColor=0057b7&style=flat-square
[SWUBadge]: https://stand-with-ukraine.pp.ua

<!-- EXTRA -->

[bclibc repo]: https://github.com/ballistics-lab/bclibc
[powered by bclibc]:
https://img.shields.io/badge/bclibc-0d1228?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI%2FPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSLzIwMDEvUkVDLVNWRy0yMDAxMDkwNC9EVEQvc3ZnMTAuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMjQuMDAwMDAwcHQiIGhlaWdodD0iMTAyNC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEwMjQuMDAwMDAwIDEwMjQuMDAwMDAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij4KCTxjaXJjbGUgY3g9IjUxMiIgY3k9IjUxMiIgcj0iNTEyIiBmaWxsPSIjMGQxMjI4IiAvPgoJPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEwMCwxMTI0KSBzY2FsZSgwLjEyMDAwMCwtMC4xMjAwMDApIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9Im5vbmUiPgoJCTxwYXRoIGQ9Ik01MDU1IDgwNzEgYy0xNjcgLTMzMyAtMjczIC03NjggLTI5MiAtMTE5OCBsLTYgLTE0MyAzNDYgMCAzNDcgMCAwCjYzIGMwIDI3NSAtODAgNzMxIC0xNzUgMTAwNyAtMzkgMTEyIC0xNDUgMzQzIC0xNjMgMzU0IC03IDQgLTI5IC0yOCAtNTcgLTgzegptLTE1IC0yODkgYy00NiAtMjI1IC05MCAtNjYzIC05MCAtODk0IDAgLTEwNCAtMiAtMTA4IC02MSAtMTA4IGwtNDkgMCAwIDc4CmMxIDE1OSA0OCA0ODIgMTAxIDY5MCAzNCAxMzQgMTE5IDM5NiAxMjUgMzg5IDMgLTMgLTkgLTcyIC0yNiAtMTU1eiIgLz4KCQk8cGF0aCBkPSJNNDcxMCA2NDA2IGwwIC0yNDQgMjMgLTYgYzEyIC0zIDMyIC02IDQ1IC02IGwyMiAwIDAgMjI1IDAgMjI1IDY1IDAKNjUgMCAwIC0yMjUgMCAtMjI1IDI4MyAyIDI4MiAzIDMgMjQ4IDIgMjQ3IC0zOTUgMCAtMzk1IDAgMCAtMjQ0eiIgLz4KCQk8cGF0aCBkPSJNNDQyNCA2MTExIGMtMTggLTUgLTQ4IC0xOCAtNjggLTMwIC0xMzcgLTg1IC0xMjAgLTMwMCAyOSAtMzcwIGw0NgotMjEgLTMgLTUzMyAtMyAtNTMyIC0yMyAtNTggYy0xOCAtNDUgLTU0NSAtODUwIC04NzkgLTEzNDMgLTc2IC0xMTMgLTExMgotMjkxIC04MyAtNDE1IDQxIC0xNzcgMTY5IC0zMTIgMzQwIC0zNTkgNTkgLTE3IDI1OTMgLTE1IDI2NTUgMiAxMTQgMzAgMjMzCjEyMiAyODcgMjI0IDc2IDE0MiA3NyAzNDMgMyA0ODYgLTI4IDU0IC0xMzMgMjEzIC01NzMgODc1IC0xNzYgMjY2IC0zMzEgNTA5Ci0zNDQgNTQwIC0yMyA1OCAtMjMgNjAgLTI2IDU4OCBsLTMgNTMwIDQ1IDE4IGM1MiAyMiAxMDEgODAgMTE3IDE0MSAyNCA5MAotMjMgMTk2IC0xMDYgMjM2IC01NCAyNiAtMTk5IDM1IC0yMDEgMTMgLTEgLTcgLTIgLTE3IC0zIC0yMiAwIC01IC04OCAtNwotMjA4IC0zIC0xNTQgNCAtMjA0IDIgLTE5OSAtNiA0IC03IDE1IC0xMiAyNiAtMTIgMTAgMCA5MiAtMTMgMTgxIC0yOSA5MCAtMTYKMjA2IC0zMyAyNTggLTM3IDEwOSAtNyAxNDEgLTI3IDE0MSAtODYgLTEgLTYwIC00OCAtOTggLTEyNSAtOTggbC00NiAwIDMKLTU5MiAzIC01OTMgMjUgLTcwIGMxOCAtNTIgODAgLTE1NCAyNDEgLTM5NSA0NzYgLTcxNCA2ODkgLTEwNDMgNzEwIC0xMDk3IDE2Ci00NCAyMiAtNzkgMjIgLTE0MyAwIC0xNzQgLTgxIC0yOTMgLTIzNyAtMzQ3IC00OCAtMTcgLTEyNSAtMTggLTEzMzEgLTE4CmwtMTI4MCAwIC02NSAzMSBjLTc5IDM4IC0xMzEgODkgLTE2OCAxNjMgLTI1IDUxIC0yNyA2NiAtMjcgMTcxIDAgOTggMyAxMjIKMjIgMTYzIDEzIDI3IDExNiAxODkgMjI5IDM2MCAxMTQgMTcyIDMwOCA0NjQgNDMyIDY1MCAxMjMgMTg1IDIzNiAzNjMgMjUyCjM5NSA1NCAxMTEgNTUgMTIwIDU1IDc0MiBsMCA1NzUgLTUwIDYgYy0yNyAzIC01OCA5IC02OCAxNCAtMjcgMTEgLTQ5IDYyIC00Mgo5NCAxMCA0OCA0MyA2OSAxMTAgNzMgbDYwIDMgMCA2MCAwIDYwIC01MCAyIGMtMjcgMSAtNjQgLTIgLTgxIC02eiIgLz4KCQk8cGF0aCBkPSJNNDcwMCA1MzY5IGMwIC00MjggLTQgLTcwNyAtMTEgLTc1MiAtMjMgLTE1NyAtNTggLTIzMCAtMjYzIC01NDAKLTg0IC0xMjggLTE5NSAtMjk3IC0yNDggLTM3NyAtNTIgLTgwIC0xNjYgLTI1MyAtMjUzIC0zODUgLTg3IC0xMzIgLTE2OSAtMjYwCi0xODIgLTI4NCAtNDMgLTgyIC0yNiAtMTk3IDM5IC0yNTggNTkgLTU2IC03IC01MyAxMzI3IC01MyBsMTIyOSAwIDUyIDI4IGM5OAo1MSAxMzIgMTc2IDc3IDI4MiAtMjMgNDUgLTI2MSA0MTAgLTYzMyA5NzUgLTIzOCAzNjEgLTI1OCAzOTUgLTMwMiA1NDQgLTE0CjQ5IC0xNyAxMzkgLTIyIDcxNiBsLTUgNjYwIC0xMTUgMTcgYy02MyAxMCAtMTg1IDI5IC0yNzEgNDMgLTIxNyAzNSAtMTk5IDM5Ci0xOTkgLTQ4IDAgLTQxIC00IC0xNTQgLTEwIC0yNTMgLTUgLTk4IC0xNyAtMzEyIC0yNSAtNDc0IC05IC0xNjIgLTIwIC0zNDcKLTI1IC00MTAgLTUgLTYzIC0xMCAtMTQ1IC0xMCAtMTgyIDAgLTM4IC00IC02OCAtOCAtNjggLTggMCAtMjggNTcwIC0zOSAxMTU3CmwtNiAzMzEgLTMwIDYgYy0xNiAzIC0zOCA2IC00OCA2IC0xOCAwIC0xOSAtMjIgLTE5IC02ODF6IG0xMDMyIC0xNDI2IGM5IC0xMAo3NCAtMTA2IDE0NCAtMjE1IDcxIC0xMDggMjAzIC0zMDkgMjk0IC00NDcgMjEwIC0zMTggMjAyIC0zMDUgMjA0IC0zNTMgMSAtMzIKLTUgLTQ1IC0yNyAtNjQgbC0yOCAtMjQgLTEyMTUgMCAtMTIxNSAwIC0yNCAyNSBjLTE5IDE4IC0yNSAzNSAtMjUgNjggMCA0MQoxNyA2OSAyMDYgMzU4IDExNCAxNzMgMjU5IDM5NCAzMjMgNDkxIGwxMTYgMTc4IDYxNiAwIGM1NzQgMCA2MTcgLTEgNjMxIC0xN3oiIC8%2BCgk8L2c%2BCjwvc3ZnPgo%3D&label=powered%20by
