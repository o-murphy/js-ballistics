// wasm/post.js
// Post-processing script for Emscripten module to improve JavaScript API ergonomics

// ============================================================================
// Enum Conversion: Convert Emscripten enums to plain number objects
// ============================================================================
// Emscripten creates enums as objects with {value: number}, we convert them
// to simple {KEY: number} for easier usage in TypeScript/JavaScript

const convertEnum = (enumObj) => {
    if (!enumObj) return enumObj;

    const converted = {};
    for (const key in enumObj) {
        if (Object.prototype.hasOwnProperty.call(enumObj, key)) {
            const item = enumObj[key];
            if (typeof item === 'object' && item !== null && 'value' in item) {
                converted[key] = item.value;
            }
        }
    }
    return converted;
};

// Convert all enums
// if (Module._IntegrationMethod) {
//     Module._IntegrationMethod = convertEnum(Module._IntegrationMethod);
// }

if (Module._TerminationReason) {
    Module._TerminationReason = convertEnum(Module._TerminationReason);
}

// if (Module._TrajFlag) {
//     Module._TrajFlag = convertEnum(Module._TrajFlag);
// }

if (Module._BaseTrajDataInterpKey) {
    Module._BaseTrajDataInterpKey = convertEnum(Module._BaseTrajDataInterpKey);
}

if (Module._TrajectoryDataInterpKey) {
    Module._TrajectoryDataInterpKey = convertEnum(Module._TrajectoryDataInterpKey);
}

// ============================================================================
// Vector Enhancements: Method chaining for in-place operations
// ============================================================================
// Make in-place operations chainable for better DX:
// v.iadd(v2).imul(2).inorm() instead of three separate statements

if (Module._Vector) {
    const VectorProto = Module._Vector.prototype;

    // List of in-place methods that should return 'this' for chaining
    const chainableMethods = ['iadd', 'isub', 'imul', 'idiv', 'inorm'];

    chainableMethods.forEach(methodName => {
        const originalMethod = VectorProto[methodName];
        if (!originalMethod) return;

        VectorProto[methodName] = function (...args) {
            originalMethod.apply(this, args);
            return this; // Enable chaining
        };
    });

    // Add convenience methods for common vector operations

    /**
     * Clone this vector
     * @returns {Vector} New vector with same values
     */
    VectorProto.clone = function () {
        return new Module._Vector(this.x, this.y, this.z);
    };

    /**
     * Set vector components
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {Vector} this for chaining
     */
    VectorProto.set = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    };

    /**
     * Check if vector is approximately equal to another (within epsilon)
     * @param {Vector} other
     * @param {number} epsilon - Default 1e-10
     * @returns {boolean}
     */
    VectorProto.equals = function (other, epsilon = 1e-10) {
        return Math.abs(this.x - other.x) < epsilon &&
            Math.abs(this.y - other.y) < epsilon &&
            Math.abs(this.z - other.z) < epsilon;
    };

    /**
     * Convert to plain JavaScript object
     * @returns {{x: number, y: number, z: number}}
     */
    VectorProto.toObject = function () {
        return { x: this.x, y: this.y, z: this.z };
    };

    /**
     * Convert to array
     * @returns {[number, number, number]}
     */
    VectorProto.toArray = function () {
        return [this.x, this.y, this.z];
    };

    /**
     * String representation
     * @returns {string}
     */
    VectorProto.toString = function () {
        return `Vector(${this.x.toFixed(6)}, ${this.y.toFixed(6)}, ${this.z.toFixed(6)})`;
    };

    /**
     * Static factory: Create vector from array
     * @param {[number, number, number]} arr
     * @returns {Vector}
     */
    Module._Vector.fromArray = function (arr) {
        return new Module._Vector(arr[0], arr[1], arr[2]);
    };

    /**
     * Static factory: Create vector from object
     * @param {{x: number, y: number, z: number}} obj
     * @returns {Vector}
     */
    Module._Vector.fromObject = function (obj) {
        return new Module._Vector(obj.x, obj.y, obj.z);
    };

    /**
     * Static: Zero vector
     * @returns {Vector}
     */
    Module._Vector.zero = function () {
        return new Module._Vector(0, 0, 0);
    };

    /**
     * Static: Unit vectors
     * @returns {Vector}
     */
    Module._Vector.unitX = function () {
        return new Module._Vector(1, 0, 0);
    };

    Module._Vector.unitY = function () {
        return new Module._Vector(0, 1, 0);
    };

    Module._Vector.unitZ = function () {
        return new Module._Vector(0, 0, 1);
    };
}

// // ============================================================================
// // Engine namespace
// // ============================================================================

// Module._Engine = {
//     findApex: Module._findApex,
//     findMaxRange: Module._findMaxRange,
//     findZeroAngle: Module._findZeroAngle
// };

// delete Module._findApex;
// delete Module._findMaxRange;
// delete Module._findZeroAngle;

// ============================================================================
// Logging
// ============================================================================

// if (typeof console !== 'undefined' && console.log) {
//     console.log('[BCLIBC] WebAssembly module initialized successfully');
//     console.log('[BCLIBC] Available functions:', Object.keys(Module).filter(k =>
//         typeof Module[k] === 'function' && !k.startsWith('_')
//     ).join(', '));
// }
