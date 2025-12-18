import { Vector } from "./vector"


class BaseTrajData {
    time: number;
    px: number;
    py: number;
    pz: number;
    vx: number;
    vy: number;
    vz: number;
    mach: number;

    constructor(
        time: number,
        px: number,
        py: number,
        pz: number,
        vx: number,
        vy: number,
        vz: number,
        mach: number,
    ) { }

    get position(): Vector { return new Vector(this.px, this.py, this.pz) };
    get velocity(): Vector { return new Vector(this.vx, this.vy, this.vz) };

    get_key_val(key_kind: keyof BaseTrajData): number { };
    slant_val_buf(ca: number, sa: number): number { };

    interpolate(
        key_kind: keyof BaseTrajData,
        key_value: number,
        p0: Readonly<BaseTrajData>,
        p1: Readonly<BaseTrajData>,
        p2: Readonly<BaseTrajData>): BaseTrajData { };

    interpolate3pt_vectorized(
        x: number, ox0: number, ox1: number, ox2: number,
        p0: Readonly<BaseTrajData>, p1: Readonly<BaseTrajData>, p2: Readonly<BaseTrajData>,
        skip_key: keyof BaseTrajData): BaseTrajData { };
}


interface BaseTrajDataHandlerInterface {
    handle: (data: Readonly<BaseTrajData>) => void;
}

export { BaseTrajData, BaseTrajDataHandlerInterface };
