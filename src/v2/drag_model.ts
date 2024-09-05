// Import necessary modules and classes
import { Distance, unitTypeCoerce, Weight, Velocity, preferredUnits, } from './unit';
// @ts-ignore
import Table from './drag_tables.js'


export const cSpeedOfSoundMetric: number = 340.0

class DragDataPoint {
    constructor(public Mach: number, public CD: number) { }
}

type DragTableDataType = Array<{ Mach: number, CD: number } | DragDataPoint>;
type DragTable = DragDataPoint[]

class BCPoint {
    readonly BC: number
    readonly Mach: (number)
    readonly V: (Velocity | null)

    constructor(
        BC: number,
        Mach: (number | null),
        V: (number | Velocity | null)
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

    constructor(bc: number,
        dragTable: DragTableDataType,
        weight: (number | Weight) = 0,
        diameter: (number | Distance) = 0,
        length: (number | Distance) = 0
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
 * Calculate and return the sectional density.
 * @param {number} weight - Weight value.
 * @param {number} diameter - Diameter value.
 * @returns {number} - Calculated sectional density.
 */
function sectionalDensity(weight: number, diameter: number) {
    // Divide weight by the square of diameter and then by 7000
    return weight / Math.pow(diameter, 2) / 7000;
}


function DragModelMultiBC(
    bcPoints: BCPoint[],
    dragTable: DragTableDataType,
    weight: (number | Weight) = 0,
    diameter: (number | Distance) = 0,
    length: (number | Distance) = 0): DragModel {

    let bc
    const _weight = unitTypeCoerce(weight ?? 0, Weight, preferredUnits.weight);
    const _diameter = unitTypeCoerce(diameter ?? 0, Distance, preferredUnits.diameter);
    if ((_weight > 0) && (_diameter > 0)) {
        bc = sectionalDensity(_weight.In(Weight.Grain), _diameter.in(Distance.Inch))
    } else {
        bc = 1.0
    }

    const _dragTable = makeDataPoints(dragTable)
    bcPoints.sort((a, b) => a.BC - b.BC);
    const bcInterp = linearInterpolation(
        _dragTable.map((point) => point.Mach),
        bcPoints.map((point) => point.Mach),
        bcPoints.map((point) => point.BC / bc)
    )

    for (let i = 0; i < _dragTable.length; i++) {
        _dragTable[i].CD = _dragTable[i].CD / bcInterp[i];
    }

    return new DragModel(bc, _dragTable, weight, diameter, length);
}


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

export type { DragDataPoint, DragTable, BCPoint, DragModelMultiBC };
export default DragModel;
