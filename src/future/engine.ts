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

    integrate_at(key: keyof BaseTrajData,
        target_value: number,
        raw_data: BaseTrajData,
        full_data: TrajectoryData): void { };

    integrate_filtered(
        range_limit_ft: number,
        range_step_ft: number,
        time_step: number,
        filter_flags: TrajFlag,
        records: TrajectoryData[],
        termination: Termination,
        dense_trajectory: BaseTrajSeq): void { };

    find_apex(apex_out: BaseTrajData): void { };

    error_at_distance(angle_rad: number,
        target_x_ft: number,
        target_y_ft: number): number { };

    init_zero_calculation(
        distance: number,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): ZeroInitialData { };

    find_max_range(
        low_angle_deg: number,
        high_angle_deg: number,
        APEX_IS_MAX_RANGE_RADIANS: number): MaxRangeResult { };

    zero_angle_with_fallback(
        distance: number,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): number { };

    zero_angle(
        distance: number,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): number { };

    range_for_angle(angle_rad: number): number { };

    find_zero_angle(
        distance: number,
        lofted: boolean,
        APEX_IS_MAX_RANGE_RADIANS: number,
        ALLOWED_ZERO_ERROR_FEET: number): number { };

    private integrate_func_not_empty(): void { };
}

export { BaseEngine };
