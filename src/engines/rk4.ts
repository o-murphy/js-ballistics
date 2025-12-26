import { Shot } from "../conditions";
import { TrajectoryData, TrajFlag } from "../trajectory_data";
import Vector from "../vector";
import { RangeError } from "../exceptions";
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
    implements EngineInterface<BaseEngineConfig> {
    /**
     * Retrieves the calculation step size for trajectory calculations.
     * @param {number} [step=0] - The step size to retrieve.
     * @returns {number} The calculation step size.
     */
    getCalcStep(step: number = 0): number {
        return Math.pow(super.getCalcStep(step), 0.5);
    }

    protected _integrate(
        shotInfo: Shot,
        maximumRange: number,
        recordStep: number,
        filterFlags: TrajFlag,
        timeStep: number = 0.0
    ): TrajectoryData[] {
        const { cMinimumVelocity, cMaximumDrop, cMinimumAltitude } = this._config;

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
            -cantSine * sightHeight
        );
        let velocityVector: Vector = new Vector(
            Math.cos(barrelElevation) * Math.cos(barrelAzimuth),
            Math.sin(barrelElevation),
            Math.cos(barrelElevation) * Math.sin(barrelAzimuth)
        ).mul(velocity);

        const minStep = Math.min(calcStep, recordStep);

        const dataFilter = new _TrajectoryDataFilter(
            filterFlags,
            recordStep,
            rangeVector,
            velocityVector,
            timeStep
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

            [densityFactor, mach] = shotInfo.atmo.getDensityFactorAndMachForAltitude(
                alt0 + rangeVector.y
            );

            if (filterFlags) {
                const data = dataFilter.shouldRecord(rangeVector, velocityVector, mach, time);
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
                            dataFilter.currentFlag
                        )
                    );
                    lastRecordedRange = data.position.x;
                }
            }

            const relativeVelocity = velocityVector.sub(windVector);
            const relativeSpeed = relativeVelocity.mag();
            const deltaTime = calcStep / Math.max(1.0, relativeSpeed);
            const km = densityFactor * this.dragByMach(relativeSpeed / mach);
            drag = km * relativeSpeed;

            const f = (v: Vector): Vector => {
                return this.gravityVector.sub(v.mul(km).mul(v.mag()));
            };

            const v1: Vector = f(relativeVelocity).mul(deltaTime);
            const v2: Vector = f(relativeVelocity.add(v1.mul(0.5))).mul(deltaTime);
            const v3: Vector = f(relativeVelocity.add(v2.mul(0.5))).mul(deltaTime);
            const v4: Vector = f(relativeVelocity.add(v3)).mul(deltaTime);
            const p1: Vector = velocityVector.mul(deltaTime);
            const p2: Vector = velocityVector.add(p1.mul(0.5)).mul(deltaTime);
            const p3: Vector = velocityVector.add(p2.mul(0.5)).mul(deltaTime);
            const p4: Vector = velocityVector.add(p3).mul(deltaTime);

            velocityVector = velocityVector.add(
                Vector.sum(v1, v2.mul(2), v3.mul(2), v4).mul(1 / 6.0)
            );

            rangeVector = rangeVector.add(
                Vector.sum(p1, p2.mul(2), p3.mul(2), p4).mul(1 / 6.0)
            );

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
                        dataFilter.currentFlag
                    )
                );

                let reason = "";
                if (velocity < cMinimumVelocity) {
                    reason = RangeError.MinimumVelocityReached;
                } else if (rangeVector.y < cMaximumDrop) {
                    reason = RangeError.MaximumDropReached;
                } else {
                    reason = RangeError.MinimumAltitudeReached;
                }
                throw new RangeError(reason, ranges);
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
                    TrajFlag.NONE
                )
            );
        }
        return ranges;
    }
}

export default RK4IntegrationEngine;
