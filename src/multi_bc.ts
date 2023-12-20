// Import necessary modules and classes
import calcSettings from './settings';
import {Atmo} from './conditions';
import {Unit, UNew, unitTypeCoerce, Distance, Weight, Velocity} from './unit';
import { DragDataPoint } from "./drag_model";


interface MbcTable {
    BC: number;
    V: (number | Velocity);
}


// Define the MultiBC class
class MultiBC {
    /**
     * Creates instance to calculate custom drag table based on input multi-bc table
     *
     * @param {DragDataPoint[]} dragTable
     * @param {number|Distance|Object} diameter
     * @param {number|Weight|Object} weight
     * @param {{BC: number, V: number|Velocity|Object}[]} mbcTable
     */

    readonly tableData: DragDataPoint[];
    readonly diameter: Distance;
    readonly weight: Weight;
    readonly bcTable: MbcTable[];
    readonly sectionalDensity: number;
    readonly speedOfSound: number;

    constructor(
        dragTable: DragDataPoint[],
        diameter: (number | Distance),
        weight: (number | Weight),
        mbcTable: MbcTable[]
    ) {
        // this.mbcTable = mbcTable;
        this.weight = unitTypeCoerce(weight, Weight, calcSettings.Units.weight);
        this.diameter = unitTypeCoerce(diameter, Distance, calcSettings.Units.diameter);
        this.sectionalDensity = this._getSectionalDensity();

        const atmosphere = Atmo.icao();
        const altitude = UNew.Meter(0).In(Unit.Foot);
        const {mach} = atmosphere.getDensityFactorAndMachForAltitude(altitude);
        this.speedOfSound = UNew.FPS(mach).In(Unit.MPS);

        // this.tableData = dragTable.map(p => new DragDataPoint(p.CD, p.Mach));
        this.tableData = dragTable;
        this.bcTable = mbcTable.sort((a, b) => b.BC - a.BC);
    }

    _getSectionalDensity(): number {
        const w = this.weight.In(Unit.Grain);
        const d = this.diameter.In(Unit.Inch);
        return w / Math.pow(d, 2) / 7000;
    }

    _getFormFactor(bc: number): number {
        return this.sectionalDensity / bc;
    }

    static _getCountedCD(formFactor: number, standardCD: number): number {
        return standardCD * formFactor;
    }

    _interpolateBCTable(): number[] {
        // Extends input bc table by creating bc value for each point of standard Drag Model
        const bcTable = [...this.bcTable];
        const bcMach = [
            {
                BC: bcTable[0].BC,
                Mach: this.tableData[this.tableData.length - 1].Mach
            },
        ];
        bcMach.push(...bcTable.map(point => {
                return {
                    BC: point.BC,
                    Mach: unitTypeCoerce(point.V, Velocity, calcSettings.Units.velocity)
                        .In(Unit.MPS) / this.speedOfSound
                }
            }
        ));
        bcMach.push(
            {
                BC: bcMach[bcMach.length - 1].BC,
                Mach: this.tableData[0].Mach
            }
        );

        let result = [bcMach[0].BC];

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

    cdmGenerator(): DragDataPoint[] {
        const bcExtended = this._interpolateBCTable().reverse();
        const formFactors = bcExtended.map(bc => this._getFormFactor(bc));

        return this.tableData.map((point: DragDataPoint, i: number) => {
            const cd = formFactors[i] * point.CD;
            return {CD: cd, Mach: point.Mach};
        });
    }

    get cdm() {
        return [...this.cdmGenerator()];
    }
}

export {MultiBC};
