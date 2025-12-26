# C++ vector WASM bench

```bash
$ yarn test:wasm
yarn run v1.22.22
(node:52664) [DEP0169] DeprecationWarning: `url.parse()` behavior is not standardized and prone to errors that have security implications. Use the WHATWG URL API instead. CVEs are not issued for `url.parse()` vulnerabilities.
(Use `node --trace-deprecation ...` to show where the warning was created)
$ node __tests__/wasm/wasm_test.js
```

═══════════════════════════════════════════ 🚀 **BCLIBC Vector Class Tests
(WASM)** ═══════════════════════════════════════════

### 📦 Test 1: Vector Creation

```
v1: 1 2 3
v2: 4 5 6
v0: 0 0 0
```

✅ Passed

### ➕ Test 2: Arithmetic

```
v1.add(v2): 5 7 9
v1.mul(2): 2 4 6
```

✅ Passed

### ⚫ Test 3: Dot Product

```
v1.dot(v2): 32
```

✅ Passed

### 📏 Test 4: Magnitude

```
Vector(3,4,0).mag(): 5
```

✅ Passed

### ⚡ Test 5: In-place Operations

```
Before: 10 20 30
After imul(0.5): 5 10 15
```

✅ Passed

### 🔗 Test 6: Method Chaining

```
Initial: 1 0 0
After imul(10): 10 0 0
After iadd(5,5,5): 15 5 5
After inorm(): 0.9045340337332908 0.3015113445777636 0.3015113445777636
Magnitude: 0.9999999999999999
```

✅ Passed

### 🚀 Test 7: Fused Multiply-Add

```
Initial velocity: 100 0 0
After += gravity * 0.1: 100 -0.9800000000000001 0
```

✅ Passed

### ⏱️ Test 8: Performance Benchmark

```
Regular add (100k): 56.549ms
In-place iadd (100k): 37.473ms
```

✅ Passed

═══════════════════════════════════════════

🎉 **All WASM tests passed!**

═══════════════════════════════════════════
