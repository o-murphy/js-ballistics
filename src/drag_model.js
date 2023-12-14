// Import necessary modules and classes
import calcSettings from './settings';
import { Weight, Distance, unitTypeCoerce } from './unit.js';
import DragTable from "./drag_tables.json";

// Define the DragDataPoint class
class DragDataPoint {
    /**
     * Constructor for DragDataPoint class.
     * @param {number} CD - Drag coefficient value.
     * @param {number} Mach - Mach number value.
     */
    constructor(CD, Mach) {
        // Assign the provided CD value to the CD property
        this.CD = CD;
        // Assign the provided Mach value to the Mach property
        this.Mach = Mach;
    }

    /**
     * Returns a string representation of the DragDataPoint instance.
     * @returns {string} - String representation of the instance.
     */
    toString() {
        return `DragDataPoint(CD=${this.CD}, Mach=${this.Mach})`;
    }
}

// Define the DragModel class
class DragModel {
    /**
     * Constructor for DragModel class.
     * @param {number} value - Coefficient value for drag.
     * @param {Array} dragTable - Custom drag table.
     * @param {number|Weight} weight - Weight value or Weight instance.
     * @param {number|Distance} diameter - Diameter value or Distance instance.
     */
    constructor(value, dragTable, weight, diameter) {
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
    _getFormFactor(bc) {
        // Divide sectional density by drag coefficient
        return this.sectionalDensity / bc;
    }

    /**
     * Calculate and return the sectional density.
     * @returns {number} - Calculated sectional density.
     * @private
     */
    _getSectionalDensity() {
        // Get weight in grains and diameter in inches
        const w = this.weight.in(Weight.Grain);
        const d = this.diameter.in(Distance.Inch);
        // Call the sectionalDensity function to calculate and return the result
        return sectionalDensity(w, d);
    }

    /**
     * Create a DragModel instance from MultiBC (mbc) data.
     * @param {Object} mbc - MultiBC data.
     * @returns {DragModel} - New DragModel instance.
     * @static
     */
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
function sectionalDensity(weight, diameter) {
    // Divide weight by the square of diameter and then by 7000
    return weight / Math.pow(diameter, 2) / 7000;
}

/**
 * Create an array of DragDataPoint instances from the provided drag table.
 * @param {Array} dragTable - Drag table data.
 * @returns {DragDataPoint[]} - Array of DragDataPoint instances.
 */
function makeDataPoints(dragTable) {
    // Map each point in the drag table to a new DragDataPoint instance
    return dragTable.map(point => new DragDataPoint(point.CD, point.Mach));
}


export { DragDataPoint, DragModel, makeDataPoints };
