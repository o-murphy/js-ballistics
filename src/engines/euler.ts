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
    implements EngineInterface<BaseEngineConfig>
{
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

        let velocity: number = this._tProps.muzzleVelocity;

        let rangeVector: Vector = new Vector(
            0.0,
            -this._tProps.cantCosine * this._tProps.sightHeight,
            -this._tProps.cantSine * this._tProps.sightHeight,
        );
        let velocityVector: Vector = new Vector(
            Math.cos(this._tProps.barrelElevation) *
                Math.cos(this._tProps.barrelAzimuth),
            Math.sin(this._tProps.barrelElevation),
            Math.cos(this._tProps.barrelElevation) *
                Math.sin(this._tProps.barrelAzimuth),
        ).mulByConst(velocity);

        const minStep = Math.min(this._tProps.calcStep, recordStep);
        const dataFilter = new _TrajectoryDataFilter(
            filterFlags,
            recordStep,
            rangeVector,
            velocityVector,
            timeStep,
        );
        dataFilter.setupSeenZero(
            rangeVector.y,
            this._tProps.barrelElevation,
            this._tProps.lookAngle,
        );

        while (rangeVector.x <= maximumRange + minStep) {
            dataFilter.clearCurrentFlag();

            if (rangeVector.x >= windSock.nextRange) {
                windVector = windSock.vectorForRange(rangeVector.x);
            }

            [densityFactor, mach] =
                shotInfo.atmo.getDensityFactorAndMachForAltitude(
                    this._tProps.alt0 + rangeVector.y,
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
                            this._tProps.lookAngle,
                            densityFactor,
                            drag,
                            this._tProps.weight,
                            dataFilter.currentFlag,
                        ),
                    );
                }
            }

            let velocityAdjusted = velocityVector.subtract(windVector);
            velocity = velocityAdjusted.magnitude();
            let deltaTime = this._tProps.calcStep / Math.max(1.0, velocity);
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
                this._tProps.alt0 + rangeVector.y < cMinimumAltitude
            ) {
                ranges.push(
                    createTrajectoryRow(
                        time,
                        velocityVector,
                        rangeVector,
                        velocity,
                        mach,
                        this.spinDrift(time),
                        this._tProps.lookAngle,
                        densityFactor,
                        drag,
                        this._tProps.weight,
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
                    this._tProps.lookAngle,
                    densityFactor,
                    drag,
                    this._tProps.weight,
                    TrajFlag.NONE,
                ),
            );
        }
        return ranges;
    }
}

// Export the classes and constants
export default EulerIntegrationEngine;
