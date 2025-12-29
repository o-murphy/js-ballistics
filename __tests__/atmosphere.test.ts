import {
    Atmo,
    Temperature,
    Pressure,
    Velocity,
    UNew,
    Ammo,
    DragModel,
    DragTables,
    Weapon,
    IntegrationMethod,
} from "../src";
import { Calculator } from "../src/interface";
import { Shot } from "../src/shot";

const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

describe("Atmo Class Tests", () => {
    let standard: Atmo;
    let highICAO: Atmo;
    let highISA: Atmo;
    let custom: Atmo;

    beforeEach(() => {
        standard = Atmo.standard();
        highICAO = Atmo.standard({ altitude: UNew.Foot(10000) });
        highISA = Atmo.standard({ altitude: UNew.Meter(1000) });
        custom = new Atmo({
            pressure: UNew.InHg(31),
            temperature: UNew.Fahrenheit(30),
            humidity: 0.5,
        });
    });

    test("Standard atmosphere properties", () => {
        expect(standard.temperature.In(Temperature.Fahrenheit)).toBeCloseTo(59.0, 1);
        expect(standard.pressure.In(Pressure.hPa)).toBeCloseTo(1013.25, 1);
        expect(standard.densityImperial).toBeCloseTo(0.076474, 4);
    });

    test("High altitude properties (ICAO and ISA)", () => {
        // Ref https://www.engineeringtoolbox.com/standard-atmosphere-d_604.html
        expect(highICAO.temperature.In(Temperature.Fahrenheit)).toBeCloseTo(23.36, 1);
        expect(highICAO.densityRatio).toBeCloseTo(0.7387, 3);
        // Ref https://www.engineeringtoolbox.com/international-standard-atmosphere-d_985.html
        expect(highISA.pressure.In(Pressure.hPa)).toBeCloseTo(899, 0);
        expect(highISA.densityRatio).toBeCloseTo(0.9075, 4);
    });

    test("Mach calculations", () => {
        // Ref https://www.omnicalculator.com/physics/speed-of-sound
        expect(Atmo.machF(59)).toBeCloseTo(1116.15, 0);
        expect(Atmo.machF(10)).toBeCloseTo(1062.11, 0);
        expect(Atmo.machF(99)).toBeCloseTo(1158.39, 0);
        expect(highISA.mach.In(Velocity.MPS)).toBeCloseTo(336.4, 1);
    });

    test("density", () => {
        expect(Atmo.calculateAirDensity(20, 1013, 0)).toBeCloseTo(1.20383, 4);
        expect(Atmo.calculateAirDensity(20, 1013, 1)).toBeCloseTo(1.19332, 4);
    });

    test.each(methods)("trajectory effects $name", async (obj) => {
        const { method } = obj;
        const check_distance = UNew.Yard(1000);
        const ammo = new Ammo({
            dm: new DragModel({ bc: 0.22, dragTable: DragTables.G7 }),
            mv: UNew.FPS(3000),
        });
        const weapon = new Weapon();
        const atmo = new Atmo({ altitude: 0 }); // Start with standard sea-level atmosphere
        // Set baseline to zero at 1000 yards
        const zero = new Shot({ weapon, ammo, atmo });
        const calc = new Calculator({ method });
        const baseline_trajectory = await calc.fire({
            shot: zero,
            trajectoryRange: check_distance,
            trajectoryStep: check_distance,
        });
        const baseline = baseline_trajectory.getAtDistance(check_distance);

        // Increasing humidity reduces air density which decreases drag
        atmo.humidity = 1.0;
        const tNumid = await calc.fire({
            shot: new Shot({ weapon, ammo, atmo }),
            trajectoryRange: check_distance,
            trajectoryStep: check_distance,
        });
        expect(tNumid.getAtDistance(check_distance).time).toBeLessThan(baseline.time);

        // Increasing temperature reduces air density which decreases drag
        const warm = new Atmo({
            altitude: 0,
            temperature: UNew.Fahrenheit(120),
        });
        const tWarm = await calc.fire({
            shot: new Shot({ weapon, ammo, atmo: warm }),
            trajectoryRange: check_distance,
            trajectoryStep: check_distance,
        });
        expect(tWarm.getAtDistance(check_distance).time).toBeLessThan(baseline.time);

        // Increasing altitude reduces air density which decreases drag
        const high = new Atmo({ altitude: UNew.Foot(5000) }); // simulate increased altitude
        const tHight = await calc.fire({
            shot: new Shot({ weapon, ammo, atmo: high }),
            trajectoryRange: check_distance,
            trajectoryStep: check_distance,
        });
        expect(tHight.getAtDistance(check_distance).time).toBeLessThan(baseline.time);
    });
});
