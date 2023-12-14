// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import {Unit, Distance, Angular, unitTypeCoerce, Velocity, Temperature} from './units';
import calcSettings from './settings';
import { DragModel } from './drag_model';


class Weapon {
  /**
   * @param {number | Distance} sightHeight - Height of the sight above the bore axis.
   * @param {number | Distance} zeroDistance - Sight-line distance to "zero."
   * @param {number | Distance} twist - The twist rate of the barrel.
   * @param {number | Angular} zeroLookAngle - The look angle for the zero distance.
   */
  constructor(
    sightHeight = new Distance(2, Unit.Inch),
    zeroDistance = new Distance(100, Unit.Yard),
    twist = new Distance(0, Unit.Inch),
    zeroLookAngle = new Angular(0, Unit.MIL)
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
   * @param {number|Distance} length - Length value.
   * @param {number|Velocity} mv - Velocity value.
   * @param {number} temp_modifier - Temperature modifier value.
   * @param {number|Temperature} powder_temp - Powder temperature value.
   */
  constructor(dm,
              length = new Distance(2, Unit.Inch),
              mv = new Velocity(2700, Unit.FPS),
              temp_modifier = 0,
              powder_temp = new Temperature(15, Unit.Celsius)) {
    if (!dm) {
      throw new Error("'dm' have to be an instance of 'DragModel'")
    }
    this.dm = dm;
    this.length = unitTypeCoerce(length, Distance, calcSettings.Units.length);
    this.mv = unitTypeCoerce(mv, Velocity, calcSettings.Units.velocity);
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
    const v0 = this.mv.in(Velocity.MPS);
    const t0 = this.powder_temp.in(Temperature.Celsius);
    const v1 = other_velocity.in(Velocity.MPS);
    const t1 = other_temperature.in(Temperature.Celsius);

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
   * @param {Temperature} current_temp - Current temperature value.
   * @returns {Velocity} - Velocity corrected for the specified temperature.
   */
  getVelocityForTemp(current_temp) {
    const temp_modifier = this.temp_modifier;
    const v0 = this.mv.in(Velocity.MPS);
    const t0 = this.powder_temp.in(Temperature.Celsius);
    const t1 = current_temp.in(Temperature.Celsius);

    const t_delta = t1 - t0;
    const muzzle_velocity = (temp_modifier / (15 / v0)) * t_delta + v0;

    return new Velocity(muzzle_velocity, Unit.MPS);
  }
}


export { Weapon, Ammo };
