import { TrajFlag } from "../trajectory_data";
import { ShotProps } from "./base_types";
import { InterpMethod, interpolate2pt, interpolate3pt } from "./interp";
import { Vector } from "./vector";

type BaseTrajDataJSON = {
    time: number;
    position: [number, number, number];
    velocity: [number, number, number];
    mach: number;
}


const BASE_TRAJ_SEQ_INTERP_KEY_ACTIVE = [
    "time", "px", "py", "pz", "vx", "vy", "vz", "mach"
] as const;
type BaseTrajDataInterpKey = (typeof BASE_TRAJ_SEQ_INTERP_KEY_ACTIVE[number])


class BaseTrajData {
    readonly data: Float64Array;

    constructor(
        time: number = 0,
        px: number = 0, py: number = 0, pz: number = 0,
        vx: number = 0, vy: number = 0, vz: number = 0,
        mach: number = 0
    ) {
        this.data = new Float64Array([
            time,
            px, py, pz,
            vx, vy, vz,
            mach
        ]);
    }

    // Scalars
    get time(): number {
        return this.data[0];
    }

    set time(value: number) {
        this.data[0] = value;
    }

    get px(): number {
        return this.data[1];
    }

    set px(value: number) {
        this.data[1] = value;
    }

    get py(): number {
        return this.data[2];
    }

    set py(value: number) {
        this.data[2] = value;
    }

    get pz(): number {
        return this.data[3];
    }

    set pz(value: number) {
        this.data[3] = value;
    }

    get vx(): number {
        return this.data[4];
    }

    set vx(value: number) {
        this.data[4] = value;
    }

    get vy(): number {
        return this.data[5];
    }

    set vy(value: number) {
        this.data[5] = value;
    }

    get vz(): number {
        return this.data[6];
    }

    set vz(value: number) {
        this.data[6] = value;
    }

    get mach(): number {
        return this.data[7];
    }

    set mach(value: number) {
        this.data[7] = value;
    }

    // Vector views
    get position(): Vector {
        return Vector.fromBuffer(this.data, 1);
    }

    set position(value: Readonly<Vector>) {
        const d = this.data;
        const v = value.data;
        d[1] = v[0];
        d[2] = v[1];
        d[3] = v[2];
    }

    get velocity(): Vector {
        return Vector.fromBuffer(this.data, 4);
    }

    set velocity(value: Readonly<Vector>) {
        const d = this.data;
        const v = value.data;
        d[4] = v[0];
        d[5] = v[1];
        d[6] = v[2];
    }

    static fromBuffer(
        buffer: Float64Array,
        offset: number
    ): BaseTrajData {
        const v = Object.create(BaseTrajData.prototype);
        v.data = buffer.subarray(offset, offset + 8);
        return v;
    }

    static fromVectors(
        time: number,
        position: Readonly<Vector>,
        velocity: Readonly<Vector>,
        mach: number
    ): BaseTrajData {
        const data = new BaseTrajData();
        data.setFromVectors(time, position, velocity, mach);
        return data;
    }

    set(
        time: number = 0,
        px: number = 0, py: number = 0, pz: number = 0,
        vx: number = 0, vy: number = 0, vz: number = 0,
        mach: number = 0
    ): void {
        const d = this.data;
        d[0] = time;
        d[1] = px;
        d[2] = py;
        d[3] = pz;
        d[4] = vx;
        d[5] = vy;
        d[6] = vz;
        d[7] = mach;
    }

    setFromVectors(
        time: number,
        position: Readonly<Vector>,
        velocity: Readonly<Vector>,
        mach: number
    ): void {
        const d = this.data;
        const p = position.data;
        const v = velocity.data;

        d[0] = time;
        d[1] = p[0];
        d[2] = p[1];
        d[3] = p[2];
        d[4] = v[0];
        d[5] = v[1];
        d[6] = v[2];
        d[7] = mach;
    }

    assign(other: Readonly<BaseTrajData>): void {
        this.data.set(other.data);
    }

    toJSON(): BaseTrajDataJSON {
        return {
            time: this.data[0],
            position: [this.data[1], this.data[2], this.data[3]],
            velocity: [this.data[4], this.data[5], this.data[6]],
            mach: this.data[7],
        }
    }

    /**
    * @brief Interpolates trajectory data using 3-point PCHIP method.
    *
    * Performs monotone-preserving cubic Hermite interpolation on all trajectory
    * components based on a specified key (independent variable).
    *
    * ALGORITHM:
    * 1. Extract and cache key values from p0, p1, p2
    * 2. Validate non-degenerate (no duplicate key values)
    * 3. For each field:
    *    - If field == key_kind: set directly to key_value
    *    - Otherwise: perform PCHIP interpolation
    *
    * @param key The field to use as independent variable (TIME, MACH, POS_X, etc.).
    * @param value Target value for interpolation.
    * @param p0 First data point (before target).
    * @param p1 Second data point (center).
    * @param p2 Third data point (after target).
    * @param out Output parameter - populated with interpolated result.
    *
    * @throws std::domain_error if any two key values are equal (degenerate segment).
    *
    * @note This is equivalent to interpolate3pt_vectorized but with skip_key logic.
    */
    interpolate(
        key: BaseTrajDataInterpKey,
        value: number,
        p0: Readonly<BaseTrajData>,
        p1: Readonly<BaseTrajData>,
        p2: Readonly<BaseTrajData>,
        out: BaseTrajData
    ): void {
        const x0 = p0[key];
        const x1 = p1[key];
        const x2 = p2[key];

        // Validate non-degenerate segments
        if (x0 == x1 || x0 == x2 || x1 == x2) {
            throw new Error("Degenerate interpolation segment: duplicate key values")
        }

        // Interpolate all fields directly without creating intermediate vectors
        // This avoids 6 vector constructions compared to original code

        out.set(
            // Time: use value directly if interpolating by time
            key === "time" ? value : interpolate3pt(value, x0, x1, x2, p0.time, p1.time, p2.time),

            // Position components
            interpolate3pt(value, x0, x1, x2, p0.px, p1.px, p2.px),
            interpolate3pt(value, x0, x1, x2, p0.py, p1.py, p2.py),
            interpolate3pt(value, x0, x1, x2, p0.pz, p1.pz, p2.pz),

            // Velocity components
            interpolate3pt(value, x0, x1, x2, p0.vx, p1.vx, p2.vx),
            interpolate3pt(value, x0, x1, x2, p0.vy, p1.vy, p2.vy),
            interpolate3pt(value, x0, x1, x2, p0.vz, p1.vz, p2.vz),

            // Mach: use value directly if interpolating by mach
            key === "mach" ? value : interpolate3pt(value, x0, x1, x2, p0.mach, p1.mach, p2.mach),
        )
    }

    /**
     * @brief Computes slant height relative to a look angle.
     *
     * Slant height represents the perpendicular distance from the line of sight.
     * This is used for ballistic calculations where the shooter is at an angle.
     *
     * Formula: slant_height = py * cos(angle) - px * sin(angle)
     *
     * OPTIMIZATION: Takes precomputed cos/sin to avoid repeated trig calculations.
     *
     * @param ca Cosine of look angle.
     * @param sa Sine of look angle.
     * @return Computed slant height value.
     *
     * @note Positive slant height means target is above line of sight.
     * @note This is projection onto line perpendicular to sight line.
     */
    slantValBuf(ca: number, sa: number): number {
        return this.py * ca - this.px * sa;
    }

    /**
     * @brief Vectorized 3-point interpolation for all trajectory fields.
     *
     * OPTIMIZATION: Performs all interpolations in a single function call,
     * avoiding overhead of multiple function calls and improving cache locality.
     * All 8 trajectory components are interpolated in one pass.
     *
     * KEY DIFFERENCE vs interpolate(): The independent variable values (ox0, ox1, ox2)
     * are provided directly instead of being extracted via key_kind lookup.
     *
     * @param x Target interpolation value (on independent variable axis).
     * @param ox0 Independent variable value at point 0.
     * @param ox1 Independent variable value at point 1.
     * @param ox2 Independent variable value at point 2.
     * @param p0 Trajectory point 0.
     * @param p1 Trajectory point 1.
     * @param p2 Trajectory point 2.
     * @param out Output trajectory data - populated with interpolated values.
     * @param skip_key Key being used as independent variable - this field is set
     *                 directly to x instead of being interpolated (TIME or MACH typically).
     *
     * @note Static method - can be called without instance.
     * @note Assumes caller has validated non-degenerate segments (ox0 != ox1 != ox2).
     *
     * @example
     * // Interpolate at distance = 1000ft using cached distance values
     * BaseTrajData::interpolate3ptVectorized(
     *     1000.0, 900.0, 1000.0, 1100.0,  // x, ox0, ox1, ox2
     *     p0, p1, p2, result,
     *     BaseTrajData_InterpKey::POS_X
     * );
     * // result.px will be 1000.0, other fields interpolated
     */
    static interpolate3ptVectorized(
        x: number,
        ox0: number, ox1: number, ox2: number,
        p0: Readonly<BaseTrajData>,
        p1: Readonly<BaseTrajData>,
        p2: Readonly<BaseTrajData>,
        out: BaseTrajData,
        skip_key?: BaseTrajDataInterpKey
    ): void {
        out.set(
            // Time: set directly if interpolating by time, otherwise interpolate
            skip_key === "time" ? x : interpolate3pt(x, ox0, ox1, ox2, p0.time, p1.time, p2.time),

            // Position components - always interpolate
            interpolate3pt(x, ox0, ox1, ox2, p0.px, p1.px, p2.px),
            interpolate3pt(x, ox0, ox1, ox2, p0.py, p1.py, p2.py),
            interpolate3pt(x, ox0, ox1, ox2, p0.pz, p1.pz, p2.pz),

            // Velocity components - always interpolate
            interpolate3pt(x, ox0, ox1, ox2, p0.vx, p1.vx, p2.vx),
            interpolate3pt(x, ox0, ox1, ox2, p0.vy, p1.vy, p2.vy),
            interpolate3pt(x, ox0, ox1, ox2, p0.vz, p1.vz, p2.vz),

            // Mach: set directly if interpolating by mach, otherwise interpolate
            skip_key === "mach" ? x : interpolate3pt(x, ox0, ox1, ox2, p0.mach, p1.mach, p2.mach)
        )
    }
}

type FlaggedData = {
    data: BaseTrajData;
    flag: TrajFlag;
}

/**
 * Interface for trajectory data handlers
 * Optimized for zero-allocation hot path
 */
interface BaseTrajDataHandlerInterface {
    /**
     * Handle trajectory point from vectors (zero allocation)
     * This is the primary method for hot loops like RK4 integration
     */
    handle(
        time: number,
        position: Readonly<Vector>,
        velocity: Readonly<Vector>,
        mach: number
    ): void;
}


// ============================================================================
// Handler Compositor
// ============================================================================

/**
 * Compositor for multiple trajectory data handlers
 * Broadcasts trajectory points to all registered handlers
 * Supports zero-allocation hot path
 * 
 * const compositor = new BaseTrajDataHandlerCompositor()
 * .add(new BaseTrajSeq())
 *     .add(new TrajectoryAnalyzer())
 *    .add(new TrajectoryLogger());
 * integrateRK4(engine, compositor);
 */
class BaseTrajDataHandlerCompositor implements BaseTrajDataHandlerInterface {
    private handlers: BaseTrajDataHandlerInterface[] = [];

    /**
     * Create compositor with optional initial handlers
     * @param handlers Variable number of handlers to register
     */
    constructor(...handlers: BaseTrajDataHandlerInterface[]) {
        this.handlers = handlers;
    }

    /**
     * Add a handler to the compositor
     */
    add(handler: BaseTrajDataHandlerInterface): this {
        this.handlers.push(handler);
        return this;
    }

    /**
     * Remove a handler from the compositor
     */
    remove(handler: BaseTrajDataHandlerInterface): boolean {
        const index = this.handlers.indexOf(handler);
        if (index !== -1) {
            this.handlers.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Clear all handlers
     */
    clear(): void {
        this.handlers = [];
    }

    /**
     * Get number of registered handlers
     */
    get count(): number {
        return this.handlers.length;
    }

    /**
     * Handle trajectory point - broadcasts to all handlers
     */
    handle(
        time: number,
        position: Readonly<Vector>,
        velocity: Readonly<Vector>,
        mach: number
    ): void {
        for (const handler of this.handlers) {
            handler.handle(time, position, velocity, mach);
        }
    }
}


// ============================================================================
// Trajectory Sequence
// ============================================================================

type BaseTrajSeqJSON = BaseTrajDataJSON[];

const BASE_TRAJ_SEQ_MIN_CAPACITY = 64;

/**
 * Dynamic array of trajectory data points
 */
class BaseTrajSeq implements BaseTrajDataHandlerInterface {
    private buffer: Float64Array;
    private _length: number = 0;

    constructor() {
        this.buffer = new Float64Array(BASE_TRAJ_SEQ_MIN_CAPACITY * 8);
    }

    get capacity(): number {
        return this.buffer.length / 8;
    }

    get length(): number {
        return this._length;
    }

    /**
     * Handle trajectory point from vectors (interface method)
     * Zero allocation hot path - optimized for RK4 integration
     */
    handle(
        time: number,
        position: Readonly<Vector>,
        velocity: Readonly<Vector>,
        mach: number
    ): void {
        if (this._length >= this.capacity) {
            this.grow();
        }

        const offset = this._length * 8;
        const buf = this.buffer;
        const p = position.data;
        const v = velocity.data;

        buf[offset] = time;
        buf[offset + 1] = p[0];
        buf[offset + 2] = p[1];
        buf[offset + 3] = p[2];
        buf[offset + 4] = v[0];
        buf[offset + 5] = v[1];
        buf[offset + 6] = v[2];
        buf[offset + 7] = mach;

        this._length++;
    }

    /**
     * Append trajectory point from BaseTrajData object
     * Convenience method for when you already have a BaseTrajData
     */
    append(data: Readonly<BaseTrajData>): void {
        if (this._length >= this.capacity) {
            this.grow();
        }

        const offset = this._length * 8;
        this.buffer.set(data.data, offset);
        this._length++;
    }

    clear(): void {
        this._length = 0;
    }

    getBuffer(): Float64Array {
        return this.buffer.subarray(0, this._length * 8);
    }

    private grow(): void {
        const new_capacity = Math.max(this.capacity << 1, BASE_TRAJ_SEQ_MIN_CAPACITY);
        const new_buffer = new Float64Array(new_capacity * 8);
        new_buffer.set(this.buffer);
        this.buffer = new_buffer;
    }

    *[Symbol.iterator](): Iterator<BaseTrajData> {
        for (let i = 0; i < this._length; i++) {
            yield this.getItem(i);
        }
    }


    /**
     * @brief Retrieves trajectory element at index (supports negative indexing).
     *
     * Python-style indexing: -1 returns last element, -2 returns second-to-last, etc.
     *
     * COMPLEXITY: O(1) - direct array access after index normalization.
     *
     * @param idx Index to retrieve (negative indices count from end).
     * @return Const reference to trajectory data at index.
     * @throws std::out_of_range if index is out of bounds after normalization.
     */
    getItem(idx: number): BaseTrajData {
        const actualIndex = idx < 0 ? this._length + idx : idx;
        if (actualIndex < 0 || actualIndex >= this._length) {
            throw new RangeError(`Index ${idx} out of bounds [0, ${this._length})`);
        }
        return BaseTrajData.fromBuffer(this.buffer, actualIndex * 8);
    }

    /**
     * @brief Retrieves trajectory data at specified key value with optional time filtering.
     *
     * ALGORITHM:
     * 1. If start_from_time > 0 && key != TIME:
     *    a. Binary search for time >= start_from_time
     *    b. Check for exact match at start index
     *    c. Binary search from start_idx to find target
     * 2. Otherwise: Binary search entire sequence
     * 3. Check for exact match at target (within epsilon=1e-9)
     * 4. If no exact match: Interpolate using 3-point PCHIP
     *
     * OPTIMIZATION:
     * - Binary search: O(log n) instead of linear scan
     * - Exact match avoids expensive PCHIP computation
     * - Time filtering reduces search space for time-series queries
     *
     * @param key Type of key to search by (TIME, MACH, POS_X, etc.).
     * @param value Target key value to retrieve/interpolate.
     * @param start_from_time Time threshold - only search data with time >= this value.
     *                        Use 0.0 or negative to disable time filtering.
     * @param out Output parameter - populated with exact or interpolated trajectory data.
     *
     * @throws std::domain_error if sequence has fewer than 3 points.
     * @throws std::logic_error if binary search fails.
     * @throws std::invalid_argument if interpolation encounters duplicate key values.
     *
     * @note For TIME key, start_from_time is ignored (would be circular).
     * @note Uses try_get_exact internally which throws on no-match (control flow exception pattern).
     */
    getAt(
        key: BaseTrajDataInterpKey,
        value: number,
        start_from_time: number = 0.0,
        out: BaseTrajData
    ): void {
        const n = this._length;

        if (n < 3) {
            throw new Error("Insufficient data points for interpolation (need >= 3)");
        }

        let target_idx = -1;

        // Apply time-based filtering if requested
        if (start_from_time > 0.0 && key != "time") {
            const start_idx = this.findStartIndex(start_from_time);

            // Try exact match at start
            try {
                this.tryGetExact(start_idx, key, value, out);
                return;
            } catch (error) {
                // Not an exact match, continue to interpolation
            }

            // Find interpolation target
            target_idx = this.findTargetIndex(key, value, start_idx);
        }

        // If no time filtering or target not found, search entire range
        if (target_idx < 0) {
            const center = this.bisectCenterIdxBuf(key, value);
            if (center < 0) {
                throw new Error("Binary search failed");
            }
            target_idx = (center < n - 1) ? center : n - 2;
        }

        // Try exact match at target
        try {
            this.tryGetExact(target_idx, key, value, out);
            return;
        } catch {
            // Not exact, proceed to interpolation
        }

        // Interpolate at center point
        const center_idx = (target_idx < n - 1) ? target_idx : n - 2;
        this.interpolateAt(center_idx, key, value, out);
    }

    /**
     * @brief Interpolates trajectory at specified slant height.
     *
     * Slant height formula: h_slant = py * cos(angle) - px * sin(angle)
     * Represents perpendicular distance from line of sight.
     *
     * ALGORITHM:
     * 1. Binary search to find 3-point bracket (uses slant values)
     * 2. Validate center is in safe range [1, n-2]
     * 3. Compute slant values for p0, p1, p2 using precomputed cos/sin
     * 4. Validate non-degenerate (no duplicate slant values)
     * 5. Perform vectorized 3-point PCHIP interpolation
     *
     * @param look_angle_rad Look angle in radians (angle of line of sight from horizontal).
     * @param value Target slant height value.
     * @param out Output parameter - populated with interpolated trajectory data.
     *
     * @throws std::domain_error if sequence has < 3 points or slant values are degenerate.
     * @throws std::runtime_error if binary search fails to find valid bracket.
     * @throws std::out_of_range if center index outside safe range [1, n-2].
     *
     * @note Slant height may be non-monotonic, binary search assumes local monotonicity.
     * @note Uses POS_Y as dummy skip_key (not actually relevant for slant interpolation).
     */
    getAtSlantHeight(
        look_angle_rad: number,
        value: number,
        out: BaseTrajData
    ): void {
        const ca = Math.cos(look_angle_rad);
        const sa = Math.sin(look_angle_rad);
        const n = this._length;

        if (n < 3) {
            throw new Error("Insufficient data points for interpolation");
        }

        const center = this.bisectCenterIdxSlantBuf(ca, sa, value);
        if (center < 0) {
            throw new Error("Failed to locate interpolation center");
        }

        if (center < 1 || center >= n - 1) {
            throw new Error("Center index outside safe interpolation range");
        }

        // Cache data access
        const p0 = this.getItem(center - 1);
        const p1 = this.getItem(center);
        const p2 = this.getItem(center + 1);

        // Compute slant key values
        const ox0 = p0.slantValBuf(ca, sa);
        const ox1 = p1.slantValBuf(ca, sa);
        const ox2 = p2.slantValBuf(ca, sa);

        if (ox0 == ox1 || ox1 == ox2) {
            throw new Error("Degenerate slant values: cannot interpolate");
        }

        // Perform vectorized interpolation
        BaseTrajData.interpolate3ptVectorized(
            value, ox0, ox1, ox2, p0, p1, p2, out, undefined
        ); // Dummy skip key
    }

    /**
     * @brief Performs 3-point PCHIP interpolation at specified index.
     *
     * Uses trajectory points at [idx-1, idx, idx+1] as interpolation bracket.
     * The "center" point is at idx, which should be close to the target value.
     *
     * VALID RANGE: idx must be in [1, n-2] to ensure all three points exist.
     *
     * @param idx Center index for interpolation (supports negative indexing).
     * @param key Independent variable for interpolation (TIME, MACH, etc.).
     * @param value Target value of the independent variable.
     * @param out Output parameter - populated with interpolated trajectory data.
     *
     * @throws std::out_of_range if idx outside valid range [1, n-2] after normalization.
     * @throws std::invalid_argument if key values at three points are not distinct.
     *
     * @note All fields interpolated except key_kind, which is set directly to key_value.
     */
    interpolateAt(
        idx: number,
        key: BaseTrajDataInterpKey,
        value: number,
        out: BaseTrajData
    ): void {
        const n = this._length;

        // Handle negative indices
        if (idx < 0) {
            idx += n;
        }

        // Validate interpolation range
        if (idx < 1 || idx >= n - 1) {
            throw new Error("Index outside valid interpolation range [1, n-2]");
        }

        // Cache point references
        const p0 = this.getItem(idx - 1);
        const p1 = this.getItem(idx);
        const p2 = this.getItem(idx + 1);

        // Cache key values
        const ox0 = p0[key];
        const ox1 = p1[key];
        const ox2 = p2[key];

        // Validate non-degenerate
        if (ox0 == ox1 || ox0 == ox2 || ox1 == ox2) {
            throw new Error("Duplicate key values: cannot interpolate");
        }

        // Perform vectorized interpolation
        BaseTrajData.interpolate3ptVectorized(
            value, ox0, ox1, ox2, p0, p1, p2, out, key
        );
    }

    /**
     * @brief Attempts to retrieve exact trajectory data at index if key matches.
     *
     * Checks if trajectory data at idx has key value matching key_value within
     * tolerance (epsilon = 1e-9). If match found, copies data to out.
     *
     * OPTIMIZATION: Avoids expensive PCHIP interpolation when exact data exists.
     * This is common when querying at measured data points.
     *
     * @param idx Index to check for exact match.
     * @param key Type of key to compare.
     * @param value Target key value to match.
     * @param out Output parameter - populated only if exact match found.
     *
     * @throws std::out_of_range if idx is out of bounds.
     * @throws std::runtime_error if key value does not match within tolerance.
     *
     * @note Uses exception for control flow (try_get pattern).
     * @note Primarily used internally by getAt() to optimize exact lookups.
     * @note Consider refactoring to return bool instead of throwing for cleaner API.
     */
    tryGetExact(
        idx: number,
        key: BaseTrajDataInterpKey,
        value: number,
        out: BaseTrajData,
    ): void {

        if (idx < 0 || idx >= this._length) {
            throw new Error("Index out of bounds");
        }

        const epsilon = 1e-9;

        if (BaseTrajSeq.isClose(this.getItem(idx)[key], value, epsilon)) {
            out.assign(this.getItem(idx));
            return;
        }

        throw new Error("Not an exact match");
    }

    /**
     * @brief Binary search for 3-point interpolation bracket.
     *
     * Locates index 'center' such that:
     * - Points at [center-1, center, center+1] bracket the key_value
     * - center ∈ [1, n-2] (valid range for 3-point interpolation)
     * - Handles both monotonically increasing and decreasing sequences
     *
     * ALGORITHM:
     * 1. Determine sequence monotonicity (compare endpoints)
     * 2. Standard binary search: O(log n)
     * 3. Clamp result to [1, n-2]
     *
     * OPTIMIZATION: Uses bit shift (>> 1) for midpoint calculation.
     *
     * @param key Type of key to search by.
     * @param value Target key value to bracket.
     * @return Center index for 3-point interpolation [1, n-2], or -1 if n < 3.
     *
     * @note Returns -1 if sequence too short for interpolation.
     * @note Assumes sequence is monotonic in key_kind (no validation).
     * @note For non-monotonic sequences, result is undefined.
     */
    bisectCenterIdxBuf(
        key: BaseTrajDataInterpKey,
        value: number
    ): number {
        const n = this._length;
        if (n < 3) {
            return -1;
        }

        // Determine monotonicity
        const v0 = this.getItem(0)[key];
        const vN = this.getItem(n - 1)[key];
        const increasing = (vN >= v0);

        let lo = 0;
        let hi = n - 1;

        // Binary search
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1); // Bit shift optimization
            const vm = this.getItem(mid)[key];

            if ((increasing && vm < value) || (!increasing && vm > value)) {
                lo = mid + 1;
            }
            else {
                hi = mid;
            }
        }

        // Clamp to valid interpolation range [1, n-2]
        if (lo < 1)
            lo = 1;
        if (lo > n - 2)
            lo = n - 2;

        return lo;
    }

    /**
     * @brief Binary search for slant height interpolation bracket.
     *
     * Similar to bisect_center_idx_buf but searches by computed slant height values.
     * Slant height = py * cos(angle) - px * sin(angle)
     *
     * OPTIMIZATION: Takes precomputed cos/sin to avoid repeated trig calculations
     * during binary search (would be O(n log n) otherwise).
     *
     * @param ca Cosine of look angle (precomputed).
     * @param sa Sine of look angle (precomputed).
     * @param value Target slant height value to bracket.
     * @return Center index in [1, n-2], or -1 if n < 3.
     *
     * @note Slant height computed on-the-fly during search.
     * @note Assumes slant values are locally monotonic.
     */
    bisectCenterIdxSlantBuf(ca: number, sa: number, value: number): number {
        const n = this._length;
        if (n < 3) {
            return -1;
        }

        // Determine monotonicity
        const v0 = this.getItem(0).slantValBuf(ca, sa);
        const vN = this.getItem(n - 1).slantValBuf(ca, sa);
        const increasing = (vN >= v0);

        let lo = 0;
        let hi = n - 1;

        // Binary search
        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            const vm = this.getItem(mid).slantValBuf(ca, sa);

            if ((increasing && vm < value) || (!increasing && vm > value))
                lo = mid + 1;
            else
                hi = mid;
        }

        // Clamp to [1, n-2]
        if (lo < 1)
            lo = 1;
        if (lo > n - 2)
            lo = n - 2;

        return lo;
    }

    /**
     * @brief Finds first index where trajectory time >= start_time.
     *
     * OPTIMIZATION STRATEGY:
     * - Large arrays (n > 10) with monotonic time: Binary search O(log n)
     * - Small arrays or non-monotonic time: Linear search O(n)
     *
     * Rationale: Binary search overhead not worth it for small arrays.
     * Monotonicity check: buffer[0].time <= buffer[n-1].time
     *
     * @param start_time Time threshold to search for.
     * @return Index of first point with time >= start_time, or n-1 if none found.
     *
     * @note Returns n-1 (last index) if all points have time < start_time.
     * @note Linear search used for small/non-monotonic sequences for simplicity.
     */
    findStartIndex(start_time: number): number {
        const n = this._length;

        // Binary search for large arrays with monotonic time
        if (n > 10 && this.getItem(0).time <= this.getItem(n - 1).time) {
            let lo = 0
            let hi = n - 1;

            while (lo < hi) {
                const mid = lo + ((hi - lo) >> 1);

                if (this.getItem(mid).time < start_time)
                    lo = mid + 1;
                else
                    hi = mid;
            }

            return lo;
        }

        // Linear search for small arrays
        for (let i = 0; i < n; i++) {
            if (this.getItem(i).time >= start_time) {
                return i;
            }
        }

        return n - 1;
    }

    /**
     * @brief Finds target index for interpolation within bounded search range.
     *
     * Similar to bisect_center_idx_buf but with additional edge case handling:
     * - If key_value outside sequence range, returns nearest valid interpolation index
     * - Handles both increasing and decreasing monotonic sequences
     *
     * EDGE CASES:
     * - key_value <= first value: returns 1 (minimum valid center)
     * - key_value >= last value: returns n-2 (maximum valid center)
     * - Otherwise: binary search for bracket
     *
     * @param key Type of key to search by.
     * @param value Target key value.
     * @param start_idx Starting search index (currently unused - searches full range).
     * @return Target index in [1, n-2], or -1 if n < 3.
     *
     * @note start_idx parameter currently ignored (TODO: optimize to use it).
     * @note Extrapolation is clamped to valid interpolation range.
     */
    findTargetIndex(
        key: BaseTrajDataInterpKey,
        value: number,
        start_idx: number
    ): number {
        const n = this._length;
        if (n < 3) {
            return -1;
        }
        // Determine monotonicity
        const v0 = this.getItem(0)[key];
        const vN = this.getItem(n - 1)[key];
        const increasing = (vN >= v0);

        // Handle extrapolation
        if (increasing) {
            if (value <= v0)
                return 1;
            if (value >= vN)
                return n - 2;
        }
        else {
            if (value >= v0)
                return 1;
            if (value <= vN)
                return n - 2;
        }

        // Binary search
        let lo = 0;
        let hi = n - 1;

        while (lo < hi) {
            const mid = lo + ((hi - lo) >> 1);
            const vm = this.getItem(mid)[key];

            if ((increasing && vm < value) || (!increasing && vm > value)) {
                lo = mid + 1;
            }
            else {
                hi = mid;
            }
        }

        // Clamp to [1, n-2]
        if (lo < 1)
            return 1;
        if (lo > n - 2)
            return n - 2;

        return lo;
    }

    /**
     * @brief Checks if two doubles are approximately equal within tolerance.
     *
     * Uses absolute difference comparison: |a - b| < epsilon
     *
     * LIMITATION: Only checks absolute error, not relative error.
     * This is appropriate for trajectory data where values have similar magnitudes.
     *
     * @param a First value.
     * @param b Second value.
     * @param epsilon Tolerance threshold (typically 1e-9).
     * @return 1 if |a - b| < epsilon, 0 otherwise.
     *
     * @note Static method - no instance required.
     * @note Does not handle special float values (NaN, infinity).
     */
    static isClose(a: number, b: number, epsilon: number): boolean {
        return Math.abs(a - b) < epsilon;
    }

    toArray(): BaseTrajData[] {
        const result: BaseTrajData[] = new Array(this._length) as BaseTrajData[];
        for (let i = 0; i < this._length; i++) {
            const point = new BaseTrajData();
            point.assign(this.getItem(i));
            result[i] = point;
        }
        return result;
    }

    toJSON(): BaseTrajSeqJSON {
        const result: BaseTrajSeqJSON = new Array(this._length) as BaseTrajSeqJSON;
        const buf = this.buffer;

        for (let i = 0; i < this._length; i++) {
            const offset = i * 8;
            result[i] = {
                time: buf[offset],
                position: [buf[offset + 1], buf[offset + 2], buf[offset + 3]],
                velocity: [buf[offset + 4], buf[offset + 5], buf[offset + 6]],
                mach: buf[offset + 7]
            };
        }
        return result;
    }
}


// ============================================================================
// TrajectoryData
// ============================================================================

const TRAJECTORY_DATA_INTERP_KEY_ACTIVE = [
    "time", "distance", "velocity", "mach", "height",
    "slant_height", "drop_angle", "windage", "windage_angle",
    "slant_distance", "angle", "density_ratio", "drag", "energy", "ogw"
] as const;
type RawTrajectoryDataInterpKey = (typeof TRAJECTORY_DATA_INTERP_KEY_ACTIVE[number])

/**
 * @brief Complete trajectory data with all derived ballistic properties.
 *
 * Extends base trajectory data with:
 * - Atmospheric corrections (density, drag)
 * - Coriolis and spin drift effects
 * - Angular measurements (drop, windage angles)
 * - Energy and optimal game weight
 *
 * MEMORY: 16 doubles + 1 flag = ~136 bytes (with padding)
 */
class RawTrajectoryData {
    readonly data: Float64Array;
    flag: TrajFlag;

    // Memory layout (16 fields):
    // [0]=time, [1]=distance, [2]=velocity, [3]=mach, [4]=height,
    // [5]=slant_height, [6]=drop_angle, [7]=windage, [8]=windage_angle,
    // [9]=slant_distance, [10]=angle, [11]=density_ratio, [12]=drag, [13]=energy, [14]=ogw

    constructor(
        props: Readonly<ShotProps>,
        time: number,
        range_vector: Vector,
        velocity_vector: Vector,
        mach_arg: number,
        flag: TrajFlag,
    ) {
        this.data = new Float64Array(15);
        this.flag = flag;

        // Compute adjusted range with Coriolis correction
        const adjusted_range = props.coriolis.adjustRange(time, range_vector);
        const spin_drift = props.spinDrift(time);
        const velocity = velocity_vector.mag();

        const windage = adjusted_range.z + spin_drift;

        // Get atmospheric conditions at current altitude
        const [density_ratio, mach] = props.atmo.getDensityFactorAndMachForAltitude(range_vector.y);

        // Precompute trigonometric values
        const trajectory_angle = Math.atan2(velocity_vector.y, velocity_vector.x);
        const look_angle_cos = Math.cos(props.look_angle);
        const look_angle_sin = Math.sin(props.look_angle);

        const distance = adjusted_range.x;
        const height = adjusted_range.y;
        const computed_mach = velocity / (mach_arg != 0.0 ? mach_arg : mach);
        const slant_height = height * look_angle_cos - distance * look_angle_sin;

        // Compute angles
        const drop_angle = getCorrection(distance, height) -
            (distance ? props.look_angle : 0.0);
        const windage_angle = getCorrection(distance, windage);
        const slant_distance = distance * look_angle_cos + height * look_angle_sin;

        // Physical properties
        const drag = props.dragByMach(computed_mach);
        const energy = calculateEnergy(props.weight, velocity);
        const ogw = calculateOgw(props.weight, velocity);

        // Populate data array
        const d = this.data;
        d[0] = time;
        d[1] = distance;
        d[2] = velocity;
        d[3] = computed_mach;
        d[4] = height;
        d[5] = slant_height;
        d[6] = drop_angle;
        d[7] = windage;
        d[8] = windage_angle;
        d[9] = slant_distance;
        d[10] = trajectory_angle;
        d[11] = density_ratio;
        d[12] = drag;
        d[13] = energy;
        d[14] = ogw;
    }

    // Getters/Setters
    get time(): number { return this.data[0]; }
    set time(v: number) { this.data[0] = v; }

    get distance(): number { return this.data[1]; }
    set distance(v: number) { this.data[1] = v; }

    get velocity(): number { return this.data[2]; }
    set velocity(v: number) { this.data[2] = v; }

    get mach(): number { return this.data[3]; }
    set mach(v: number) { this.data[3] = v; }

    get height(): number { return this.data[4]; }
    set height(v: number) { this.data[4] = v; }

    get slant_height(): number { return this.data[5]; }
    set slant_height(v: number) { this.data[5] = v; }

    get drop_angle(): number { return this.data[6]; }
    set drop_angle(v: number) { this.data[6] = v; }

    get windage(): number { return this.data[7]; }
    set windage(v: number) { this.data[7] = v; }

    get windage_angle(): number { return this.data[8]; }
    set windage_angle(v: number) { this.data[8] = v; }

    get slant_distance(): number { return this.data[9]; }
    set slant_distance(v: number) { this.data[9] = v; }

    get angle(): number { return this.data[10]; }
    set angle(v: number) { this.data[10] = v; }

    get density_ratio(): number { return this.data[11]; }
    set density_ratio(v: number) { this.data[11] = v; }

    get drag(): number { return this.data[12]; }
    set drag(v: number) { this.data[12] = v; }

    get energy(): number { return this.data[13]; }
    set energy(v: number) { this.data[13] = v; }

    get ogw(): number { return this.data[14]; }
    set ogw(v: number) { this.data[14] = v; }

    /**
     * Zero-copy view from buffer
     */
    static fromBuffer(buffer: Float64Array, offset: number, flag: TrajFlag): RawTrajectoryData {
        const v = Object.create(RawTrajectoryData.prototype);
        v.data = buffer.subarray(offset, offset + 15);
        v.flag = flag;
        return v;
    }

    /**
     * Assign from another RawTrajectoryData
     */
    assign(other: Readonly<RawTrajectoryData>): void {
        this.data.set(other.data);
        this.flag = other.flag;
    }

    /**
     * OPTIMIZED: Interpolate using vectorized operations
     */
    static interpolate(
        key: RawTrajectoryDataInterpKey,
        value: number,
        p0: Readonly<RawTrajectoryData>,
        p1: Readonly<RawTrajectoryData>,
        p2: Readonly<RawTrajectoryData>,
        flag: TrajFlag,
        method: InterpMethod,
        out: RawTrajectoryData
    ): void {
        // Map key to index
        const keyIndex = TRAJECTORY_DATA_KEY_TO_INDEX[key];

        // Cache independent variable values
        const x0 = p0.data[keyIndex];
        const x1 = p1.data[keyIndex];
        const x2 = p2.data[keyIndex];

        const outData = out.data;
        const d0 = p0.data;
        const d1 = p1.data;
        const d2 = p2.data;

        if (method === "pchip") {
            // Vectorized PCHIP interpolation
            for (let i = 0; i < 15; i++) {
                if (i === keyIndex) {
                    outData[i] = value;
                } else {
                    outData[i] = interpolate3pt(value, x0, x1, x2, d0[i], d1[i], d2[i]);
                }
            }
        } else if (method === "linear") {
            // Vectorized linear interpolation
            if (value <= x1) {
                for (let i = 0; i < 15; i++) {
                    if (i === keyIndex) {
                        outData[i] = value;
                    } else {
                        outData[i] = interpolate2pt(value, x0, d0[i], x1, d1[i]);
                    }
                }
            } else {
                for (let i = 0; i < 15; i++) {
                    if (i === keyIndex) {
                        outData[i] = value;
                    } else {
                        outData[i] = interpolate2pt(value, x1, d1[i], x2, d2[i]);
                    }
                }
            }
        } else {
            throw new Error("Invalid interpolation method");
        }

        out.flag = flag;
    }

    static fromBasetrajData(props: ShotProps, data: BaseTrajData, flag: TrajFlag = TrajFlag.NONE): RawTrajectoryData {
        return new RawTrajectoryData(props, data.time, data.position, data.velocity, data.mach, flag);
    }

    static fromFlaggedData(props: ShotProps, data: FlaggedData): RawTrajectoryData {
        return RawTrajectoryData.fromBasetrajData(props, data.data, data.flag);
    }
}

// Helper mapping for O(1) key lookup
const TRAJECTORY_DATA_KEY_TO_INDEX: Record<RawTrajectoryDataInterpKey, number> = {
    "time": 0,
    "distance": 1,
    "velocity": 2,
    "mach": 3,
    "height": 4,
    "slant_height": 5,
    "drop_angle": 6,
    "windage": 7,
    "windage_angle": 8,
    "slant_distance": 9,
    "angle": 10,
    "density_ratio": 11,
    "drag": 12,
    "energy": 13,
    "ogw": 14
};

export {
    BaseTrajDataInterpKey,
    BaseTrajData,
    FlaggedData,
    BaseTrajDataHandlerInterface,
    BaseTrajSeq,
    BaseTrajDataHandlerCompositor,
    RawTrajectoryData,
}
