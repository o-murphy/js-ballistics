// Conditions module
import { Atmo, Shot, Wind } from './conditions';
// Munition module
import { Ammo, Weapon } from './munition';
// TrajectoryData module
import { TrajectoryData, TrajFlag } from './trajectory_data';
// Unit module
import { Angular, Distance, UNew, Weight, Pressure, Velocity, Temperature, unitTypeCoerce, preferredUnits } from './unit';
// Vector module
import Vector from "./vector";
import type { DragTable } from "./drag_model";


// Constants
const cZeroFindingAccuracy: number = 0.000005;
const cMinimumVelocity: number = 50.0;
const cMaximumDrop: number = -15000;
const cMaxIterations: number = 20;
const cGravityConstant: number = -32.17405;

let _globalUsePowderSensitivity = false;
let _globalMaxCalcStepSize: Distance = UNew.Foot(0.5);

/**
 * Retrieves the current global maximum calculation step size.
 * @returns {Distance} - The global maximum calculation step size.
 */
function getGlobalMaxCalcStepSize(): Distance {
    return _globalMaxCalcStepSize;
}

/**
 * Retrieves the current global setting for powder sensitivity usage.
 * @returns {boolean} - The current global setting for powder sensitivity.
 */
function getGlobalUsePowderSensitivity(): boolean {
    return _globalUsePowderSensitivity;
}

/**
 * Resets global settings to their default values.
 * - `globalUsePowderSensitivity` is set to `false`.
 * - `globalMaxCalcStepSize` is set to `0.5` feet.
 */
function resetGlobals(): void {
    _globalUsePowderSensitivity = false;
    _globalMaxCalcStepSize = UNew.Foot(0.5);
}

/**
 * Sets the global maximum calculation step size.
 * @param {number | Distance} value - The new value for the global maximum calculation step size.
 * @throws {Error} - Throws an error if the value is less than or equal to 0.
 */
function setGlobalMaxCalcStepSize(value: number | Distance): void {
    const convertedValue = unitTypeCoerce(value, Distance, preferredUnits.distance);
    if (convertedValue.rawValue <= 0) {
        throw new Error("_globalMaxCalcStepSize has to be > 0");
    }
    _globalMaxCalcStepSize = convertedValue;
}

/**
 * Sets the global setting for powder sensitivity usage.
 * @param {boolean} value - The new setting for powder sensitivity.
 * @throws {TypeError} - Throws a TypeError if the value is not a boolean.
 */
function setGlobalUsePowderSensitivity(value: boolean): void {
    if (typeof value !== "boolean") {
        throw new TypeError(`setGlobalUsePowderSensitivity ${value} is not a boolean`);
    }
    _globalUsePowderSensitivity = value;
}

/**
 * Represents a point in a curve with three coefficients.
 */
class CurvePoint {
    constructor(
        public a: number,
        public b: number,
        public c: number
    ) {
    }
}

/**
 * Represents an array of `CurvePoint` instances.
 */
type Curve = CurvePoint[]

/**
 * Defines the properties required for a trajectory calculation.
 */
interface TrajectoryInterface {
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

    readonly ammo: Ammo;

    protected _bc: number;
    protected _tableData: DragTable;
    protected _curve: Curve;
    protected _gravityVector: Vector;
    protected _t_props: TrajectoryInterface;

    /**
     * Creates an instance of `TrajectoryCalc`.
     * @param {Ammo} ammo - The ammunition instance containing drag model and other data.
     */
    constructor(ammo: Ammo) {
        this.ammo = ammo;
        this._bc = ammo.dm.bc;
        this._tableData = this.ammo.dm.dragTable;
        this._curve = calculateCurve(this._tableData);
        this._gravityVector = new Vector(.0, cGravityConstant, .0)
    }

    /**
     * Retrieves the drag table data used in trajectory calculations.
     * @returns {DragTable} The drag table data.
     */
    get tableData(): DragTable {
        return this._tableData
    }

    /**
     * Retrieves the calculation step size for trajectory calculations.
     * @param {number} [step=0] - The step size to retrieve.
     * @returns {number} The calculation step size.
     */
    public static getCalcStep(step: number = 0): number {
        const preferredStep = _globalMaxCalcStepSize.In(Distance.Foot);

        if (step === 0) {
            return preferredStep / 2.0;
        }
        return Math.min(step, preferredStep) / 2.0;
    }

    /**
     * Calculates the trajectory of a shot based on the given parameters.
     * @param {Shot} shotInfo - The shot information including weapon, ammo, and angles.
     * @param {Distance} maxRange - The maximum range to calculate the trajectory for.
     * @param {Distance} distStep - The step size for distance intervals in the trajectory calculation.
     * @param {boolean} [extraData=false] - Flag indicating whether to include additional data in the trajectory results.
     * @returns {TrajectoryData[]} - An array of trajectory data points.
     */
    public trajectory(shotInfo: Shot, maxRange: Distance, distStep: Distance, extraData: boolean = false): TrajectoryData[] {
        let _distStep: Distance = unitTypeCoerce(distStep, Distance, preferredUnits.distance);
        let filterFlags = TrajFlag.RANGE

        if (extraData) {
            _distStep = UNew.Foot(0.2)
            filterFlags = TrajFlag.ALL
        }

        this._initTrajectory(shotInfo)

        return this._trajectory(shotInfo, maxRange.In(Distance.Foot), _distStep.In(Distance.Foot), filterFlags);
    }

    /**
     * Calculates the angle needed to zero the weapon for a given distance.
     * @param {Shot} shotInfo - The shot information including weapon, ammo, and angles.
     * @param {Distance} distance - The distance at which to zero the weapon.
     * @returns {Angular} - The angle required to zero the weapon at the specified distance.
     */
    public zeroAngle(shotInfo: Shot, distance: Distance): Angular {
        this._initTrajectory(shotInfo)

        let zeroDistance = Math.cos(this._t_props.lookAngle) * distance.In(Distance.Foot)
        let heightAtZero = Math.sin(this._t_props.lookAngle) * distance.In(Distance.Foot)
        let maximumRange = zeroDistance - (1.5 * this._t_props.calcStep)

        let iterationsCount = 0
        let zeroFindingError = cZeroFindingAccuracy * 2
        let height: number
        let t: TrajectoryData

        while (zeroFindingError > cZeroFindingAccuracy && iterationsCount < cMaxIterations) {
            t = this._trajectory(shotInfo, maximumRange, zeroDistance, TrajFlag.NONE)[0]
            height = t.height.In(Distance.Foot)
            zeroFindingError = Math.abs(height - heightAtZero)
            if (zeroFindingError > cZeroFindingAccuracy) {
                this._t_props.barrelElevation -= (height - heightAtZero) / zeroDistance
            } else {
                break
            }
            iterationsCount += 1
        }

        if (zeroFindingError > cZeroFindingAccuracy) {
            throw new Error(`Zero vertical error ${zeroFindingError} feet, after ${iterationsCount} iterations.`)
        }

        return UNew.Radian(this._t_props.barrelElevation)
    }

    /**
     * Calculates the trajectory data for a shot over a range of distances.
     * @param {Shot} shotInfo - The shot information including weapon, ammo, and angles.
     * @param {number} maxRange - The maximum range for the trajectory calculation.
     * @param {number} distStep - The step size for distance increments in the calculation.
     * @param {TrajFlag} filterFlags - Flags to filter the trajectory data output.
     * @returns {TrajectoryData[]} - An array of trajectory data points for the specified range and step size.
     * @private
     */
    _trajectory(shotInfo: Shot, maxRange: number, distStep: number, filterFlags: TrajFlag): TrajectoryData[] {
        let ranges: TrajectoryData[] = [];
        const rangesLength: number = Math.floor(maxRange / distStep) + 1;
        let time: number = .0;
        let previousMach: number = .0;
        let drag: number = .0;

        let mach: number = .0
        let densityFactor: number = .0

        const lenWinds: number = shotInfo.winds.length;
        let currentWind: number = .0;
        let currentItem: number = .0;
        let nextRangeDistance: number = .0;
        let nextWindRange: number = Wind.MAX_DISTANCE_FEET;

        let windVector: Vector
        if (lenWinds < 1) {
            windVector = new Vector(.0, .0, .0)
        } else {
            windVector = windToVector(shotInfo.winds[0])
            nextWindRange = shotInfo.winds[0].untilDistance.In(Distance.Foot)
        }

        let velocity: number = this._t_props.muzzleVelocity
        let rangeVector: Vector = new Vector(
            .0,
            -this._t_props.cantCosine * this._t_props.sightHeight,
            -this._t_props.cantSine * this._t_props.sightHeight
        )
        let velocityVector: Vector = new Vector(
            Math.cos(this._t_props.barrelElevation) * Math.cos(this._t_props.barrelAzimuth),
            Math.sin(this._t_props.barrelElevation),
            Math.cos(this._t_props.barrelElevation) * Math.sin(this._t_props.barrelAzimuth)
        ).mulByConst(velocity)

        let seenZero = TrajFlag.NONE

        if (rangeVector.y >= 0) {
            seenZero |= TrajFlag.ZERO_UP;
        } else if (rangeVector.y < 0 && this._t_props.barrelElevation < this._t_props.lookAngle) {
            seenZero |= TrajFlag.ZERO_DOWN;
        }

        let _flag = TrajFlag.NONE

        while (rangeVector.x <= maxRange + this._t_props.calcStep) {
            _flag = TrajFlag.NONE

            if (rangeVector.x >= nextWindRange) {
                currentWind += 1
                if (currentWind >= lenWinds) {
                    windVector = new Vector(.0, .0, .0)
                    nextWindRange = Wind.MAX_DISTANCE_FEET
                } else {
                    windVector = windToVector(shotInfo.winds[currentWind])
                    nextWindRange = shotInfo.winds[currentWind].untilDistance.In(Distance.Foot)
                }
            }

            [densityFactor, mach] = shotInfo.atmo.getDensityFactorAndMachForAltitude(this._t_props.alt0 + rangeVector.y)

            if (filterFlags) {
                if (rangeVector.x > 0) {
                    let referenceHeight = rangeVector.x * Math.tan(this._t_props.lookAngle)

                    if (!(seenZero & TrajFlag.ZERO_UP)) {
                        if (rangeVector.y >= referenceHeight) {
                            _flag |= TrajFlag.ZERO_UP
                            seenZero |= TrajFlag.ZERO_UP
                        }
                    } else if (!(seenZero & TrajFlag.ZERO_DOWN)) {
                        if (rangeVector.y < referenceHeight) {
                            _flag |= TrajFlag.ZERO_DOWN
                            seenZero |= TrajFlag.ZERO_DOWN
                        }
                    }
                }

                if (previousMach > 1 && 1 >= velocity / mach) {
                    _flag |= TrajFlag.MACH
                }

                if (rangeVector.x >= nextRangeDistance) {
                    _flag |= TrajFlag.RANGE
                    nextRangeDistance += distStep
                    currentItem += 1
                }

                if (_flag & filterFlags) {
                    ranges.push(createTrajectoryRow(
                        time, rangeVector, velocityVector,
                        velocity, mach, this.spinDrift(time), this._t_props.lookAngle,
                        densityFactor, drag, this._t_props.weight, _flag
                    ))
                    if (currentItem === rangesLength) {
                        break
                    }
                }
            }

            previousMach = velocity / mach

            let deltaTime: number = this._t_props.calcStep / velocityVector.x;
            let velocityAdjusted: Vector = velocityVector.subtract(windVector)
            velocity = velocityAdjusted.magnitude()
            drag = densityFactor * velocity * this.dragByMach(velocity / mach)
            velocityVector = velocityVector.subtract(velocityAdjusted.mulByConst(drag).subtract(this._gravityVector).mulByConst(deltaTime))
            let deltaRangeVector: Vector = new Vector(
                this._t_props.calcStep,
                velocityVector.y * deltaTime,
                velocityVector.z * deltaTime
            )
            rangeVector = rangeVector.add(deltaRangeVector)
            velocity = velocityVector.magnitude()
            time += deltaRangeVector.magnitude() / velocity

            if (velocity < cMinimumVelocity || rangeVector.y < cMaximumDrop) {
                break
            }
        }

        if (!filterFlags) {
            ranges.push(createTrajectoryRow(
                time, rangeVector, velocityVector,
                velocity, mach, this.spinDrift(time), this._t_props.lookAngle,
                densityFactor, drag, this._t_props.weight, _flag
            ))
        }

        return ranges
    }

    /**
     * Initializes the trajectory properties based on the provided shot information.
     * @param {Shot} shotInfo - The shot information including weapon, ammo, and environmental conditions.
     * @private
     */
    _initTrajectory(shotInfo: Shot): void {
        this._t_props = {
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
                shotInfo.ammo.getVelocityForTemp(shotInfo.atmo.temperature) :
                shotInfo.ammo.mv).In(Velocity.FPS),
            stabilityCoefficient: 0
        }
        this._t_props.stabilityCoefficient = this.calcStabilityCoefficient(shotInfo.atmo)
    }

    /**
     * Calculates the drag coefficient for a given Mach number.
     * @param {number} mach - The Mach number for which the drag coefficient is to be calculated.
     * @returns {number} - The calculated drag coefficient for the provided Mach number.
     */
    public dragByMach(mach: number): number {
        const cd = calculateByCurve(this._tableData, this._curve, mach); // Assuming `calculateByCurve` exists
        return cd * 2.08551e-04 / this._bc;
    }

    /**
     * Calculates the spin drift of the projectile over time.
     * @param {number} time - The time in seconds for which the spin drift is to be calculated.
     * @returns {number} - The calculated spin drift in inches over the specified time.
     */
    public spinDrift(time: number): number {
        if (this._t_props.twist !== 0) {
            const sign = this._t_props.twist > 0 ? 1 : -1;
            return sign * (1.25 * (this._t_props.stabilityCoefficient + 1.2) * Math.pow(time, 1.83)) / 12;
        }
        return 0;
    }

    /**
     * Calculates the stability coefficient of the projectile based on atmospheric conditions.
     * @param {Atmo} atmo - The atmospheric conditions including temperature, pressure, and humidity.
     * @returns {number} - The calculated stability coefficient.
     */
    public calcStabilityCoefficient(atmo: Atmo): number {
        if (this._t_props.twist && this._t_props.length && this._t_props.diameter) {
            const twistRate = Math.abs(this._t_props.twist) / this._t_props.diameter;
            const lengthRatio = this._t_props.length / this._t_props.diameter;

            // Miller stability formula
            const sd = 30 * this._t_props.weight / (
                Math.pow(twistRate, 2) * Math.pow(this._t_props.diameter, 3) * lengthRatio * (1 + Math.pow(lengthRatio, 2))
            );

            // Velocity correction factor
            const fv = Math.pow(this._t_props.muzzleVelocity / 2800, 1.0 / 3.0);

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
 * Converts wind data into a vector representation.
 * @param {Wind} wind - The wind data including velocity and direction.
 * @returns {Vector} - The vector representation of the wind.
 */
function windToVector(wind: Wind): Vector {
    const rangeComponent = wind.velocity.In(Velocity.FPS) * Math.cos(wind.directionFrom.In(Angular.Radian))
    const crossComponent = wind.velocity.In(Velocity.FPS) * Math.sin(wind.directionFrom.In(Angular.Radian))
    return new Vector(rangeComponent, .0, crossComponent)
}

/**
 * Creates a trajectory data row for a given time step.
 * @param {number} time - The time at which the trajectory data is calculated.
 * @param {Vector} rangeVector - The vector representing the range.
 * @param {Vector} velocityVector - The vector representing the velocity.
 * @param {number} velocity - The magnitude of the velocity.
 * @param {number} mach - The Mach number corresponding to the velocity.
 * @param {number} spinDrift - The spin drift effect on the trajectory.
 * @param {number} lookAngle - The angle of the sight relative to the bore axis.
 * @param {number} densityFactor - The atmospheric density factor affecting the trajectory.
 * @param {number} drag - The drag force experienced by the projectile.
 * @param {number} weight - The weight of the projectile.
 * @param {number} flag - Flags indicating specific trajectory conditions or calculations.
 * @returns {TrajectoryData} - An object containing the calculated trajectory data.
 */
function createTrajectoryRow(
    time: number,
    rangeVector: Vector,
    velocityVector: Vector,
    velocity: number,
    mach: number,
    spinDrift: number,
    lookAngle: number,
    densityFactor: number,
    drag: number,
    weight: number,
    flag: number
): TrajectoryData {
    const windage = rangeVector.z + spinDrift
    const dropAdjustment = getCorrection(rangeVector.x, rangeVector.y)
    const windageAdjustment = getCorrection(rangeVector.x, windage)
    const trajectoryAngle = Math.atan(velocityVector.y / velocityVector.x)

    return new TrajectoryData(
        time,
        UNew.Foot(rangeVector.x),
        UNew.FPS(velocity),
        velocity / mach,
        UNew.Foot(rangeVector.y),
        UNew.Foot((rangeVector.y - rangeVector.x * Math.tan(lookAngle)) * Math.cos(lookAngle)),
        UNew.Radian(dropAdjustment - (rangeVector.x ? lookAngle : 0)),
        UNew.Foot(windage),
        UNew.Radian(windageAdjustment),
        UNew.Foot(rangeVector.x / Math.cos(lookAngle)),
        UNew.Radian(trajectoryAngle),
        densityFactor - 1,
        drag,
        UNew.FootPound(calculateEnergy(weight, velocity)),
        UNew.Pound(calculateOGW(weight, velocity)),
        flag
    )
}

/**
 * Calculates the correction needed for a given distance and offset.
 * @param {number} distance - The distance for which the correction is to be calculated.
 * @param {number} offset - The offset that affects the correction calculation.
 * @returns {number} - The calculated correction value.
 */
function getCorrection(distance: number, offset: number): number {
    // Sight adjustment in radians
    if (distance != 0) {
        return Math.atan(offset / distance)
    }
    return 0
}

/**
 * Calculates the kinetic energy of a bullet based on its weight and velocity.
 * @param {number} bulletWeight - The weight of the bullet in grains.
 * @param {number} velocity - The velocity of the bullet in feet per second (FPS).
 * @returns {number} - The calculated kinetic energy in foot-pounds (ft-lb).
 */
function calculateEnergy(bulletWeight: number, velocity: number): number {
    // energy in ft-lbs
    return bulletWeight * Math.pow(velocity, 2) / 450400
}

/**
 * Calculates the optical ground weight (OGW) of a bullet based on its weight and velocity.
 * @param {number} bulletWeight - The weight of the bullet in grains.
 * @param {number} velocity - The velocity of the bullet in feet per second (FPS).
 * @returns {number} - The calculated optical ground weight.
 */
function calculateOGW(bulletWeight: number, velocity: number): number {
    // Optimal Game Weight in pounds
    return Math.pow(bulletWeight, 2) * Math.pow(velocity, 3) * 1.5e-12
}

/**
 * Calculates a curve based on drag data points for trajectory analysis.
 * @param {DragTable} dataPoints - An array of `DragDataPoint` objects representing the drag data.
 * @returns {Curve} - An array of `CurvePoint` objects representing the calculated curve.
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
 * Calculates a value based on drag data and a provided curve using a given Mach number.
 * @param {DragTable} data - An array of `DragDataPoint` objects representing the drag data.
 * @param {CurvePoint[]} curve - An array of `CurvePoint` objects representing the curve used for interpolation.
 * @param {number} mach - The Mach number to use for the calculation.
 * @returns {number} - The calculated value based on the curve and Mach number.
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
export {
    getGlobalMaxCalcStepSize,
    getGlobalUsePowderSensitivity,
    setGlobalMaxCalcStepSize,
    setGlobalUsePowderSensitivity,
    resetGlobals
}
