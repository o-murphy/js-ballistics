import {describe, expect, test} from '@jest/globals';
import {
    Unit, UNew,
    Atmo,
    Wind,
    Shot,
    cStandardPressure,
    cStandardTemperature,
    calcSettings,
} from "../src/index";

describe('Conditions', () => {

    describe("Atmo create", () => {
        const atmo: Atmo = Atmo.icao()

        test("Atmo altitude check", () => {
            expect(atmo.altitude.In(Unit.Foot)).toBeCloseTo(0, 4);
        });

        test("Atmo pressure check", () => {
            expect(atmo.pressure.In(Unit.InHg)).toBeCloseTo(cStandardPressure, 4);
        });

        test("Atmo temperature check", () => {
            expect(atmo.temperature.In(Unit.Fahrenheit)).toBeCloseTo(cStandardTemperature, 4);
        });

        // FIXME: add methods tests

    });

    describe("Wind create", () => {
        const wind = new Wind(10, 10, 1000)

        test("Wind velocity check", () => {
            expect(wind.velocity.In(calcSettings.Units.velocity)).toBeCloseTo(10, 4);
        });

        test("Wind direction check", () => {
            expect(wind.directionFrom.In(calcSettings.Units.angular)).toBeCloseTo(10, 4);
        });

        test("Wind distance check", () => {
            expect(wind.untilDistance.In(calcSettings.Units.distance)).toBeCloseTo(1000, 4);
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
                    maxRange: UNew[calcSettings.Units.distance](1000),
                    zeroAngle: UNew[calcSettings.Units.angular](0),
                    relativeAngle: UNew[calcSettings.Units.angular](0),
                    cantAngle: UNew[calcSettings.Units.angular](0),
                    atmo: atmo,
                    winds: winds
                }
            );
        });

        // FIXME: add methods tests

    });

});