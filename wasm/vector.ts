// vector.ts
import type { BallisticsModule, V3dT } from './bclibc';

export class Vector {
    private data: V3dT;

    constructor(
        private module: BallisticsModule,
        x: number = 0,
        y: number = 0,
        z: number = 0
    ) {
        this.data = module.v3dCreate(x, y, z);
    }

    // Getters
    get x(): number { return this.data.x; }
    get y(): number { return this.data.y; }
    get z(): number { return this.data.z; }

    // Setters
    set x(value: number) { this.data.x = value; }
    set y(value: number) { this.data.y = value; }
    set z(value: number) { this.data.z = value; }

    // Статичні методи
    static zero(module: BallisticsModule): Vector {
        const v = new Vector(module);
        v.data = module.v3dZero();
        return v;
    }

    static fromData(module: BallisticsModule, data: V3dT): Vector {
        const v = new Vector(module);
        v.data = data;
        return v;
    }

    // Методи створення нових векторів
    add(other: Vector): Vector {
        return Vector.fromData(
            this.module,
            this.module.v3dAdd(this.data, other.data)
        );
    }

    subtract(other: Vector): Vector {
        return Vector.fromData(
            this.module,
            this.module.v3dSubtract(this.data, other.data)
        );
    }

    multiply(scalar: number): Vector {
        return Vector.fromData(
            this.module,
            this.module.v3dMultiply(this.data, scalar)
        );
    }

    divide(scalar: number): Vector {
        return Vector.fromData(
            this.module,
            this.module.v3dDivide(this.data, scalar)
        );
    }

    negate(): Vector {
        return Vector.fromData(
            this.module,
            this.module.v3dNegate(this.data)
        );
    }

    normalized(): Vector {
        return Vector.fromData(
            this.module,
            this.module.v3dNormalized(this.data)
        );
    }

    // In-place методи (мутують поточний вектор)
    addMut(other: Vector): this {
        this.data = this.module.v3dAddInPlace(this.data, other.data);
        return this;
    }

    subtractMut(other: Vector): this {
        this.data = this.module.v3dSubtractInPlace(this.data, other.data);
        return this;
    }

    multiplyMut(scalar: number): this {
        this.data = this.module.v3dMultiplyInPlace(this.data, scalar);
        return this;
    }

    divideMut(scalar: number): this {
        this.data = this.module.v3dDivideInPlace(this.data, scalar);
        return this;
    }

    normalizeMut(): this {
        this.data = this.module.v3dNormalize(this.data);
        return this;
    }

    // Оптимізовані операції
    fusedMultiplyAdd(other: Vector, scalar: number): this {
        this.data = this.module.v3dFusedMultiplyAdd(
            this.data,
            other.data,
            scalar
        );
        return this;
    }

    fusedMultiplySubtract(other: Vector, scalar: number): this {
        this.data = this.module.v3dFusedMultiplySubtract(
            this.data,
            other.data,
            scalar
        );
        return this;
    }

    // Скалярні операції
    dot(other: Vector): number {
        return this.module.v3dDot(this.data, other.data);
    }

    magnitude(): number {
        return this.module.v3dMagnitude(this.data);
    }

    magnitudeSquared(): number {
        return this.module.v3dMagnitudeSquared(this.data);
    }

    // Утилітарні методи
    clone(): Vector {
        return new Vector(this.module, this.x, this.y, this.z);
    }

    equals(other: Vector, epsilon: number = 1e-10): boolean {
        return Math.abs(this.x - other.x) < epsilon &&
            Math.abs(this.y - other.y) < epsilon &&
            Math.abs(this.z - other.z) < epsilon;
    }

    toString(): string {
        return `Vector3D(${this.x.toFixed(3)}, ${this.y.toFixed(3)}, ${this.z.toFixed(3)})`;
    }

    toArray(): [number, number, number] {
        return [this.x, this.y, this.z];
    }

    // Отримати сирі дані (для передачі в WASM)
    getRawData(): V3dT {
        return this.data;
    }
}