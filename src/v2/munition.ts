// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import { UNew, unitTypeCoerce, Distance, Angular, Temperature, Velocity, preferredUnits } from './unit';
import DragModel from "./drag_model.js";


class Weapon {

    readonly sightHeight: Distance;
    readonly twist: Distance;
    public zeroElevation: Angular;

    /**
     * Initializes a new instance of the Weapon class.
     * @param {Object} options - Parameters for initializing the weapon.
     * @param {number | Distance | null} [options.sightHeight=null] - Height of the sight above the bore axis.
     * @param {number | Distance | null} [options.twist=null] - The twist rate of the barrel.
     * @param {number | Angular | null} [options.zeroElevation=null] - The look angle for the zero distance.
     */
    constructor({
        sightHeight = null,
        twist = null,
        zeroElevation = null
    }: {
        sightHeight?: number | Distance | null;
        twist?: number | Distance | null;
        zeroElevation?: number | Angular | null;
    }
    ) {
        this.sightHeight = unitTypeCoerce(sightHeight ?? 0, Distance, preferredUnits.sight_height)
        this.twist = unitTypeCoerce(twist ?? 0, Distance, preferredUnits.twist)
        this.zeroElevation = unitTypeCoerce(zeroElevation ?? 0, Angular, preferredUnits.angular)
    }
}


class Ammo {

    readonly dm: DragModel;
    readonly mv: Velocity;
    readonly powderTemp: Temperature;
    protected _tempModifier: number;

    /**
     * Creates an instance of Ammo with specified properties.
     * @param {Object} options - Parameters for initializing the Ammo instance.
     * @param {DragModel} options.dm - Drag model instance.
     * @param {number | Velocity} options.mv - Velocity value.
     * @param {number} [options.tempModifier=0] - Temperature modifier value. Defaults to 0.
     * @param {number | Temperature | null} [options.powderTemp=null] - Powder temperature value. Defaults to null.
     */
    constructor({
        dm,
        mv,
        powderTemp = null,
        tempModifier = 0
    }: {
        dm: DragModel;
        mv: number | Velocity;
        powderTemp?: number | Temperature | null;
        tempModifier?: number
    }) {
        if (!dm) {
            throw new Error("'dm' have to be an instance of 'DragModel'")
        }
        this.dm = dm;
        this.mv = unitTypeCoerce(mv ?? 0, Velocity, preferredUnits.velocity);
        this.powderTemp = unitTypeCoerce(powderTemp ?? UNew.Celsius(15), Temperature, preferredUnits.temperature);
        this._tempModifier = tempModifier ?? 0;
    }

    /**
     * Calculates the velocity correction based on the change in temperature and assigns it to the temperature modifier.
     * @param {number | Velocity} otherVelocity - The velocity to compare with.
     * @param {number | Temperature} otherTemperature - The temperature to compare with.
     * @returns {number} - The calculated temperature sensitivity adjustment.
     */
    calcPowderSens(otherVelocity: (number | Velocity), otherTemperature: (number | Temperature)): number {
        const v0 = this.mv.In(Velocity.MPS)
        const t0 = this.powderTemp.In(Temperature.Celsius)
        const v1 = unitTypeCoerce(otherVelocity, Velocity, preferredUnits.velocity).In(Velocity.MPS)
        const t1 = unitTypeCoerce(otherTemperature, Temperature, preferredUnits.temperature).In(Temperature.Celsius)

        const vDelta = Math.abs(v0 - v1)
        const tDelta = Math.abs(t0 - t1)
        const vLower = v1 < v0 ? v1 : v0

        if ((vDelta === 0) || (tDelta === 0)) {
            throw new Error("Temperature modifier error, other velocity and temperature can't be same as default")
        }
        this._tempModifier = vDelta / tDelta * (15 / vLower)  // * 100
        return this._tempModifier
    }
    
    /**
     * Calculates the muzzle velocity at a given temperature based on the temperature modifier.
     * @param {number | Temperature} currentTemp - The current temperature for which to calculate the velocity.
     * @returns {Velocity} - The calculated muzzle velocity at the specified temperature.
     */
    getVelocityForTemp(currentTemp: (number | Temperature)): Velocity {
        const v0 = this.mv.In(Velocity.MPS)
        const t0 = this.powderTemp.In(Temperature.Celsius)
        const t1 = unitTypeCoerce(currentTemp, Temperature, preferredUnits.temperature).In(Temperature.Celsius)
        const tDelta = t1 - t0
        const muzzleVelocity = this._tempModifier / (15 / v0) * tDelta + v0
        return UNew.MPS(muzzleVelocity)
    }
}

export { Weapon, Ammo };
