export default class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy() {
        return new Vector(this.x, this.y, this.z)
    }

    magnitude() {
        return Math.sqrt(
            Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
        );
    }

    mul_by_const(a) {
        return new Vector(this.x * a, this.y * a, this.z * a);
    }

    mul_by_vector(b) {
        return this.x * b.x + this.y * b.y + this.z * b.z;
    }

    add(b) {
        return new Vector(this.x + b.x, this.y + b.y, this.z + b.z);
    }

    subtract(b) {
        return new Vector(this.x - b.x, this.y - b.y, this.z - b.z);
    }

    negate() {
        return new Vector(-this.x, -this.y, -this.z);
    }

    normalize() {
        const m = this.magnitude();
        if (Math.abs(m) < 1e-10) {
            return new Vector(this.x, this.y, this.z);
        }
        return this.mul_by_const(1.0 / m);
    }

    static add(a, b) {
        return a.add(b);
    }

    static subtract(a, b) {
        return a.subtract(b);
    }

    static multiply(a, b) {
        if (typeof b === 'number') {
            return a.mul_by_const(b);
        } else if (b instanceof Vector) {
            return a.mul_by_vector(b);
        }
        throw new TypeError(b);
    }

    static negate(a) {
        return a.negate();
    }
}