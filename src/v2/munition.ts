// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import {Unit, UNew, unitTypeCoerce, Distance, Angular, Temperature, Velocity, } from '../unit';
import calcSettings from '../settings';
import DragModel from "../drag_model.js";


class Weapon {
     /**
     * @param {number | Distance | null} sightHeight - Height of the sight above the bore axis.
     * @param {number | Distance | null} twist - The twist rate of the barrel.
     * @param {number | Angular | null} zeroLookAngle - The look angle for the zero distance.
     */ 

    readonly sightHeight: Distance;
    readonly twist: Distance;
    readonly zeroElevation: Angular;

    constructor(
        sightHeight: (number | Distance | null) = null,
        twist: (number | Distance | null) = null,
        zeroElevation: (number | Angular | null) = null
    ) {
        this.sightHeight = unitTypeCoerce(sightHeight ?? 0, Distance, calcSettings.Units.distance)
        this.twist = unitTypeCoerce(twist ?? 0, Distance, calcSettings.Units.twist)
        this.zeroElevation = unitTypeCoerce(zeroElevation ?? 0, Angular, calcSettings.Units.angular)
    }
}


class Ammo {
    /**
     * Creates Ammo and Projectile properties.
     * @param {DragModel} dm - Drag model instance.
     * @param {number|Velocity|null} mv - Velocity value.
     * @param {number} tempModifier - Temperature modifier value.
     * @param {number|Temperature|null} powder_temp - Powder temperature value.
     */
    readonly dm: DragModel;
    readonly mv: Velocity;
    readonly powderTemp: Temperature;
    protected _tempModifier: number;

    constructor(dm: DragModel,
                mv: (number | Velocity) = UNew.FPS(2700),
                powderTemp: (number | Temperature | null) = UNew.Celsius(15),
                tempModifier: number = 0
            ) {
        if (!dm) {
            throw new Error("'dm' have to be an instance of 'DragModel'")
        }
        this.dm = dm;
        this.mv = unitTypeCoerce(mv ?? 0, Velocity, calcSettings.Units.velocity);
        this.powderTemp = unitTypeCoerce(powderTemp ?? UNew.Celsius(15), Temperature, calcSettings.Units.temperature);
        this._tempModifier = tempModifier ?? 0;
    }

    calcPowderSens(otherVelocity: (number | Velocity), otherTemperature: (number | Temperature)): number {
        // Calculates velocity correction by temperature change; assigns to self.temp_modifier
        const v0 = this.mv.In(Velocity.MPS)
        const t0 = this.powderTemp.In(Temperature.Celsius)
        const v1 = unitTypeCoerce(otherVelocity, Temperature, calcSettings.Units.temperature)
        const t1 = unitTypeCoerce(otherTemperature, Temperature, calcSettings.Units.temperature)

        const vDelta = Math.abs(v0 - v1)
        const tDelta = Math.abs(t0 - t1)
        const vLower = v1 < v0 ? v1 : v0

        if ((vDelta === 0) || (tDelta === 0)) {
            throw new Error("Temperature modifier error, other velocity and temperature can't be same as default")
        }
        this._tempModifier = vDelta / tDelta * (15 / vLower)  // * 100
        return this._tempModifier 
    }

    getVelocityForTemp(currentTemp: (number | Temperature)): Velocity {
        // Calculates muzzle velocity at temperature, based on temp_modifier
        const v0 = this.mv.In(Velocity.MPS)
        const t0 = this.powderTemp.In(Temperature.Celsius)
        const t1 = unitTypeCoerce(currentTemp, Temperature, calcSettings.Units.temperature)
        const tDelta = t1 - t0
        const muzzleVelocity = this._tempModifier / (15 / v0) * tDelta + v0
        return UNew.MPS(muzzleVelocity)
    }
}

export {Weapon, Ammo};
