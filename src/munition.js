// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import {Unit, UNew, unitTypeCoerce, Measure} from './unit.js';
import calcSettings from './settings.js';
import { DragModel } from './drag_model.js';


class Weapon {
  /**
   * @param {number | Distance|Object} sightHeight - Height of the sight above the bore axis.
   * @param {number | Distance|Object} zeroDistance - Sight-line distance to "zero."
   * @param {number | Distance|Object} twist - The twist rate of the barrel.
   * @param {number | Angular|Object} zeroLookAngle - The look angle for the zero distance.
   */
  constructor(
    sightHeight = UNew.Inch(2),
    zeroDistance = UNew.Yard(100),
    twist = UNew.Inch(0),
    zeroLookAngle = UNew.MIL(0)
  ) {
    this.sightHeight = unitTypeCoerce(sightHeight, Measure.Distance, calcSettings.Units.sight_height);
    this.zeroDistance = unitTypeCoerce(zeroDistance, Measure.Distance, calcSettings.Units.distance);
    this.twist = unitTypeCoerce(twist, Measure.Distance, calcSettings.Units.twist);
    this.zeroLookAngle = unitTypeCoerce(zeroLookAngle, Measure.Angular, calcSettings.Units.angular);
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
  constructor(dm,
              length = UNew.Inch(2),
              mv = UNew.FPS(2700),
              temp_modifier = 0,
              powder_temp = UNew.Celsius(15)) {
    if (!dm) {
      throw new Error("'dm' have to be an instance of 'DragModel'")
    }
    this.dm = dm;
    this.length = unitTypeCoerce(length, Measure.Distance, calcSettings.Units.length);
    this.mv = unitTypeCoerce(mv, Measure.Velocity, calcSettings.Units.velocity);
    this.tempModifier = temp_modifier;
    this.powderTemp = powder_temp;
  }

  /**
   * Calculates velocity correction by temperature change.
   * @param {number|Velocity} otherVelocity - Other velocity value.
   * @param {number|Temperature} otherTemperature - Other temperature value.
   * @returns {number} - Temperature modifier.
   */
  calcPowderSens(otherVelocity, otherTemperature) {
    const v0 = this.mv.in(Unit.MPS);
    const t0 = this.powderTemp.in(Unit.Celsius);
    const v1 = unitTypeCoerce(otherVelocity, Measure.Velocity, calcSettings.Units.velocity).in(Unit.MPS);
    const t1 = unitTypeCoerce(otherTemperature, Measure.Temperature, calcSettings.Units.temperature).in(Unit.Celsius);

    const vDelta = Math.abs(v0 - v1);
    const tDelta = Math.abs(t0 - t1);
    const vLower = v1 < v0 ? v1 : v0;

    if (vDelta === 0 || tDelta === 0) {
      throw new Error("Temperature modifier error, other velocity and temperature can't be the same as default");
    }

    const tempModifier = (vDelta / tDelta) * (15 / vLower) * 100
    if (isNaN(tempModifier)) {
      throw new Error(`tempModifier can't be ${tempModifier}`)
    }

    this.tempModifier = tempModifier;
    return this.tempModifier;
  }

  /**
   * Calculates current velocity by temperature correction.
   * @param {Temperature|Object} currentTemp - Current temperature value.
   * @returns {Velocity|Object} - Velocity corrected for the specified temperature.
   */
  getVelocityForTemp(currentTemp) {
    const tempModifier = this.tempModifier;
    const v0 = this.mv.in(Unit.MPS);
    const t0 = this.powderTemp.in(Unit.Celsius);
    const t1 = currentTemp.in(Unit.Celsius);

    const tDelta = t1 - t0;
    const muzzleVelocity = (tempModifier / (15 / v0)) * tDelta + v0;

    return UNew.MPS(muzzleVelocity);
  }
}


export { Weapon, Ammo };
