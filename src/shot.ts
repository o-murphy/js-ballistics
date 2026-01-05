import { _ShotPropsInput, Config, IntegrationMethod } from "./_wasm";
import { Atmo, Coriolis, Wind } from "./conditions";
import { Ammo, Weapon } from "./munition";
import { Angular, preferredUnits, UNew, unitTypeCoerce } from "./unit";

/**
 * Represents the parameters required for calculating a shot's trajectory.
 *
 * @example
 * ```typescript
 * const shot = new Shot({
 *     ammo: new Ammo(...),
 *     atmo: Atmo.icao(),
 *     weapon: new Weapon(...),
 *     winds: [new Wind(...)],
 *     lookAngle: UNew.Degree(5),
 *     cantAngle: UNew.Degree(0),
 *     relativeAngle: UNew.Degree(1),
 *     azimuthDeg: 90,  // East
 *     latitudeDeg: 45  // 45° North
 * });
 * ```
 */
class Shot {
    /** Ammunition used for the shot */
    ammo: Ammo;

    /** Atmospheric conditions in effect during shot */
    atmo: Atmo;

    /** Weapon used for the shot */
    weapon: Weapon;

    /**
     * Angle of sight line relative to horizontal (slant angle).
     *
     * If `lookAngle != 0` then any target in sight crosshairs will be at a different altitude:
     * - Horizontal distance X to target = cos(lookAngle) * target_distance
     * - Vertical distance Y to target = sin(lookAngle) * target_distance
     */
    lookAngle: Angular;

    /**
     * Elevation adjustment (a.k.a. "hold") added to `weapon.zeroElevation`.
     */
    relativeAngle: Angular;

    /**
     * Tilt of gun from vertical.
     *
     * If `weapon.sightHeight != 0` then this shifts any barrel elevation
     * from the vertical plane into the horizontal plane (as `barrelAzimuth`) by `sin(cantAngle)`.
     */
    cantAngle: Angular;

    protected _winds?: Wind[];
    protected _coriolis: {
        azimuthDeg?: number,
        latitudeDeg?: number
    };

    /**
     * Creates an instance of the Shot class.
     *
     * @param options - The parameters for initializing the shot data
     * @param options.ammo - The ammunition used for the shot
     * @param options.weapon - The weapon used for the shot
     * @param options.atmo - Atmospheric conditions affecting the shot (defaults to ICAO standard)
     * @param options.winds - List of wind conditions affecting the shot
     * @param options.lookAngle - Angle of sight line relative to horizontal.
     *        If `lookAngle != 0` then target in crosshairs will be at different altitude:
     *        - Horizontal distance X = cos(lookAngle) * target_distance
     *        - Vertical distance Y = sin(lookAngle) * target_distance
     * @param options.relativeAngle - Elevation adjustment ("hold") added to `weapon.zeroElevation`
     * @param options.cantAngle - Tilt of gun from vertical. Shifts barrel elevation
     *        from vertical plane into horizontal plane by `sin(cantAngle)`
     * @param options.coriolis - Coriolis azimuth and latitude
     * @param options.coriolis.azimuthDeg - Azimuth of shooting direction in degrees [0, 360). Optional, for Coriolis effects.
     *        Geographic bearing: 0 = North, 90 = East, 180 = South, 270 = West
     * @param options.coriolis.latitudeDeg - Latitude of shooting location in degrees [-90, 90]. Optional, for Coriolis effects
     *
     * @example
     * ```typescript
     * const shot = new Shot({
     *     ammo: new Ammo(...),
     *     weapon: new Weapon(...),
     *     lookAngle: UNew.Degree(5),
     *     azimuthDeg: 90,
     *     latitudeDeg: 45
     * });
     * ```
     */
    constructor({
        weapon,
        ammo,
        lookAngle = undefined,
        relativeAngle = undefined,
        cantAngle = undefined,
        atmo = undefined,
        winds = undefined,
        coriolis = undefined
    }: {
        ammo: Ammo,
        atmo?: Atmo,
        weapon: Weapon,
        winds?: Wind[],
        lookAngle?: number | Angular,
        relativeAngle?: number | Angular,
        cantAngle?: number | Angular,
        coriolis?: {
            azimuthDeg?: number,
            latitudeDeg?: number
        }
    }) {
        this.lookAngle = unitTypeCoerce(lookAngle ?? 0, Angular, preferredUnits.angular);
        this.relativeAngle = unitTypeCoerce(relativeAngle ?? 0, Angular, preferredUnits.angular);
        this.cantAngle = unitTypeCoerce(cantAngle ?? 0, Angular, preferredUnits.angular);
        this.weapon = weapon;
        this.ammo = ammo;
        this.atmo = atmo ?? Atmo.icao();
        this.winds = winds;
        this._coriolis = coriolis ?? {};
    }

    /**
     * Azimuth of the shooting direction in degrees [0, 360).
     *
     * Should be *geographic* bearing where 0 = North, 90 = East, 180 = South, 270 = West.
     * Difference from *magnetic* bearing is usually negligible.
     * Optional, used for Coriolis effects.
     */
    get azimuthDeg(): number | undefined {
        return this._coriolis?.azimuthDeg;
    }

    set azimuthDeg(value: number | undefined) {
        if (value !== undefined && (value < 0.0 || value >= 360.0)) {
            throw new Error("Azimuth must be in range [0, 360).");
        }
        this._coriolis.azimuthDeg = value;
    }

    /**
     * Latitude of the shooting location in degrees [-90, 90].
     *
     * Optional, used for Coriolis effects.
     */
    get latitudeDeg(): number | undefined {
        return this._coriolis.latitudeDeg;
    }

    set latitudeDeg(value: number | undefined) {
        if (value !== undefined && (value < -90.0 || value > 90.0)) {
            throw new Error("Latitude must be in range [-90, 90].");
        }
        this._coriolis.latitudeDeg = value;
    }

    /**
     * Sets wind conditions affecting the shot.
     * Winds will be automatically sorted by `untilDistance` when retrieved.
     */
    set winds(winds: Wind[] | undefined) {
        this._winds = winds;
    }

    /**
     * Gets wind conditions sorted by `untilDistance`.
     *
     * @returns Array of Wind instances sorted by until_distance, or empty array if none set
     */
    get winds(): Wind[] {
        return (this._winds ?? [])
            .slice()
            .sort((a, b) => a.untilDistance.rawValue - b.untilDistance.rawValue);
    }

    /**
     * Gets the horizontal angle of the barrel relative to the sight line.
     *
     * The azimuth angle is calculated based on the cant angle and the relative angle of the
     * weapon. The result is converted to radians.
     *
     * Calculated as: `sin(cantAngle) * (weapon.zeroElevation + relativeAngle)`
     *
     * @returns Angular value representing horizontal barrel angle
     */
    get barrelAzimuth(): Angular {
        return UNew.Radian(
            Math.sin(this.cantAngle.rad)
            * (this.weapon.zeroElevation.rad + this.relativeAngle.rad)
        );
    }

    /**
     * Gets the barrel elevation in the vertical plane from the horizontal.
     *
     * The elevation is calculated by adding the look angle to the vertical component of
     * the barrel's elevation based on the cant angle and relative angle. The result is
     * converted to radians.
     *
     * Calculated as: `lookAngle + cos(cantAngle) * (weapon.zeroElevation + relativeAngle)`
     *
     * @returns Angular value representing vertical barrel elevation
     */
    get barrelElevation(): Angular {
        return UNew.Radian(
            this.lookAngle.rad
            + Math.cos(this.cantAngle.rad)
            * (this.weapon.zeroElevation.rad + this.relativeAngle.rad)
        );
    }

    /**
     * Sets barrel elevation by adjusting `relativeAngle`.
     *
     * This does not change `weapon.zeroElevation`.
     * Calculates required `relativeAngle` to achieve desired barrel elevation.
     *
     * @param value - Desired barrel elevation in vertical plane from horizontal
     */
    set barrelElevation(value: Angular | number) {
        this.relativeAngle = UNew.Radian(
            unitTypeCoerce(value, Angular, preferredUnits.angular).rad
            - this.lookAngle.rad
            - Math.cos(this.cantAngle.rad) * this.weapon.zeroElevation.rad
        );
    }

    /**
     * Synonym for `lookAngle`.
     *
     * @returns Angle of sight line relative to horizontal
     */
    get slantAngle(): Angular {
        return this.lookAngle;
    }

    set slantAngle(value: Angular | number) {
        this.lookAngle = unitTypeCoerce(value, Angular, preferredUnits.angular);
    }

    /**
     * Converts Shot instance to WASM-compatible input format.
     *
     * Serializes all shot parameters into the format required by the WASM ballistic calculator.
     * Includes ballistic coefficient, angles, atmospheric conditions, winds, and calculation config.
     *
     * @param method - Integration method to use (RK4 or EULER)
     * @param config - Optional partial configuration to override defaults
     * @returns WASM-compatible shot properties object
     *
     * @example
     * ```typescript
     * const wasmInput = shot.toWasmShotPropsInput(IntegrationMethod.RK4, {
     *     maxIterations: 50,
     *     minimumVelocity: 100.0
     * });
     * ```
     */
    toWasmShotProps(method: IntegrationMethod, config: Config): _ShotPropsInput {
        const muzzle_velocity_fps = this.ammo.getVelocityForTemp(this.atmo.powderTemp).fps;

        return {
            // Ballistic properties
            ...this.ammo.toWasmAmmoInput(),

            // Velocity (adjusted for powder temperature)
            muzzle_velocity_fps: muzzle_velocity_fps,

            // Angles
            look_angle_rad: this.lookAngle.rad,
            barrel_elevation_rad: this.barrelElevation.rad,
            barrel_azimuth_rad: this.barrelAzimuth.rad,
            cant_angle_rad: this.cantAngle.rad,

            // Weapon properties
            ...this.weapon.toWasmWeaponInput(),

            // Environmental conditions
            alt0_ft: this.atmo.altitude.foot,
            atmo: this.atmo.toWasmAtmo(),
            // winds: this.winds.map(wind => wind.toWasmWind()),
            winds: this.winds.map(wind => wind.toWasmWind()),

            // Coriolis
            coriolis: new Coriolis({
                latitudeDeg: this.latitudeDeg,
                azimuthDeg: this.azimuthDeg,
                muzzleVelocityFps: muzzle_velocity_fps
            }).toWasmCoriolis(),

            // Calculation options
            method: method,
            config: config
        };
    }
}

export { Shot };
