import {describe, expect, test} from '@jest/globals';
import {
    calcSettings, Weapon, Ammo,
    UNew, Unit, Table, DragModel
} from '../src/index.js'; // Import necessary modules and classes


describe('Weapon Class', () => {
    test('Default Constructor', () => {
        const weapon = new Weapon();

        expect(weapon.sightHeight.In(calcSettings.Units.sight_height)).toBeCloseTo(2, 4);
        expect(weapon.zeroDistance.In(calcSettings.Units.distance)).toBeCloseTo(100, 4);
        expect(weapon.twist.In(calcSettings.Units.twist)).toBeCloseTo(0, 4);
        expect(weapon.zeroLookAngle.In(calcSettings.Units.angular)).toBeCloseTo(0, 4);
    });

    test('Custom Constructor', () => {
        const customSightHeight = UNew.Inch(3);
        const customZeroDistance = UNew.Yard(200);
        const customTwist = UNew.Inch(3);
        const customZeroLookAngle = UNew.MIL(2);

        const weapon = new Weapon(customSightHeight, customZeroDistance, customTwist, customZeroLookAngle);

        expect(weapon.sightHeight.In(Unit.Inch)).toBeCloseTo(3, 4);
        expect(weapon.zeroDistance.In(Unit.Yard)).toBeCloseTo(200, 4);
        expect(weapon.twist.In(Unit.Inch)).toBeCloseTo(3, 4);
        expect(weapon.zeroLookAngle.In(Unit.MIL)).toBeCloseTo(2, 4);
    });
});


describe('Ammo Class', () => {
    test('Default Constructor', () => {
        const dragModel = new DragModel(0.5, Table.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        expect(ammo.dm).toBe(dragModel);
        expect(ammo.length.In(calcSettings.Units.length)).toBeCloseTo(2, 4);
        expect(ammo.mv.In(calcSettings.Units.velocity)).toBeCloseTo(2700, 4);
        expect(ammo.tempModifier).toBe(0);
        expect(ammo.powderTemp.In(calcSettings.Units.temperature)).toBeCloseTo(15, 4);
    });

    test('Custom Constructor', () => {
        const customLength = UNew.Inch(3);
        const customVelocity = UNew.FPS(3000);
        const customTempModifier = 10;
        const customPowderTemp = UNew.Celsius(20);

        const dragModel = new DragModel(0.6, Table.G7, 150, 0.02);
        const ammo = new Ammo(dragModel, customLength, customVelocity, customTempModifier, customPowderTemp);

        expect(ammo.dm).toBe(dragModel);
        expect(ammo.length.In(Unit.Inch)).toBeCloseTo(3, 4);
        expect(ammo.mv.In(Unit.FPS)).toBeCloseTo(3000, 4);
        expect(ammo.tempModifier).toBe(customTempModifier);
        expect(ammo.powderTemp.In(Unit.Celsius)).toBeCloseTo(20, 4);
    });

    test('calcPowderSens', () => {
        const dragModel = new DragModel(0.5, Table.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        const otherVelocity = UNew.FPS(2800);
        const otherTemperature = UNew.Celsius(10);

        const tempModifier = ammo.calcPowderSens(otherVelocity, otherTemperature);

        expect(ammo.tempModifier).toBe(tempModifier);
    });

    test('getVelocityForTemp', () => {
        const dragModel = new DragModel(0.5, Table.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        const currentTemp = UNew.Celsius(25);

        const correctedVelocity = ammo.getVelocityForTemp(currentTemp);

        expect(correctedVelocity.In(calcSettings.Units.velocity)).toBeCloseTo(2700, 4);
    });
});
