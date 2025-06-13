import { Shot } from "../conditions";
import { TrajectoryData, TrajFlag } from "../trajectory_data";
import Vector from "../vector";
import { TrajectoryRangeError } from "../exceptions";
import { EngineInterface } from "../generics/engine";
import {
    BaseIntegrationEngine,
    BaseEngineConfig,
    createTrajectoryRow,
    _TrajectoryDataFilter,
    _WindSock,
} from "./base_engine";

class EulerIntegrationEngine
    extends BaseIntegrationEngine
    implements EngineInterface<BaseEngineConfig> {
    protected _integrate(
        shotInfo: Shot,
        maximumRange: number,
        recordStep: number,
        filterFlags: TrajFlag,
        timeStep: number = 0.0,
    ): TrajectoryData[] {
        const { cMinimumVelocity, cMaximumDrop, cMinimumAltitude } =
            this._config;

        let ranges: TrajectoryData[] = [];
        let time: number = 0.0;
        let drag: number = 0.0;

        let mach: number = 0.0;
        let densityFactor: number = 0.0;

        const windSock = new _WindSock(shotInfo.winds);
        let windVector = windSock.currentVector();

        const {
            muzzleVelocity,
            cantCosine,
            sightHeight,
            cantSine,
            barrelElevation,
            barrelAzimuth,
            calcStep,
            alt0,
            lookAngle,
            weight,
        } = this._tProps;

        let velocity: number = muzzleVelocity;

        let rangeVector: Vector = new Vector(
            0.0,
            -cantCosine * sightHeight,
            -cantSine * sightHeight,
        );
        let velocityVector: Vector = new Vector(
            Math.cos(barrelElevation) * Math.cos(barrelAzimuth),
            Math.sin(barrelElevation),
            Math.cos(barrelElevation) * Math.sin(barrelAzimuth),
        ).mulByConst(velocity);

        const minStep = Math.min(calcStep, recordStep);
        const dataFilter = new _TrajectoryDataFilter(
            filterFlags,
            recordStep,
            rangeVector,
            velocityVector,
            timeStep,
        );
        dataFilter.setupSeenZero(
            rangeVector.y,
            barrelElevation,
            lookAngle,
        );

        while (rangeVector.x <= maximumRange + minStep) {
            dataFilter.clearCurrentFlag();

            if (rangeVector.x >= windSock.nextRange) {
                windVector = windSock.vectorForRange(rangeVector.x);
            }

            [densityFactor, mach] =
                shotInfo.atmo.getDensityFactorAndMachForAltitude(
                    alt0 + rangeVector.y,
                );

            if (filterFlags) {
                const data = dataFilter.shouldRecord(
                    rangeVector,
                    velocityVector,
                    mach,
                    time,
                );
                if (data) {
                    ranges.push(
                        createTrajectoryRow(
                            data.time,
                            data.position,
                            data.velocity,
                            data.velocity.magnitude(),
                            data.mach,
                            this.spinDrift(data.time),
                            lookAngle,
                            densityFactor,
                            drag,
                            weight,
                            dataFilter.currentFlag,
                        ),
                    );
                }
            }

            let velocityAdjusted = velocityVector.subtract(windVector);
            velocity = velocityAdjusted.magnitude();
            let deltaTime = calcStep / Math.max(1.0, velocity);
            drag = densityFactor * velocity * this.dragByMach(velocity / mach);
            velocityVector = velocityVector.subtract(
                velocityAdjusted
                    .mulByConst(drag)
                    .subtract(this.gravityVector)
                    .mulByConst(deltaTime),
            );
            let deltaRangeVector = velocityVector.mulByConst(deltaTime);
            rangeVector = rangeVector.add(deltaRangeVector);
            velocity = velocityVector.magnitude();
            time += deltaTime;

            if (
                velocity < cMinimumVelocity ||
                rangeVector.y < cMaximumDrop ||
                alt0 + rangeVector.y < cMinimumAltitude
            ) {
                ranges.push(
                    createTrajectoryRow(
                        time,
                        rangeVector,
                        velocityVector,
                        velocity,
                        mach,
                        this.spinDrift(time),
                        lookAngle,
                        densityFactor,
                        drag,
                        weight,
                        dataFilter.currentFlag,
                    ),
                );

                let reason = "";
                if (velocity < cMinimumVelocity) {
                    reason = TrajectoryRangeError.MinimumVelocityReached;
                } else if (rangeVector.y < cMaximumDrop) {
                    reason = TrajectoryRangeError.MaximumDropReached;
                } else {
                    reason = TrajectoryRangeError.MinimumAltitudeReached;
                }
                throw new TrajectoryRangeError(reason, ranges);
            }
        }

        if (ranges.length < 2) {
            ranges.push(
                createTrajectoryRow(
                    time,
                    rangeVector,
                    velocityVector,
                    velocity,
                    mach,
                    this.spinDrift(time),
                    lookAngle,
                    densityFactor,
                    drag,
                    weight,
                    TrajFlag.NONE,
                ),
            );
        }

        return ranges;
    }
}

// Export the classes and constants
export default EulerIntegrationEngine;
