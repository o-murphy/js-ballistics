// Conditions module
import { Atmo, Shot, Wind } from './conditions';
// TrajectoryData module
import { TrajectoryData, TrajFlag } from './trajectory_data';
// Unit module
import { Angular, Distance, UNew, Weight, Pressure, Velocity, Temperature, unitTypeCoerce, preferredUnits } from './unit';
// Vector module
import Vector from "./vector";
import type { DragTable } from "./drag_model";
import { RangeError, ZeroFindingError } from './exceptions';
import { EngineInterface, GenericConfig } from './generics/engine';


// Constants
const cZeroFindingAccuracy: number = 0.000005;
const cMinimumVelocity: number = 50.0;
const cMaximumDrop: number = -15000;
const cMaxIterations: number = 60;
const cGravityConstant: number = -32.17405;
const cMinimumAltitude: number = -1410.748 // ft


let _globalUsePowderSensitivity: boolean = false;
let _globalMaxCalcStepSize: number = 0.5;

/**
 * Retrieves the current global maximum calculation step size.
 * @returns {Distance} - The global maximum calculation step size.
 */
function getGlobalMaxCalcStepSize(): Distance {
    return new Distance(preferredUnits.distance, _globalMaxCalcStepSize);
}

/**
 * Resets global settings to their default values.
 * - `globalUsePowderSensitivity` is set to `false`.
 * - `globalMaxCalcStepSize` is set to `0.5` feet.
 */
function resetGlobals(): void {
    _globalUsePowderSensitivity = false;
    _globalMaxCalcStepSize = 0.5;
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
    _globalMaxCalcStepSize = convertedValue.In(Distance.Foot);
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
type EulerEngineTrajectoryProps = {
    lookAngle: number;
    twist: number;
    length: number;
    diameter: number;
    weight: number;
    barrelElevation: number;
    barrelAzimuth: number;
    sightHeight: number;
    cantCosine: number;
    cantSine: number;
    alt0: number;
    calcStep: number;
    muzzleVelocity: number;
    stabilityCoefficient: number;
}


interface EulerEngineConfig extends GenericConfig {
    maxCalcStepSizeFeet: number;
    cZeroFindingAccuracy: number;
    cMinimumVelocity: number;
    cMaximumDrop: number;
    cMaxIterations: number;
    cGravityConstant: number;
    cMinimumAltitude: number;
}

type BaseTrajectoryData = {
    time: number;
    position: Vector;
    velocity: Vector;
    mach: number;
}


class TrajectoryDataFilter {
    filter: TrajFlag;
    currentFlag: TrajFlag;
    seenZero: TrajFlag;
    timeOfLastRecord: number;
    timeStep: number;
    rangeStep: number;
    previousMach: number;
    previousTime: number;
    previousPosition: Vector;
    previousVelocity: Vector;
    previousVMach: number;
    nextRecordDistance: number;
    lookAngle: number;

    constructor(
        filterFlags: TrajFlag,
        rangeStep: number,
        initialPosition: Vector,
        initialVelocity: Vector,
        timeStep: number = 0
    ) {
        this.filter = filterFlags
        this.currentFlag = TrajFlag.NONE
        this.seenZero = TrajFlag.NONE
        this.timeStep = timeStep
        this.rangeStep = rangeStep
        this.timeOfLastRecord = 0.0
        this.nextRecordDistance = 0.0
        this.previousMach = 0.0
        this.previousTime = 0.0
        this.previousPosition = initialPosition
        this.previousVelocity = initialVelocity
        this.previousVMach = 0.0
        this.lookAngle = 0.0
    }

    setupSeenZero(height: number, barrelElevation: number, lookAngle: number) {
        if (height >= 0) {
            this.seenZero |= TrajFlag.ZERO_UP
        } else if (height < 0 && barrelElevation < lookAngle) {
            this.seenZero |= TrajFlag.ZERO_DOWN
        }
        this.lookAngle = lookAngle
    }

    clearCurrentFlag() {
        this.currentFlag = TrajFlag.NONE
    }

    shouldRecord(position: Vector, velocity: Vector, mach: number, time: number): BaseTrajectoryData | null {
        let data: BaseTrajectoryData | null = null
        if (this.rangeStep > 0 && position.x >= this.nextRecordDistance) {
            while (this.nextRecordDistance + this.rangeStep < position.x) {
                this.nextRecordDistance += this.rangeStep
            }
            if (position.x > this.previousPosition.x) {
                const ratio = (this.nextRecordDistance - this.previousPosition.x) / (position.x - this.previousPosition.x)
                data = {
                    time: this.previousTime + (time - this.previousTime) * ratio,
                    position: this.previousPosition.add(position.subtract(this.previousPosition).mulByConst(ratio)),
                    velocity: this.previousVelocity.add(velocity.subtract(this.previousVelocity).mulByConst(ratio)),
                    mach: this.previousMach + (mach - this.previousMach) * ratio
                }
            }
            this.currentFlag |= TrajFlag.RANGE
            this.nextRecordDistance += this.rangeStep
            this.timeOfLastRecord = time
        } else if (this.timeStep > 0) {
            this.checkNextTime(time)
        }
        this.checkZeroCrossing(position)
        this.checkMachCrossing(velocity.magnitude(), mach)

        if (Boolean(this.currentFlag & this.filter) && data === null) {
            data = {
                time, position, velocity, mach
            }
        }
        this.previousTime = time
        this.previousPosition = position
        this.previousVelocity = velocity
        this.previousMach = mach
        return data
    }

    checkNextTime(time: number) {
        if (time > this.timeOfLastRecord + this.timeStep) {
            this.currentFlag |= TrajFlag.RANGE
            this.timeOfLastRecord = time
        }
    }

    checkMachCrossing(velocity: number, mach: number) {
        const currentVMach = velocity / mach
        if (this.previousVMach > 1 && 1 >= currentVMach) {
            this.currentFlag |= TrajFlag.MACH
        }
        this.previousVMach = currentVMach
    }

    checkZeroCrossing(rangeVector: Vector) {
        if (rangeVector.x > 0) {

            const referenceHeight = rangeVector.x * Math.tan(this.lookAngle)

            if (!(this.seenZero & TrajFlag.ZERO_UP)) {
                if (rangeVector.y >= referenceHeight) {
                    this.currentFlag |= TrajFlag.ZERO_UP
                    this.seenZero |= TrajFlag.ZERO_UP
                }
            }
            else if (!(this.seenZero & TrajFlag.ZERO_DOWN)) {
                if (rangeVector.y < referenceHeight) {
                    this.currentFlag |= TrajFlag.ZERO_DOWN
                    this.seenZero |= TrajFlag.ZERO_DOWN
                }
            }
        }
    }
}


class WindSock {
    winds: Wind[]
    current: number
    nextRange: number
    protected _last_vector_cache: Vector | null
    protected _length: number

    constructor(winds: Wind[] | null) {
        this.winds = winds ?? []
        this.current = 0
        this.nextRange = Wind.MAX_DISTANCE_FEET
        this._last_vector_cache = null
        this._length = this.winds.length

        this.updateCache()
    }

    currentVector(): Vector {
        if (!this._last_vector_cache) {
            throw new Error("No cached wind vector")
        }
        return this._last_vector_cache
    }

    updateCache() {
        if (this.current < this._length) {
            const curWind = this.winds[this.current]
            this._last_vector_cache = curWind.vector
            this.nextRange = curWind.untilDistance.In(Distance.Foot)
        } else {
            this._last_vector_cache = new Vector(0.0, 0.0, 0.0)
            this.nextRange = Wind.MAX_DISTANCE_FEET
        }
    }

    vectorForRange(nextRange: number): Vector {
        if (nextRange >= this.nextRange) {
            this.current += 1
            if (this.current >= this._length) {
                this._last_vector_cache = new Vector(0.0, 0.0, 0.0)
                this.nextRange = Wind.MAX_DISTANCE_FEET
            } else {
                this.updateCache()
            }
        }
        return this.currentVector()
    }
}



export const defaultEulerConfig: EulerEngineConfig = {
    maxCalcStepSizeFeet: _globalMaxCalcStepSize,
    cZeroFindingAccuracy,
    cMinimumVelocity,
    cMaximumDrop,
    cMaxIterations,
    cGravityConstant,
    cMinimumAltitude,
}


class EulerEngine implements EngineInterface<EulerEngineConfig> {

    gravityVector: Vector;

    protected _config: EulerEngineConfig;

    protected _bc: number;
    protected _tableData: DragTable;
    protected _curve: Curve;
    private __mach_list: number[];

    protected _tProps: EulerEngineTrajectoryProps;

    constructor(config: Partial<EulerEngineConfig>) {
        this._config = { ...defaultEulerConfig, ...config }
        this.gravityVector = new Vector(.0, this._config.cGravityConstant, .0)
    }

    /**
     * Retrieves the drag table data used in trajectory calculations.
     * @returns {DragTable} The drag table data.
     */
    get tableData(): DragTable {
        return this._tableData
    }

    zeroAngle(shotInfo: Shot, distance: Distance): Angular {
        this._initTrajectory(shotInfo)

        const { cZeroFindingAccuracy, cMaxIterations } = this._config
        const { lookAngle } = this._tProps

        const distanceFeet = distance.In(Distance.Foot)
        const zeroDistance = Math.cos(lookAngle) * distanceFeet
        const heightAtZero = Math.sin(lookAngle) * distanceFeet

        let iterationsCount = 0
        let zeroFindingError = cZeroFindingAccuracy * 2

        let height: number
        while (zeroFindingError > cZeroFindingAccuracy && iterationsCount < cMaxIterations) {
            try {
                let t = this._integrate(shotInfo, zeroDistance, zeroDistance, TrajFlag.NONE)[0]
                height = t.height.In(Distance.Foot)
            } catch (e: unknown) {
                if (e instanceof RangeError) {
                    if (e.lastDistance === null || e.lastDistance == undefined) {
                        throw e
                    }
                    let lastDistanceFoot = e.lastDistance.In(Distance.Foot)
                    let proportion = lastDistanceFoot / zeroDistance
                    height = (e.incompleteTrajectory[-1].height.In(Distance.Foot)) / proportion
                } else {
                    throw e
                }
            }

            zeroFindingError = Math.abs(height - heightAtZero)

            if (zeroFindingError > cZeroFindingAccuracy) {
                this._tProps.barrelElevation -= (height - heightAtZero) / zeroDistance
            } else {
                break
            }
            iterationsCount += 1
        }

        if (zeroFindingError > cZeroFindingAccuracy) {
            throw new ZeroFindingError(
                zeroFindingError,
                iterationsCount,
                UNew.Radian(this._tProps.barrelElevation)
            )
        }
        return UNew.Radian(this._tProps.barrelElevation)
    }


    trajectory(shotInfo: Shot, maxRange: Distance, distStep: Distance, extraData: boolean = false, timeStep: number = 0.0): TrajectoryData[] {
        let filterFlags = TrajFlag.RANGE
        if (extraData) {
            filterFlags = TrajFlag.ALL
        }
        this._initTrajectory(shotInfo)
        return this._integrate(shotInfo, maxRange.In(Distance.Foot), distStep.In(Distance.Foot), filterFlags, timeStep)
    }

    /**
     * Initializes the trajectory properties based on the provided shot information.
     * @param {Shot} shotInfo - The shot information including weapon, ammo, and environmental conditions.
     * @private
     */
    protected _initTrajectory(shotInfo: Shot): void {
        this._bc = shotInfo.ammo.dm.bc,
            this._tableData = shotInfo.ammo.dm.dragTable
        this._curve = calculateCurve(this._tableData)

        this.__mach_list = getOnlyMachData(this._tableData)

        this._tProps = {
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
            calcStep: this.getCalcStep(),
            muzzleVelocity: shotInfo.ammo.getVelocityForTemp(shotInfo.atmo.powderTemp).In(Velocity.FPS),
            stabilityCoefficient: 0
        }
        this._tProps.stabilityCoefficient = this.calcStabilityCoefficient(shotInfo.atmo)
    }

    protected _integrate(shotInfo: Shot, maximumRange: number, recordStep: number, filterFlags: TrajFlag, timeStep: number = 0.0): TrajectoryData[] {
        const { cMinimumVelocity, cMaximumDrop, cMinimumAltitude } = this._config

        let ranges: TrajectoryData[] = [];
        let time: number = .0;
        let drag: number = .0;

        let mach: number = .0
        let densityFactor: number = .0

        const windSock = new WindSock(shotInfo.winds)
        let windVector = windSock.currentVector()

        let velocity: number = this._tProps.muzzleVelocity

        let rangeVector: Vector = new Vector(
            .0,
            -this._tProps.cantCosine * this._tProps.sightHeight,
            -this._tProps.cantSine * this._tProps.sightHeight
        )
        let velocityVector: Vector = new Vector(
            Math.cos(this._tProps.barrelElevation) * Math.cos(this._tProps.barrelAzimuth),
            Math.sin(this._tProps.barrelElevation),
            Math.cos(this._tProps.barrelElevation) * Math.sin(this._tProps.barrelAzimuth)
        ).mulByConst(velocity)

        const minStep = Math.min(this._tProps.calcStep, recordStep)
        const dataFilter = new TrajectoryDataFilter(filterFlags, recordStep, rangeVector, velocityVector, timeStep)
        dataFilter.setupSeenZero(rangeVector.y, this._tProps.barrelElevation, this._tProps.lookAngle)

        while (rangeVector.x <= maximumRange + minStep) {
            dataFilter.clearCurrentFlag()

            if (rangeVector.x >= windSock.nextRange) {
                windVector = windSock.vectorForRange(rangeVector.x)
            }

            [densityFactor, mach] = shotInfo.atmo.getDensityFactorAndMachForAltitude(this._tProps.alt0 + rangeVector.y)

            if (filterFlags) {
                const data = dataFilter.shouldRecord(rangeVector, velocityVector, mach, time)
                if (data) {
                    ranges.push(
                        createTrajectoryRow(
                            data.time, data.position, data.velocity, data.velocity.magnitude(),
                            data.mach, this.spinDrift(data.time), this._tProps.lookAngle,
                            densityFactor, drag, this._tProps.weight, dataFilter.currentFlag,
                        )
                    )
                }
            }

            let velocityAdjusted = velocityVector.subtract(windVector)
            velocity = velocityAdjusted.magnitude()
            let deltaTime = this._tProps.calcStep / Math.max(1.0, velocity)
            drag = densityFactor * velocity * this.dragByMach(velocity / mach)
            velocityVector = velocityVector.subtract((velocityAdjusted.mulByConst(drag).subtract(this.gravityVector)).mulByConst(deltaTime))
            let deltaRangeVector = velocityVector.mulByConst(deltaTime)
            rangeVector = rangeVector.add(deltaRangeVector)
            velocity = velocityVector.magnitude()
            time += deltaTime

            if (
                velocity < cMinimumVelocity
                || rangeVector.y < cMaximumDrop
                || this._tProps.alt0 + rangeVector.y < cMinimumAltitude
            ) {
                ranges.push(
                    createTrajectoryRow(
                        time, velocityVector, rangeVector, velocity, mach,
                        this.spinDrift(time), this._tProps.lookAngle, densityFactor, drag,
                        this._tProps.weight, dataFilter.currentFlag
                    )
                )

                let reason = ""
                if (velocity < cMinimumVelocity) {
                    reason = RangeError.MinimumVelocityReached
                } else if (rangeVector.y < cMaximumDrop) {
                    reason = RangeError.MaximumDropReached
                } else {
                    reason = RangeError.MinimumAltitudeReached
                }
                throw new RangeError(reason, ranges)
            }

        }

        if (ranges.length < 2) {
            ranges.push(
                createTrajectoryRow(
                    time, rangeVector, velocityVector,
                    velocity, mach, this.spinDrift(time), this._tProps.lookAngle,
                    densityFactor, drag, this._tProps.weight, TrajFlag.NONE
                )
            )
        }
        return ranges
    }

    /**
     * Retrieves the calculation step size for trajectory calculations.
     * @param {number} [step=0] - The step size to retrieve.
     * @returns {number} The calculation step size.
     */
    getCalcStep(step: number = 0): number {
        const preferredStep = this._config.maxCalcStepSizeFeet;

        if (step === 0) {
            return preferredStep / 2.0;
        }
        return Math.min(step, preferredStep) / 2.0;
    }

    /**
     * Calculates the drag coefficient for a given Mach number.
     * @param {number} mach - The Mach number for which the drag coefficient is to be calculated.
     * @returns {number} - The calculated drag coefficient for the provided Mach number.
     */
    dragByMach(mach: number): number {
        const cd = calculateByCurveAndMachList(this.__mach_list, this._curve, mach); // Assuming `calculateByCurve` exists
        return cd * 2.08551e-04 / this._bc;
    }

    /**
     * Calculates the spin drift of the projectile over time.
     * @param {number} time - The time in seconds for which the spin drift is to be calculated.
     * @returns {number} - The calculated spin drift in inches over the specified time.
     */
    spinDrift(time: number): number {
        if (this._tProps.twist !== 0) {
            const sign = this._tProps.twist > 0 ? 1 : -1;
            return sign * (1.25 * (this._tProps.stabilityCoefficient + 1.2) * Math.pow(time, 1.83)) / 12;
        }
        return 0;
    }

    /**
     * Calculates the stability coefficient of the projectile based on atmospheric conditions.
     * @param {Atmo} atmo - The atmospheric conditions including temperature, pressure, and humidity.
     * @returns {number} - The calculated stability coefficient.
     */
    calcStabilityCoefficient(atmo: Atmo): number {
        const { twist, length, weight, diameter, muzzleVelocity } = this._tProps
        if (twist && length && diameter && atmo.pressure.rawValue) {
            const twistRate = Math.abs(twist) / diameter;
            const lengthRatio = length / diameter;

            // Miller stability formula
            const sd = 30 * weight / (
                Math.pow(twistRate, 2) * Math.pow(diameter, 3) * lengthRatio * (1 + Math.pow(lengthRatio, 2))
            );

            // Velocity correction factor
            const fv = Math.pow(muzzleVelocity / 2800, 1.0 / 3.0);

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
export const createTrajectoryRow = (
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
): TrajectoryData => {
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
export const getCorrection = (distance: number, offset: number): number => {
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
export const calculateEnergy = (bulletWeight: number, velocity: number): number => {
    // energy in ft-lbs
    return bulletWeight * Math.pow(velocity, 2) / 450400
}

/**
 * Calculates the optical ground weight (OGW) of a bullet based on its weight and velocity.
 * @param {number} bulletWeight - The weight of the bullet in grains.
 * @param {number} velocity - The velocity of the bullet in feet per second (FPS).
 * @returns {number} - The calculated optical ground weight.
 */
export const calculateOGW = (bulletWeight: number, velocity: number): number => {
    // Optimal Game Weight in pounds
    return Math.pow(bulletWeight, 2) * Math.pow(velocity, 3) * 1.5e-12
}

/**
 * Calculates a curve based on drag data points for trajectory analysis.
 * @param {DragTable} dataPoints - An array of `DragDataPoint` objects representing the drag data.
 * @returns {Curve} - An array of `CurvePoint` objects representing the calculated curve.
 */
export const calculateCurve = (dataPoints: DragTable): Curve => {
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


// Extracts Mach values from a list of DragDataPoint objects.
export const getOnlyMachData = (data: DragTable): number[] => {
    return data.map(item => item.Mach)
}


export const calculateByCurveAndMachList = (machList: number[], curve: Curve, mach: number) => {
    let m: number = 0;
    let mid: number = 0;
    let mlo: number = 0;
    let mhi: number = curve.length - 2;

    while (mhi - mlo > 1) {
        mid = Math.round((mhi + mlo) / 2.0);
        if (machList[mid] < mach) {
            mlo = mid;
        } else {
            mhi = mid;
        }

        if (machList[mhi] - mach > mach - machList[mlo]) {
            m = mlo;
        } else {
            m = mhi;
        }
    }
    const curveM: CurvePoint = curve[m];
    return curveM.c + mach * (curveM.b + curveM.a * mach);
}


// Export the classes and constants
export default EulerEngine;
export {
    WindSock, TrajectoryDataFilter, EulerEngineConfig,
    getGlobalMaxCalcStepSize,
    setGlobalMaxCalcStepSize,
    resetGlobals
}
