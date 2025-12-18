/**
 * High-performance 3D vector using Float64Array (C++ double precision)
 */
class Vector {
    readonly data: Float64Array;

    constructor(x: number = 0.0, y: number = 0.0, z: number = 0.0) {
        this.data = new Float64Array([x, y, z]);
    }

    static fromBuffer(buffer: Float64Array, offset: number): Vector {
        const v = Object.create(Vector.prototype);
        v.data = buffer.subarray(offset, offset + 3);
        return v;
    }

    get x(): number { return this.data[0]; }
    set x(value: number) { this.data[0] = value; }

    get y(): number { return this.data[1]; }
    set y(value: number) { this.data[1] = value; }

    get z(): number { return this.data[2]; }
    set z(value: number) { this.data[2] = value; }

    assign(other: Readonly<Vector>): void {
        const d = this.data;
        const o = other.data;
        d[0] = o[0];
        d[1] = o[1];
        d[2] = o[2];
    }

    copy(): Vector {
        const v = new Vector();
        v.data.set(this.data);
        return v;
    }

    zero(): void {
        const d = this.data;
        d[0] = 0.0;
        d[1] = 0.0;
        d[2] = 0.0;
    }

    set(x: number, y: number, z: number): void {
        const d = this.data;
        d[0] = x;
        d[1] = y;
        d[2] = z;
    }

    add(other: Readonly<Vector>): Vector {
        const d = this.data;
        const o = other.data;
        return new Vector(d[0] + o[0], d[1] + o[1], d[2] + o[2]);
    }

    iadd(other: Readonly<Vector>): this {
        const d = this.data;
        const o = other.data;
        d[0] += o[0];
        d[1] += o[1];
        d[2] += o[2];
        return this;
    }

    sub(other: Readonly<Vector>): Vector {
        const d = this.data;
        const o = other.data;
        return new Vector(d[0] - o[0], d[1] - o[1], d[2] - o[2]);
    }

    isub(other: Readonly<Vector>): this {
        const d = this.data;
        const o = other.data;
        d[0] -= o[0];
        d[1] -= o[1];
        d[2] -= o[2];
        return this;
    }

    mul(n: number): Vector {
        const d = this.data;
        return new Vector(d[0] * n, d[1] * n, d[2] * n);
    }

    imul(n: number): this {
        const d = this.data;
        d[0] *= n;
        d[1] *= n;
        d[2] *= n;
        return this;
    }

    dot(other: Readonly<Vector>): number {
        const d = this.data;
        const o = other.data;
        return d[0] * o[0] + d[1] * o[1] + d[2] * o[2];
    }

    mag(): number {
        const d = this.data;
        return Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
    }

    magSquared(): number {
        const d = this.data;
        return d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
    }

    norm(): Vector {
        const d = this.data;
        const m_sq = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
        if (m_sq < 1e-20) {
            return this.copy();
        }
        const inv_mag = 1.0 / Math.sqrt(m_sq);
        return new Vector(d[0] * inv_mag, d[1] * inv_mag, d[2] * inv_mag);
    }

    inorm(): this {
        const d = this.data;
        const m_sq = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
        if (m_sq < 1e-20) {
            return this;
        }
        const inv_mag = 1.0 / Math.sqrt(m_sq);
        d[0] *= inv_mag;
        d[1] *= inv_mag;
        d[2] *= inv_mag;
        return this;
    }

    neg(): Vector {
        const d = this.data;
        return new Vector(-d[0], -d[1], -d[2]);
    }

    ineg(): this {
        const d = this.data;
        d[0] = -d[0];
        d[1] = -d[1];
        d[2] = -d[2];
        return this;
    }

    linear_combination(
        vec_a: Readonly<Vector>,
        scalar_a: number,
        vec_b: Readonly<Vector>,
        scalar_b: number
    ): this {
        const d = this.data;
        const a = vec_a.data;
        const b = vec_b.data;
        d[0] = a[0] * scalar_a + b[0] * scalar_b;
        d[1] = a[1] * scalar_a + b[1] * scalar_b;
        d[2] = a[2] * scalar_a + b[2] * scalar_b;
        return this;
    }

    fused_multiply_add(other: Readonly<Vector>, scalar: number): this {
        const d = this.data;
        const o = other.data;
        d[0] += o[0] * scalar;
        d[1] += o[1] * scalar;
        d[2] += o[2] * scalar;
        return this;
    }

    assignSub(b: Readonly<Vector>, c: Readonly<Vector>): this {
        const d = this.data;
        const bData = b.data;
        const cData = c.data;
        d[0] = bData[0] - cData[0];
        d[1] = bData[1] - cData[1];
        d[2] = bData[2] - cData[2];
        return this;
    }

    assignAndFMA(source: Readonly<Vector>, other: Readonly<Vector>, scalar: number): this {
        const d = this.data;
        const s = source.data;
        const o = other.data;
        d[0] = s[0] + o[0] * scalar;
        d[1] = s[1] + o[1] * scalar;
        d[2] = s[2] + o[2] * scalar;
        return this;
    }

    static sum(...vectors: Readonly<Vector[]>): Vector {
        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;

        for (const vector of vectors) {
            const d = vector.data;
            sumX += d[0];
            sumY += d[1];
            sumZ += d[2];
        }

        return new Vector(sumX, sumY, sumZ);
    }
}


/**
 * Allocator for vectors with explicit memory layout control
 */
class VectorAllocator {
    private buffer: Float64Array;

    constructor(vectorCount: number) {
        this.buffer = new Float64Array(vectorCount * 3);
    }

    /**
     * Get vectors from specific position in buffer
     * @param start Starting vector index (0-based)
     * @param count Number of vectors to allocate
     * @returns Array of vectors
     */
    get(start: number, count: number): Vector[] {
        const vectors: Vector[] = [];
        for (let i = 0; i < count; i++) {
            const offset = (start + i) * 3;
            vectors.push(Vector.fromBuffer(this.buffer, offset));
        }
        return vectors;
    }

    /**
     * Get single vector at specific index
     * @param index Vector index (0-based)
     */
    at(index: number): Vector {
        return Vector.fromBuffer(this.buffer, index * 3);
    }

    /**
     * Get the underlying buffer
     */
    getBuffer(): Float64Array {
        return this.buffer;
    }

    /**
     * Get buffer size in vectors
     */
    getCapacity(): number {
        return this.buffer.length / 3;
    }
}

export { Vector, VectorAllocator };
