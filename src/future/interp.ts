type InterpMethod = "pchip" | "linear"

const hermite = (x: number, xk: number, xk1: number, yk: number, yk1: number, mk: number, mk1: number): number => { };

const interpolate3pt = (x: number, x0: number, x1: number, x2: number, y0: number, y1: number, y2: number): number { };

const interpolate2pt = (x: number, x0: number, y0: number, x1: number, y1: number): number => {

    throw new ValueError("Linear interpolation failed: zero division");

};

export {
    InterpMethod, hermite, interpolate2pt, interpolate3pt
};
