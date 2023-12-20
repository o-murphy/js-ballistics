// Conditions module
import {Atmo, Wind} from './conditions.js';
// Munition module
import {Ammo, Weapon} from './munition.js';
// Settings module
import calcSettings from './settings';
// TrajectoryData module
import {TrajectoryData, TrajFlag} from './trajectory_data.js';
// Unit module
import {Measure, UNew, Unit, unitTypeCoerce} from './unit.js';
// VectorJs module
import Vector from "./vector.ts";

// Constants
const cZeroFindingAccuracy = 0.000005;
const cMinimumVelocity = 50.0;
const cMaximumDrop = -15000;
const cMaxIterations = 20;
const cGravityConstant = -32.17405;


class CurvePoint {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}


class TrajectoryCalc {
    constructor(ammo,) {
        this.ammo = ammo
        this._bc = ammo.dm.value
        this._tableData = this.ammo.dm.dragTable
        this._curve = calculateCurve(this._tableData)
    }

    getCalcStep(step) {
        let maximumStep = calcSettings._MAX_CALC_STEP_SIZE;
        step /= 2;

        if (step > maximumStep) {
            const stepOrder = Math.round(Math.log10(step));
            const maximumOrder = Math.round(Math.log10(maximumStep));
            step /= Math.pow(10, stepOrder - maximumOrder + 1);
        }

        return step;
    }

    /**
     *
     * @param {Weapon} weapon
     * @param {Atmo} atmo
     * @return {Angular|Object}
     * @public
     */
    zeroAngle(weapon, atmo) {
        return this._zeroAngle(this.ammo, weapon, atmo);
    }

    /**
     *
     * @param {Weapon} weapon
     * @param {Shot} shotInfo
     * @param {number|Distance|Object} step
     * @param extraData
     * @return {TrajectoryData[]}
     */
    trajectory(weapon, shotInfo, step, extraData = false) {
        let distStep = unitTypeCoerce(step, Measure.Distance, calcSettings.Units.distance);
        const atmo = shotInfo.atmo;
        const winds = shotInfo.winds;
        let filterFlags = TrajFlag.RANGE;

        if (extraData) {
            console.log('ext', extraData);
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
    _zeroAngle(ammo, weapon, atmo) {
        const calcStep = this.getCalcStep(weapon.zeroDistance.in(Unit.Foot));
        const zeroDistance = Math.cos(
            weapon.zeroLookAngle.in(Unit.Radian)
        ) * weapon.zeroDistance.in(Unit.Foot);
        const heightAtZero = Math.sin(
            weapon.zeroLookAngle.in(Unit.Radian)
        ) * weapon.zeroDistance.in(Unit.Foot);
        const maximumRange = zeroDistance + calcStep;
        const sightHeight = weapon.sightHeight.in(Unit.Foot);
        const mach = atmo.mach.in(Unit.FPS);
        const densityFactor = atmo.densityFactor();
        const muzzleVelocity = ammo.mv.in(Unit.FPS);
        const barrelAzimuth = 0.0;
        let barrelElevation = Math.atan(heightAtZero / zeroDistance);
        let iterationsCount = 0;
        let zeroFindingError = cZeroFindingAccuracy * 2;
        const gravityVector = new Vector(0.0, cGravityConstant, 0.0);

        while (
            zeroFindingError > cZeroFindingAccuracy &&
            iterationsCount < cMaxIterations
            ) {
            let velocity = muzzleVelocity;
            let time = 0.0;
            let rangeVector = new Vector(0.0, -sightHeight, 0.0);
            let velocityVector = new Vector(
                Math.cos(barrelElevation) * Math.cos(barrelAzimuth),
                Math.sin(barrelElevation),
                Math.cos(barrelElevation) * Math.sin(barrelAzimuth)
            ).mulByConst(velocity);

            while (rangeVector.x <= maximumRange) {
                if (velocity < cMinimumVelocity || rangeVector.y < cMaximumDrop) break;

                let deltaTime = calcStep / velocityVector.x;

                let drag = densityFactor * velocity * this.dragByMach(velocity / mach);

                velocityVector = velocityVector.subtract(
                    velocityVector.mulByConst(drag).subtract(gravityVector).mulByConst(deltaTime)
                );

                let deltaRangeVector = new Vector(
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
    _trajectory(ammo, weapon, atmo, shotInfo, winds, distStep, filterFlags) {
        let time = 0;
        const lookAngle = weapon.zeroLookAngle.in(Unit.Radian);
        const twist = weapon.twist.in(Unit.Inch);
        const length = ammo.length.in(Unit.Inch);
        const diameter = ammo.dm.diameter.in(Unit.Inch);
        const weight = ammo.dm.weight.in(Unit.Grain);

        // step = shotInfo.step >> Distance.Foot
        const step = distStep.in(Unit.Foot);
        const calcStep = this.getCalcStep(step);

        const maximumRange = shotInfo.maxRange.in(Unit.Foot) + 1;

        // const rangesLength = Math.floor(maximumRange / step);
        const rangesLength = Math.round(maximumRange / step);
        const lenWinds = winds.length;
        let currentWind = 0;
        let currentItem = 0;

        let stabilityCoefficient = 1.0;
        let nextWindRange = 1e7;

        const barrelElevation =
            shotInfo.zeroAngle.in(Unit.Radian) + shotInfo.relativeAngle.in(Unit.Radian);
        const alt0 = atmo.altitude.in(Unit.Foot);
        const sightHeight = weapon.sightHeight.in(Unit.Foot);

        let nextRangeDistance = 0;
        const barrelAzimuth = 0.0;
        let previousMach = 0.0;

        const gravityVector = new Vector(0.0, cGravityConstant, 0.0);
        let rangeVector = new Vector(0.0, -sightHeight, 0.0);

        const ranges = [];

        let velocity;

        let mach = 0;
        let windVector,
            twistCoefficient,
            _flag,
            referenceHeight;
        let windage,
            deltaRangeVector,
            velocityAdjusted,
            deltaTime,
            drag;
        let densityFactor;

        if (lenWinds < 1) {
            windVector = new Vector(0.0, 0.0, 0.0);
        } else if (lenWinds >= 1) {
            nextWindRange = winds[0].untilDistance.in(Unit.Foot);
            windVector = windToVector(shotInfo, winds[0]);
        }

        if (calcSettings.USE_POWDER_SENSITIVITY && ammo.tempModifier) {
            velocity = ammo.getVelocityForTemp(atmo.temperature).in(Unit.FPS);
        } else {
            velocity = ammo.mv.in(Unit.FPS);
        }

        // x - distance towards target, y - drop, and z - windage
        let velocityVector = new Vector(
            Math.cos(barrelElevation) * Math.cos(barrelAzimuth),
            Math.sin(barrelElevation),
            Math.cos(barrelElevation) * Math.sin(barrelAzimuth)
        ).mulByConst(velocity);

        if (!(twist === 0) && length && diameter) {
            stabilityCoefficient = calculateStabilityCoefficient(ammo, weapon, atmo);
            twistCoefficient = twist > 0 ? -1 : 1;
        }

        // With non-zero lookAngle, rounding can suggest multiple adjacent zero-crossings
        // Record when we see each zero crossing, so we only register one
        let seenZero = TrajFlag.NONE;
        if (rangeVector.y >= 0) {
            // We're starting above zero; we can only go down
            seenZero |= TrajFlag.ZERO_UP;
        } else if (rangeVector.y < 0 && barrelElevation < lookAngle) {
            // We're below and pointing down from lookAngle; no zeroes!
            seenZero |= TrajFlag.ZERO_DOWN;
        }

        while (rangeVector.x <= maximumRange + calcStep) {
            _flag = TrajFlag.NONE;

            if ((velocity < cMinimumVelocity) && (rangeVector.y < cMaximumDrop)) break;

            const densityFactorMach = atmo.getDensityFactorAndMachForAltitude(
                alt0 + rangeVector.y
            );
            densityFactor = densityFactorMach.density;
            mach = densityFactorMach.mach;

            if (rangeVector.x >= nextWindRange) {
                currentWind += 1;
                windVector = windToVector(shotInfo, winds[currentWind]);

                nextWindRange =
                    currentWind === lenWinds - 1
                        ? 1e7
                        : winds[currentWind].untilDistance.in(Unit.Foot);
            }

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

            // Mach crossing check
            if ((velocity / mach <= 1) && (previousMach > 1)) {
                _flag |= TrajFlag.MACH;
            }

            // Next range check
            if (rangeVector.x >= nextRangeDistance) {
                _flag |= TrajFlag.RANGE;
                nextRangeDistance += step;
                currentItem += 1;
            }

            if (_flag && filterFlags) {
                windage = rangeVector.z;
                if (!(twist === 0)) {
                    windage +=
                        (1.25 * (stabilityCoefficient + 1.2) *
                            Math.pow(time, 1.83) *
                            twistCoefficient) /
                        12;
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

                if (currentItem === rangesLength) break;
            }

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

        return ranges;
    }


    /**
     *
     * @param {number} mach
     * @return {number}
     */
    // FIXME - the mach is not valid
    dragByMach(mach) {
        const cd = calculateByCurve(this._tableData, this._curve, mach);
        return cd * 2.08551e-04 / this._bc;
    }

    /**
     *
     * @return {{CD: number, Mach: number}[]}
     */
    get cdm() {
        return self._cdm();
    }

    /**
     * Returns custom drag function based on input data
     * @return {{CD: number, Mach: number}[]}
     * @private
     */
    _cdm() {
        const dragTable = this.ammo.dm.dragTable;
        const bc = this.ammo.dm.value;
        let output = []
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
function calculateStabilityCoefficient(ammo, rifle, atmo) {
    const weight = ammo.dm.weight.in(Unit.Grain);
    const diameter = ammo.dm.diameter.in(Unit.Inch);
    const twist = Math.abs(rifle.twist.in(Unit.Inch)) / diameter;
    const length = ammo.length.in(Unit.Inch) / diameter;
    const ft = atmo.temperature.in(Unit.Fahrenheit);
    const mv = ammo.mv.in(Unit.FPS);
    const pt = atmo.pressure.in(Unit.InHg);
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
function windToVector(shot, wind) {
    const sightCosine = Math.cos(shot.zeroAngle.in(Unit.Radian));
    const sightSine = Math.sin(shot.zeroAngle.in(Unit.Radian));
    const cantCosine = Math.cos(shot.cantAngle.in(Unit.Radian));
    const cantSine = Math.sin(shot.cantAngle.in(Unit.Radian));
    const rangeVelocity = wind.velocity.in(Unit.FPS) * Math.cos(
        wind.directionFrom.in(Unit.Radian)
    );
    const crossComponent = wind.velocity.in(Unit.FPS) * Math.sin(
        wind.directionFrom.in(Unit.Radian)
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
function createTrajectoryRow(time, rangeVector, velocityVector,
                             velocity, mach, windage, weight, flag) {
    const dropAdjustment = getCorrection(rangeVector.x, rangeVector.y);
    const windageAdjustment = getCorrection(rangeVector.x, windage);
    const trajectoryAngle = Math.atan(velocityVector.y / velocityVector.x);

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
function getCorrection(distance, offset) {
    if (!(distance === 0)) {
        return Math.atan(offset / distance);
    }
    return 0; // better null
}

/**
 *
 * @param {number} bulletWeight
 * @param {number} velocity
 * @return {number}
 */
function calculateEnergy(bulletWeight, velocity) {
    return bulletWeight * Math.pow(velocity, 2) / 450400;
}

/**
 *
 * @param {number} bulletWeight
 * @param {number} velocity
 * @return {number}
 */
function calculateOGW(bulletWeight, velocity) {
    return Math.pow(bulletWeight, 2) * Math.pow(velocity, 3) * 1.5e-12;
}


/**
 * @param {Object[]} dataPoints
 * @return {CurvePoint[]}
 */
function calculateCurve(dataPoints) {
    let rate =
        (dataPoints[1].CD - dataPoints[0].CD) / (dataPoints[1].Mach - dataPoints[0].Mach);
    let curve = [
        new CurvePoint(0, rate, dataPoints[0].CD - dataPoints[0].Mach * rate),
    ];
    const lenDataPoints = dataPoints.length;
    const lenDataRange = lenDataPoints - 1;

    let x1, x2, x3, y1, y2, y3, a, b, c, curvePoint;

    for (let i = 1; i < lenDataRange; i++) {
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
        curvePoint = new CurvePoint(a, b, c);
        curve.push(curvePoint);
    }

    let numPoints = lenDataPoints;
    rate =
        (dataPoints[numPoints - 1].CD - dataPoints[numPoints - 2].CD) /
        (dataPoints[numPoints - 1].CD - dataPoints[numPoints - 2].Mach);
    curvePoint = new CurvePoint(
        0,
        rate,
        dataPoints[numPoints - 1].CD - dataPoints[numPoints - 2].Mach * rate
    );
    curve.push(curvePoint);
    return curve;
}

/**
 * @param {Object[]} data
 * @param {CurvePoint[]} curve
 * @param {number} mach
 * @return {number}
 */
function calculateByCurve(data, curve, mach) {
    let m, mid;
    let mlo = 0;
    let mhi = curve.length - 2;

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
    const curveM = curve[m];
    return curveM.c + mach * (curveM.b + curveM.a * mach);
}


// Export the classes and constants
export default TrajectoryCalc;
