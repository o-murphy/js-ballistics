import { Shot } from "../conditions";
import { TrajectoryRangeError } from "../exceptions";
import { EngineInterface } from "../generics/engine";
import { TrajFlag, TrajectoryData } from "../trajectory_data";
import Vector from "../vector";
import {
    _TrajectoryDataFilter,
    _WindSock,
    BaseEngineConfig,
    BaseIntegrationEngine,
    createTrajectoryRow,
} from "./base_engine";

class RK4IntegrationEngine
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

        const rkCalcStep = 4 * this._tProps.calcStep;
        const minStep = Math.min(rkCalcStep, recordStep);

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

        let lastRecordedRange = 0.0;
        while (
            rangeVector.x <= maximumRange + minStep ||
            (filterFlags && lastRecordedRange <= maximumRange - 1e-6)
        ) {
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
                    lastRecordedRange = data.position.x;
                }
            }

            const relativeVelocity = velocityVector.subtract(windVector);
            const relativeSpeed = relativeVelocity.magnitude();
            const deltaTime = rkCalcStep / Math.max(1.0, relativeSpeed);
            const km = densityFactor * this.dragByMach(relativeSpeed / mach);

            const f = (v: Vector): Vector => {
                return this.gravityVector.subtract(
                    v.mulByConst(km).mulByConst(v.magnitude())
                );
            };

            const v1: Vector = f(relativeVelocity).mulByConst(deltaTime);
            const v2: Vector = f(
                relativeVelocity.add(v1.mulByConst(0.5)),
            ).mulByConst(deltaTime);
            const v3: Vector = f(
                relativeVelocity.add(v2.mulByConst(0.5)),
            ).mulByConst(deltaTime);
            const v4: Vector = f(relativeVelocity.add(v3)).mulByConst(
                deltaTime,
            );
            const p1: Vector = velocityVector;
            const p2: Vector = velocityVector
                .add(p1.mulByConst(0.5))
                .mulByConst(deltaTime);
            const p3: Vector = velocityVector
                .add(p2.mulByConst(0.5))
                .mulByConst(deltaTime);
            const p4: Vector = velocityVector.add(p3).mulByConst(deltaTime);

            velocityVector = velocityVector.add(
                Vector.sum(
                    v1,
                    v2.mulByConst(2),
                    v3.mulByConst(2),
                    v4,
                ).mulByConst(1 / 6.0),
            );

            rangeVector = rangeVector.add(
                Vector.sum(
                    p1,
                    p2.mulByConst(2),
                    p3.mulByConst(2),
                    p4,
                ).mulByConst(1 / 6.0),
            );

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

export default RK4IntegrationEngine;
