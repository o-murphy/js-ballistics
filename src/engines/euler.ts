import { Shot } from "../conditions";
import { TrajectoryData, TrajFlag } from "../trajectory_data";
import Vector from "../vector";
import { IntegrationRangeError } from "../exceptions";
import { EngineInterface } from "../generics/engine";
import {
    BaseEngineConfig,
    BaseIntegrationEngine,
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
        let ranges: TrajectoryData[] = [];
        let time: number = 0.0;
        let drag: number = 0.0;

        let mach: number = 0.0;
        let densityFactor: number = 0.0;

        const windSock = new _WindSock(shotInfo.winds);
        let windVector = windSock.currentVector();

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
        dataFilter.setupSeenZero(rangeVector.y, barrelElevation, lookAngle);

        let lastRecordedRange = 0.0;
        while (
            rangeVector.x <= maximumRange + minStep ||
            (filterFlags && lastRecordedRange <= maximumRange - 1e-6)
        ) {
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
                            data.velocity.mag(),
                            data.mach,
                            this.spinDrift(data.time),
                            lookAngle,
                            densityFactor,
                            drag,
                            weight,
                            dataFilter.currentFlag,
                        ),
                    );
                    lastRecordedRange = data.position.x;
                }
            }

            const velocityAdjusted = velocityVector.sub(windVector);
            velocity = velocityAdjusted.mag();
            const deltaTime = calcStep / Math.max(1.0, velocity);
            drag = densityFactor * velocity * this.dragByMach(velocity / mach);
            velocityVector = velocityVector.sub(
                velocityAdjusted
                    .mulByConst(drag)
                    .sub(this.gravityVector)
                    .mulByConst(deltaTime),
            );
            const deltaRangeVector = velocityVector.mulByConst(deltaTime);
            rangeVector = rangeVector.add(deltaRangeVector);
            velocity = velocityVector.mag();
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
                    reason = IntegrationRangeError.MinimumVelocityReached;
                } else if (rangeVector.y < cMaximumDrop) {
                    reason = IntegrationRangeError.MaximumDropReached;
                } else {
                    reason = IntegrationRangeError.MinimumAltitudeReached;
                }
                throw new IntegrationRangeError(reason, ranges);
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

export default EulerIntegrationEngine;
