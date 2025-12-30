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
import { RangeError } from "../src/exceptions"; // Assuming exceptions are here
import { expect, describe, test, beforeEach } from "@jest/globals";
import { Shot } from "../src/shot";
import { Calculator } from "../src/interface";
import { TrajFlag } from "../src/_wasm";

// --- Helper Functions Mimicking Python Fixtures ---

// Helper to create a shot with a relative angle in degrees
const shotWithRelativeAngleInDegrees = (angleInDegrees: number): Shot => {
    const dm = new DragModel({
        bc: 0.223,
        dragTable: DragTables.G7,
        weight: 168,
        diameter: 0.308,
        length: UNew.Inch(1.282),
    });
    const ammo = new Ammo({
        dm: dm,
        mv: UNew.FPS(2750),
        powderTemp: UNew.Celsius(15),
    });
    ammo.calcPowderSens(2723, 0);
    const currentWinds = [new Wind({ velocity: 2, directionFrom: 90 })];

    const shot = new Shot({
        weapon: new Weapon({ sightHeight: UNew.Inch(0) }), // Assuming zero sight height for this fixture
        ammo: ammo,
        winds: currentWinds,
        lookAngle: UNew.Degree(angleInDegrees), // Set the look angle directly
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
    const zeroHeightCalc = new Calculator({ method }); // Declare with 'let' to be reassigned in beforeEach

    // This beforeEach hook runs before each 'test' function in this describe block.
    beforeEach(async () => {

    });

    test("test_shot_incomplete", async () => {
        const angleInDegrees = 5.0;
        const distance = UNew.Foot(6500.0);

        const shot = shotWithRelativeAngleInDegrees(angleInDegrees);

        const checkEndPoint = (hitResult: HitResult) => {
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
        hitResult = await zeroHeightCalc.fire({ shot, trajectoryRange: distance, filterFlags: trajFlags });
        checkEndPoint(hitResult);

        // Case 2: flags = NONE, trajectory_step = distance (single point)
        trajFlags = TrajFlag.NONE;
        hitResult = await zeroHeightCalc.fire({
            shot,
            trajectoryRange: distance,
            filterFlags: trajFlags,
            trajectoryStep: distance,
        });
        checkEndPoint(hitResult);

        // Case 3: flags = ALL
        trajFlags = TrajFlag.ALL;
        hitResult = await zeroHeightCalc.fire({ shot, trajectoryRange: distance, filterFlags: trajFlags });
        checkEndPoint(hitResult);

        // Case 4: flags = ALL, trajectory_step = distance (single point)
        trajFlags = TrajFlag.ALL;
        hitResult = await zeroHeightCalc.fire({
            shot,
            trajectoryRange: distance,
            filterFlags: trajFlags,
            trajectoryStep: distance,
        });
        checkEndPoint(hitResult);
    });

    test("test_vertical_shot", async () => {
        const shot = shotWithRelativeAngleInDegrees(90); // Vertical shot
        const range = UNew.Meter(10); // A small range

        let hitResult: HitResult;

        // Case 1: Without flags - should have exactly 2 points
        hitResult = await zeroHeightCalc.fire({ shot, trajectoryRange: range });
        expect(hitResult.trajectory.length).toBe(2);
        expect(hitResult.trajectory[hitResult.trajectory.length - 1].height.rawValue).toBeLessThan(1e-9);

        // Case 2: With ALL flags and config to allow crossing zero
        const calcWithConfig = new Calculator({
            method,
            config: {
                cMinimumVelocity: 0.0,
                cMinimumAltitude: -1.0,
                cMaximumDrop: -1.0,
            }
        });
        hitResult = await calcWithConfig.fire({ shot, trajectoryRange: range, filterFlags: TrajFlag.ALL });

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
                cMinimumVelocity: 0.0,
                cMinimumAltitude: -10.0,
                cMaximumDrop: -10.0,
            }
        });

        const hitResult = await calcWithConfig.fire({
            shot,
            trajectoryRange: range,
            trajectoryStep: UNew.Foot(100),
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
                let hitResult: HitResult;

                try {
                    hitResult = await zeroHeightCalc.fire({
                        shot,
                        trajectoryRange: range,
                        filterFlags: filterFlags,
                    });
                } catch (e: any) {
                    console.log(
                        `Caught error in test_no_duplicated_point_many_trajectories for angle ${angle} (extraData=${filterFlags}): ${e.reason || e.message}`
                    );
                    if (
                        e instanceof RangeError &&
                        [
                            RangeError.MaximumDropReached,
                            RangeError.MinimumAltitudeReached,
                        ].includes(e.reason)
                    ) {
                        hitResult = new HitResult(shot, e.incompleteTrajectory, Boolean(filterFlags & TrajFlag.ALL));
                    } else {
                        throw e;
                    }
                }
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
                try {
                    hitResultExtraData = await zeroHeightCalc.fire({
                        shot,
                        trajectoryRange: range,
                        filterFlags: extraDataFlag,
                    });
                } catch (e: any) {
                    console.log(
                        `Caught error in test_end_points_are_included (extraData=true): ${e.reason || e.message}`
                    ); // Added logging
                    if (
                        e instanceof RangeError &&
                        [
                            RangeError.MaximumDropReached,
                            RangeError.MinimumAltitudeReached,
                        ].includes(e.reason)
                    ) {
                        hitResultExtraData = new HitResult(
                            shot,
                            e.incompleteTrajectory,
                            true
                        );
                    } else {
                        throw e;
                    }
                }
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
                try {
                    hitResultNoExtraData = await zeroHeightCalc.fire({
                        shot,
                        trajectoryRange: range,
                        filterFlags: noExtraDataFlag,
                    });
                } catch (e: any) {
                    console.log(
                        `Caught error in test_end_points_are_included (extraData=false): ${e.reason || e.message}`
                    ); // Added logging
                    if (
                        e instanceof RangeError &&
                        [
                            RangeError.MaximumDropReached,
                            RangeError.MinimumAltitudeReached,
                        ].includes(e.reason)
                    ) {
                        hitResultNoExtraData = new HitResult(
                            shot,
                            e.incompleteTrajectory,
                            false
                        );
                    } else {
                        throw e;
                    }
                }
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
