// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import {Unit, UNew, unitTypeCoerce, Distance, Angular, Temperature, Velocity} from './unit';
import calcSettings from './settings';
import DragModel from "./drag_model.js";


class Weapon {
    /**
     * @param {number | Distance|Object} sightHeight - Height of the sight above the bore axis.
     * @param {number | Distance|Object} zeroDistance - Sight-line distance to "zero."
     * @param {number | Distance|Object} twist - The twist rate of the barrel.
     * @param {number | Angular|Object} zeroLookAngle - The look angle for the zero distance.
     */

    readonly sightHeight: Distance;
    readonly zeroDistance: Distance;
    readonly twist: Distance;
    readonly zeroLookAngle: Angular;

    constructor(
        sightHeight: (number | Distance) = UNew.Inch(2),
        zeroDistance: (number | Distance) = UNew.Yard(100),
        twist: (number | Distance) = UNew.Inch(0),
        zeroLookAngle: (number | Angular) = UNew.MIL(0)
    ) {
        this.sightHeight = unitTypeCoerce(sightHeight, Distance, calcSettings.Units.sight_height);
        this.zeroDistance = unitTypeCoerce(zeroDistance, Distance, calcSettings.Units.distance);
        this.twist = unitTypeCoerce(twist, Distance, calcSettings.Units.twist);
        this.zeroLookAngle = unitTypeCoerce(zeroLookAngle, Angular, calcSettings.Units.angular);
    }
}


class Ammo {
    /**
     * Creates Ammo and Projectile properties.
     * @param {DragModel} dm - Drag model instance.
     * @param {number|Distance|Object} length - Length value.
     * @param {number|Velocity|Object} mv - Velocity value.
     * @param {number} temp_modifier - Temperature modifier value.
     * @param {number|Temperature|Object} powder_temp - Powder temperature value.
     */
    readonly dm: DragModel;
    readonly length: Distance;
    readonly mv: Velocity;
    readonly powderTemp: Temperature;

    protected _tempModifier: number;

    constructor(dm: DragModel,
                length: (number | Distance) = UNew.Inch(2),
                mv: (number | Velocity) = UNew.FPS(2700),
                tempModifier: number = 0,
                powderTemp: (number | Temperature) = UNew.Celsius(15)) {
        if (!dm) {
            throw new Error("'dm' have to be an instance of 'DragModel'")
        }
        this.dm = dm;
        this.length = unitTypeCoerce(length, Distance, calcSettings.Units.length);
        this.mv = unitTypeCoerce(mv, Velocity, calcSettings.Units.velocity);
        this._tempModifier = tempModifier;
        this.powderTemp = unitTypeCoerce(powderTemp, Temperature, calcSettings.Units.length);
    }

    get tempModifier(): number {
        return this._tempModifier;
    }

    /**
     * Calculates velocity correction by temperature change.
     * @param {number|Velocity} otherVelocity - Other velocity value.
     * @param {number|Temperature} otherTemperature - Other temperature value.
     * @returns {number} - Temperature modifier.
     */
    calcPowderSens(otherVelocity: (number | Velocity), otherTemperature: (number | Temperature)): number {
        const v0 = this.mv.In(Unit.MPS);
        const t0 = this.powderTemp.In(Unit.Celsius);
        const v1 = unitTypeCoerce(otherVelocity, Velocity, calcSettings.Units.velocity).In(Unit.MPS);
        const t1 = unitTypeCoerce(otherTemperature, Temperature, calcSettings.Units.temperature).In(Unit.Celsius);

        const vDelta = Math.abs(v0 - v1);
        const tDelta = Math.abs(t0 - t1);
        const vLower = v1 < v0 ? v1 : v0;

        if (vDelta === 0 || tDelta === 0) {
            throw new Error("Temperature modifier error, other velocity and temperature can't be the same as default");
        }

        const tempModifier = (vDelta / tDelta) * (15 / vLower) * 100
        if (isNaN(tempModifier)) {
            throw new Error(`tempModifier can't be ${tempModifier}`);
        }

        this._tempModifier = tempModifier;
        return this._tempModifier;
    }

    /**
     * Calculates current velocity by temperature correction.
     * @param {Temperature|Object} currentTemp - Current temperature value.
     * @returns {Velocity|Object} - Velocity corrected for the specified temperature.
     */
    getVelocityForTemp(currentTemp: (number | Temperature)): Velocity {
        const tempModifier = this._tempModifier;
        const v0 = this.mv.In(Unit.MPS);
        const t0 = this.powderTemp.In(Unit.Celsius);
        const t1 = unitTypeCoerce(
            currentTemp, Temperature, calcSettings.Units.temperature
        ).In(Unit.Celsius);

        const tDelta = t1 - t0;
        const muzzleVelocity = (tempModifier / (15 / v0)) * tDelta + v0;

        return UNew.MPS(muzzleVelocity);
    }
}


export {Weapon, Ammo};
