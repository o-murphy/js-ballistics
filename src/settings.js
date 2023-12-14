import { Unit, Distance, unitTypeCoerce } from './unit.js'; // Adjust the path accordingly

class CalcSettings {
    /**
     * Global settings class of the js-ballistics library.
     * Defines default units and configuration settings.
     */
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
    setMaxCalcStepSize(value) {
        console.warn("CalcSettings._MAX_CALC_STEP_SIZE: " +
            "Change this property only if you know what you are doing; " +
            "too big step can corrupt calculation accuracy");

        this._MAX_CALC_STEP_SIZE = unitTypeCoerce(value, Distance, this.Units.distance);
    }
}

const calcSettings = new CalcSettings(); // Global settings instance of the js-ballistics library
export default calcSettings;
