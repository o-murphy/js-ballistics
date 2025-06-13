import { Shot } from "../conditions";
import { TrajectoryData, TrajFlag } from "../trajectory_data";
import Vector from "../vector";
import { TrajectoryRangeError } from "../exceptions";
import { EngineInterface } from "../generics/engine";
import {
    BaseEngineConfig,
    BaseIntegrationEngine,
    createTrajectoryRow,
    _TrajectoryDataFilter,
    _WindSock,
} from "./base_engine";

class RK4IntegrationEngine
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

        // const rkCalcStep = 4 * calcStep;
        const rkCalcStep = calcStep ** (1 / 2);
        const minStep = Math.min(rkCalcStep, recordStep);

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
                    lastRecordedRange = data.position.x;
                }
            }

            const relativeVelocity = velocityVector.subtract(windVector);
            const relativeSpeed = relativeVelocity.magnitude();
            const deltaTime = rkCalcStep / Math.max(1.0, relativeSpeed);
            const km = densityFactor * this.dragByMach(relativeSpeed / mach);
            drag = km * relativeSpeed;

            const f = (v: Vector): Vector => {
                return this.gravityVector.subtract(
                    v.mulByConst(km).mulByConst(v.magnitude()),
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

export default RK4IntegrationEngine;
