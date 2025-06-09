import { HitResult, TrajectoryData, TrajFlag } from "./trajectory_data"
import { Angular, Distance, UNew, Unit, Velocity } from "./unit"


export const EARTH_GRAVITY_CONSTANT_IN_SI: number = 9.81  // Acceleration due to gravity (m/s^2)

// Compute the maximal range for the projectile launched with `velocity_mps` with angle `angle_in_degrees`.
//    The result assumes absence of drag force - so this distance will definitely overestimate (ca 4 times)
//    the range in presence of drag force.
export const calculateDragFreeRange = (velocityMPS: number, angleDegree: number, gravity: number = EARTH_GRAVITY_CONSTANT_IN_SI): number => {
    const angleRad = UNew.Degree(angleDegree).In(Angular.Radian)
    return (Math.pow(velocityMPS, 2) * Math.sin(2 * angleDegree)) / gravity
}

// Search sequentially for the index of first point in the trajectory, which matches condition.
export const findFirstIndexMatchingCondition = (hit: HitResult, condition: (point: TrajectoryData) => number): number => {
    hit.trajectory.forEach((point, i) => {
        if (condition(point)) {
            return i
        }
    });
    return -1
}

// Find index of first point, for which `flag` is set.
export const findIndexOfPointWithFlag = (hit: HitResult, flag: TrajFlag = TrajFlag.ZERO_DOWN): number => {
    return findFirstIndexMatchingCondition(hit, (p: TrajectoryData) => p.flag & flag)
}

// Find index of point for which TrjFlag.MACH was set.
//    Note - this requires calling calculator with extra_data=True.
export const findMachPointIndex = (hit: HitResult): number => {
    return findIndexOfPointWithFlag(hit, TrajFlag.MACH)
}


// Find index of point when earth was hit by the bullet.
//    Note - this requires calling calculator with extra_data=True.
export const findTouchPointIndex = (hit: HitResult, velocityInUnits: number, velocityUnit: Unit = Unit.MPS): number => {
    return findFirstIndexMatchingCondition(hit, (p: TrajectoryData): number => Number(p.velocity.In(velocityUnit) < velocityInUnits))
}
