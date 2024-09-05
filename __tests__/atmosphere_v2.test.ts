import { Atmo } from "../src/v2/conditions"; // Adjust the import path based on your project structure
import { Temperature, Pressure, Velocity, UNew } from "../src/v2/unit";

describe('Atmo Class Tests', () => {
    let standard: Atmo;
    let highICAO: Atmo;
    let highISA: Atmo;
    let custom: Atmo;

    beforeEach(() => {
        standard = Atmo.standard();
        highICAO = Atmo.standard(UNew.Foot(10000));
        highISA = Atmo.standard(UNew.Meter(1000));
        custom = new Atmo(
            null,
            UNew.InHg(31),
            UNew.Fahrenheit(30),
            0.5,
        );
    });

    test('Standard atmosphere properties', () => {
        expect(standard.temperature.In(Temperature.Fahrenheit)).toBeCloseTo(59.0, 1);
        expect(standard.pressure.In(Pressure.hPa)).toBeCloseTo(1013.25, 1);
        expect(standard.densityImperial).toBeCloseTo(0.076474, 4);
    });

    test('High altitude properties (ICAO and ISA)', () => {
        // Ref https://www.engineeringtoolbox.com/standard-atmosphere-d_604.html
        expect(highICAO.temperature.In(Temperature.Fahrenheit)).toBeCloseTo(23.36, 1);
        expect(highICAO.densityRatio).toBeCloseTo(0.7387, 3);
        // Ref https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html
        expect(highISA.pressure.In(Pressure.hPa)).toBeCloseTo(899, 0);
        expect(highISA.densityRatio).toBeCloseTo(0.9075, 4);
    });

    test('Mach calculations', () => {
        // Ref https://www.omnicalculator.com/physics/speed-of-sound
        expect(Atmo.machF(59)).toBeCloseTo(1116.15, 0);
        expect(Atmo.machF(10)).toBeCloseTo(1062.11, 0);
        expect(Atmo.machF(99)).toBeCloseTo(1158.39, 0);
        expect(Atmo.machC(-20)).toBeCloseTo(318.94, 1);
        expect(highISA.mach.In(Velocity.MPS)).toBeCloseTo(336.4, 1);
    });
});
