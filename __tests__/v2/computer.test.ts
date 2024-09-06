import { expect, describe, test, beforeEach } from '@jest/globals';
import Calculator, { Ammo, Atmo, DragModel, Table, UNew, Weapon, Shot, HitResult } from '../../src/v2';


describe('TestComputer', () => {

    let baselineShot: Shot;
    let baselineTrajectory: HitResult;
    let calc: Calculator;
    let range: number;
    let step: number;

    beforeEach(() => {
        range = 1000;
        step = 100;
        const dm: DragModel = new DragModel(0.22, Table.G7, 168, 0.308, 1.22);
        const ammo = new Ammo(dm, UNew.FPS(2600));
        const weapon = new Weapon(4, 12);
        const atmo = Atmo.icao();
        calc = new Calculator();
        baselineShot = new Shot(weapon, ammo, null, null, null, atmo);
        baselineTrajectory = calc.fire(baselineShot, range, step);
    });

    test('cant_zero_elevation', () => {
        // Create a copy of the baseline shot and apply the cant_angle
        const cantedShot = new Shot(
            baselineShot.weapon,
            baselineShot.ammo,
            baselineShot.lookAngle,
            baselineShot.relativeAngle,
            baselineShot.cantAngle,
            baselineShot.atmo,
            baselineShot.winds
        );
        cantedShot.cantAngle = UNew.Degree(90);

        // Fire the canted shot
        const cantedTrajectory = calc.fire(
            cantedShot, 
            range, 
            step);

        // Perform the assertion comparing height and windage adjustments
        console.log(cantedTrajectory.trajectory[5].height.rawValue)
        console.log(baselineShot.weapon.sightHeight.rawValue)
        console.log(baselineTrajectory.trajectory[5].height.rawValue)
        expect(
            cantedTrajectory.trajectory[5].height.rawValue - baselineShot.weapon.sightHeight.rawValue
        ).toBeCloseTo(baselineTrajectory.trajectory[5].height.rawValue, 1e-2);

        expect(
            cantedTrajectory.trajectory[5].windage.rawValue + baselineShot.weapon.sightHeight.rawValue
        ).toBeCloseTo(baselineTrajectory.trajectory[5].windage.rawValue, 1e-2);
    });
});