import {Unit, Distance} from './units'; // Adjust the path accordingly

class CalcSettings {
    // Global settings class of the js-ballistics library

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

    setMaxCalcStepSize(value) {
        console.warn("Settings._MAX_CALC_STEP_SIZE: " +
            "Change this property only if you know what you are doing;" +
            "too big step can corrupt calculation accuracy");
        console.warn(value)
        if (!(value instanceof Distance) && !(typeof value === 'number')) {
            throw new Error("MAX_CALC_STEP_SIZE must be a type of 'Distance'");
        } else if (value instanceof Distance) {
            this._MAX_CALC_STEP_SIZE = value
        } else {
            this._MAX_CALC_STEP_SIZE = new Distance(value, this.Units.distance);
        }
    }
}

const calcSettings = new CalcSettings();  // Global settings instance of the js-ballistics library
export default calcSettings;
