import { Vector } from "./vector";
import { Config, ShotProps, Termination, TerminationReason, TrajFlag } from "./base_types";
import { BaseTrajData, BaseTrajDataHandlerCompositor, BaseTrajDataHandlerInterface, BaseTrajSeq, RawTrajectoryData } from "./traj_data";
import { ValueError } from "../exceptions";

enum ZeroInitialStatus {
    CONTINUE,
    DONE
}

type ZeroInitialData = {
    status: ZeroInitialStatus;
    look_angle_rad: number;
    slant_range_ft: number;
    target_x_ft: number;
    target_y_ft: number;
    start_height_ft: number;
}

type MaxRangeResult = {
    max_range_ft: number;
    angle_at_max_rad: number;
};

type IntegrateFunc = (
    eng: BaseEngine,
    handler: BaseTrajDataHandlerInterface,
    reason: Termination
) => void;

class BaseEngine {
    static readonly MAX_INTEGRATION_RANGE = 9e9;

    public integration_step_count: number;
    public gravity_vector: Vector;
    public config?: Config;
    public shot?: ShotProps;
    public integrate_func?: IntegrateFunc;

    constructor() {
        this.integration_step_count = 0;
        this.gravity_vector = new Vector();
        this.integrate_func = undefined;
    }

    /**
     * @brief Calls the underlying integration function for the projectile trajectory.
     *
     * @param range_limit_ft
     * @param handler Reference to a data handler for trajectory recording.
     * @param termination Reference to store termination reason.
     *
     * @throws std::logic_error if integrate_func is null.
     */
    integrate(range_limit_ft: number,
        handler: BaseTrajDataHandlerInterface,
        termination: Termination): void {
        this.integrateFuncNotEmpty();

        // Essential termination reason control
        const terminators = new EssentialTerminators(
            this.shot,
            range_limit_ft,
            this.config?.cMinimumVelocity,
            this.config?.cMaximumDrop,
            this.config?.cMinimumAltitude,
            termination
        );

        const composite_handler = new BaseTrajDataHandlerCompositor(
            terminators, // Essential terminators
            handler, // Request handler
        );

        this.integrate_func && this.integrate_func(this, composite_handler, termination);

        const reason = termination.reason;
        if (reason === TerminationReason.TARGET_RANGE_REACHED) {
            console.info(`Integration completed successfully: (${reason}).`);
        } else {
            console.info(`Integration completed with acceptable termination reason: (${reason}).`);
        }
    };

    /**
     * @brief Performs trajectory integration and interpolates a single data point
     * where a specific key attribute reaches a target value.
     *
     * This method runs a full trajectory integration internally, using
     * BCLIBC_SinglePointHandler to find and interpolate the point where the
     * specified key (e.g., 'time', 'mach', 'position.z') equals the target value.
     * The integration runs up to MAX_INTEGRATION_RANGE using a default timestep (0.0).
     *
     * @param key The interpolation key (e.g., time, altitude, vector component)
     * to use as the independent variable.
     * @param target_value The value the key attribute must reach for the
     * integration to terminate and interpolation to occur.
     * @returns raw_data Reference to a BCLIBC_BaseTrajData object that will store
     * the interpolated raw data point upon success.
     * @returns full_data Reference to a BCLIBC_TrajectoryData object that will store
     * the full (processed) interpolated data point upon success.
     *
     * @note Access to the engine is protected by engine_mutex.
     * the actual step size is determined internally by the integrator.
     *
     * @throws std::logic_error if integrate_func is null.
     * @throws BCLIBC_InterceptionError if the target point is not found within the
     * integrated trajectory (e.g., "No apex flagged...").
     */
    integrateAt(key: keyof BaseTrajData,
        target_value: number): [BaseTrajData, RawTrajectoryData] {

        const termination = new Termination();
        const handler = new SinglePointHandler(key, target_value, termination);

        this.integrate(BaseEngine.MAX_INTEGRATION_RANGE, handler, termination);

        if (!handler.found) {
            const raw_data = handler.last;
            Object.assign(raw_data, RawTrajectoryData.fromBasetrajData(this.shot, raw_data));
            throw new InterceptionError(
                "Intercept point not found for target key and value",
                raw_data,
                full_data);
        }
        const raw_data = handler.result;
        return [raw_data, RawTrajectoryData.fromBasetrajData(this.shot, raw_data)]
    };

    /**
     * @brief Integrates the projectile trajectory using filters and optional dense trajectory storage.
     *
     * @param range_limit_ft Maximum range for integration in feet.
     * @param range_step_ft Step size along the range in feet for recording data.
     * @param time_step Integration timestep in seconds.
     * @param filter_flags Flags specifying which trajectory points to record.
     * @param records Vector to store filtered trajectory data.
     * @param termination Reference to store the termination reason.
     * @param dense_trajectory Optional pointer to store full dense trajectory data.
     *
     * @throws std::logic_error if integrate_func is null.
     */
    integrateFiltered(
        range_limit_ft: number,
        range_step_ft: number,
        time_step: number,
        filter_flags: TrajFlag,
        records: RawTrajectoryData[],
        termination: Termination,
        dense_trajectory?: BaseTrajSeq): void {

        // 1. Create a mandatory filter/writer ON THE HEAP using unique_ptr.
        // This ensures that a large object does not pollute the stack frame.
        const data_filter = new TrajectoryDataFilter(
            records,
            this.shot,
            filter_flags,
            termination,
            range_limit_ft,
            range_step_ft,
            time_step
        );

        // 2. Create the Composer (on the stack, it's small and now safer)
        const composite_handler = new BaseTrajDataHandlerCompositor(
            data_filter
        );

        // 3. Add the optional trajectory
        if (dense_trajectory) {
            composite_handler.add(dense_trajectory);
        }

        // 4. Call integration ONCE, passing the composite
        this.integrate(range_limit_ft, composite_handler, termination);
    };

    /**
     * @brief Finds the apex (highest point) of the trajectory.
     *
     * @param apex_out Output variable to store apex trajectory data.
     *
     * @throws std::invalid_argument if barrel elevation is <= 0.
     * @throws BCLIBC_ZeroFindingError if apex cannot be determined.
     *
     * OPTIMIZATION: Uses ~192 bytes instead of ~N*64 bytes for full trajectory.
     */
    findApex(apex_out: BaseTrajData): void {
        if (this.shot.barrelElevation <= 0) {
            throw new ValueError(
                "Value error (Barrel elevation must be greater than 0 to find apex).");
        }

        const termination = new Termination();

        // Backup and adjust constraints
        ...
    };

    errorAtDistance(angle_rad: number,
        target_x_ft: number,
        target_y_ft: number): number {... };

    initZeroCalculation(
        distance: number,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): ZeroInitialData {... };

    findMaxRange(
        low_angle_deg: number,
        high_angle_deg: number,
        APEX_IS_MAX_RANGE_RADIANS: number): MaxRangeResult {... };

    zeroAngleWithFallback(
        distance: number,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): number {... };

    zeroAngle(
        distance: number,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): number {... };

    rangeForAngle(angle_rad: number): number {... };

    findZeroAngle(
        distance: number,
        lofted: boolean,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): number {... };

    private integrateFuncNotEmpty(): void {
        if (!this.integrate_func) {
            throw new ValueError("Invalid integrate_func: is empty (no callable object assigned).")
        }
    }
}

export { BaseEngine };
