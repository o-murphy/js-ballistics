import { Atmo, calcSettings, Unit, UNew, MultiBC, MultiBCRow, BCMachRow } from '../src/index.js';

describe('MultiBC', () => {
    const dragTable = [
        { CD: 0.2, Mach: 1.5 },
        { CD: 0.3, Mach: 2.0 },
        { CD: 0.25, Mach: 1.8 },
        // Add more data points as needed
    ];

    const diameter = UNew.Inch(0.5);
    const weight = UNew.Pound(1);
    const mbcTable = [
        { BC: 0.4, V: 3000 },
        { BC: 0.35, V: 2800 },
        // Add more MBC data points as needed
    ];

    const multiBC = new MultiBC(dragTable, diameter, weight, mbcTable);

    test('Constructor', () => {
        expect(multiBC.diameter).toEqual(diameter);
        expect(multiBC.weight).toEqual(weight);
        expect(multiBC.mbcTable).toEqual(mbcTable);
        // expect(multiBC.sectionalDensity).toBeCloseTo(0.14285714285714285, 4);
        // FIXME
        // expect(multiBC.speedOfSound).toBeCloseTo(340.292, 3); // Adjust the expected value based on your test case
    });

    test('parseMBC', () => {
        const parsedMBC = multiBC._parseMBC(mbcTable);
        const expectedParsedMBC = [
            new MultiBCRow(0.4, 914.4),
            new MultiBCRow(0.35, 853.44),
            // Add more expected MBC data points as needed
        ];

        expect(parsedMBC.CD).toEqual(expectedParsedMBC.CD);
    });

    // FIXME
    // test('cdm', () => {
    //     const cdm = multiBC.cdm;
    //     // Provide expected values based on your test case
    //     const expectedCDM = [
    //         { CD: 0.05, Mach: 1.5 },
    //         { CD: 0.07, Mach: 2.0 },
    //         { CD: 0.06, Mach: 1.8 },
    //         // Add more expected CDM points as needed
    //     ];
    //
    //     expect(cdm).toEqual(expectedCDM);
    // });
});
