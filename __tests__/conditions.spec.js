import {
    Atmo,
    Wind,
    Shot,
    Unit,
    calcSettings,
    Distance,
    Angular,
    cStandardPressure,
    cStandardTemperature
} from "../src/index";


describe('Conditions', () => {

    describe("Atmo create", () => {
        const atmo = Atmo.icao()

        test("Atmo altitude check", () => {
            expect(atmo.altitude.in(Unit.Foot)).toBeCloseTo(0, 4);
        });

        test("Atmo pressure check", () => {
            expect(atmo.pressure.in(Unit.InHg)).toBeCloseTo(cStandardPressure, 4);
        });

        test("Atmo temperature check", () => {
            expect(atmo.temperature.in(Unit.Fahrenheit)).toBeCloseTo(cStandardTemperature, 4);
        });

        // FIXME: add methods tests

    });

    describe("Wind create", () => {
        const wind = new Wind(10, 10, 1000)

        test("Wind velocity check", () => {
            expect(wind.velocity.in(calcSettings.Units.velocity)).toBeCloseTo(10, 4);
        });

        test("Wind direction check", () => {
            expect(wind.directionFrom.in(calcSettings.Units.angular)).toBeCloseTo(10, 4);
        });

        test("Wind distance check", () => {
            expect(wind.untilDistance.in(calcSettings.Units.distance)).toBeCloseTo(1000, 4);
        });

        // FIXME: add methods tests

    });

    describe("Shot create", () => {
        const shot = new Shot()
        const atmo = Atmo.icao()
        const winds = [new Wind()]

        test("Shot create check", () => {
            expect(shot).toEqual(
                {
                    maxRange: new Distance(1000, calcSettings.Units.distance),
                    zeroAngle: new Angular(0, calcSettings.Units.angular),
                    relativeAngle: new Angular(0, calcSettings.Units.angular),
                    cantAngle: new Angular(0, calcSettings.Units.angular),
                    atmo: atmo,
                    winds: winds
                }
            );
        });

        // FIXME: add methods tests

    });

});