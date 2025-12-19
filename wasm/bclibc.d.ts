// bclibc.d.ts

export interface V3dT {
    x: number;
    y: number;
    z: number;
}

export interface BallisticsModule extends EmscriptenModule {
    // Створення векторів
    v3dCreate(x: number, y: number, z: number): V3dT;
    v3dZero(): V3dT;

    // Арифметичні операції
    v3dAdd(a: V3dT, b: V3dT): V3dT;
    v3dSubtract(a: V3dT, b: V3dT): V3dT;
    v3dNegate(v: V3dT): V3dT;
    v3dMultiply(v: V3dT, scalar: number): V3dT;
    v3dDivide(v: V3dT, scalar: number): V3dT;
    v3dDot(a: V3dT, b: V3dT): number;

    // In-place операції (мутують вектор)
    v3dAddInPlace(v: V3dT, other: V3dT): V3dT;
    v3dSubtractInPlace(v: V3dT, other: V3dT): V3dT;
    v3dMultiplyInPlace(v: V3dT, scalar: number): V3dT;
    v3dDivideInPlace(v: V3dT, scalar: number): V3dT;

    // Оптимізовані операції
    v3dFusedMultiplyAdd(v: V3dT, other: V3dT, scalar: number): V3dT;
    v3dFusedMultiplySubtract(v: V3dT, other: V3dT, scalar: number): V3dT;
    v3dLinearCombination(
        result: V3dT,
        vecA: V3dT, scalarA: number,
        vecB: V3dT, scalarB: number
    ): V3dT;
    v3dLinearCombination4(
        result: V3dT,
        vA: V3dT, sA: number,
        vB: V3dT, sB: number,
        vC: V3dT, sC: number,
        vD: V3dT, sD: number
    ): V3dT;

    // Властивості
    v3dMagnitude(v: V3dT): number;
    v3dMagnitudeSquared(v: V3dT): number;
    v3dNormalized(v: V3dT): V3dT;
    v3dNormalize(v: V3dT): V3dT;
}

declare function BallisticsFactory(): Promise<BallisticsModule>;
export default BallisticsFactory;
