/**
 * Interpolation methods for trajectory data
 */
type InterpMethod = "pchip" | "linear";

/**
 * @brief Evaluates a cubic Hermite polynomial at a given point.
 *
 * Uses Hermite basis functions to interpolate between two points with specified slopes.
 * The Hermite interpolation formula ensures C1 continuity (continuous first derivatives).
 *
 * ALGORITHM:
 * 1. Normalize x to parameter t ∈ [0, 1]
 * 2. Compute Hermite basis functions (H00, H10, H01, H11)
 * 3. Combine: y = H00*yk + H10*h*mk + H01*yk1 + H11*h*mk1
 *
 * @param x Point at which to evaluate the polynomial.
 * @param xk Left point x-coordinate.
 * @param xk1 Right point x-coordinate.
 * @param yk Left point y-coordinate.
 * @param yk1 Right point y-coordinate.
 * @param mk Slope at left point.
 * @param mk1 Slope at right point.
 * @return Interpolated value at x.
 *
 * @note Uses Horner's scheme for numerical stability.
 * @note Assumes xk < x < xk1 for valid interpolation.
 */
const hermite = (
    x: number,
    xk: number,
    xk1: number,
    yk: number,
    yk1: number,
    mk: number,
    mk1: number
): number => {
    // Compute interval width
    const h = xk1 - xk;

    // Normalize to parameter t ∈ [0, 1]
    const t = (x - xk) / h;

    // Compute powers of t
    const t2 = t * t;
    const t3 = t2 * t;

    // Hermite basis functions using Horner's scheme for stability
    // H00(t) = 2t³ - 3t² + 1
    const H00 = ((2 * t - 3) * t) * t + 1;

    // H10(t) = t³ - 2t² + t
    const H10 = ((t - 2) * t + 1) * t;

    // H01(t) = -2t³ + 3t²
    const H01 = ((-2 * t + 3) * t) * t;

    // H11(t) = t³ - t²
    const H11 = (t - 1) * t2;

    // Combine using Hermite formula
    return H00 * yk + H10 * h * mk + H01 * yk1 + H11 * h * mk1;
};

/**
 * @brief Computes PCHIP (Piecewise Cubic Hermite Interpolating Polynomial) slopes.
 *
 * Ensures monotonicity by computing slopes that preserve the monotonic behavior
 * of the data. Uses weighted harmonic mean of secant slopes.
 *
 * ALGORITHM:
 * 1. Compute secant slopes: d0 = (y1-y0)/(x1-x0), d1 = (y2-y1)/(x2-x1)
 * 2. If signs differ or either is zero: slope = 0 (local extremum)
 * 3. Otherwise: harmonic mean weighted by interval widths
 *
 * @param x0 First point x-coordinate.
 * @param x1 Second point x-coordinate.
 * @param x2 Third point x-coordinate.
 * @param y0 First point y-coordinate.
 * @param y1 Second point y-coordinate.
 * @param y2 Third point y-coordinate.
 * @return Computed slope at middle point (x1, y1).
 *
 * @note Returns 0 at local extrema to preserve monotonicity.
 * @note Uses harmonic mean to prevent overshoot.
 */
const pchipSlope = (
    x0: number,
    x1: number,
    x2: number,
    y0: number,
    y1: number,
    y2: number
): number => {
    // Compute interval widths
    const h0 = x1 - x0;
    const h1 = x2 - x1;

    // Compute secant slopes
    const d0 = (y1 - y0) / h0;
    const d1 = (y2 - y1) / h1;

    // Check for sign change or zero slope (local extremum)
    if (d0 * d1 <= 0) {
        return 0.0;
    }

    // Weighted harmonic mean of secant slopes
    // m = (h0 + h1) / (h0/d0 + h1/d1)
    //   = (h0 + h1) * d0 * d1 / (h0*d1 + h1*d0)
    const w0 = h0;
    const w1 = h1;

    return (w0 + w1) / (w0 / d0 + w1 / d1);
};

/**
 * @brief Performs 3-point monotone PCHIP interpolation.
 *
 * Interpolates the value at x using three support points (x0, y0), (x1, y1), (x2, y2).
 * Computes PCHIP slopes and evaluates the appropriate Hermite piece.
 *
 * ALGORITHM:
 * 1. Compute PCHIP slopes at x0, x1, x2
 * 2. Determine which interval contains x
 * 3. Evaluate Hermite polynomial on that interval
 *
 * PCHIP PROPERTIES:
 * - C1 continuous (continuous first derivatives)
 * - Monotonicity preserving
 * - No overshoot at extrema
 * - Local (uses only 3 points)
 *
 * @param x The x-coordinate at which to interpolate.
 * @param x0 First support point x-coordinate.
 * @param x1 Second support point x-coordinate.
 * @param x2 Third support point x-coordinate.
 * @param y0 First support point y-coordinate.
 * @param y1 Second support point y-coordinate.
 * @param y2 Third support point y-coordinate.
 * @return Interpolated y value at x.
 *
 * @note If x <= x1, interpolation occurs between first and second points,
 *       otherwise between second and third points.
 * @note Assumes x0 < x1 < x2 (strictly increasing).
 */
const interpolate3pt = (
    x: number,
    x0: number,
    x1: number,
    x2: number,
    y0: number,
    y1: number,
    y2: number
): number => {
    // Compute PCHIP slopes at each point
    const m0 = pchipSlope(x0, x1, x2, y0, y1, y2);  // Slope at x0
    const m1 = pchipSlope(x0, x1, x2, y0, y1, y2);  // Slope at x1
    const m2 = pchipSlope(x0, x1, x2, y0, y1, y2);  // Slope at x2

    // Determine which interval contains x and interpolate
    if (x <= x1) {
        // Interpolate on interval [x0, x1]
        return hermite(x, x0, x1, y0, y1, m0, m1);
    } else {
        // Interpolate on interval [x1, x2]
        return hermite(x, x1, x2, y1, y2, m1, m2);
    }
};

/**
 * @brief Performs linear interpolation between two points.
 *
 * Calculates y = y0 + (y1 - y0) * (x - x0) / (x1 - x0)
 *
 * ALGORITHM:
 * 1. Compute interval width: h = x1 - x0
 * 2. Validate h ≠ 0 (throw if degenerate)
 * 3. Compute normalized parameter: t = (x - x0) / h
 * 4. Linear interpolation: y = y0 + t * (y1 - y0)
 *
 * PROPERTIES:
 * - C0 continuous (continuous values, discontinuous derivatives)
 * - Fast (no expensive operations)
 * - Exact for linear data
 *
 * @param x The x-coordinate at which to interpolate.
 * @param x0 First point x-coordinate.
 * @param y0 First point y-coordinate.
 * @param x1 Second point x-coordinate.
 * @param y1 Second point y-coordinate.
 * @return Interpolated y value at x.
 *
 * @throws Error if x0 == x1 (zero division).
 *
 * @note For x outside [x0, x1], performs linear extrapolation.
 * @note Uses single division for numerical stability.
 */
const interpolate2pt = (
    x: number,
    x0: number,
    y0: number,
    x1: number,
    y1: number
): number => {
    // Compute interval width
    const h = x1 - x0;

    // Check for degenerate interval
    if (h === 0) {
        throw new Error("Linear interpolation failed: zero division (x0 == x1)");
    }

    // Compute normalized parameter t ∈ [0, 1] for x ∈ [x0, x1]
    const t = (x - x0) / h;

    // Linear interpolation: y = (1-t)*y0 + t*y1 = y0 + t*(y1-y0)
    return y0 + t * (y1 - y0);
};

export type {
    InterpMethod
};

export {
    hermite,
    interpolate2pt,
    interpolate3pt
};