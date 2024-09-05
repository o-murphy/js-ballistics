// Conditions module
import { Atmo, Shot, Wind } from './conditions';
// Munition module
import { Ammo, Weapon } from './munition';
// TrajectoryData module
import { TrajectoryData, TrajFlag } from './trajectory_data';
// Unit module
import { Angular, Distance, UNew, Weight, Temperature, unitTypeCoerce, preferredUnits } from './unit';
// Vector module
import Vector from "./vector";
import type { DragTable } from "./drag_model";
import { Pressure, Velocity } from './unit';


// Constants
const cZeroFindingAccuracy: number = 0.000005;
const cMinimumVelocity: number = 50.0;
const cMaximumDrop: number = -15000;
const cMaxIterations: number = 20;
const cGravityConstant: number = -32.17405;

let _globalUsePowderSensitivity = false;
let _globalMaxCalcStepSize: Distance = UNew.Foot(0.5);

function getGlobalMaxCalcStepSize(): Distance {
    return _globalMaxCalcStepSize;
}

function getGlobalUsePowderSensitivity(): boolean {
    return _globalUsePowderSensitivity;
}

function resetGlobals(): void {
    _globalUsePowderSensitivity = false;
    _globalMaxCalcStepSize = UNew.Foot(0.5);
}

function setGlobalMaxCalcStepSize(value: number | Distance): void {
    const convertedValue = unitTypeCoerce(value, Distance, preferredUnits.distance);
    if (convertedValue.rawValue <= 0) {
        throw new Error("_globalMaxCalcStepSize has to be > 0");
    }
    _globalMaxCalcStepSize = convertedValue;
}

function setGlobalUsePowderSensitivity(value: boolean): void {
    if (typeof value !== "boolean") {
        throw new TypeError(`setGlobalUsePowderSensitivity ${value} is not a boolean`);
    }
    _globalUsePowderSensitivity = value;
}


class CurvePoint {
    constructor(
        public a: number,
        public b: number,
        public c: number
    ) {
    }
}


type Curve = CurvePoint[]


interface TrajectoryIntf {
    lookAngle: number,
    twist: number,
    length: number,
    diameter: number,
    weight: number,
    barrelElevation: number,
    barrelAzimuth: number,
    sightHeight: number,
    cantCosine: number,
    cantSine: number,
    alt0: number,
    calcStep: number,
    muzzleVelocity: number
    stabilityCoefficient: number
}


class TrajectoryCalc {

    readonly ammo: Ammo
    readonly barrel_azimuth: number;
    readonly barrel_elevation: number;
    readonly twist: number;

    protected _bc: number;
    protected _tableData: DragTable;
    protected _curve: Curve;
    protected _gravityVector: Vector
    protected _trajectory_intf: TrajectoryIntf

    constructor(ammo: Ammo) {
        this.ammo = ammo;
        this._bc = ammo.dm.bc;
        this._tableData = this.ammo.dm.dragTable;
        this._curve = calculateCurve(this._tableData);
        this._gravityVector = new Vector(.0, cGravityConstant, .0)
    }

    get tableData(): DragTable {
        return this._tableData
    }

    /**
     * Keep step under max_calc_step_size
     * @param step - proposed step size
     * @returns step size for calculations (in feet)
     */
    public static getCalcStep(step: number = 0): number {
        const preferredStep = _globalMaxCalcStepSize.In(Distance.Foot);

        if (step === 0) {
            return preferredStep / 2.0;
        }
        return Math.min(step, preferredStep) / 2.0;
    }

    trajectory(shotInfo: Shot, maxRange: Distance, distStep: Distance, extraData: boolean = false): TrajectoryData[] {
        let _distStep: Distance = unitTypeCoerce(distStep, Distance, preferredUnits.distance);
        let filterFlags = TrajFlag.RANGE

        if (extraData) {
            _distStep = UNew.Foot(0.2)
            filterFlags = TrajFlag.ALL
        }

        this._initTrajectory(shotInfo)

        return this._trajectory(shotInfo, maxRange.In(Distance.Foot), distStep.In(Distance.Foot), filterFlags);
    }

    zeroAngle(shotInfo: Shot, distance: Distance) {
        this._initTrajectory(shotInfo)

        let zeroDistance = Math.cos(this._trajectory_intf.lookAngle) * distance.In(Distance.Foot)
        let heightAtZero = Math.sin(this._trajectory_intf.lookAngle) * distance.In(Distance.Foot)
        let maximumRange = zeroDistance - 1.5 * this._trajectory_intf.calcStep

        let iterationsCount = 0
        let zeroFindingError = cZeroFindingAccuracy * 2

        while (zeroFindingError > cZeroFindingAccuracy && iterationsCount < cMaxIterations) {
            let t = this._trajectory(shotInfo, maximumRange, zeroDistance, TrajFlag.NONE)[0]
            let height = t.height.In(Distance.Foot)
            let zeroFindingError = Math.abs(height - heightAtZero)
            if (zeroFindingError > cZeroFindingAccuracy) {
                this._trajectory_intf.barrelElevation -= (height - heightAtZero) / zeroDistance
            } else {
                break
            }
            iterationsCount += 1
        }

        if (zeroFindingError > cZeroFindingAccuracy) {
            throw new Error(`Zero vertical error ${zeroFindingError} feet, after ${iterationsCount} iterations.`)
        }

        return UNew.Radian(this._trajectory_intf.barrelElevation)
    }

    _initTrajectory(shotInfo: Shot) {
        this._trajectory_intf = {
            lookAngle: shotInfo.lookAngle.In(Angular.Radian),
            twist: shotInfo.weapon.twist.In(Distance.Inch),
            length: shotInfo.ammo.dm.length.In(Distance.Inch),
            diameter: shotInfo.ammo.dm.diameter.In(Distance.Inch),
            weight: shotInfo.ammo.dm.weight.In(Weight.Grain),
            barrelElevation: shotInfo.barrelElevation.In(Angular.Radian),
            barrelAzimuth: shotInfo.barrelAzimuth.In(Angular.Radian),
            sightHeight: shotInfo.weapon.sightHeight.In(Distance.Foot),
            cantCosine: Math.cos(shotInfo.cantAngle.In(Angular.Radian)),
            cantSine: Math.sin(shotInfo.cantAngle.In(Angular.Radian)),
            alt0: shotInfo.atmo.altitude.In(Distance.Foot),
            calcStep: TrajectoryCalc.getCalcStep(),
            muzzleVelocity: (_globalUsePowderSensitivity ?
                shotInfo.ammo.getVelocityForTemp(shotInfo.atmo.temperature.In(Velocity.FPS)) :
                shotInfo.ammo.mv).In(Velocity.FPS),
            stabilityCoefficient: this.calcStabilityCoefficient(shotInfo.atmo)
        }
    }

    /**
     * Drag force based on Mach number
     * @param mach - Mach number
     * @returns Drag coefficient at the given mach number
     */
    public dragByMach(mach: number): number {
        const cd = calculateByCurve(this._tableData, this._curve, mach); // Assuming `calculateByCurve` exists
        return cd * 2.08551e-04 / this._bc;
    }

    /**
     * Spin drift calculation based on time of flight
     * @param time - Time of flight
     * @returns Windage due to spin drift, in feet
     */
    public spinDrift(time: number): number {
        if (this.twist !== 0) {
            const sign = this.twist > 0 ? 1 : -1;
            return sign * (1.25 * (this._trajectory_intf.stabilityCoefficient + 1.2) * Math.pow(time, 1.83)) / 12;
        }
        return 0;
    }

    /**
     * Miller stability coefficient calculation
     * @param atmo - Atmospheric conditions object (Atmo)
     * @returns Stability coefficient
     */
    public calcStabilityCoefficient(atmo: Atmo): number {
        if (this.twist && this._trajectory_intf.length && this._trajectory_intf.diameter) {
            const twistRate = Math.abs(this.twist) / this._trajectory_intf.diameter;
            const lengthRatio = this._trajectory_intf.length / this._trajectory_intf.diameter;

            // Miller stability formula
            const sd = 30 * this._trajectory_intf.weight / (
                Math.pow(twistRate, 2) * Math.pow(this._trajectory_intf.diameter, 3) * lengthRatio * (1 + Math.pow(lengthRatio, 2))
            );

            // Velocity correction factor
            const fv = Math.pow(this._trajectory_intf.muzzleVelocity / 2800, 1.0 / 3.0);

            // Atmospheric correction
            const ft = atmo.temperature.In(Temperature.Fahrenheit); // Assuming a method to convert to Fahrenheit
            const pt = atmo.pressure.In(Pressure.InHg); // Assuming a method to convert to InHg
            const ftp = ((ft + 460) / (59 + 460)) * (29.92 / pt);

            return sd * fv * ftp;
        }
        return 0;
    }

}


/**
 * @param {DragTable} dataPoints
 * @return {Curve}
 */
function calculateCurve(dataPoints: DragTable): Curve {
    let rate: number =
        (dataPoints[1].CD - dataPoints[0].CD) / (dataPoints[1].Mach - dataPoints[0].Mach);
    let curve: Curve = [
        new CurvePoint(0, rate, dataPoints[0].CD - dataPoints[0].Mach * rate),
    ];
    const lenDataPoints: number = dataPoints.length;
    const lenDataRange: number = lenDataPoints - 1;

    let x1, x2, x3, y1, y2, y3, a, b, c: number;

    for (let i: number = 1; i < lenDataRange; i++) {
        x1 = dataPoints[i - 1].Mach;
        x2 = dataPoints[i].Mach;
        x3 = dataPoints[i + 1].Mach;
        y1 = dataPoints[i - 1].CD;
        y2 = dataPoints[i].CD;
        y3 = dataPoints[i + 1].CD;
        a =
            ((y3 - y1) * (x2 - x1) - (y2 - y1) * (x3 - x1)) /
            ((x3 * x3 - x1 * x1) * (x2 - x1) - (x2 * x2 - x1 * x1) * (x3 - x1));
        b = (y2 - y1 - a * (x2 * x2 - x1 * x1)) / (x2 - x1);
        c = y1 - (a * x1 * x1 + b * x1);
        curve.push(new CurvePoint(a, b, c));
    }

    let numPoints: number = lenDataPoints;
    rate =
        (dataPoints[numPoints - 1].CD - dataPoints[numPoints - 2].CD) /
        (dataPoints[numPoints - 1].CD - dataPoints[numPoints - 2].Mach);
    curve.push(
        new CurvePoint(
            0,
            rate,
            dataPoints[numPoints - 1].CD - dataPoints[numPoints - 2].Mach * rate
        )
    );
    return curve;
}

/**
 * @param {DragTable} data
 * @param {Curve} curve
 * @param {number} mach
 * @return {number}
 */
function calculateByCurve(data: DragTable, curve: CurvePoint[], mach: number): number {
    let m: number = 0;
    let mid: number = 0;
    let mlo: number = 0;
    let mhi: number = curve.length - 2;

    while (mhi - mlo > 1) {
        mid = Math.round((mhi + mlo) / 2.0);
        if (data[mid].Mach < mach) {
            mlo = mid;
        } else {
            mhi = mid;
        }

        if (data[mhi].Mach - mach > mach - data[mlo].Mach) {
            m = mlo;
        } else {
            m = mhi;
        }
    }
    const curveM: CurvePoint = curve[m];
    return curveM.c + mach * (curveM.b + curveM.a * mach);
}


// Export the classes and constants
export default TrajectoryCalc;
