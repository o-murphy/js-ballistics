// Module for Weapon and Ammo properties definitions

// Import necessary units and settings
import { Unit, Velocity, Temperature, Distance, Angular, unitTypeCoerce } from './units';
import { calcSettings } from './settings';


class Weapon {
  /**
   * @param {number | Distance} sightHeight - Height of the sight above the bore axis.
   * @param {number | Distance} zeroDistance - Sight-line distance to "zero."
   * @param {number} twist - The twist rate of the barrel.
   * @param {number | Angular} zeroLookAngle - The look angle for the zero distance.
   */
  constructor(
    sightHeight = new Distance(2, Unit.Inch),
    zeroDistance = new Distance(100, Unit.Yard),
    twist = 0,
    zeroLookAngle = new Angular(0, Unit.MIL)
  ) {
    this.sightHeight = this.unitTypeCoerce(sightHeight, Distance, calcSettings.Units.distance);
    this.zeroDistance = this.unitTypeCoerce(zeroDistance, Distance, calcSettings.Units.distance);
    this.twist = twist; // Assuming twist is a simple numeric value, not a distance
    this.zeroLookAngle = this.unitTypeCoerce(zeroLookAngle, Angular, calcSettings.Units.angular);
  }
}

export { Weapon };
