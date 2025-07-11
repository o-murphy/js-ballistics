class Vector {
    constructor(
        public x: number,
        public y: number,
        public z: number,
    ) {}

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    magnitude(): number {
        return Math.hypot(this.x, this.y, this.z);
    }

    mulByConst(a: number): Vector {
        return new Vector(this.x * a, this.y * a, this.z * a);
    }

    mulByVector(b: Vector): number {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }

    add(b: Vector): Vector {
        return new Vector(this.x + b.x, this.y + b.y, this.z + b.z);
    }

    subtract(b: Vector): Vector {
        return new Vector(this.x - b.x, this.y - b.y, this.z - b.z);
    }

    negate(): Vector {
        return new Vector(-this.x, -this.y, -this.z);
    }

    normalize(): Vector {
        const m: number = this.magnitude();
        if (Math.abs(m) < 1e-10) {
            return new Vector(this.x, this.y, this.z);
        }
        return this.mulByConst(1.0 / m);
    }

    static sum(...vectors: Vector[]): Vector {
        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;

        // Explicit loop, no reduce() used
        for (const vector of vectors) {
            sumX += vector.x;
            sumY += vector.y;
            sumZ += vector.z;
        }

        return new Vector(sumX, sumY, sumZ);
    }
}

export default Vector;
