import { Vector, VectorAllocator } from "./vector";
import { BaseTrajDataHandlerInterface } from "./traj_data";
import { Termination, TerminationReason } from "./base_types";
import { BaseEngine } from "./engine";
import { ValueError } from "../exceptions";


const calculateDvdt = (
    v: Readonly<Vector>,
    gravity_plus_coriolis: Readonly<Vector>,
    km_coeff: number,
    v_mag: number,
    acceleration: Vector
): void => {
    acceleration.linearCombination(gravity_plus_coriolis, 1.0, v, -km_coeff * v_mag);
}

/**
 * Fourth-order Runge-Kutta trajectory integration
 * Explicit memory layout for optimal cache performance
 */
const integrateRK4 = (
    eng: BaseEngine,
    handler: BaseTrajDataHandlerInterface,
    termination: Termination,
): void => {
    if (!eng.shot) {
        throw new ValueError("Invalid ShotProps");
    }

    // Scalars
    let velocity = 0.0;
    let delta_time = 0.0;
    let density_ratio = 0.0;
    let mach = 0.0;
    let time = 0.0;
    let km = 0.0;

    // === EXPLICIT MEMORY LAYOUT (17 vectors) ===
    // Layout:
    //   0-6:   State vectors (7)
    //   7-14:  RK4 intermediate vectors (8)
    //   15-16: Work buffers (2)

    const alloc = new VectorAllocator(17);

    // State vectors: indices 0-6
    const [
        range_vector,           // 0
        velocity_vector,        // 1
        relative_velocity,      // 2
        gravity_vector,         // 3
        wind_vector,            // 4
        coriolis_acc,           // 5
        gravity_plus_coriolis   // 6
    ] = alloc.get(0, 7);

    // RK4 intermediate vectors: indices 7-14
    const [
        k1_v,  // 7
        k2_v,  // 8
        k3_v,  // 9
        k4_v,  // 10
        k1_p,  // 11
        k2_p,  // 12
        k3_p,  // 13
        k4_p   // 14
    ] = alloc.get(7, 8);

    // Work buffers: indices 15-16
    const [v_temp, p_temp] = alloc.get(15, 2);

    termination.reason = TerminationReason.NO_TERMINATE;
    eng.integration_step_count = 0;

    // Initialize gravity
    gravity_vector.set(0, eng.config.cGravityConstant, 0);

    // Get initial wind
    const initial_wind = eng.shot.windSock.currentVector();
    wind_vector.assign(initial_wind);

    // Initialize projectile state
    velocity = eng.shot.muzzleVelocity;
    delta_time = eng.shot.calcStep;

    range_vector.set(
        0,
        -eng.shot.cantCosine * eng.shot.sightHeight,
        -eng.shot.cantSine * eng.shot.sightHeight
    );

    // Calculate initial direction
    const cos_elev = Math.cos(eng.shot.barrelElevation);
    const sin_elev = Math.sin(eng.shot.barrelElevation);
    const cos_az = Math.cos(eng.shot.barrelAzimuth);
    const sin_az = Math.sin(eng.shot.barrelAzimuth);

    velocity_vector.set(
        cos_elev * cos_az * velocity,
        sin_elev * velocity,
        cos_elev * sin_az * velocity
    );

    // Pre-compute RK4 constants
    const dt_half = 0.5 * delta_time;
    const dt_sixth = delta_time / 6.0;
    const dt_sixth_2 = 2.0 * dt_sixth;

    // Main integration loop
    while (termination.match(TerminationReason.NO_TERMINATE)) {
        eng.integration_step_count++;

        // Update wind if needed
        if (range_vector.x >= eng.shot.windSock.nextRange) {
            const new_wind = eng.shot.windSock.vectorForRange(range_vector.x);
            wind_vector.assign(new_wind);
        }

        // Update atmosphere
        [density_ratio, mach] = eng.shot.atmo.getDensityFactorAndMachForAltitude(
            eng.shot.alt0 + range_vector.y
        );

        handler.handle(time, range_vector, velocity_vector, mach);

        // Calculate relative velocity
        relative_velocity.assignSub(velocity_vector, wind_vector);
        const relative_speed = relative_velocity.mag();

        // Calculate drag
        const inv_mach = (mach !== 0.0) ? (1.0 / mach) : 1.0;
        km = density_ratio * eng.shot.dragByMach(relative_speed * inv_mach);

        // Gravity + Coriolis
        gravity_plus_coriolis.assign(gravity_vector);
        if (!eng.shot.coriolis.flatFireOnly) {
            coriolis_acc.zero();
            eng.shot.coriolis.coriolisAccelerationLocal(velocity_vector, coriolis_acc);
            gravity_plus_coriolis.iadd(coriolis_acc);
        }

        // === RK4 Integration ===

        // K1
        calculateDvdt(relative_velocity, gravity_plus_coriolis, km, relative_speed, k1_v);
        k1_p.assign(velocity_vector);

        // K2
        v_temp.assignAndFMA(relative_velocity, k1_v, dt_half);
        calculateDvdt(v_temp, gravity_plus_coriolis, km, v_temp.mag(), k2_v);
        p_temp.assignAndFMA(velocity_vector, k1_v, dt_half);
        k2_p.assign(p_temp);

        // K3
        v_temp.assignAndFMA(relative_velocity, k2_v, dt_half);
        calculateDvdt(v_temp, gravity_plus_coriolis, km, v_temp.mag(), k3_v);
        p_temp.assignAndFMA(velocity_vector, k2_v, dt_half);
        k3_p.assign(p_temp);

        // K4
        v_temp.assignAndFMA(relative_velocity, k3_v, delta_time);
        calculateDvdt(v_temp, gravity_plus_coriolis, km, v_temp.mag(), k4_v);
        p_temp.assignAndFMA(velocity_vector, k3_v, delta_time);
        k4_p.assign(p_temp);

        // Update velocity
        velocity_vector.fusedMultiplyAdd(k1_v, dt_sixth);
        velocity_vector.fusedMultiplyAdd(k2_v, dt_sixth_2);
        velocity_vector.fusedMultiplyAdd(k3_v, dt_sixth_2);
        velocity_vector.fusedMultiplyAdd(k4_v, dt_sixth);

        // Update position
        range_vector.fusedMultiplyAdd(k1_p, dt_sixth);
        range_vector.fusedMultiplyAdd(k2_p, dt_sixth_2);
        range_vector.fusedMultiplyAdd(k3_p, dt_sixth_2);
        range_vector.fusedMultiplyAdd(k4_p, dt_sixth);

        velocity = velocity_vector.mag();
        time += delta_time;
    }

    handler.handle(time, range_vector, velocity_vector, mach);
}

export { integrateRK4 };
