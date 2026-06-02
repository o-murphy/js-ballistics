### Stable WASM release checklist

#### Core

- [x] WASM engine (bclibc submodule, RK4 + Euler)
- [x] All bindings aligned with bclibc v1.1.2
- [x] Fix DragModel weight/diameter zero-check (FIXME removed)
- [x] DangerSpace / HitResult.dangerSpace()

#### Tests

- [x] atmosphere
- [x] computer (cant, wind, powder sensitivity, limits)
- [x] danger space → hitresult.test.ts
- [x] coriolis
- [x] incomplete shots
- [x] mbc
- [x] trajectory
- [x] units
- [x] vector
- [x] zero finding
- [x] exceptions (basic + types)
- [x] interpolation (interp.test.js)

#### CI

- [x] Build WASM before tests
- [x] emsdk cache (emscripten-core/setup-emsdk@v15)
- [x] TypeScript type check (tsc --noEmit)
- [x] Bundle verification (WASM inlined, no unresolved @wasm)
- [x] Concurrency group

#### Release pipeline

- [x] Tag-driven release workflow
- [x] Draft release + manual approval (release environment)
- [x] CHANGELOG.md (Keep a Changelog format)

#### Docs

- [x] README: installation (npm/yarn/CDN), API overview, full examples
- [x] index.html browser demo

#### Pending

- [ ] Version bump to stable (3.0.0 or 2.3.0 — decide)
- [ ] CHANGELOG [Unreleased] → release section
- [ ] sight ? (optional, low priority)
