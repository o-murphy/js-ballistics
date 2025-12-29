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
import { _ShotPropsInput } from "./_wasm";

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

class Ammo {
    public dm: DragModel;
    public mv: Velocity;
    public powderTemp: Temperature;
    public tempModifier: number;
    public usePowderSensitivity: boolean;
    /**
     * Creates an instance of Ammo with specified properties.
     * @param {Object} options - Parameters for initializing the Ammo instance.
     * @param {DragModel} options.dm - Drag model instance.
     * @param {number | Velocity} options.mv - Velocity value.
     * @param {number} [options.tempModifier=0] - Temperature modifier value. Defaults to 0.
     * @param {number | Temperature} [options.powderTemp=undefined] - Powder temperature value. Defaults to undefined.
     * @param {boolean} [options.usePowderSensitivity=false] - Use powder sensitivity value. Defaults to false.
     */
    constructor({
        dm,
        mv,
        powderTemp = undefined,
        tempModifier = 0,
        usePowderSensitivity = false,
    }: {
        dm: DragModel;
        mv: number | Velocity;
        powderTemp?: number | Temperature;
        tempModifier?: number;
        usePowderSensitivity?: boolean;
    }) {
        this.dm = dm;
        this.mv = unitTypeCoerce(mv ?? 0, Velocity, preferredUnits.velocity);
        this.powderTemp = unitTypeCoerce(
            powderTemp ?? UNew.Celsius(15),
            Temperature,
            preferredUnits.temperature
        );
        this.tempModifier = tempModifier ?? 0;
        this.usePowderSensitivity = usePowderSensitivity;
    }

    /**
     * Calculates the velocity correction based on the change in temperature and assigns it to the temperature modifier.
     * @param {number | Velocity} otherVelocity - The velocity to compare with.
     * @param {number | Temperature} otherTemperature - The temperature to compare with.
     * @returns {number} - The calculated temperature sensitivity adjustment.
     */
    calcPowderSens(
        otherVelocity: number | Velocity,
        otherTemperature: number | Temperature
    ): number {
        const v0 = this.mv.In(Velocity.MPS);
        const t0 = this.powderTemp.In(Temperature.Celsius);
        const v1 = unitTypeCoerce(otherVelocity, Velocity, preferredUnits.velocity).In(
            Velocity.MPS
        );
        const t1 = unitTypeCoerce(otherTemperature, Temperature, preferredUnits.temperature).In(
            Temperature.Celsius
        );

        if (v0 <= 0 || v1 <= 0) {
            throw new Error("calcPowderSens requires positive muzzle velocities")
        }

        const vDelta = Math.abs(v0 - v1);
        const tDelta = Math.abs(t0 - t1);
        const vLower = v1 < v0 ? v1 : v0;

        if (vDelta === 0 || tDelta === 0) {
            throw new Error(
                "Temperature modifier error, other velocity and temperature can't be same as default"
            );
        }
        this.tempModifier = (vDelta / tDelta) * (15 / vLower); // * 100
        return this.tempModifier;
    }

    /**
     * Calculates the muzzle velocity at a given temperature based on the temperature modifier.
     * @param {number | Temperature} currentTemp - The current temperature for which to calculate the velocity.
     * @returns {Velocity} - The calculated muzzle velocity at the specified temperature.
     */
    getVelocityForTemp(currentTemp: number | Temperature): Velocity {
        if (!this.usePowderSensitivity) {
            return this.mv;
        }
        const v0 = this.mv.In(Velocity.MPS);
        if (!isFinite(v0)) {
            return UNew.MPS(0);
        }
        const t0 = this.powderTemp.In(Temperature.Celsius);
        const t1 = unitTypeCoerce(currentTemp, Temperature, preferredUnits.temperature).In(
            Temperature.Celsius
        );
        const tDelta = t1 - t0;
        const muzzleVelocity = (this.tempModifier / (15 / v0)) * tDelta + v0;
        return UNew.MPS(muzzleVelocity);
    }

    toWasmAmmoInput(): Pick<_ShotPropsInput, "bc" | "drag_table" | "weight_grain" | "diameter_inch" | "length_inch"> {
        return {
            bc: this.dm.bc,
            drag_table: this.dm.dragTable,
            weight_grain: this.dm.weight.grain,
            diameter_inch: this.dm.diameter.inch,
            length_inch: this.dm.length.inch,
        }
    }
}

export { Weapon, Ammo };
