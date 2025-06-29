import {
    Calculator,
    HitResult,
    Ammo,
    UNew,
    DragModel,
    Shot,
    Table,
    Distance,
    Weapon,
    Wind,
    EulerIntegrationEngine,
    RK4IntegrationEngine,
    Angular,
    Temperature,
    Velocity,
} from "../src"; // Assuming these are in '../src'
import { TrajectoryRangeError, ZeroFindingError } from "../src/exceptions"; // Assuming exceptions are here
import { expect, describe, test, beforeEach } from "@jest/globals";

// --- Helper Functions Mimicking Python Fixtures ---

// Helper to create a shot with a relative angle in degrees
const shotWithRelativeAngleInDegrees = (angleInDegrees: number): Shot => {
    const dm = new DragModel({
        bc: 0.223,
        dragTable: Table.G7,
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
const calculatorsToTest = [
    { engine: EulerIntegrationEngine, name: "EulerIntegrationEngine" },
    { engine: RK4IntegrationEngine, name: "RK4IntegrationEngine" },
];

// --- Test Suite: Incomplete Shots (Parameterized by Engine) ---
// Use describe.each to iterate over different engine implementations
describe.each(calculatorsToTest)("Test Incomplete Shots with %s", ({ engine, name }) => {
    let zeroHeightCalc: Calculator<any>; // Declare with 'let' to be reassigned in beforeEach

    // This beforeEach hook runs before each 'test' function in this describe block.
    beforeEach(() => {
        zeroHeightCalc = new Calculator({ engine }); // Initialize for each test
    });

    test("test_shot_incomplete", () => {
        const angleInDegrees = 5.219710693607955;
        const distance = 6937.3716148080375;

        const shot = shotWithRelativeAngleInDegrees(angleInDegrees);
        const range = UNew.Meter(distance);

        const checkEndPoint = (hitResult: HitResult) => {
            const lastPoint = hitResult.trajectory[hitResult.trajectory.length - 1];
            const lastPointDistance = lastPoint.distance.In(Distance.Meter);
            const lastPointHeight = lastPoint.height.In(Distance.Meter);
            // console.log(`lastPointDistance=${lastPointDistance} lastPointHeight=${lastPointHeight}`);
            expect(lastPointDistance).toBeGreaterThan(3525.0);
            expect(lastPointHeight).toBeCloseTo(0, 10); // abs=1e-10 is very small, use higher precision
        };

        let hitResult: HitResult;
        let extraData: boolean;

        // Case 1: extra_data = false
        extraData = false;
        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData });
        } catch (e: any) {
            console.log(`Caught error in test_shot_incomplete (Case 1): ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e; // Re-throw if it's an unexpected error
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
        checkEndPoint(hitResult);

        // Case 2: extra_data = false, trajectory_step = range (single point)
        extraData = false;
        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData, trajectoryStep: range });
        } catch (e: any) {
            console.log(`Caught error in test_shot_incomplete (Case 2): ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e;
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
        checkEndPoint(hitResult);

        // Case 3: extra_data = true
        extraData = true;
        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData });
        } catch (e: any) {
            console.log(`Caught error in test_shot_incomplete (Case 3): ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e;
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
        checkEndPoint(hitResult);

        // Case 4: extra_data = true, trajectory_step = range (single point)
        extraData = true;
        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData, trajectoryStep: range });
        } catch (e: any) {
            console.log(`Caught error in test_shot_incomplete (Case 4): ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e;
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
        checkEndPoint(hitResult);
    });

    test("test_vertical_shot", () => {
        const shot = shotWithRelativeAngleInDegrees(90); // Vertical shot
        const range = UNew.Meter(10); // A small range

        let hitResult: HitResult;
        let extraData: boolean;

        // Case 1: extra_data = false
        extraData = false;
        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData });
        } catch (e: any) {
            console.log(`Caught error in test_vertical_shot (Case 1): ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e;
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
        const lastPointFalse = hitResult.trajectory[hitResult.trajectory.length - 1];
        expect(lastPointFalse.distance.In(Distance.Meter)).toBeCloseTo(0, 10); // abs=1e-10
        expect(lastPointFalse.height.In(Distance.Meter)).toBeCloseTo(0, 1); // abs=0.1

        // Case 2: extra_data = true
        extraData = true;
        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData });
        } catch (e: any) {
            console.log(`Caught error in test_vertical_shot (Case 2): ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e;
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
        const lastPointTrue = hitResult.trajectory[hitResult.trajectory.length - 1];
        expect(lastPointTrue.distance.In(Distance.Meter)).toBeCloseTo(0, 10); // abs=1e-10
        expect(lastPointTrue.height.In(Distance.Meter)).toBeCloseTo(0, 1); // abs=0.1
    });

    test("test_no_duplicate_points", () => {
        // This is a shot for point (1000, 0)
        const shot = shotWithRelativeAngleInDegrees(0.46571949074059704);
        // Setting up bigger distance than required by shot
        const range = UNew.Meter(1100);

        let hitResult: HitResult;
        let extraData = false; // Based on Python test

        try {
            hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData, trajectoryStep: UNew.Meter(100) });
        } catch (e: any) {
            console.log(`Caught error in test_no_duplicate_points: ${e.reason || e.message}`); // Added logging
            if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
            } else {
                throw e;
            }
        }
        expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty

        expect(hitResult.trajectory.length).toBeGreaterThanOrEqual(2);
        // Jest's expect().not.toBe() compares by reference. We need to compare properties.
        // The original Python test uses `assert hit_result[-2] != hit_result[-1]`,
        // which for dataclasses compares values. For JS objects, need to compare content.
        expect(JSON.stringify(hitResult.trajectory[hitResult.trajectory.length - 2].inDefUnits())).not.toEqual(
            JSON.stringify(hitResult.trajectory[hitResult.trajectory.length - 1].inDefUnits())
        );

        const secondLastPoint = hitResult.trajectory[hitResult.trajectory.length - 2];
        const lastPoint = hitResult.trajectory[hitResult.trajectory.length - 1];

        expect(secondLastPoint.distance.In(Distance.Meter)).toBeCloseTo(1000, 1); // abs=0.2 in Python is 1 decimal place here
        expect(secondLastPoint.height.In(Distance.Meter)).toBeCloseTo(0, 2); // abs=0.01 in Python is 2 decimal places here

        expect(lastPoint.distance.In(Distance.Meter)).toBeGreaterThan(secondLastPoint.distance.In(Distance.Meter));
        expect(lastPoint.height.In(Distance.Meter)).toBeLessThan(secondLastPoint.height.In(Distance.Meter));
    });

    test("test_no_duplicated_point_many_trajectories", () => {
        // Bigger than max range of weapon
        const range = UNew.Meter(8000);

        for (const extraData of [false, true]) {
            for (let angle = 0; angle <= 90; angle += 10) {
                const shot = shotWithRelativeAngleInDegrees(angle);
                let hitResult: HitResult;

                try {
                    hitResult = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraData });
                } catch (e: any) {
                    if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                        // console.log(`Got range error ${e}`);
                        hitResult = new HitResult(shot, e.incompleteTrajectory, extraData);
                    } else {
                        throw e;
                    }
                }
                // console.log(`len(hitResult.trajectory)=${hitResult.trajectory.length}`);
                expect(hitResult.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
                // In JS, converting array to Set removes duplicates if elements are primitive.
                // For objects, it removes if they are the exact same reference.
                // To check for duplicate data, we need to convert to a comparable primitive or string.
                const uniquePoints = new Set(hitResult.trajectory.map(p => JSON.stringify(p.inDefUnits())));
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
        [63.11845014860512, 4215.811071201791, 89.2734502050901],
        [3304.002996878733, 4187.8846508525485, 65.48673417912764],
        [6937.3716148080375, 358.5414845184736, 38.98449130666212],
        [7126.0478000569165, 0.001, 38.58299087491584],
    ];

    describe.each(testPoints)("test_end_points_are_included (Distance: %f, Height: %f, Angle: %f)", (distance, height, angleInDegrees) => {
        test("should get the same result with and without extra data", () => {
            const shot = shotWithRelativeAngleInDegrees(angleInDegrees);
            const range = UNew.Meter(distance);
            console.log(`\nDistance: ${distance.toFixed(2)} Height: ${height.toFixed(2)}`);

            let hitResultExtraData: HitResult;
            let hitResultNoExtraData: HitResult;

            // Test with extra_data = true
            const extraDataFlag = true;
            try {
                hitResultExtraData = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: extraDataFlag });
            } catch (e: any) {
                console.log(`Caught error in test_end_points_are_included (extraData=true): ${e.reason || e.message}`); // Added logging
                if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                    hitResultExtraData = new HitResult(shot, e.incompleteTrajectory, extraDataFlag);
                } else {
                    throw e;
                }
            }
            expect(hitResultExtraData.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
            console.log(`extra_data=${extraDataFlag} len(hitResultExtraData.trajectory)=${hitResultExtraData.trajectory.length}`);
            const lastPointExtraData = hitResultExtraData.trajectory[hitResultExtraData.trajectory.length - 1];
            const distanceExtraData = lastPointExtraData.distance.In(Distance.Meter);
            const heightExtraData = lastPointExtraData.height.In(Distance.Meter);
            console.log(`extra_data=${extraDataFlag} Distance ${distanceExtraData.toFixed(2)} Height ${heightExtraData.toFixed(2)}`);

            // Test with extra_data = false
            const noExtraDataFlag = false;
            try {
                hitResultNoExtraData = zeroHeightCalc.fire({ shot, trajectoryRange: range, extraData: noExtraDataFlag });
            } catch (e: any) {
                console.log(`Caught error in test_end_points_are_included (extraData=false): ${e.reason || e.message}`); // Added logging
                if (e instanceof TrajectoryRangeError && [TrajectoryRangeError.MaximumDropReached, TrajectoryRangeError.MinimumAltitudeReached].includes(e.reason)) {
                    hitResultNoExtraData = new HitResult(shot, e.incompleteTrajectory, noExtraDataFlag);
                } else {
                    throw e;
                }
            }
            expect(hitResultNoExtraData.trajectory.length).toBeGreaterThan(0); // Ensure trajectory is not empty
            console.log(`extra_data=${noExtraDataFlag} len(hitResultNoExtraData.trajectory)=${hitResultNoExtraData.trajectory.length}`);
            const lastPointNoExtraData = hitResultNoExtraData.trajectory[hitResultNoExtraData.trajectory.length - 1];
            const distanceNoExtraData = lastPointNoExtraData.distance.In(Distance.Meter);
            const heightNoExtraData = lastPointNoExtraData.height.In(Distance.Meter);
            console.log(`extra_data=${noExtraDataFlag} Distance ${distanceNoExtraData.toFixed(2)} Height ${heightNoExtraData.toFixed(2)}`);

            const distanceDifference = Math.abs(distanceExtraData - distanceNoExtraData);
            const heightDifference = Math.abs(heightExtraData - heightNoExtraData);
            console.log(`Difference in results Distance: ${distanceDifference.toFixed(2)} Height ${heightDifference.toFixed(2)}`);

            expect(distanceDifference).toBeLessThanOrEqual(UNew.Foot(0.2).In(Distance.Meter));
        });
    });
});
