import { Shot } from "../conditions";
import { DragTable } from "../drag_tables";
import { TrajectoryData } from "../trajectory_data";
import { Angular, Distance } from "../unit";

interface GenericConfig {
    // This could be any generic configuration structure
}

interface EngineConstructor<C extends GenericConfig> {
    new(config: Partial<C>): EngineInterface<C>;
}

interface EngineInterface<C extends GenericConfig> {
    readonly tableData: DragTable;
    zeroAngle(shotInfo: Shot, distance: Distance): Angular;
    trajectory(
        shotInfo: Shot,
        maxRange: Distance,
        distStep: Distance,
        extraData?: boolean,
        timeStep?: number,
    ): TrajectoryData[];
}

function createEngine<C extends GenericConfig>(
    ctor: EngineConstructor<C>,
    config: Partial<C>,
): EngineInterface<C> {
    return new ctor(config);
}

export { GenericConfig, EngineConstructor, EngineInterface, createEngine };
