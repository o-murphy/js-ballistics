// Import necessary modules and classes
import calcSettings from './settings';
import {Atmo} from './conditions';
import {Unit, UNew, unitTypeCoerce, Measure} from './unit';
import {makeDataPoints} from './drag_model';


class MultiBCRow {
    /**
     * Define the MultiBCRow class
     *
     * @param {number | Velocity} V
     * @param {number} BC
     */
    constructor(BC, V) {
        this.BC = BC;
        this.V = unitTypeCoerce(V, Measure.Velocity, calcSettings.Units.velocity);
    }
}

// Define the BCMachRow class
class BCMachRow {
    /**
     * Define the MultiBCRow class
     *
     * @param {number} BC
     * @param {number} Mach
     */
    constructor(BC, Mach) {
        this.BC = BC;
        this.Mach = Mach;
    }
}

// Define the MultiBC class
class MultiBC {
    /**
     * Creates instance to calculate custom drag table based on input multi-bc table
     *
     * @param {Object[]} dragTable
     * @param {number|Distance} diameter
     * @param {number|Weight} weight
     * @param {Object[]} mbcTable
     */
    constructor(dragTable, diameter, weight, mbcTable) {
        this.mbcTable = mbcTable;
        this.weight = unitTypeCoerce(weight, Measure.Weight, calcSettings.Units.weight);
        this.diameter = unitTypeCoerce(diameter, Measure.Distance, calcSettings.Units.diameter);
        this.sectionalDensity = this._getSectionalDensity();

        const atmosphere = Atmo.icao();
        const altitude = UNew.Meter(0).in(Unit.Foot);
        const {mach} = atmosphere.getDensityFactorAndMachForAltitude(altitude);
        this.speedOfSound = UNew.FPS(mach).in(Unit.MPS);

        this.tableData = makeDataPoints(dragTable);
        this.bcTable = this._parseMBC(mbcTable);
    }

    _parseMBC(mbcTable) {
        return mbcTable.map(p => {
            const v = UNew[calcSettings.Units.velocity](p.V).in(Unit.MPS);
            return new MultiBCRow(p.BC, v);
        }).sort((a, b) => b.BC - a.BC);
    }

    _getSectionalDensity() {
        const w = this.weight.in(Unit.Grain);
        const d = this.diameter.in(Unit.Inch);
        return w / Math.pow(d, 2) / 7000;
    }

    _getFormFactor(bc) {
        return this.sectionalDensity / bc;
    }

    static _getCountedCD(formFactor, standardCD) {
        return standardCD * formFactor;
    }

    _interpolateBCTable() {
        // Extends input bc table by creating bc value for each point of standard Drag Model
        const bcTable = [...this.bcTable];
        const bcMach = [new BCMachRow(bcTable[0].BC, this.tableData[this.tableData.length - 1].Mach)];
        bcMach.push(...bcTable.map(point => new BCMachRow(point.BC, point.V / this.speedOfSound)));
        bcMach.push(new BCMachRow(bcMach[bcMach.length - 1].BC, this.tableData[0].Mach));

        const result = [bcMach[0].BC];

        for (let i = 0; i < bcMach.length - 1; i++) {
            const bcMax = bcMach[i];
            const bcMin = bcMach[i + 1];
            const dfPart = this.tableData.filter(point => bcMax.Mach > point.Mach && point.Mach >= bcMin.Mach);
            const ddf = dfPart.length;
            const bcDelta = (bcMax.BC - bcMin.BC) / ddf;
            for (let j = 0; j < ddf; j++) {
                result.push(bcMax.BC - bcDelta * j);
            }
        }

        return result;
    }

    cdmGenerator() {
        const bcExtended = [...this._interpolateBCTable()].reverse();
        const formFactors = bcExtended.map(bc => this._getFormFactor(bc));

        return this.tableData.map((point, i) => {
            const cd = formFactors[i] * point.CD;
            return {CD: cd, Mach: point.Mach};
        });
    }

    get cdm() {  // FIXME
        return [...this.cdmGenerator()];
    }
}

export {MultiBC, MultiBCRow, BCMachRow};
