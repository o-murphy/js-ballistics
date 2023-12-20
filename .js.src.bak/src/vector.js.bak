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

    mulByConst(a) {
        return new Vector(this.x * a, this.y * a, this.z * a);
    }

    mulByVector(b) {
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
        return this.mulByConst(1.0 / m);
    }
}