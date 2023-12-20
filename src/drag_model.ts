// Import necessary modules and classes
import calcSettings from './settings';
import {Distance, Unit, unitTypeCoerce, Weight} from './unit';
// @ts-ignore
import DragTable from './drag_tables.js'


interface DragDataPoint {
    CD: number,
    Mach: number
}


// Define the DragModel class
class DragModel {
    /**
     * Constructor for DragModel class.
     * @param {number} value - Coefficient value for drag.
     * @param {DragDataPoint[]} dragTable - Custom drag table.
     * @param {number|Weight|Object} weight - Weight value or Weight instance.
     * @param {number|Distance|Object} diameter - Diameter value or Distance instance.
     */

    readonly value: number;
    readonly dragTable: DragDataPoint[];
    readonly weight: Weight;
    readonly diameter: Distance;

    protected sectionalDensity: number;
    protected formFactor: number;

    constructor(value: number,
                dragTable: DragDataPoint[],
                weight: (number|Weight),
                diameter: (number|Distance)) {
        // Get the length of the dragTable
        const tableLen = dragTable.length;
        // Initialize an error string
        let error = '';

        // Check if the table length is not greater than 0
        if (tableLen <= 0) {
            error = 'Custom drag table must be longer than 0';
        } else if (value <= 0) {
            // Check if the drag coefficient is not greater than zero
            error = 'Drag coefficient must be greater than zero';
        }

        // If there is an error, throw an Error with the error message
        if (error) {
            throw new Error(error);
        }

        // Check if the dragTable is in the DragTable enum
        if (Object.values(DragTable).includes(dragTable)) {
            this.value = value;
        } else if (tableLen > 0) {
            // Set a default value if the dragTable is not in the enum
            this.value = 1; // or 0.999
        } else {
            // Throw an error if the drag data is incorrect
            throw new Error('Wrong drag data');
        }

        // Coerce the weight to the appropriate unit using unitTypeCoerce
        this.weight = unitTypeCoerce(weight, Weight, calcSettings.Units.weight);
        // Coerce the diameter to the appropriate unit using unitTypeCoerce
        this.diameter = unitTypeCoerce(diameter, Distance, calcSettings.Units.diameter);
        // Calculate and set the sectional density
        this.sectionalDensity = this._getSectionalDensity();
        // Calculate and set the form factor
        this.formFactor = this._getFormFactor(this.value);
        // Assign the provided dragTable
        this.dragTable = dragTable;
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
        const w = this.weight.In(Unit.Grain);
        const d = this.diameter.In(Unit.Inch);
        // Call the sectionalDensity function to calculate and return the result
        return sectionalDensity(w, d);
    }

    /**
     * Create a DragModel instance from MultiBC (mbc) data.
     * @param {MultiBC} mbc - MultiBC data.
     * @returns {DragModel} - New DragModel instance.
     * @static
     */
    // @ts-ignore
    static fromMbc(mbc) {
        // Create a new DragModel instance with default values and mbc data
        return new DragModel(1, mbc.cdm, mbc.weight, mbc.diameter);
    }
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


export { DragDataPoint };
export default DragModel;
