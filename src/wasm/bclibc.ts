/**
 * The functions of bclibc's flat C ABI as the JavaScript module the library uses (`MainModule`): the marshalling
 * of the arguments into the module's memory, the calls, and the results read back.
 */

import { Arena, BclibcExports, decodeBase64, errorFromStatus, Layout, LAYOUT_FIELD_COUNT, Memory, parseLayout, Status } from "./abi";
import type {
    _BaseTrajData,
    _Config,
    _HitOutput,
    _Interception,
    _MaxRangeResult,
    _ShotPropsInput,
    _TrajectoryData,
    _TrajectoryRequest,
    _ZeroPointResult,
    MainModule,
} from "./types";

const APEX_IS_MAX_RANGE_RADIANS = 0.0003;
const ALLOWED_ZERO_ERROR_FEET = 1e-2;

/** The module of bclibc, instantiated: no imports, its own memory. */
export async function instantiate(base64: string): Promise<MainModule> {
    const bytes = decodeBase64(base64);
    const { instance } = await WebAssembly.instantiate(bytes as BufferSource, {});
    const ex = instance.exports as unknown as BclibcExports;
    ex._initialize?.(); // a reactor: the static initializers run here, once
    return new Bclibc(ex).module();
}

class Bclibc {
    private readonly memory: Memory;
    private readonly L: Layout;

    constructor(private readonly ex: BclibcExports) {
        this.memory = new Memory(ex);
        this.L = this.readLayout();
    }

    private readLayout(): Layout {
        return this.memory.withArena((arena) => {
            const ptr = arena.alloc(LAYOUT_FIELD_COUNT * 4);
            const n = this.ex.BCLIBCFFI_get_layout(ptr, LAYOUT_FIELD_COUNT);
            if (n !== LAYOUT_FIELD_COUNT) {
                throw new Error(
                    `bclibc: BCLIBCFFI_get_layout gave ${n} fields, expected ${LAYOUT_FIELD_COUNT} ` +
                        "(the module and src/wasm/abi.ts are out of sync)"
                );
            }
            const view = arena.view();
            const values: number[] = [];
            for (let i = 0; i < n; i++) values.push(view.getInt32(ptr + i * 4, true));
            return parseLayout(values);
        });
    }

    // --- writing -----------------------------------------------------------------------------------------------

    private writeConfig(view: DataView, at: number, config: _Config): void {
        const c = this.L.config;
        view.setFloat64(at + c.stepMultiplier, config.stepMultiplier, true);
        view.setFloat64(at + c.zeroFindingAccuracy, config.zeroFindingAccuracy, true);
        view.setFloat64(at + c.minimumVelocity, config.minimumVelocity, true);
        view.setFloat64(at + c.maximumDrop, config.maximumDrop, true);
        view.setInt32(at + c.maxIterations, config.maxIterations, true);
        view.setFloat64(at + c.gravityConstant, config.gravityConstant, true);
        view.setFloat64(at + c.minimumAltitude, config.minimumAltitude, true);
    }

    /** A `BCLIBCFFI_Shot` (the shot in natural units: all the conversions are done in C++). */
    private writeShot(arena: Arena, props: _ShotPropsInput): number {
        const L = this.L;
        const table = Array.isArray(props.drag_table) ? props.drag_table : [];
        const winds = Array.isArray(props.winds) ? props.winds : [];
        const ptr = arena.alloc(L.shot.size);
        const mach = arena.alloc(table.length * 8);
        const cd = arena.alloc(table.length * 8);
        const windsPtr = arena.alloc(winds.length * L.wind.size);
        const v = arena.view(); // after the allocations: they may have grown the memory

        table.forEach((p, i) => {
            v.setFloat64(mach + i * 8, p.Mach, true);
            v.setFloat64(cd + i * 8, p.CD, true);
        });
        winds.forEach((w, i) => {
            const at = windsPtr + i * L.wind.size;
            v.setFloat64(at + L.wind.velocity_fps, w.velocity_fps, true);
            v.setFloat64(at + L.wind.direction_from_rad, w.direction_from_rad, true);
            v.setFloat64(at + L.wind.until_distance_ft, w.until_distance_ft, true);
            v.setFloat64(at + L.wind.max_distance_ft, w.MAX_DISTANCE_FEET, true);
        });

        const s = L.shot;
        const doubles: [number, number][] = [
            [s.bc, props.bc],
            [s.weight_grain, props.weight_grain],
            [s.diameter_inch, props.diameter_inch],
            [s.length_inch, props.length_inch],
            [s.muzzle_velocity_fps, props.muzzle_velocity_fps],
            [s.sight_height_ft, props.sight_height_ft],
            [s.twist_inch, props.twist_inch],
            [s.temp_c, props.temp_c],
            [s.pressure_hpa, props.pressure_hpa],
            [s.altitude_ft, props.altitude_ft],
            [s.humidity, props.humidity],
            [s.look_angle_rad, props.look_angle_rad],
            [s.barrel_elevation_rad, props.barrel_elevation_rad],
            [s.barrel_azimuth_rad, props.barrel_azimuth_rad],
            [s.cant_angle_rad, props.cant_angle_rad],
            [s.latitude_deg, props.latitude_deg],
            [s.azimuth_deg, props.azimuth_deg],
        ];
        for (const [offset, value] of doubles) v.setFloat64(ptr + offset, value, true);
        v.setUint32(ptr + s.mach_data, mach, true); // pointers are 4 bytes in wasm32
        v.setUint32(ptr + s.cd_data, cd, true);
        v.setInt32(ptr + s.drag_table_size, table.length, true);
        v.setUint32(ptr + s.winds, windsPtr, true);
        v.setInt32(ptr + s.wind_count, winds.length, true);
        this.writeConfig(v, ptr + s.config, props.config);
        v.setInt32(ptr + s.method, props.method, true);
        return ptr;
    }

    private writeTraj(v: DataView, at: number, d: _TrajectoryData): void {
        const t = this.L.traj;
        v.setFloat64(at + t.time, d.time, true);
        v.setFloat64(at + t.distance_ft, d.distance_ft, true);
        v.setFloat64(at + t.velocity_fps, d.velocity_fps, true);
        v.setFloat64(at + t.mach, d.mach, true);
        v.setFloat64(at + t.height_ft, d.height_ft, true);
        v.setFloat64(at + t.slant_height_ft, d.slant_height_ft, true);
        v.setFloat64(at + t.drop_angle_rad, d.drop_angle_rad, true);
        v.setFloat64(at + t.windage_ft, d.windage_ft, true);
        v.setFloat64(at + t.windage_angle_rad, d.windage_angle_rad, true);
        v.setFloat64(at + t.slant_distance_ft, d.slant_distance_ft, true);
        v.setFloat64(at + t.angle_rad, d.angle_rad, true);
        v.setFloat64(at + t.density_ratio, d.density_ratio, true);
        v.setFloat64(at + t.drag, d.drag, true);
        v.setFloat64(at + t.energy_ft_lb, d.energy_ft_lb, true);
        v.setFloat64(at + t.ogw_lb, d.ogw_lb, true);
        v.setInt32(at + t.flag, d.flag, true);
    }

    // --- reading -----------------------------------------------------------------------------------------------

    private readTraj(v: DataView, at: number): _TrajectoryData {
        const t = this.L.traj;
        return {
            time: v.getFloat64(at + t.time, true),
            distance_ft: v.getFloat64(at + t.distance_ft, true),
            velocity_fps: v.getFloat64(at + t.velocity_fps, true),
            mach: v.getFloat64(at + t.mach, true),
            height_ft: v.getFloat64(at + t.height_ft, true),
            slant_height_ft: v.getFloat64(at + t.slant_height_ft, true),
            drop_angle_rad: v.getFloat64(at + t.drop_angle_rad, true),
            windage_ft: v.getFloat64(at + t.windage_ft, true),
            windage_angle_rad: v.getFloat64(at + t.windage_angle_rad, true),
            slant_distance_ft: v.getFloat64(at + t.slant_distance_ft, true),
            angle_rad: v.getFloat64(at + t.angle_rad, true),
            density_ratio: v.getFloat64(at + t.density_ratio, true),
            drag: v.getFloat64(at + t.drag, true),
            energy_ft_lb: v.getFloat64(at + t.energy_ft_lb, true),
            ogw_lb: v.getFloat64(at + t.ogw_lb, true),
            flag: v.getInt32(at + t.flag, true) as _TrajectoryData["flag"],
        };
    }

    private readBaseTraj(v: DataView, at: number): _BaseTrajData {
        const b = this.L.baseTraj;
        const px = v.getFloat64(at + b.px, true);
        const py = v.getFloat64(at + b.py, true);
        const pz = v.getFloat64(at + b.pz, true);
        const vx = v.getFloat64(at + b.vx, true);
        const vy = v.getFloat64(at + b.vy, true);
        const vz = v.getFloat64(at + b.vz, true);
        return {
            time: v.getFloat64(at + b.time, true),
            px,
            py,
            pz,
            vx,
            vy,
            vz,
            mach: v.getFloat64(at + b.mach, true),
            position: { x: px, y: py, z: pz },
            velocity: { x: vx, y: vy, z: vz },
        };
    }

    // --- calls -------------------------------------------------------------------------------------------------

    /** Calls `fn(...args, err)` (the last argument of every call that can fail) and throws what it returned. */
    private check(arena: Arena, errPtr: number, status: number): void {
        if (status !== Status.OK) throw errorFromStatus(arena.view(), errPtr, this.L);
    }

    private findApex = (shot: _ShotPropsInput): _TrajectoryData =>
        this.memory.withArena((arena) => {
            const props = this.writeShot(arena, shot);
            const out = arena.alloc(this.L.traj.size);
            const err = arena.alloc(this.L.error.size);
            this.check(arena, err, this.ex.BCLIBCFFI_find_apex_shot(props, out, err));
            return this.readTraj(arena.view(), out);
        });

    private findMaxRange = (shot: _ShotPropsInput, lowAngleDeg: number, highAngleDeg: number): _MaxRangeResult =>
        this.memory.withArena((arena) => {
            const props = this.writeShot(arena, shot);
            const out = arena.alloc(this.L.maxRange.size);
            const err = arena.alloc(this.L.error.size);
            this.check(arena, err, this.ex.BCLIBCFFI_find_max_range_shot(props, lowAngleDeg, highAngleDeg, out, err));
            const v = arena.view();
            return {
                max_range_ft: v.getFloat64(out + this.L.maxRange.max_range_ft, true),
                angle_at_max_rad: v.getFloat64(out + this.L.maxRange.angle_at_max_rad, true),
            };
        });

    private findZeroAngle = (shot: _ShotPropsInput, distanceFt: number): number =>
        this.memory.withArena((arena) => {
            const props = this.writeShot(arena, shot);
            const out = arena.alloc(8);
            const err = arena.alloc(this.L.error.size);
            this.check(arena, err, this.ex.BCLIBCFFI_find_zero_angle_shot(props, distanceFt, out, err));
            return arena.view().getFloat64(out, true);
        });

    private findZeroPoint = (shot: _ShotPropsInput, distanceFt: number): _ZeroPointResult =>
        this.memory.withArena((arena) => {
            const props = this.writeShot(arena, shot);
            const out = arena.alloc(this.L.zeroPoint.size);
            const err = arena.alloc(this.L.error.size);
            this.check(arena, err, this.ex.BCLIBCFFI_find_zero_point_shot(props, distanceFt, out, err));
            const v = arena.view();
            return {
                angle_rad: v.getFloat64(out + this.L.zeroPoint.angle_rad, true),
                point: this.readTraj(v, out + this.L.zeroPoint.point),
                has_point: true, // the C ABI always evaluates the point (or fails)
            };
        });

    private integrate = (shot: _ShotPropsInput, request: _TrajectoryRequest): _HitOutput =>
        this.memory.withArena((arena) => {
            const L = this.L;
            const props = this.writeShot(arena, shot);
            const req = arena.alloc(L.request.size);
            const recordsPtr = arena.alloc(4);
            const countPtr = arena.alloc(4);
            const reasonPtr = arena.alloc(4);
            const err = arena.alloc(L.error.size);
            const w = arena.view();
            w.setFloat64(req + L.request.range_limit_ft, request.range_limit_ft, true);
            w.setFloat64(req + L.request.range_step_ft, request.range_step_ft, true);
            w.setFloat64(req + L.request.time_step, request.time_step, true);
            w.setInt32(req + L.request.filter_flags, request.filter_flags, true);

            this.check(
                arena,
                err,
                this.ex.BCLIBCFFI_integrate_shot(props, req, recordsPtr, countPtr, reasonPtr, err)
            );

            const v = arena.view();
            const records = v.getUint32(recordsPtr, true);
            const count = v.getInt32(countPtr, true);
            try {
                const trajectory: _TrajectoryData[] = [];
                for (let i = 0; i < count; i++) trajectory.push(this.readTraj(v, records + i * L.traj.size));
                return {
                    trajectory,
                    dense_trajectory: [], // not in the C ABI
                    reason: v.getInt32(reasonPtr, true) as _HitOutput["reason"],
                };
            } finally {
                if (records) this.ex.BCLIBCFFI_free_trajectory(records);
            }
        });

    private integrateRawAt = (
        shot: _ShotPropsInput,
        key: _BaseTrajDataInterpKeyValue,
        targetValue: number
    ): _Interception =>
        this.memory.withArena((arena) => {
            const L = this.L;
            const props = this.writeShot(arena, shot);
            const out = arena.alloc(L.interception.size);
            const err = arena.alloc(L.error.size);
            this.check(arena, err, this.ex.BCLIBCFFI_integrate_at_shot(props, key, targetValue, out, err));
            const v = arena.view();
            return {
                raw_data: this.readBaseTraj(v, out + L.interception.raw_data),
                full_data: this.readTraj(v, out + L.interception.full_data),
            };
        });

    private interpolateTrajectoryData = (
        key: number,
        value: number,
        p0: _TrajectoryData,
        p1: _TrajectoryData,
        p2: _TrajectoryData,
        flag: number,
        method: number
    ): _TrajectoryData =>
        this.memory.withArena((arena) => {
            const size = this.L.traj.size;
            const [a, b, c, out] = [arena.alloc(size), arena.alloc(size), arena.alloc(size), arena.alloc(size)];
            const err = arena.alloc(this.L.error.size);
            const w = arena.view();
            this.writeTraj(w, a, p0);
            this.writeTraj(w, b, p1);
            this.writeTraj(w, c, p2);
            this.check(
                arena,
                err,
                this.ex.BCLIBCFFI_interpolate_trajectory_data(key, value, a, b, c, flag, method, out, err)
            );
            return this.readTraj(arena.view(), out);
        });

    private interpolate2pt = (x: number, x0: number, y0: number, x1: number, y1: number): number =>
        this.memory.withArena((arena) => {
            const out = arena.alloc(8);
            const err = arena.alloc(this.L.error.size);
            this.check(arena, err, this.ex.BCLIBCFFI_interpolate_2pt(x, x0, y0, x1, y1, out, err));
            return arena.view().getFloat64(out, true);
        });

    /** The module the library uses. */
    module(): MainModule {
        const ex = this.ex;
        return {
            _InterpMethod: { PCHIP: 0, LINEAR: 1 },
            _TerminationReason: {
                NO_TERMINATE: 0,
                TARGET_RANGE_REACHED: 1,
                MINIMUM_VELOCITY_REACHED: 2,
                MAXIMUM_DROP_REACHED: 3,
                MINIMUM_ALTITUDE_REACHED: 4,
                HANDLER_REQUESTED_STOP: 5,
            },
            _TrajFlag: { NONE: 0, ZERO_UP: 1, ZERO_DOWN: 2, ZERO: 3, MACH: 4, RANGE: 8, APEX: 16, ALL: 31, MRT: 32 },
            _IntegrationMethod: { RK4: 0, EULER: 1, VELOCITY_VERLET: 2, CASH_KARP: 3, DOPRI: 4, TSITOURAS: 5 },
            _BaseTrajDataInterpKey: { TIME: 0, POS_X: 2, POS_Y: 3, POS_Z: 4, VEL_X: 5, VEL_Y: 6, VEL_Z: 7, MACH: 1 },
            _TrajectoryDataInterpKey: {
                TIME: 0,
                DISTANCE: 1,
                VELOCITY: 2,
                MACH: 3,
                HEIGHT: 4,
                SLANT_HEIGHT: 5,
                DROP_ANGLE: 6,
                WINDAGE: 7,
                WINDAGE_ANGLE: 8,
                SLANT_DISTANCE: 9,
                ANGLE: 10,
                DENSITY_RATIO: 11,
                DRAG: 12,
                ENERGY: 13,
                OGW: 14,
                FLAG: 15,
            },
            APEX_IS_MAX_RANGE_RADIANS,
            ALLOWED_ZERO_ERROR_FEET,
            interpolateTrajectoryData: this.interpolateTrajectoryData,
            getCorrection: (distanceFt, offsetFt) => ex.BCLIBCFFI_get_correction(distanceFt, offsetFt),
            calculateEnergy: (weight, velocity) => ex.BCLIBCFFI_calculate_energy(weight, velocity),
            calculateOgw: (weight, velocity) => ex.BCLIBCFFI_calculate_ogw(weight, velocity),
            hermite: (x, xk, xk1, yk, yk1, mk, mk1) => ex.BCLIBCFFI_hermite(x, xk, xk1, yk, yk1, mk, mk1),
            interpolate3pt: (x, x0, x1, x2, y0, y1, y2) => ex.BCLIBCFFI_interpolate_3pt(x, x0, x1, x2, y0, y1, y2),
            interpolate2pt: this.interpolate2pt,
            findApex: this.findApex,
            findMaxRange: this.findMaxRange,
            findZeroAngle: this.findZeroAngle,
            findZeroPoint: this.findZeroPoint,
            integrateRawAt: this.integrateRawAt,
            integrate: this.integrate,
        };
    }
}

type _BaseTrajDataInterpKeyValue = MainModule["_BaseTrajDataInterpKey"][keyof MainModule["_BaseTrajDataInterpKey"]];
