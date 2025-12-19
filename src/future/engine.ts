import { Vector } from "./vector";
import { Config, ShotProps, Termination, TrajFlag } from "./base_types";
import { BaseTrajData, BaseTrajDataHandlerInterface, BaseTrajSeq } from "./traj_data";
import { TrajectoryData } from "../trajectory_data";

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
    }

    integrate(range_limit_ft: number,
        handler: BaseTrajDataHandlerInterface,
        reason: Termination): void { };

    integrateAt(key: keyof BaseTrajData,
        target_value: number,
        raw_data: BaseTrajData,
        full_data: TrajectoryData): void { };

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
        records: TrajectoryData[],
        termination: Termination,
        dense_trajectory: BaseTrajSeq): void {... };

    findApex(apex_out: BaseTrajData): void {... };

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

    private integrateFuncNotEmpty(): void {... };
}

export { BaseEngine };
