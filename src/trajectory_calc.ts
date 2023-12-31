// Conditions module
import {Atmo, Shot, Wind} from './conditions';
// Munition module
import {Ammo, Weapon} from './munition';
// Settings module
import calcSettings from './settings';
// TrajectoryData module
import {TrajectoryData, TrajFlag} from './trajectory_data';
// Unit module
import {Angular, Distance, UNew, Unit, unitTypeCoerce} from './unit';
// VectorJs module
import Vector from "./vector";
import type {DragTable} from "./drag_model";


// Constants
const cZeroFindingAccuracy: number = 0.000005;
const cMinimumVelocity: number = 50.0;
const cMaximumDrop: number = -15000;
const cMaxIterations: number = 20;
const cGravityConstant: number = -32.17405;


class CurvePoint {
    constructor(
        public a: number,
        public b: number,
        public c: number
    ) {
    }
}


type Curve = CurvePoint[]


class TrajectoryCalc {

    readonly ammo: Ammo;
    protected _bc: number;
    protected _tableData: DragTable;
    protected _curve: Curve;

    constructor(ammo: Ammo) {
        this.ammo = ammo;
        this._bc = ammo.dm.value;
        this._tableData = this.ammo.dm.dragTable;
        this._curve = calculateCurve(this._tableData);
    }

    getCalcStep(step: number): number {
        let maximumStep = calcSettings.maxCalcStepSize.In(Unit.Foot);
        step /= 2;

        if (step > maximumStep) {
            const stepOrder: number = Math.round(Math.log10(step));
            const maximumOrder: number = Math.round(Math.log10(maximumStep));
            step /= Math.pow(10, stepOrder - maximumOrder + 1);
        }

        return step;
    }

    /**
     *
     * @param {Weapon} weapon
     * @param {Atmo} atmo
     * @return {Angular}
     * @public
     */
    zeroAngle(weapon: Weapon, atmo: Atmo): Angular {
        return this._zeroAngle(this.ammo, weapon, atmo);
    }

    /**
     *
     * @param {Weapon} weapon
     * @param {Shot} shotInfo
     * @param {number|Distance} step
     * @param {boolean} extraData
     * @return {TrajectoryData[]}
     */
    trajectory(weapon: Weapon, shotInfo: Shot,
               step: (number | Distance), extraData: boolean = false): TrajectoryData[] {
        let distStep: Distance = unitTypeCoerce(step, Distance, calcSettings.Units.distance);
        const atmo: Atmo = shotInfo.atmo;
        const winds: Wind[] = shotInfo.winds;
        let filterFlags: TrajFlag = TrajFlag.RANGE;

        if (extraData) {
            distStep = UNew.Foot(0.2);
            filterFlags = TrajFlag.ALL;
        }

        return this._trajectory(this.ammo, weapon, atmo, shotInfo, winds, distStep, filterFlags);
    }

    /**
     *
     * @param {Ammo} ammo
     * @param {Weapon} weapon
     * @param {Atmo} atmo
     * @return {Angular|Object}
     * @private
     */
    _zeroAngle(ammo: Ammo, weapon: Weapon, atmo: Atmo): Angular {
        const calcStep: number = this.getCalcStep(weapon.zeroDistance.In(Unit.Foot));
        const zeroDistance: number = Math.cos(
            weapon.zeroLookAngle.In(Unit.Radian)
        ) * weapon.zeroDistance.In(Unit.Foot);
        const heightAtZero: number = Math.sin(
            weapon.zeroLookAngle.In(Unit.Radian)
        ) * weapon.zeroDistance.In(Unit.Foot);
        const maximumRange: number = zeroDistance + calcStep;
        const sightHeight: number = weapon.sightHeight.In(Unit.Foot);
        const mach: number = atmo.mach.In(Unit.FPS);
        const densityFactor: number = atmo.densityFactor();
        const muzzleVelocity: number = ammo.mv.In(Unit.FPS);
        const barrelAzimuth: number = 0.0;
        let barrelElevation: number = Math.atan(heightAtZero / zeroDistance);
        let iterationsCount: number = 0;
        let zeroFindingError: number = cZeroFindingAccuracy * 2;
        const gravityVector: Vector = new Vector(0.0, cGravityConstant, 0.0);

        while (
            zeroFindingError > cZeroFindingAccuracy &&
            iterationsCount < cMaxIterations
            ) {
            let velocity: number = muzzleVelocity;
            let time: number = 0.0;
            let rangeVector: Vector = new Vector(0.0, -sightHeight, 0.0);
            let velocityVector: Vector = new Vector(
                Math.cos(barrelElevation) * Math.cos(barrelAzimuth),
                Math.sin(barrelElevation),
                Math.cos(barrelElevation) * Math.sin(barrelAzimuth)
            ).mulByConst(velocity);

            while (rangeVector.x <= maximumRange) {
                if (velocity < cMinimumVelocity || rangeVector.y < cMaximumDrop) break;

                let deltaTime: number = calcStep / velocityVector.x;

                let drag: number = densityFactor * velocity * this.dragByMach(velocity / mach);

                velocityVector = velocityVector.subtract(
                    velocityVector.mulByConst(drag).subtract(gravityVector).mulByConst(deltaTime)
                );

                let deltaRangeVector: Vector = new Vector(
                    calcStep,
                    velocityVector.y * deltaTime,
                    velocityVector.z * deltaTime
                );

                rangeVector = rangeVector.add(deltaRangeVector);
                velocity = velocityVector.magnitude();
                time += deltaRangeVector.magnitude() / velocity;

                if (Math.abs(rangeVector.x - zeroDistance) < 0.5 * calcStep) {
                    zeroFindingError = Math.abs(rangeVector.y - heightAtZero);
                    if (zeroFindingError > cZeroFindingAccuracy) {
                        barrelElevation -= (rangeVector.y - heightAtZero) / rangeVector.x;
                    }
                    break;
                }
            }

            iterationsCount += 1;
        }

        return UNew.Radian(barrelElevation);
    }


    /**
     *
     * @param {Ammo} ammo
     * @param {Weapon} weapon
     * @param {Atmo} atmo
     * @param {Shot} shotInfo
     * @param {Wind[]} winds
     * @param {Distance|Object} distStep
     * @param {TrajFlag} filterFlags
     * @return {TrajectoryData[]}
     */
    _trajectory(ammo: Ammo, weapon: Weapon, atmo: Atmo, shotInfo: Shot,
                winds: Wind[], distStep: Distance, filterFlags: TrajFlag): TrajectoryData[] {
        let time: number = 0;
        const lookAngle: number = weapon.zeroLookAngle.In(Unit.Radian);
        const twist: number = weapon.twist.In(Unit.Inch);
        const length: number = ammo.length.In(Unit.Inch);
        const diameter: number = ammo.dm.diameter.In(Unit.Inch);
        const weight: number = ammo.dm.weight.In(Unit.Grain);

        // step = shotInfo.step >> Distance.Foot
        const step: number = distStep.In(Unit.Foot);
        const calcStep: number = this.getCalcStep(step);

        const maximumRange: number = shotInfo.maxRange.In(Unit.Foot) + 1;

        // const rangesLength = Math.floor(maximumRange / step);
        const rangesLength: number = Math.round(maximumRange / step) + 1;
        const lenWinds: number = winds.length;
        let currentWind: number = 0;
        let currentItem: number = 0;

        let stabilityCoefficient: number = 1.0;
        let nextWindRange: number = 1e7;

        const barrelElevation: number =
            shotInfo.zeroAngle.In(Unit.Radian) +
            shotInfo.relativeAngle.In(Unit.Radian);
        const alt0: number = atmo.altitude.In(Unit.Foot);
        const sightHeight: number = weapon.sightHeight.In(Unit.Foot);

        const barrelAzimuth: number = 0.0;
        let nextRangeDistance: number = 0.0;
        let previousMach: number = 0.0;

        const gravityVector: Vector = new Vector(0.0, cGravityConstant, 0.0);
        let rangeVector: Vector = new Vector(0.0, -sightHeight, 0.0);

        const ranges: TrajectoryData[] = [];

        let velocityVector: Vector;
        let windVector: Vector = new Vector(.0, .0, .0);
        let deltaRangeVector: Vector;
        let velocity: number;
        let twistCoefficient: number = 0.0;

        let _flag: TrajFlag = TrajFlag.NONE;
        let seenZero: TrajFlag = TrajFlag.NONE;
        let mach: number = 0.0;
        let referenceHeight,
            windage,
            velocityAdjusted,
            deltaTime,
            drag,
            densityFactor: number;

        const getInitialWind = (): void => {
            if (lenWinds < 1) {
                windVector = new Vector(0.0, 0.0, 0.0);
            } else {
                if (lenWinds > 1) {
                    nextWindRange = winds[0].untilDistance.In(Unit.Foot);
                }
                windVector = windToVector(shotInfo, winds[0]);
            }
        }

        const accurate_velocity_to_temperature = (): number => {
            if (calcSettings.USE_POWDER_SENSITIVITY && ammo.tempModifier) {
                return ammo.getVelocityForTemp(atmo.temperature).In(Unit.FPS);
            } else {
                return ammo.mv.In(Unit.FPS);
            }
        }

        const get_initial_velocity_vector = (): Vector => {
            // x - distance towards target, y - drop, and z - windage
            return  new Vector(
                Math.cos(barrelElevation) * Math.cos(barrelAzimuth),
                Math.sin(barrelElevation),
                Math.cos(barrelElevation) * Math.sin(barrelAzimuth)
            ).mulByConst(velocity);
        }

        const accurateToTwist = (): void => {
            if ((twist !== 0) && length && diameter) {
                stabilityCoefficient = calculateStabilityCoefficient(ammo, weapon, atmo);
                twistCoefficient = twist > 0 ? -1 : 1;
            }
        }

        const lookForSeenZero = (): void => {
            // With non-zero lookAngle, rounding can suggest multiple adjacent zero-crossings
            // Record when we see each zero crossing, so we only register one
            seenZero = TrajFlag.NONE;
            if (rangeVector.y >= 0) {
                // We're starting above zero; we can only go down
                seenZero |= TrajFlag.ZERO_UP;
            } else if ((rangeVector.y < 0) && (barrelElevation < lookAngle)) {
                // We're below and pointing down from lookAngle; no zeroes!
                seenZero |= TrajFlag.ZERO_DOWN;
            }
        }

        /** NOTE: bellow the functions to calculate trajectory over the loop **/
        const getNextWind = (): void => {
            if (rangeVector.x >= nextWindRange) {
                currentWind++;
                windVector = windToVector(shotInfo, winds[currentWind]);

                nextWindRange =
                    currentWind === lenWinds - 1
                        ? 1e7
                        : winds[currentWind].untilDistance.In(Unit.Foot);
            }
        }

        const lookForZeroCrossing = (): void => {
            // Zero-crossing checks
            if (rangeVector.x > 0) {
                // Zero reference line is the sight line defined by lookAngle
                referenceHeight = rangeVector.x * Math.tan(lookAngle);

                // If we haven't seen ZERO_UP, we look for that first
                if (!(seenZero & TrajFlag.ZERO_UP)) {
                    if (rangeVector.y >= referenceHeight) {
                        _flag |= TrajFlag.ZERO_UP;
                        seenZero |= TrajFlag.ZERO_UP;
                    }

                    // We've crossed above sight line; now look for crossing back through it
                } else if (!(seenZero & TrajFlag.ZERO_DOWN)) {
                    if (rangeVector.y < referenceHeight) {
                        _flag |= TrajFlag.ZERO_DOWN;
                        seenZero |= TrajFlag.ZERO_DOWN;
                    }
                }
            }
        }

        const lookForMachCrossing = () => {
            // Mach crossing check
            if ((velocity / mach <= 1) && (previousMach > 1)) {
                _flag |= TrajFlag.MACH;
            }
        }

        const lookForNextRange = (): void => {
            // Next range check
            if (rangeVector.x >= nextRangeDistance) {
                _flag |= TrajFlag.RANGE;
                nextRangeDistance += step;
                currentItem += 1;
            }
        }

        const registerTrajectoryPoint = () => {
            windage = rangeVector.z;
            if (!(twist === 0)) {
                windage +=
                    (1.25 * (stabilityCoefficient + 1.2) *
                        Math.pow(time, 1.83) * twistCoefficient) / 12;
            }

            ranges.push(
                createTrajectoryRow(
                    time,
                    rangeVector,
                    velocityVector,
                    velocity,
                    mach,
                    windage,
                    weight,
                    _flag
                )
            );
        }

        const initNextRangeData = () => {
            previousMach = velocity / mach;
            velocityAdjusted = velocityVector.subtract(windVector);
            deltaTime = calcStep / velocityVector.x;
            velocity = velocityAdjusted.magnitude();
            drag = densityFactor * velocity * this.dragByMach(velocity / mach);

            velocityVector = velocityVector.subtract(
                velocityAdjusted
                    .mulByConst(drag)
                    .subtract(gravityVector)
                    .mulByConst(deltaTime)
            );
            deltaRangeVector = new Vector(
                calcStep,
                velocityVector.y * deltaTime,
                velocityVector.z * deltaTime
            );
            rangeVector = rangeVector.add(deltaRangeVector);
            velocity = velocityVector.magnitude();
            time += deltaRangeVector.magnitude() / velocity;
        }

        /** prepare initial data **/
        getInitialWind()
        velocity = accurate_velocity_to_temperature()
        velocityVector = get_initial_velocity_vector()
        accurateToTwist()
        lookForSeenZero()

        while (rangeVector.x <= (maximumRange + calcStep)) {
            _flag = TrajFlag.NONE;

            if ((velocity < cMinimumVelocity) || (rangeVector.y < cMaximumDrop)) break;

            [densityFactor, mach] = atmo.getDensityFactorAndMachForAltitude(
                alt0 + rangeVector.y
            );

            getNextWind()
            lookForZeroCrossing()
            lookForMachCrossing()
            lookForNextRange()

            if (_flag & filterFlags) {
                registerTrajectoryPoint()
                if (currentItem === rangesLength) break;
            }
            initNextRangeData()

        }

        return ranges;
    }


    /**
     *
     * @param {number} mach
     * @return {number}
     */
    // FIXME - the mach is not valid
    dragByMach(mach: number): number {
        const cd = calculateByCurve(this._tableData, this._curve, mach);
        return cd * 2.08551e-04 / this._bc;
    }

    /**
     * Returns custom drag function based on input data
     * @return {{CD: number, Mach: number}[]}
     */
    get cdm(): DragTable {
        const dragTable = this.ammo.dm.dragTable;
        const bc = this.ammo.dm.value;
        let output: DragTable = []
        dragTable.forEach(point => {
            const stMach = point.Mach;
            const stCD = calculateByCurve(dragTable, this._curve, stMach);
            const cd = stCD * bc;
            output.push({CD: cd, Mach: stMach});
        })
        return output
    }

}

/**
 *
 * @param {Ammo} ammo
 * @param {Weapon} rifle
 * @param {Atmo} atmo
 * @return {number}
 */
function calculateStabilityCoefficient(ammo: Ammo, rifle: Weapon, atmo: Atmo): number {
    const weight = ammo.dm.weight.In(Unit.Grain);
    const diameter = ammo.dm.diameter.In(Unit.Inch);
    const twist = Math.abs(rifle.twist.In(Unit.Inch)) / diameter;
    const length = ammo.length.In(Unit.Inch) / diameter;
    const ft = atmo.temperature.In(Unit.Fahrenheit);
    const mv = ammo.mv.In(Unit.FPS);
    const pt = atmo.pressure.In(Unit.InHg);
    const sd = 30 * weight / (
        Math.pow(twist, 2) * Math.pow(diameter, 3) * length * (1 + Math.pow(length, 2))
    );
    const fv = Math.pow(mv / 2800, 1.0 / 3.0);
    const ftp = ((ft + 460) / (59 + 460)) * (29.92 / pt);
    return sd * fv * ftp;
}

/**
 * @param {Shot} shot
 * @param {Wind} wind
 * @return {Vector}
 */
function windToVector(shot: Shot, wind: Wind): Vector {
    const sightCosine = Math.cos(shot.zeroAngle.In(Unit.Radian));
    const sightSine = Math.sin(shot.zeroAngle.In(Unit.Radian));
    const cantCosine = Math.cos(shot.cantAngle.In(Unit.Radian));
    const cantSine = Math.sin(shot.cantAngle.In(Unit.Radian));
    const rangeVelocity = wind.velocity.In(Unit.FPS) * Math.cos(
        wind.directionFrom.In(Unit.Radian)
    );
    const crossComponent = wind.velocity.In(Unit.FPS) * Math.sin(
        wind.directionFrom.In(Unit.Radian)
    );
    const rangeFactor = -rangeVelocity * sightSine;
    return new Vector(
        rangeVelocity * sightCosine,
        rangeFactor * cantCosine + crossComponent * cantSine,
        crossComponent * cantCosine - rangeFactor * cantSine
    );
}

/**
 *
 * @param {number} time
 * @param {Vector} rangeVector
 * @param {Vector} velocityVector
 * @param {number} velocity
 * @param {number} mach
 * @param {number} windage
 * @param {number} weight
 * @param {TrajFlag} flag
 * @return {TrajectoryData}
 */
function createTrajectoryRow(time: number, rangeVector: Vector, velocityVector: Vector,
                             velocity: number, mach: number, windage: number, weight: number,
                             flag: TrajFlag): TrajectoryData {

    let dropAdjustment: number = getCorrection(rangeVector.x, rangeVector.y);
    let windageAdjustment: number = getCorrection(rangeVector.x, windage);
    let trajectoryAngle: number = Math.atan(velocityVector.y / velocityVector.x);

    return new TrajectoryData(
        time,
        UNew.Foot(rangeVector.x),
        UNew.FPS(velocity),
        velocity / mach,
        UNew.Foot(rangeVector.y),
        UNew.Radian(dropAdjustment),
        UNew.Foot(windage),
        UNew.Radian(windageAdjustment),
        UNew.Radian(trajectoryAngle),
        UNew.FootPound(calculateEnergy(weight, velocity)),
        UNew.Pound(calculateOGW(weight, velocity)),
        flag
    );
}

/**
 *
 * @param {number} distance
 * @param {number} offset
 * @return {number}
 */
function getCorrection(distance: number, offset: number): number {
    if (!(distance === 0)) {
        return Math.atan(offset / distance);
    }
    return NaN; // better null
}

/**
 *
 * @param {number} bulletWeight
 * @param {number} velocity
 * @return {number}
 */
function calculateEnergy(bulletWeight: number, velocity: number): number {
    return bulletWeight * Math.pow(velocity, 2) / 450400;
}

/**
 *
 * @param {number} bulletWeight
 * @param {number} velocity
 * @return {number}
 */
function calculateOGW(bulletWeight: number, velocity: number): number {
    return Math.pow(bulletWeight, 2) * Math.pow(velocity, 3) * 1.5e-12;
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
