import {Unit, Measure, unitTypeCoerce, Distance} from './unit'; // Adjust the path accordingly

interface DefinedUnits {
    sight_height: Unit,
    twist: Unit,
    velocity: Unit,
    distance: Unit,
    temperature: Unit,
    weight: Unit,
    length: Unit,
    diameter: Unit,
    pressure: Unit,
    drop: Unit,
    angular: Unit,
    adjustment: Unit,
    energy: Unit,
    ogw: Unit,
    target_height: Unit
}

class CalcSettings {
    /**
     * Global settings class of the js-ballistics library.
     * Defines default units and configuration settings.
     */
    public Units: DefinedUnits
    public USE_POWDER_SENSITIVITY: boolean
    private _MAX_CALC_STEP_SIZE: (number | Distance)

    constructor() {
        this.Units = {
            sight_height: Unit.Inch,
            twist: Unit.Inch,
            velocity: Unit.FPS,
            distance: Unit.Yard,
            temperature: Unit.Celsius,
            weight: Unit.Grain,
            length: Unit.Inch,
            diameter: Unit.Inch,
            pressure: Unit.hPa,
            drop: Unit.Centimeter,
            angular: Unit.Degree,
            adjustment: Unit.MIL,
            energy: Unit.Joule,
            ogw: Unit.Pound,
            target_height: Unit.Inch
        };

        this._MAX_CALC_STEP_SIZE = 1;
        this.USE_POWDER_SENSITIVITY = false;
    }

    /**
     * Sets the maximum calculation step size.
     * @param {number | Distance} value - The value of the maximum calculation step size.
     */
    set maxCalcStepSize(value: (number | Distance)) {
        console.warn("CalcSettings._MAX_CALC_STEP_SIZE: " +
            "Change this property only if you know what you are doing; " +
            "too big step can corrupt calculation accuracy");

        this._MAX_CALC_STEP_SIZE = unitTypeCoerce(value, Measure.Distance, this.Units.distance);
    }

    get maxStepSize(): (number|Distance) {
        return this._MAX_CALC_STEP_SIZE
    }
}

const calcSettings = new CalcSettings(); // Global settings instance of the js-ballistics library
export default calcSettings;
