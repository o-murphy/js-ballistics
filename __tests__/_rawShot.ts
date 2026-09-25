/** A shot in the form the module takes (`_ShotPropsInput`), for the tests that go under the `Shot` class. */
import type { _ShotPropsInput } from "../src/_wasm";

const MACH = [0.0, 0.5, 0.7, 0.8, 0.9, 0.95, 1.0, 1.05, 1.1, 1.2, 1.4, 1.6, 2.0, 2.5, 3.0, 4.0];
const CD = [0.2629, 0.2558, 0.231, 0.234, 0.279, 0.326, 0.4805, 0.508, 0.519, 0.515, 0.482, 0.443, 0.36, 0.31, 0.274, 0.226];

export function plainShot(overrides: Partial<_ShotPropsInput> = {}): _ShotPropsInput {
    return {
        bc: 0.4,
        look_angle_rad: 0,
        twist_inch: 11.25,
        length_inch: 1.24,
        diameter_inch: 0.308,
        weight_grain: 168,
        barrel_elevation_rad: 0,
        barrel_azimuth_rad: 0,
        sight_height_ft: 0.15,
        cant_angle_rad: 0,
        muzzle_velocity_fps: 2700,
        drag_table: MACH.map((Mach, i) => ({ Mach, CD: CD[i] })),
        temp_c: 15,
        pressure_hpa: 1013.25,
        altitude_ft: 0,
        humidity: 0.5,
        latitude_deg: NaN,
        azimuth_deg: NaN,
        winds: [],
        method: 0,
        config: {
            stepMultiplier: 1,
            zeroFindingAccuracy: 5e-6,
            minimumVelocity: 50,
            maximumDrop: -15000,
            maxIterations: 60,
            gravityConstant: -32.17405,
            minimumAltitude: -1500,
        },
        ...overrides,
    };
}
