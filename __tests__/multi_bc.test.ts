import {describe, expect, test} from '@jest/globals';
import { MultiBC, UNew, Ammo, Table, DragModel, TrajectoryCalc } from '../src/index.js';


describe("Multiple BC", () => {
    describe('MBC valid test', () => {
        // Litz's multi-bc table conversion to CDM, 338LM 285GR HORNADY ELD-M
        const mbc = new MultiBC(Table.G7,
            UNew.Inch(0.338),
            UNew.Grain(285),
            [
                { BC: 0.417, V: UNew.MPS(745) },
                { BC: 0.409, V: UNew.MPS(662) },
                { BC: 0.4, V: UNew.MPS(580) },
            ]
        );

        const cdm = mbc.cdm;
        const cds = Array.from(cdm, (p) => p.CD);
        const machs = Array.from(cdm, (p) => p.Mach);

        const reference = [
            [1, 0.3384895315],
            [2, 0.2573873416],
            [3, 0.2069547831],
            [4, 0.1652052415],
            [5, 0.1381406102],
        ];

        reference.forEach(([mach, cd]) => {
            let idx = machs.indexOf(mach);
            test(`${mach} ${idx}`, () => {
                expect(cds[idx]).toBeCloseTo(cd, 3);
            })

        });
    });

    test('MBC test', () => {
        const mbc = new MultiBC(
            Table.G7,
            UNew.Inch(0.308),
            UNew.Grain(178),
            [
                { BC: 0.275, V: 800 },
                { BC: 0.255, V: 500 },
                { BC: 0.26, V: 700 },
            ])

        const dm = DragModel.fromMbc(mbc);
        const ammo = new Ammo(dm, 1, 800);
        // TODO:
        const cdm = new TrajectoryCalc(ammo).cdm;
        expect(cdm).not.toBeNull();

        const ret = cdm;
        expect(ret[0]).toEqual({ Mach: 0.0, CD: 0.1259323091692403 });
        expect(ret[ret.length - 1]).toEqual({ Mach: 5.0, CD: 0.15771258594668947 });
    });

})
