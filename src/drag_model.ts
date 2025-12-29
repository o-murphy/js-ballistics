// Import necessary modules and classes
import { Distance, unitTypeCoerce, Weight, Velocity, preferredUnits } from "./unit";
// @ts-ignore
import { DragTable, DragTableDataType, makeDataPoints } from "./drag_tables";
import { cDegreesCtoK, cSpeedOfSoundMetric, cStandardTemperatureC } from "./constants";

export { DragModel, BCPoint, DragModelMultiBC };


/**
 * Represents a ballistic coefficient point.
 */
class BCPoint {
    readonly BC: number;
    readonly Mach: number;
    readonly V: Velocity | null;

    /**
     * Creates an instance of BCPoint.
     * @param {Object} options - The parameters for initializing the ballistic coefficient point.
     * @param {number} options.BC - The ballistic coefficient. Must be positive.
     * @param {number} [options.Mach=null] - Mach number. Optional if velocity is provided.
     * @param {number | Velocity | null} [options.V=null] - Velocity. Optional if Mach number is provided.
     * @throws {Error} If BC is less than or equal to zero, or if both Mach and V are specified, or if neither Mach nor V is specified.
     */
    constructor({
        BC,
        Mach = null,
        V = null,
    }: {
        BC: number;
        Mach?: number | null;
        V?: number | Velocity | null;
    }) {
        if (BC <= 0) {
            throw new Error("Ballistic coefficient must be positive");
        }

        if (Mach !== null && V !== null) {
            // More explicit check for null
            throw new Error("You cannot specify both 'Mach' and 'V' at the same time");
        }

        if (Mach === null && V === null) {
            // More explicit check for null
            throw new Error("One of 'Mach' and 'V' must be specified");
        }

        this.BC = BC;

        if (V !== null) {
            this.V = unitTypeCoerce(V, Velocity, preferredUnits.velocity); // Pass V directly, not V ?? 0, as V is already handled as null
            this.Mach = this.V.In(Velocity.MPS) / BCPoint._machC(); // Call static method with class name
        } else if (Mach !== null) {
            this.V = null; // Ensure V is null if Mach is provided
            this.Mach = Mach;
        } else {
            // This branch should theoretically not be reached due to the earlier check,
            // but if it somehow is, ensure a clear error or defined state.
            // For safety, re-throwing the error here emphasizes the contract.
            throw new Error("Internal error: Mach or V should have been specified but were not.");
        }
    }

    static _machC(): number {
        return Math.sqrt(cStandardTemperatureC + cDegreesCtoK) * cSpeedOfSoundMetric;
    }
}

// Define the DragModel class
class DragModel {
    /**
     * Constructor for DragModel class.
     * @param {number} bc - Coefficient value for drag.
     * @param {DragTable} dragTable - Custom drag table.
     * @param {number|Weight} weight - Weight value or Weight instance.
     * @param {number|Distance} diameter - Diameter value or Distance instance.
     * @param {number|Distance} length - Diameter value or Distance instance.
     */

    readonly bc: number;
    readonly dragTable: DragTable;
    readonly weight: Weight;
    readonly diameter: Distance;
    readonly length: Distance;

    protected sectionalDensity: number;
    protected formFactor: number;

    /**
     * Creates an instance of DragModel.
     * @param {Object} options - The options for initializing the drag model.
     * @param {number} options.bc - Coefficient value for drag.
     * @param {DragTable} options.dragTable - Custom drag table.
     * @param {number | Weight} [options.weight=0] - Weight value or Weight instance (default: 0).
     * @param {number | Distance} [options.diameter=0] - Diameter value or Distance instance (default: 0).
     * @param {number | Distance} [options.length=0] - Length value or Distance instance (default: 0).
     */
    constructor({
        bc,
        dragTable,
        weight = 0,
        diameter = 0,
        length = 0,
    }: {
        bc: number;
        dragTable: DragTableDataType;
        weight?: number | Weight;
        diameter?: number | Distance;
        length?: number | Distance;
    }) {
        // Check if the table length is not greater than 0
        if (dragTable.length <= 0) {
            throw new Error("Received empty drag table");
        } else if (bc <= 0) {
            // Check if the drag coefficient is not greater than zero
            throw new Error("Ballistic coefficient must be positive");
        }

        this.dragTable = makeDataPoints(dragTable);

        this.bc = bc;
        this.weight = unitTypeCoerce(weight ?? 0, Weight, preferredUnits.weight);
        this.diameter = unitTypeCoerce(diameter ?? 0, Distance, preferredUnits.diameter);
        this.length = unitTypeCoerce(length ?? 0, Distance, preferredUnits.length);
        // Calculate and set the sectional density and form factor
        if (weight && diameter) {
            // FIXME: Check if both > 0
            this.sectionalDensity = this._getSectionalDensity();
            this.formFactor = this._getFormFactor(this.bc);
        }
    }

    /**
     * Calculate and return the form factor.
     * @param {number} bc - Drag coefficient value.
     * @returns {number} - Calculated form factor.
     * @private
     */
    _getFormFactor(bc: number): number {
        // Divide sectional density by drag coefficient
        return this.sectionalDensity / bc;
    }

    /**
     * Calculate and return the sectional density.
     * @returns {number} - Calculated sectional density.
     * @private
     */
    _getSectionalDensity(): number {
        // Get weight in grains and diameter in inches
        const w = this.weight.grain;
        const d = this.diameter.inch;
        // Call the sectionalDensity function to calculate and return the result
        return sectionalDensity(w, d);
    }
}

/**
 * Calculates and returns the sectional density.
 * @param {number} weight - The weight value (in grains).
 * @param {number} diameter - The diameter value (in inches).
 * @returns {number} - The calculated sectional density (in lb/in²).
 */
const sectionalDensity = (weight: number, diameter: number): number => {
    // Divide weight by the square of diameter and then by 7000
    return weight / Math.pow(diameter, 2) / 7000;
};

/**
 * Creates a `DragModel` instance with multiple ballistic coefficient (BC) points.
 * @param {Object} options - The options for initializing the `DragModel`.
 * @param {BCPoint[]} options.bcPoints - An array of `BCPoint` objects representing the ballistic coefficients.
 * @param {DragTableDataType} options.dragTable - The drag table data, which can be a mix of `DragDataPoint` instances and objects with `Mach` and `CD` properties.
 * @param {number | Weight} [options.weight=0] - The weight value or a `Weight` instance. Defaults to 0.
 * @param {number | Distance} [options.diameter=0] - The diameter value or a `Distance` instance. Defaults to 0.
 * @param {number | Distance} [options.length=0] - The length value or a `Distance` instance. Defaults to 0.
 * @returns {DragModel} - An instance of `DragModel` initialized with the provided options.
 */
const DragModelMultiBC = ({
    bcPoints,
    dragTable,
    weight = 0,
    diameter = 0,
    length = 0,
}: {
    bcPoints: BCPoint[];
    dragTable: DragTableDataType;
    weight?: number | Weight;
    diameter?: number | Distance;
    length?: number | Distance;
}): DragModel => {
    let bc: number;
    const _weight = unitTypeCoerce(weight, Weight, preferredUnits.weight); // Use default parameter, no need for ?? 0
    const _diameter = unitTypeCoerce(
        diameter, // Use default parameter, no need for ?? 0
        Distance,
        preferredUnits.diameter
    );
    if (_weight.rawValue > 0 && _diameter.rawValue > 0) {
        bc = sectionalDensity(_weight.grain, _diameter.inch);
    } else {
        bc = 1.0;
    }

    const _dragTable = makeDataPoints(dragTable);
    bcPoints.sort((a, b) => a.Mach - b.Mach);
    const bcInterp = linearInterpolation(
        _dragTable.map((point) => point.Mach),
        bcPoints.map((point) => point.Mach),
        bcPoints.map((point) => point.BC / bc)
    );

    _dragTable.forEach((item, index) => {
        // Consider adding a check here for bcInterp[index] being valid (not zero or NaN)
        // to prevent division by zero or NaN propagation if interpolation fails.
        if (bcInterp[index] === 0 || isNaN(bcInterp[index])) {
            console.warn(
                `Warning: Interpolated BC factor at index ${index} is zero or NaN. CD calculation may result in Infinity/NaN.`
            );
            // You might want to handle this more robustly, e.g., throw an error or use a default value.
        }
        item.CD = item.CD / bcInterp[index];
    });

    return new DragModel({
        bc: bc,
        dragTable: _dragTable,
        weight: _weight,
        diameter: _diameter,
        length: length,
    });
};

/**
 * Performs linear interpolation based on the provided x-values, x-coordinates, and y-values.
 * @param {number[]} x - The x-values at which interpolation is to be performed.
 * @param {number[]} xp - The x-coordinates of the data points used for interpolation. Must be sorted in ascending order.
 * @param {number[]} yp - The y-values of the data points used for interpolation.
 * @returns {number[]} - An array of interpolated y-values corresponding to the x-values.
 * @throws {Error} - Throws an error if the lengths of `xp` and `yp` do not match, or if `x` is empty.
 */
const linearInterpolation = (x: number[], xp: number[], yp: number[]): number[] => {
    if (xp.length !== yp.length) {
        throw new Error("xp and yp lists must have the same length");
    }
    if (xp.length === 0) {
        // Add explicit check for empty xp/yp
        if (x.length > 0) {
            throw new Error(
                "Cannot interpolate with empty reference points (xp, yp) when x is not empty."
            );
        }
        return []; // If all inputs are empty, return empty
    }

    const y: number[] = [];

    for (const xi of x) {
        if (xi <= xp[0]) {
            y.push(yp[0]);
        } else if (xi >= xp[xp.length - 1]) {
            y.push(yp[yp.length - 1]);
        } else {
            let left = 0;
            let right = xp.length - 1;

            // Binary search to find the interval [xp[mid], xp[mid+1])
            while (left < right - 1) {
                // Changed condition to ensure an interval of at least 2 points
                const mid = Math.floor((left + right) / 2);
                if (xi < xp[mid]) {
                    right = mid;
                } else {
                    left = mid; // Stay at mid or move right
                }
            }
            // At this point, left and right will be adjacent indices such that xp[left] <= xi < xp[right]
            // or left === right-1

            const slope = (yp[right] - yp[left]) / (xp[right] - xp[left]);
            y.push(yp[left] + slope * (xi - xp[left]));
        }
    }

    return y;
};
