// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import {Unit, UNew, unitTypeCoerce, Measure} from './unit.js';
import calcSettings from './settings';
import { DragModel } from './drag_model';


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
    this.temp_modifier = temp_modifier;
    this.powder_temp = powder_temp;
  }

  /**
   * Calculates velocity correction by temperature change.
   * @param {number|Velocity} other_velocity - Other velocity value.
   * @param {number|Temperature} other_temperature - Other temperature value.
   * @returns {number} - Temperature modifier.
   */
  calcPowderSens(other_velocity, other_temperature) {
    const v0 = this.mv.in(Unit.MPS);
    const t0 = this.powder_temp.in(Unit.Celsius);
    const v1 = other_velocity.in(Unit.MPS);
    const t1 = other_temperature.in(Unit.Celsius);

    const v_delta = Math.abs(v0 - v1);
    const t_delta = Math.abs(t0 - t1);
    const v_lower = v1 < v0 ? v1 : v0;

    if (v_delta === 0 || t_delta === 0) {
      throw new Error("Temperature modifier error, other velocity and temperature can't be the same as default");
    }

    this.temp_modifier = (v_delta / t_delta) * (15 / v_lower) * 100;

    return this.temp_modifier;
  }

  /**
   * Calculates current velocity by temperature correction.
   * @param {Temperature|Object} current_temp - Current temperature value.
   * @returns {Velocity|Object} - Velocity corrected for the specified temperature.
   */
  getVelocityForTemp(current_temp) {
    const temp_modifier = this.temp_modifier;
    const v0 = this.mv.in(Unit.MPS);
    const t0 = this.powder_temp.in(Unit.Celsius);
    const t1 = current_temp.in(Unit.Celsius);

    const t_delta = t1 - t0;
    const muzzle_velocity = (temp_modifier / (15 / v0)) * t_delta + v0;

    return UNew.MPS(muzzle_velocity);
  }
}


export { Weapon, Ammo };
