import Calculator, { HitResult, Ammo, UNew, DragModel, Shot, Table, Distance, Weapon, Wind } from '../src';
import { expect, describe, test, beforeEach } from '@jest/globals';

describe('TestDangerSpace', () => {
    let shotResult: HitResult; // Replace 'any' with the appropriate type if known
    let lookAngle = UNew.Degree(0)

    beforeEach(() => {
        // Initialize the look angle
        
        // Create the DragModel
        const weight = 168;
        const diameter = 0.308;
        const length = UNew.Inch(1.282);
        const dm = new DragModel({bc: 0.223, dragTable: Table.G7, weight: weight, diameter: diameter, length: length});
        
        // Create Ammo and calculate powder sensitivity
        const ammo = new Ammo({dm: dm, mv: UNew.FPS(2750), powderTemp: UNew.Celsius(15)});
        ammo.calcPowderSens(2723, 0);
        
        // Create current winds
        const currentWinds = [new Wind({velocity: 2, directionFrom: UNew.Degree(90)})];
        
        // Create Shot and Calculator
        const shot = new Shot({
            weapon: new Weapon(),
            ammo: ammo,
            winds: currentWinds
        });
        
        const calc = new Calculator();
        calc.setWeaponZero(shot, UNew.Foot(300));
        
        // Fire the shot and store the result
        shotResult = calc.fire({shot: shot, trajectoryRange: UNew.Yard(1000), trajectoryStep: UNew.Yard(100), extraData: true});
    });

    test('danger_space', () => {
        // First test
        let dangerSpace = shotResult.dangerSpace(
            UNew.Yard(500), 
            UNew.Meter(1.5),
            lookAngle
        );

        // function assertAlmostEqual(actual: number, expected: number, tolerance: number = 1e-7) {
        //     expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
        // }
        

        expect(dangerSpace.begin.distance.In(Distance.Yard)).toBeCloseTo(393.6, 1e-1)
        expect(dangerSpace.end.distance.In(Distance.Yard)).toBeCloseTo(579.0, 1e-1)

        // Second test
        dangerSpace = shotResult.dangerSpace(
            UNew.Yard(500), 
            UNew.Inch(10), 
            lookAngle
        );

        expect(dangerSpace.begin.distance.In(Distance.Yard)).toBeCloseTo(484.5, 1e-1)
        expect(dangerSpace.end.distance.In(Distance.Yard)).toBeCloseTo(514.8, 1e-1)

        // assertAlmostEqual(dangerSpace.begin.distance.In(Distance.Yard), 484.5, 1);
        // assertAlmostEqual(dangerSpace.end.distance.In(Distance.Yard), 514.8, 1);
    });
});
