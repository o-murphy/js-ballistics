// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import {
    UNew,
    unitTypeCoerce,
    Distance,
    Angular,
    Temperature,
    Velocity,
    preferredUnits,
} from "./unit";
import { DragModel } from "./drag_model.js";
import { _ShotPropsInput, ShotPropsInput } from "./_wasm";

class Weapon {
    readonly sightHeight: Distance;
    readonly twist: Distance;
    public zeroElevation: Angular;

    /**
     * Initializes a new instance of the Weapon class.
     * @param {Object} options - Parameters for initializing the weapon.
     * @param {number | Distance} [options.sightHeight=undefined] - Height of the sight above the bore axis.
     * @param {number | Distance} [options.twist=undefined] - The twist rate of the barrel.
     * @param {number | Angular} [options.zeroElevation=undefined] - The look angle for the zero distance.
     */
    constructor({
        sightHeight = undefined,
        twist = undefined,
        zeroElevation = undefined,
    }: {
        sightHeight?: number | Distance;
        twist?: number | Distance;
        zeroElevation?: number | Angular;
    } = {}) {
        this.sightHeight = unitTypeCoerce(sightHeight ?? 0, Distance, preferredUnits.sight_height);
        this.twist = unitTypeCoerce(twist ?? 0, Distance, preferredUnits.twist);
        this.zeroElevation = unitTypeCoerce(zeroElevation ?? 0, Angular, preferredUnits.angular);
    }

    toWasmWeaponInput(): Pick<_ShotPropsInput, "sight_height_ft" | "twist_inch"> {
        return {
            sight_height_ft: this.sightHeight.foot,
            twist_inch: this.twist.inch,
        }
    }
}

/**
 * Configuration properties for initializing or updating an Ammo instance.
 */
interface AmmoProps {
    /** Ballistic Drag Model containing BC and drag table. */
    dm: DragModel;
    /** Muzzle velocity (MV) of the projectile. */
    mv: number | Velocity;
    /** Standard temperature at which the muzzle velocity was measured. @default 15°C */
    powderTemp?: number | Temperature;
    /** Sensitivity coefficient of the powder to temperature changes. @default 0 */
    tempModifier?: number;
    /** Enable or disable muzzle velocity adjustment based on current powder temperature. @default false */
    usePowderSensitivity?: boolean;
}

class Ammo {
    private _dm!: DragModel;
    private _mv!: Velocity;
    private _powderTemp!: Temperature;
    private _tempModifier!: number;
    private _usePowderSensitivity!: boolean;

    private _props: AmmoProps = {} as AmmoProps;

    /**
     * Creates an instance of Ammo with specified properties.
     * @param props - Parameters for initializing the Ammo instance.
     * @param props.dm - Ballistic Drag Model containing BC and drag table.
     * @param props.mv - Muzzle velocity (MV) of the projectile.
     * @param props.powderTemp - Standard temperature at which the muzzle velocity was measured.
     * @param props.tempModifier - Sensitivity coefficient of the powder.
     * @param props.usePowderSensitivity - Enable/disable velocity adjustment.
     */
    constructor(props: AmmoProps) {
        this.update(props);
    }

    /** * Current Ballistic Drag Model.
     */
    get dm(): DragModel {
        return this._dm;
    }

    /** * Base muzzle velocity at standard powder temperature.
     */
    get mv(): Velocity {
        return this._mv;
    }

    /** * The temperature at which the base muzzle velocity was recorded.
     */
    get powderTemp(): Temperature {
        return this._powderTemp;
    }

    /** * Powder sensitivity factor (velocity change per degree).
     */
    get tempModifier(): number {
        return this._tempModifier;
    }

    /** * Indicates if powder temperature sensitivity is currently applied.
     */
    get usePowderSensitivity(): boolean {
        return this._usePowderSensitivity;
    }

    /**
     * Updates the ammo properties and triggers internal recalculation.
     * Use this to change MV, powder properties, or the drag model.
     * @param newProps - Object containing properties to update.
     */
    update(newProps: Partial<AmmoProps>) {
        Object.assign(this._props, newProps);
        this._recalculate();
    }

    /**
     * Synchronizes internal calculated fields with the current properties.
     * @private
     */
    private _recalculate(): void {
        const p = this._props;

        this._dm = p.dm;
        this._mv = unitTypeCoerce(p.mv ?? 0, Velocity, preferredUnits.velocity);
        this._powderTemp = unitTypeCoerce(
            p.powderTemp ?? UNew.Celsius(15),
            Temperature,
            preferredUnits.temperature
        );
        this._tempModifier = p.tempModifier ?? 0;
        this._usePowderSensitivity = p.usePowderSensitivity ?? false;
    }

    /**
     * Calculates the velocity correction based on the change in temperature
     * and updates the internal tempModifier.
     * * @param otherVelocity - Secondary muzzle velocity measured at a different temperature.
     * @param otherTemperature - The temperature at which the secondary velocity was measured.
     * @returns The calculated temperature sensitivity adjustment factor.
     */
    calcPowderSens(
        otherVelocity: number | Velocity,
        otherTemperature: number | Temperature
    ): number {
        const v0 = this._mv.mps;
        const t0 = this._powderTemp.celsius;
        const v1 = unitTypeCoerce(otherVelocity, Velocity, preferredUnits.velocity).mps;
        const t1 = unitTypeCoerce(otherTemperature, Temperature, preferredUnits.temperature).celsius;

        if (v0 <= 0 || v1 <= 0) {
            throw new Error("calcPowderSens requires positive muzzle velocities");
        }

        const vDelta = Math.abs(v0 - v1);
        const tDelta = Math.abs(t0 - t1);
        const vLower = v1 < v0 ? v1 : v0;

        if (vDelta === 0 || tDelta === 0) {
            throw new Error(
                "Temperature modifier error: secondary values cannot be identical to defaults."
            );
        }

        const sens = (vDelta / tDelta) * (15 / vLower);
        // update _props
        this.update({ tempModifier: sens });
        return sens;
    }

    /**
     * Calculates the expected muzzle velocity for a given powder temperature.
     * Uses the temperature modifier if usePowderSensitivity is enabled.
     * * @param currentTemp - The current temperature of the gunpowder.
     * @returns Muzzle velocity adjusted for the given temperature.
     */
    getVelocityForTemp(currentTemp: number | Temperature): Velocity {
        if (!this._usePowderSensitivity) {
            return this._mv;
        }
        const v0 = this._mv.mps;
        if (!isFinite(v0)) {
            return UNew.MPS(0);
        }
        const t0 = this._powderTemp.celsius;
        const t1 = unitTypeCoerce(currentTemp, Temperature, preferredUnits.temperature).celsius;
        const tDelta = t1 - t0;

        // Formula: MV_adj = (Sens / (15 / V0)) * deltaT + V0
        const muzzleVelocity = (this._tempModifier / (15 / v0)) * tDelta + v0;
        return UNew.MPS(muzzleVelocity);
    }

    toWasmAmmoInput(): Pick<ShotPropsInput, "bc" | "drag_table" | "weight_grain" | "diameter_inch" | "length_inch"> {
        return {
            bc: this.dm.bc,
            drag_table: this._dm.dragTable,
            weight_grain: this._dm.weight.grain,
            diameter_inch: this._dm.diameter.inch,
            length_inch: this._dm.length.inch,
        }
    }
}

export { Weapon, Ammo };
