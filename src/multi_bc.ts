// Import necessary modules and classes
import calcSettings from './settings';
import {Atmo} from './conditions';
import {Unit, UNew, unitTypeCoerce, Distance, Weight, Velocity} from './unit';
import type {DragDataPoint, DragTable} from "./drag_model";


type MbcPoint = {
    BC: number;
    V: (number | Velocity);
}


type BcMachPoint = {
    BC: number;
    Mach: number;
}

type MbcTable = MbcPoint[]
type MbcMachTable = BcMachPoint[]

// Define the MultiBC class
class MultiBC {
    /**
     * Creates instance to calculate custom drag table based on input multi-bc table
     *
     * @param {DragTable} dragTable
     * @param {number|Distance|Object} diameter
     * @param {number|Weight|Object} weight
     * @param {{BC: number, V: number|Velocity|Object}[]} mbcTable
     */

    readonly tableData: DragTable;
    readonly diameter: Distance;
    readonly weight: Weight;
    readonly bcTable: MbcTable;
    readonly sectionalDensity: number;
    readonly speedOfSound: number;

    constructor(
        dragTable: DragTable,
        diameter: (number | Distance),
        weight: (number | Weight),
        mbcTable: MbcTable
    ) {
        // this.mbcTable = mbcTable;
        this.weight = unitTypeCoerce(weight, Weight, calcSettings.Units.weight);
        this.diameter = unitTypeCoerce(diameter, Distance, calcSettings.Units.diameter);
        this.sectionalDensity = this._getSectionalDensity();

        const atmosphere: Atmo = Atmo.icao();
        const altitude: number = UNew.Meter(0).In(Unit.Foot);
        const mach: number = atmosphere.getDensityFactorAndMachForAltitude(altitude)[1];
        this.speedOfSound = UNew.FPS(mach).In(Unit.MPS);

        this.tableData = dragTable;
        this.bcTable = mbcTable.sort((a: MbcPoint, b: MbcPoint) => b.BC - a.BC);
    }

    _getSectionalDensity(): number {
        const w: number = this.weight.In(Unit.Grain);
        const d: number = this.diameter.In(Unit.Inch);
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
        const bcTable: MbcTable = [...this.bcTable];
        const bcMach: MbcMachTable = [
            {
                BC: bcTable[0].BC,
                Mach: this.tableData[this.tableData.length - 1].Mach
            },
        ];
        bcMach.push(...bcTable.map((point: MbcPoint): BcMachPoint => {
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

        let result: number[] = [bcMach[0].BC];

        for (let i: number = 0; i < bcMach.length - 1; i++) {
            const bcMax: BcMachPoint = bcMach[i];
            const bcMin: BcMachPoint = bcMach[i + 1];
            const dfPart: DragTable = this.tableData.filter(
                (point: DragDataPoint) => ((bcMax.Mach > point.Mach) && (point.Mach >= bcMin.Mach))
            );
            const ddf: number = dfPart.length;
            const bcDelta: number = (bcMax.BC - bcMin.BC) / ddf;
            for (let j: number = 0; j < ddf; j++) {
                result.push(bcMax.BC - bcDelta * j);
            }
        }

        return result;
    }

    cdmGenerator(): DragTable {
        const bcExtended: number[] = this._interpolateBCTable().reverse();
        const formFactors: number[] = bcExtended.map((bc: number) => this._getFormFactor(bc));

        return this.tableData.map((point: DragDataPoint, i: number): DragDataPoint => {
            const cd: number = formFactors[i] * point.CD;
            return {CD: cd, Mach: point.Mach};
        });
    }

    get cdm(): DragTable {
        return [...this.cdmGenerator()];
    }
}

export default MultiBC;
