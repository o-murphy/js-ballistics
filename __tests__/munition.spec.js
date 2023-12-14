import {
    Distance, Angular, calcSettings,
    Weapon, Unit, DragTable,
    Ammo, DragModel, Velocity, Temperature
} from '../src/index'; // Import necessary modules and classes


describe('Weapon Class', () => {
    test('Default Constructor', () => {
        const weapon = new Weapon();

        expect(weapon.sightHeight.in(calcSettings.Units.sight_height)).toBeCloseTo(2, 4);
        expect(weapon.zeroDistance.in(calcSettings.Units.distance)).toBeCloseTo(100, 4);
        expect(weapon.twist.in(calcSettings.Units.twist)).toBeCloseTo(0, 4);
        expect(weapon.zeroLookAngle.in(calcSettings.Units.angular)).toBeCloseTo(0, 4);
    });

    test('Custom Constructor', () => {
        const customSightHeight = new Distance(3, Unit.Inch);
        const customZeroDistance = new Distance(200, Unit.Yard);
        const customTwist = new Distance(3, Unit.Inch);
        const customZeroLookAngle = new Angular(2, Unit.MIL);

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
        expect(ammo.temp_modifier).toBe(0);
        expect(ammo.powder_temp.in(calcSettings.Units.temperature)).toBeCloseTo(15, 4);
    });

    test('Custom Constructor', () => {
        const customLength = new Distance(3, Unit.Inch);
        const customVelocity = new Velocity(3000, Unit.FPS);
        const customTempModifier = 10;
        const customPowderTemp = new Temperature(20, Unit.Celsius);

        const dragModel = new DragModel(0.6, DragTable.G7, 150, 0.02);
        const ammo = new Ammo(dragModel, customLength, customVelocity, customTempModifier, customPowderTemp);

        expect(ammo.dm).toBe(dragModel);
        expect(ammo.length.in(Unit.Inch)).toBeCloseTo(3, 4);
        expect(ammo.mv.in(Unit.FPS)).toBeCloseTo(3000, 4);
        expect(ammo.temp_modifier).toBe(customTempModifier);
        expect(ammo.powder_temp.in(Temperature.Celsius)).toBeCloseTo(20, 4);
    });

    test('calcPowderSens', () => {
        const dragModel = new DragModel(0.5, DragTable.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        const otherVelocity = new Velocity(2800, Unit.FPS);
        const otherTemperature = new Temperature(10, Unit.Celsius);

        const tempModifier = ammo.calcPowderSens(otherVelocity, otherTemperature);

        expect(ammo.temp_modifier).toBe(tempModifier);
    });

    test('getVelocityForTemp', () => {
        const dragModel = new DragModel(0.5, DragTable.G7, 100, 0.01);
        const ammo = new Ammo(dragModel);

        const currentTemp = new Temperature(25, Unit.Celsius);

        const correctedVelocity = ammo.getVelocityForTemp(currentTemp);

        expect(correctedVelocity.in(calcSettings.Units.velocity)).toBeCloseTo(2700, 4);
    });
});
