import {
    calcSettings, Weapon, Ammo,
    UNew, Unit, DragTable, DragModel
} from '../src/index.js'; // Import necessary modules and classes


describe('Weapon Class', () => {
    test('Default Constructor', () => {
        const weapon = new Weapon();

        expect(weapon.sightHeight.in(calcSettings.Units.sight_height)).toBeCloseTo(2, 4);
        expect(weapon.zeroDistance.in(calcSettings.Units.distance)).toBeCloseTo(100, 4);
        expect(weapon.twist.in(calcSettings.Units.twist)).toBeCloseTo(0, 4);
        expect(weapon.zeroLookAngle.in(calcSettings.Units.angular)).toBeCloseTo(0, 4);
    });

    test('Custom Constructor', () => {
        const customSightHeight = UNew.Inch(3);
        const customZeroDistance = UNew.Yard(200);
        const customTwist = UNew.Inch(3);
        const customZeroLookAngle = UNew.MIL(2);

        const weapon = new Weapon(customSightHeight, customZeroDistance, customTwist, customZeroLookAngle);

        expect(weapon.sightHeight.in(Unit.Inch)).toBeCloseTo(3, 4);
        expect(weapon.zeroDistance.in(Unit.Yard)).toBeCloseTo(200, 4);
        expect(weapon.twist.in(Unit.Inch)).toBeCloseTo(3, 4);
        expect(weapon.zeroLookAngle.in(Unit.MIL)).toBeCloseTo(2, 4);
    });
});


describe('Ammo Class', () => {
    test('Default Constructor', () => {
        const dragModel = new DragModel(0.5, DragTable.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        expect(ammo.dm).toBe(dragModel);
        expect(ammo.length.in(calcSettings.Units.length)).toBeCloseTo(2, 4);
        expect(ammo.mv.in(calcSettings.Units.velocity)).toBeCloseTo(2700, 4);
        expect(ammo.tempModifier).toBe(0);
        expect(ammo.powderTemp.in(calcSettings.Units.temperature)).toBeCloseTo(15, 4);
    });

    test('Custom Constructor', () => {
        const customLength = UNew.Inch(3);
        const customVelocity = UNew.FPS(3000);
        const customTempModifier = 10;
        const customPowderTemp = UNew.Celsius(20);

        const dragModel = new DragModel(0.6, DragTable.G7, 150, 0.02);
        const ammo = new Ammo(dragModel, customLength, customVelocity, customTempModifier, customPowderTemp);

        expect(ammo.dm).toBe(dragModel);
        expect(ammo.length.in(Unit.Inch)).toBeCloseTo(3, 4);
        expect(ammo.mv.in(Unit.FPS)).toBeCloseTo(3000, 4);
        expect(ammo.tempModifier).toBe(customTempModifier);
        expect(ammo.powderTemp.in(Unit.Celsius)).toBeCloseTo(20, 4);
    });

    test('calcPowderSens', () => {
        const dragModel = new DragModel(0.5, DragTable.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        const otherVelocity = UNew.FPS(2800);
        const otherTemperature = UNew.Celsius(10);

        const tempModifier = ammo.calcPowderSens(otherVelocity, otherTemperature);

        expect(ammo.tempModifier).toBe(tempModifier);
    });

    test('getVelocityForTemp', () => {
        const dragModel = new DragModel(0.5, DragTable.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        const currentTemp = UNew.Celsius(25);

        const correctedVelocity = ammo.getVelocityForTemp(currentTemp);

        expect(correctedVelocity.in(calcSettings.Units.velocity)).toBeCloseTo(2700, 4);
    });
});
