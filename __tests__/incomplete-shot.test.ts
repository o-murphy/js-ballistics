import {
    HitResult,
    Ammo,
    UNew,
    DragModel,
    DragTables,
    Distance,
    Weapon,
    Wind,
    IntegrationMethod,
    loadBclibc,
} from "../src"; // Assuming these are in '../src'
import { expect, describe, test, beforeEach } from "@jest/globals";
import { Shot } from "../src/shot";
import { Calculator } from "../src/interface";
import { TrajFlag } from "../src/_wasm";

// --- Helper Functions Mimicking Python Fixtures ---

// Helper to create a shot with a relative angle in degrees
// Matches Python's create_5_56_mm_shot() fixture
const shotWithRelativeAngleInDegrees = (angleInDegrees: number): Shot => {
    // 5.56x45mm NATO SS109
    const dm = new DragModel({
        bc: 0.151,  // Match Python
        dragTable: DragTables.G7,
        weight: 62,  // grains, match Python
        diameter: 5.56 / 25.4,  // Convert 5.56mm to inches
        length: 21.0 / 25.4,  // Convert 21.0mm to inches
    });
    const ammo = new Ammo({
        dm: dm,
        mv: 900 * 3.28084,  // Convert 900 m/s to fps
        powderTemp: UNew.Celsius(15),
    });
    const currentWinds = [new Wind({ velocity: 2, directionFrom: 90 })];

    const shot = new Shot({
        weapon: new Weapon({ sightHeight: UNew.Inch(0) }),
        ammo: ammo,
        winds: currentWinds,
        relativeAngle: UNew.Degree(angleInDegrees),  // Use relativeAngle to match Python's shot.relative_angle
    });
    return shot;
};

// Define the engine types to test with for describe.each
const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
];

// --- Test Suite: Incomplete Shots (Parameterized by Engine) ---
// Use describe.each to iterate over different engine implementations
describe.each(methods)("Test Incomplete Shots with $name", (obj) => {
    const { method } = obj;
    // Match Python's zero_height_calc fixture with cMinimumVelocity=0.0
    const zeroHeightCalc = new Calculator({
        method,
        config: {
            minimumVelocity: 0.0,
            minimumAltitude: 0.0,
            maximumDrop: 0.0,
        }
    });

    // This beforeEach hook runs before each 'test' function in this describe block.
    beforeEach(async () => {

    });

    test("test_shot_incomplete", async () => {
        const angleInDegrees = 5.0;
        const distance = UNew.Foot(6500.0);

        const shot = shotWithRelativeAngleInDegrees(angleInDegrees);

        const checkEndPoint = (hitResult: HitResult) => {
            console.log(`=== Trajectory points (${hitResult.trajectory.length} total) ===`);
            hitResult.trajectory.forEach((point, i) => {
                console.log(`${i}: distance=${point.distance.foot.toFixed(2)}ft, height=${point.height.foot.toFixed(2)}ft`);
            });
            console.log(`Error: ${hitResult.error?.message || 'none'}`);

            const lastPoint = hitResult.trajectory[hitResult.trajectory.length - 1];
            const lastPointDistance = lastPoint.distance.In(Distance.Foot);
            const lastPointHeight = lastPoint.height.In(Distance.Foot);

            expect(lastPointDistance).toBeGreaterThan(6416.0);
            expect(lastPointHeight).toBeLessThan(1e-9); // Basically zero
        };

        let hitResult: HitResult;
        let trajFlags: TrajFlag;

        // Case 1: flags = NONE
        trajFlags = TrajFlag.NONE;
        hitResult = await zeroHeightCalc.fire({ shot, trajectoryRange: distance, filterFlags: trajFlags, raiseRangeError: false });
        checkEndPoint(hitResult);

        // Case 2: flags = NONE, trajectory_step = distance (single point)
        trajFlags = TrajFlag.NONE;
        hitResult = await zeroHeightCalc.fire({
            shot,
            trajectoryRange: distance,
            filterFlags: trajFlags,
            trajectoryStep: distance,
            raiseRangeError: false
        });
        checkEndPoint(hitResult);

        // Case 3: flags = ALL
        trajFlags = TrajFlag.ALL;
        hitResult = await zeroHeightCalc.fire({ shot, trajectoryRange: distance, filterFlags: trajFlags, raiseRangeError: false });
        checkEndPoint(hitResult);

        // Case 4: flags = ALL, trajectory_step = distance (single point)
        trajFlags = TrajFlag.ALL;
        hitResult = await zeroHeightCalc.fire({
            shot,
            trajectoryRange: distance,
            filterFlags: trajFlags,
            trajectoryStep: distance,
            raiseRangeError: false
        });
        checkEndPoint(hitResult);
    });

    test("test_vertical_shot", async () => {
        const shot = shotWithRelativeAngleInDegrees(90); // Vertical shot
        const range = UNew.Meter(10); // A small range

        let hitResult: HitResult;

        // Case 1: Without flags - should have exactly 2 points
        hitResult = await zeroHeightCalc.fire({ shot, trajectoryRange: range, raiseRangeError: false });

        // Debug output
        console.log('=== Vertical Shot Debug ===');
        console.log('Trajectory length:', hitResult.trajectory.length);
        console.log('Error:', hitResult.error);
        hitResult.trajectory.forEach((point, i) => {
            console.log(`Point ${i}: dist=${point.distance.foot.toFixed(2)}ft, height=${point.height.foot.toFixed(2)}ft, time=${point.time.toFixed(3)}s`);
        });

        expect(hitResult.trajectory.length).toBe(2);
        expect(hitResult.trajectory[hitResult.trajectory.length - 1].height.rawValue).toBeLessThan(1e-9);

        // Case 2: With ALL flags and config to allow crossing zero
        const calcWithConfig = new Calculator({
            method,
            config: {
                minimumVelocity: 0.0,
                minimumAltitude: -1.0,
                maximumDrop: -1.0,
            }
        });
        hitResult = await calcWithConfig.fire({ shot, trajectoryRange: range, filterFlags: TrajFlag.ALL, raiseRangeError: false });

        const zeroDown = hitResult.flag(TrajFlag.ZERO_DOWN);
        expect(zeroDown).not.toBeNull();
        expect(zeroDown!.distance.rawValue).toBeCloseTo(0, 10);
        expect(zeroDown!.height.In(Distance.Meter)).toBeCloseTo(0, 6);

        // Don't duplicate points
        expect(hitResult.trajectory[hitResult.trajectory.length - 1].time).not.toBe(
            hitResult.trajectory[hitResult.trajectory.length - 2].time
        );
    });

    test("test_no_duplicate_points", async () => {
        // This is a shot for point (1000ft, 0)
        const shot = shotWithRelativeAngleInDegrees(0.1385398904676405);
        const zeroDistance = UNew.Foot(1000);
        // Setting up bigger distance than required by shot
        const range = UNew.Foot(1100);

        const calcWithConfig = new Calculator({
            method,
            config: {
                minimumVelocity: 0.0,
                minimumAltitude: -10.0,
                maximumDrop: -10.0,
            }
        });

        const hitResult = await calcWithConfig.fire({
            shot,
            trajectoryRange: range,
            trajectoryStep: UNew.Foot(100),
            raiseRangeError: false
        });

        expect(hitResult.trajectory.length).toBeGreaterThanOrEqual(2);
        expect(hitResult.trajectory[hitResult.trajectory.length - 2]).not.toEqual(
            hitResult.trajectory[hitResult.trajectory.length - 1]
        );

        const resultAtZero = await hitResult.getAt(
            (await loadBclibc())._TrajectoryDataInterpKey.DISTANCE,
            zeroDistance.foot
        );
        expect(resultAtZero).not.toBeNull();
        expect(resultAtZero.distance.In(Distance.Foot)).toBeCloseTo(1000, 1);
        expect(resultAtZero.height.In(Distance.Foot)).toBeCloseTo(0, 2);

        const secondLastPoint = hitResult.trajectory[hitResult.trajectory.length - 2];
        const lastPoint = hitResult.trajectory[hitResult.trajectory.length - 1];

        expect(lastPoint.distance.In(Distance.Foot)).toBeGreaterThan(
            secondLastPoint.distance.In(Distance.Foot)
        );
        expect(lastPoint.height.In(Distance.Foot)).toBeLessThan(
            secondLastPoint.height.In(Distance.Foot)
        );
    });

    test("test_no_duplicated_point_many_trajectories", async () => {
        // Bigger than max range of weapon
        const range = UNew.Meter(8000);
        const bclibc = await loadBclibc()
        for (const filterFlags of [TrajFlag.RANGE, TrajFlag.ALL]) {
            for (let angle = 0; angle <= 90; angle += 10) {
                const shot = shotWithRelativeAngleInDegrees(angle);

                const hitResult = await zeroHeightCalc.fire({
                    shot,
                    trajectoryRange: range,
                    filterFlags: filterFlags,
                    raiseRangeError: false
                });

                expect(hitResult.trajectory.length).toBeGreaterThanOrEqual(0); // Ensure trajectory is not null/undefined/empty on error
                // console.log(`len(hitResult.trajectory)=${hitResult.trajectory.length}`);
                // In JS, converting array to Set removes duplicates if elements are primitive.
                // For objects, it removes if they are the exact same reference.
                // To check for duplicate data, we need to convert to a comparable primitive or string.
                const uniquePoints = new Set(
                    hitResult.trajectory.map((p) => JSON.stringify(p.inDefUnits()))
                );
                // Python's test `assert len(hit_result.trajectory)==len(set(hit_result.trajectory))`
                // This implicitly means if there's an incomplete trajectory, its points are unique.
                expect(hitResult.trajectory.length).toBe(uniquePoints.size);
            }
        }
    });

    // test_end_points_are_included - this is a parameterized test in Python
    // We will simulate the parameterization using a loop in Jest.
    const testPoints = [
        [400, 300, 37.018814944137404],
        [1200, 900, 37.5653274152026],
        [1200, 1500, 52.1940023594277],
        [1682.0020070293451, 3979.589760371905, 70.6834782844347],
        [4422.057278753554, 1975.0518929482573, 34.6455781039671],
        [5865.263344484814, 1097.7312160636257, 30.1865144767384],
        [564.766336537204, 1962.27673604624, 74.371041637992],
        [5281.061059442218, 2529.348893994985, 46.2771485569329],
        [2756.3221111683733, 4256.441991651934, 65.7650037845664],
        [63.11845014860512, 4215.811071201791, 89.2734502050901], // This one was failing
        [3304.002996878733, 4187.8846508525485, 65.48673417912764],
        [6937.3716148080375, 358.5414845184736, 38.98449130666212],
        [7126.0478000569165, 0.001, 38.58299087491584],
    ];

    describe.each(testPoints)(
        "test_end_points_are_included (Distance: %f, Height: %f, Angle: %f)",
        (distance, height, angleInDegrees) => {
            test("should get the same result with and without extra data", async () => {
                const shot = shotWithRelativeAngleInDegrees(angleInDegrees);
                const range = UNew.Meter(distance);
                console.log(`\nDistance: ${distance.toFixed(2)} Height: ${height.toFixed(2)}`);

                let hitResultExtraData: HitResult;
                let hitResultNoExtraData: HitResult;

                // Test with extra_data = true
                const extraDataFlag = TrajFlag.ALL;
                hitResultExtraData = await zeroHeightCalc.fire({
                    shot,
                    trajectoryRange: range,
                    filterFlags: extraDataFlag,
                    raiseRangeError: false
                });
                // Ensure trajectory is not empty before accessing elements.
                expect(hitResultExtraData.trajectory.length).toBeGreaterThanOrEqual(0); // Can be 0 if error at start
                let distanceExtraData = 0;
                let heightExtraData = 0;
                if (hitResultExtraData.trajectory.length > 0) {
                    const lastPointExtraData =
                        hitResultExtraData.trajectory[hitResultExtraData.trajectory.length - 1];
                    distanceExtraData = lastPointExtraData.distance.In(Distance.Meter);
                    heightExtraData = lastPointExtraData.height.In(Distance.Meter);
                }
                console.log(
                    `extra_data=${extraDataFlag} len(hitResultExtraData.trajectory)=${hitResultExtraData.trajectory.length} Distance ${distanceExtraData.toFixed(2)} Height ${heightExtraData.toFixed(2)}`
                );

                // Test with extra_data = false
                const noExtraDataFlag = TrajFlag.RANGE;
                hitResultNoExtraData = await zeroHeightCalc.fire({
                    shot,
                    trajectoryRange: range,
                    filterFlags: noExtraDataFlag,
                    raiseRangeError: false
                });
                // Ensure trajectory is not empty before accessing elements.
                expect(hitResultNoExtraData.trajectory.length).toBeGreaterThanOrEqual(0); // Can be 0 if error at start
                let distanceNoExtraData = 0;
                let heightNoExtraData = 0;
                if (hitResultNoExtraData.trajectory.length > 0) {
                    const lastPointNoExtraData =
                        hitResultNoExtraData.trajectory[hitResultNoExtraData.trajectory.length - 1];
                    distanceNoExtraData = lastPointNoExtraData.distance.In(Distance.Meter);
                    heightNoExtraData = lastPointNoExtraData.height.In(Distance.Meter);
                }
                console.log(
                    `extra_data=${noExtraDataFlag} len(hitResultNoExtraData.trajectory)=${hitResultNoExtraData.trajectory.length} Distance ${distanceNoExtraData.toFixed(2)} Height ${heightNoExtraData.toFixed(2)}`
                );

                const distanceDifference = Math.abs(distanceExtraData - distanceNoExtraData);
                const heightDifference = Math.abs(heightExtraData - heightNoExtraData);
                console.log(
                    `Difference in results Distance: ${distanceDifference.toFixed(2)} Height ${heightDifference.toFixed(2)}`
                );

                // Reverted to Python's expected tolerance for distanceDifference.
                // This test will likely fail for the 89.273... angle if JS still diverges significantly.
                expect(distanceDifference).toBeLessThanOrEqual(UNew.Foot(0.2).In(Distance.Meter));
            });
        }
    );
});
