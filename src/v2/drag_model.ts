// Import necessary modules and classes
import { Distance, unitTypeCoerce, Weight, Velocity, preferredUnits, } from './unit';
// @ts-ignore
import Table from './drag_tables.js'


export const cSpeedOfSoundMetric: number = 340.0

/**
 * Represents a data point for drag calculation.
 */
class DragDataPoint {
    /**
     * @param {number} Mach - Mach number at the data point.
     * @param {number} CD - Drag coefficient at the data point.
     */
    constructor(public Mach: number, public CD: number) { }
}

/**
 * Type alias for drag table data.
 * Can be an array of objects with Mach and CD properties or DragDataPoint instances.
 */
type DragTableDataType = Array<{ Mach: number, CD: number } | DragDataPoint>;

/**
 * Type alias for an array of DragDataPoint instances.
 */
type DragTable = DragDataPoint[]

/**
 * Represents a ballistic coefficient point.
 */
class BCPoint {
    readonly BC: number
    readonly Mach: (number)
    readonly V: (Velocity | null)

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
        V = null
    }: {
        BC: number,
        Mach?: (number | null),
        V?: (number | Velocity | null)
    }
    ) {
        if (BC <= 0) {
            throw new Error("Ballistic coefficient must be positive")
        }

        if (Mach && V) {
            throw new Error("You cannot specify both 'Mach' and 'V' at the same time")
        }

        if (!Mach && !V) {
            throw new Error("One of 'Mach' and 'V' must be specified")
        }

        this.BC = BC
        this.V = V ? unitTypeCoerce(V, Velocity, preferredUnits.velocity) : null
        this.Mach = this.V ? this.V.In(Velocity.MPS) / cSpeedOfSoundMetric : (Mach ? Mach : 0)
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
        length = 0
    }: {
        bc: number,
        dragTable: DragTableDataType,
        weight?: (number | Weight),
        diameter?: (number | Distance),
        length?: (number | Distance)
    }
    ) {
        // Get the length of the dragTable
        const tableLen = dragTable.length;

        // Check if the table length is not greater than 0
        if (tableLen <= 0) {
            throw new Error('Received empty drag table');
        } else if (bc <= 0) {
            // Check if the drag coefficient is not greater than zero
            throw new Error('Ballistic coefficient must be positive');
        }

        this.dragTable = makeDataPoints(dragTable)

        this.bc = bc
        this.weight = unitTypeCoerce(weight ?? 0, Weight, preferredUnits.weight);
        this.diameter = unitTypeCoerce(diameter ?? 0, Distance, preferredUnits.diameter);
        this.length = unitTypeCoerce(length ?? 0, Distance, preferredUnits.length);
        // Calculate and set the sectional density and form factor
        if (weight && diameter) {
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
        const w = this.weight.In(Weight.Grain);
        const d = this.diameter.In(Distance.Inch);
        // Call the sectionalDensity function to calculate and return the result
        return sectionalDensity(w, d);
    }
}

/**
 * Converts a drag table into an array of `DragDataPoint` objects.
 * @param {DragTableDataType} dragTable - The input drag table data, which can be a mix of `DragDataPoint` instances and objects with `Mach` and `CD` properties.
 * @returns {DragDataPoint[]} - An array of `DragDataPoint` objects.
 * @throws {TypeError} - If any item in the drag table is not a `DragDataPoint` or an object with `Mach` and `CD` properties.
 */
function makeDataPoints(dragTable: DragTableDataType): DragDataPoint[] {
    return dragTable.map(point => {
        if (point instanceof DragDataPoint) {
            return point; // If already a DragDataPoint, return it
        } else if ('Mach' in point && 'CD' in point) {
            // If it's a dictionary with 'Mach' and 'CD', create a new DragDataPoint
            return new DragDataPoint(point.Mach, point.CD);
        } else {
            throw new TypeError("All items in dragTable must be of type DragDataPoint or an object with 'Mach' and 'CD' keys.");
        }
    });
}

/**
 * Calculates and returns the sectional density.
 * @param {number} weight - The weight value (in grains).
 * @param {number} diameter - The diameter value (in inches).
 * @returns {number} - The calculated sectional density (in lb/in²).
 */
function sectionalDensity(weight: number, diameter: number) {
    // Divide weight by the square of diameter and then by 7000
    return weight / Math.pow(diameter, 2) / 7000;
}

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
function DragModelMultiBC({
    bcPoints,
    dragTable,
    weight = 0,
    diameter = 0,
    length = 0
}: {
    bcPoints: BCPoint[];
    dragTable: DragTableDataType;
    weight?: (number | Weight);
    diameter?: (number | Distance);
    length?: (number | Distance)
}): DragModel {

    let bc
    const _weight = unitTypeCoerce(weight ?? 0, Weight, preferredUnits.weight);
    const _diameter = unitTypeCoerce(diameter ?? 0, Distance, preferredUnits.diameter);
    if (_weight.rawValue > 0 && _diameter.rawValue > 0) {
        bc = sectionalDensity(_weight.In(Weight.Grain), _diameter.In(Distance.Inch))
    } else {
        bc = 1.0
    }

    const _dragTable = makeDataPoints(dragTable)
    bcPoints.sort((a, b) => a.Mach - b.Mach);
    const bcInterp = linearInterpolation(
        _dragTable.map((point) => point.Mach),
        bcPoints.map((point) => point.Mach),
        bcPoints.map((point) => point.BC / bc)
    )

    _dragTable.forEach((item, index) => {
        item.CD = item.CD / bcInterp[index];
    });

    return new DragModel({ bc: bc, dragTable: _dragTable, weight: _weight, diameter: _diameter, length: length });
}

/**
 * Performs linear interpolation based on the provided x-values, x-coordinates, and y-values.
 * @param {number[]} x - The x-values at which interpolation is to be performed.
 * @param {number[]} xp - The x-coordinates of the data points used for interpolation.
 * @param {number[]} yp - The y-values of the data points used for interpolation.
 * @returns {number[]} - An array of interpolated y-values corresponding to the x-values.
 * @throws {Error} - Throws an error if the lengths of `xp` and `yp` do not match, or if `x` is empty.
 */
function linearInterpolation(
    x: number[],
    xp: number[],
    yp: number[]
): number[] {
    if (xp.length !== yp.length) {
        throw new Error("xp and yp lists must have the same length");
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

            while (left < right) {
                const mid = Math.floor((left + right) / 2);

                if (xp[mid] <= xi && xi < xp[mid + 1]) {
                    const slope = (yp[mid + 1] - yp[mid]) / (xp[mid + 1] - xp[mid]);
                    y.push(yp[mid] + slope * (xi - xp[mid]));
                    break;
                }

                if (xi < xp[mid]) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }

            if (left === right) {
                y.push(yp[left]);
            }
        }
    }

    return y;
}

export type { Table, DragTable, DragTableDataType };
export { DragDataPoint, BCPoint, DragModelMultiBC }
export default DragModel;
