import { IntegrationMethod } from "../src";

export const methods = [
    { name: "RK4", method: IntegrationMethod.RK4 },
    { name: "EULER", method: IntegrationMethod.EULER },
    { name: "VELOCITY_VERLET", method: IntegrationMethod.VELOCITY_VERLET },
    { name: "CASH_KARP", method: IntegrationMethod.CASH_KARP },
    { name: "DOPRI", method: IntegrationMethod.DOPRI },
];
