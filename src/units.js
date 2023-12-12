// Use-full types for units of measurement conversion for ballistics calculations


class AbstractUnit {

    // Abstract class for unit of measure instance definition
    // Stores defined unit and value, applies conversions to other units

    constructor(value, units) {

        // :param units: unit as Unit enum
        // :param value: numeric value of the unit

        this._value = this.toRaw(value, units);
        this._definedUnits = units;
    }

    toString() {

        // Returns readable unit value
        // :return: readable unit value

        const units = this._definedUnits;
        const props = UnitPropsDict[units];
        const v = this.fromRaw(this._value, units);
        return `${v.toFixed(props.accuracy)}${props.symbol}`;
    }

    _unit_support_error(value, units) {

        // Validates the units
        // :param value: value of the unit
        // :param units: Unit enum type
        // :return: value in specified units

        if (!(units instanceof this.constructor)) {
            const err_msg = `Type expected: ${this.constructor.name}, ${typeof units} found: ${units} (${value})`;
            throw new TypeError(err_msg);
        }
        if (!Object.values(this).includes(units)) {
            throw new Error(`${this.constructor.name}: unit ${units} is not supported`);
        }
        return 0;
    }

    toRaw(value, units) {

        // Converts value with specified units to raw value
        // :param value: value of the unit
        // :param units: Unit enum type
        // :return: value in specified units

        return this._unit_support_error(value, units);
    }

    fromRaw(value, units) {

        // Converts raw value to specified units
        // :param value: raw value of the unit
        // :param units: Unit enum type
        // :return: value in specified units

        return this._unit_support_error(value, units);
    }

    to(units) {

        // Returns new unit instance in specified units
        // :param units: Unit enum type
        // :return: new unit instance in specified units

        const value = this.in(units);
        return new this.constructor(value, units);
    }

    in(units) {

        // Returns value in specified units
        // :param units: Unit enum type
        // :return: value in specified units

        return this.fromRaw(this._value, units);
    }

    get units() {

        // Returns defined units
        // :return: defined units

        return this._definedUnits;
    }

    get rawValue() {

        // Raw unit value getter
        // :return: raw unit value

        return this._value;
    }
};


class Angular extends AbstractUnit {
    // Angular unit

    toRaw(value, units) {
        if (units === Angular.Radian) {
            return value;
        }
        if (units === Angular.Degree) {
            return (value / 180) * Math.PI;
        }
        if (units === Angular.MOA) {
            return (value / 180) * Math.PI / 60;
        }
        if (units === Angular.Mil) {
            return (value / 3200) * Math.PI;
        }
        if (units === Angular.MRad) {
            return value / 1000;
        }
        if (units === Angular.Thousand) {
            return (value / 3000) * Math.PI;
        }
        if (units === Angular.InchesPer100Yd) {
            return Math.atan(value / 3600);
        }
        if (units === Angular.CmPer100M) {
            return Math.atan(value / 10000);
        }
        if (units === Angular.OClock) {
            return (value / 6) * Math.PI;
        }

        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Angular.Radian) {
            return value;
        }
        if (units === Angular.Degree) {
            return (value * 180) / Math.PI;
        }
        if (units === Angular.MOA) {
            return (value * 180) / Math.PI * 60;
        }
        if (units === Angular.Mil) {
            return (value * 3200) / Math.PI;
        }
        if (units === Angular.MRad) {
            return value * 1000;
        }
        if (units === Angular.Thousand) {
            return (value * 3000) / Math.PI;
        }
        if (units === Angular.InchesPer100Yd) {
            return Math.tan(value) * 3600;
        }
        if (units === Angular.CmPer100M) {
            return Math.tan(value) * 10000;
        }
        if (units === Angular.OClock) {
            return (value * 6) / Math.PI;
        }

        return super.fromRaw(value, units);
    }
}


class Distance extends AbstractUnit {
    // Distance unit

    toRaw(value, units) {
        if (units === Distance.Inch) {
            return value;
        }
        if (units === Distance.Foot) {
            return value * 12;
        } else if (units === Distance.Yard) {
            return value * 36;
        } else if (units === Distance.Mile) {
            return value * 63360;
        } else if (units === Distance.NauticalMile) {
            return value * 72913.3858;
        } else if (units === Distance.Line) {
            return value / 10;
        } else if (units === Distance.Millimeter) {
            return value / 25.4;
        } else if (units === Distance.Centimeter) {
            return value / 2.54;
        } else if (units === Distance.Meter) {
            return value / 25.4 * 1000;
        } else if (units === Distance.Kilometer) {
            return value / 25.4 * 1000000;
        } else {
            return super.toRaw(value, units);
        }
    }

    fromRaw(value, units) {
        if (units === Distance.Inch) {
            return value;
        }
        if (units === Distance.Foot) {
            return value / 12;
        } else if (units === Distance.Yard) {
            return value / 36;
        } else if (units === Distance.Mile) {
            return value / 63360;
        } else if (units === Distance.NauticalMile) {
            return value / 72913.3858;
        } else if (units === Distance.Line) {
            return value * 10;
        } else if (units === Distance.Millimeter) {
            return value * 25.4;
        } else if (units === Distance.Centimeter) {
            return value * 2.54;
        } else if (units === Distance.Meter) {
            return value * 25.4 / 1000;
        } else if (units === Distance.Kilometer) {
            return value * 25.4 / 1000000;
        } else {
            return super.fromRaw(value, units);
        }
    }
}


class Velocity extends AbstractUnit {
    // Velocity unit

    toRaw(value, units) {
        if (units === Velocity.MPS) {
            return value;
        }
        if (units === Velocity.KMH) {
            return value / 3.6;
        }
        if (units === Velocity.FPS) {
            return value / 3.2808399;
        }
        if (units === Velocity.MPH) {
            return value / 2.23693629;
        }
        if (units === Velocity.KT) {
            return value / 1.94384449;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Velocity.MPS) {
            return value;
        }
        if (units === Velocity.KMH) {
            return value * 3.6;
        }
        if (units === Velocity.FPS) {
            return value * 3.2808399;
        }
        if (units === Velocity.MPH) {
            return value * 2.23693629;
        }
        if (units === Velocity.KT) {
            return value * 1.94384449;
        }
        return super.fromRaw(value, units);
    }
}


class Weight extends AbstractUnit {
    // Weight unit

    toRaw(value, units) {
        if (units === Weight.Grain) {
            return value;
        }
        if (units === Weight.Gram) {
            return value * 15.4323584;
        }
        if (units === Weight.Kilogram) {
            return value * 15432.3584;
        }
        if (units === Weight.Newton) {
            return value * 151339.73750336;
        }
        if (units === Weight.Pound) {
            return value / 0.000142857143;
        }
        if (units === Weight.Ounce) {
            return value * 437.5;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Weight.Grain) {
            return value;
        }
        if (units === Weight.Gram) {
            return value / 15.4323584;
        }
        if (units === Weight.Kilogram) {
            return value / 15432.3584;
        }
        if (units === Weight.Newton) {
            return value / 151339.73750336;
        }
        if (units === Weight.Pound) {
            return value * 0.000142857143;
        }
        if (units === Weight.Ounce) {
            return value / 437.5;
        }
        return super.fromRaw(value, units);
    }
}


class Pressure extends AbstractUnit {
    // Pressure unit

    toRaw(value, units) {
        if (units === Pressure.MmHg) {
            return value;
        }
        if (units === Pressure.InHg) {
            return value * 25.4;
        }
        if (units === Pressure.Bar) {
            return value * 750.061683;
        }
        if (units === Pressure.HP) {
            return value * 750.061683 / 1000;
        }
        if (units === Pressure.PSI) {
            return value * 51.714924102396;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Pressure.MmHg) {
            return value;
        }
        if (units === Pressure.InHg) {
            return value / 25.4;
        }
        if (units === Pressure.Bar) {
            return value / 750.061683;
        }
        if (units === Pressure.HP) {
            return value / 750.061683 * 1000;
        }
        if (units === Pressure.PSI) {
            return value / 51.714924102396;
        }
        return super.fromRaw(value, units);
    }
}


class Temperature extends AbstractUnit {
    // Temperature unit

    toRaw(value, units) {
        if (units === Temperature.Fahrenheit) {
            return value;
        }
        if (units === Temperature.Rankin) {
            return value - 459.67;
        }
        if (units === Temperature.Celsius) {
            return value * 9 / 5 + 32;
        }
        if (units === Temperature.Kelvin) {
            return (value - 273.15) * 9 / 5 + 32;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Temperature.Fahrenheit) {
            return value;
        }
        if (units === Temperature.Rankin) {
            return value + 459.67;
        }
        if (units === Temperature.Celsius) {
            return (value - 32) * 5 / 9;
        }
        if (units === Temperature.Kelvin) {
            return (value - 32) * 5 / 9 + 273.15;
        }
        return super.fromRaw(value, units);
    }
}


class Energy extends AbstractUnit {
    // Energy unit

    toRaw(value, units) {
        if (units === Energy.FootPound) {
            return value;
        }
        if (units === Energy.Joule) {
            return value * 0.737562149277;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Energy.FootPound) {
            return value;
        }
        if (units === Energy.Joule) {
            return value / 0.737562149277;
        }
        return super.fromRaw(value, units);
    }
}


const Unit = {
    // Unit types enum

    RAD: 0,
    Degree: 1,
    MOA: 2,
    MIL: 3,
    MRAD: 4,
    Thousand: 5,
    InchesPer100Yd: 6,
    CmPer100M: 7,
    OClock: 8,
    Inch: 10,
    Foot: 11,
    Yard: 12,
    Mile: 13,
    NauticalMile: 14,
    Millimeter: 15,
    Centimeter: 16,
    Meter: 17,
    Kilometer: 18,
    Line: 19,
    FootPound: 30,
    Joule: 31,
    MmHg: 40,
    InHg: 41,
    Bar: 42,
    HP: 43,
    PSI: 44,
    Fahrenheit: 50,
    Celsius: 51,
    Kelvin: 52,
    Rankin: 53,
    MPS: 60,
    KMH: 61,
    FPS: 62,
    MPH: 63,
    KT: 64,
    Grain: 70,
    Ounce: 71,
    Gram: 72,
    Pound: 73,
    Kilogram: 74,
    Newton: 75,
};


const UnitPropsDict = {
    [Unit.RAD]: { name: 'radian', accuracy: 6, symbol: 'rad' },
    [Unit.Degree]: { name: 'degree', accuracy: 4, symbol: '°' },
    [Unit.MOA]: { name: 'MOA', accuracy: 2, symbol: 'MOA' },
    [Unit.MIL]: { name: 'MIL', accuracy: 2, symbol: 'MIL' },
    [Unit.MRAD]: { name: 'MRAD', accuracy: 2, symbol: 'MRAD' },
    [Unit.Thousand]: { name: 'thousand', accuracy: 2, symbol: 'ths' },
    [Unit.InchesPer100Yd]: { name: 'inches/100yd', accuracy: 2, symbol: 'in/100yd' },
    [Unit.CmPer100M]: { name: 'cm/100m', accuracy: 2, symbol: 'cm/100m' },
    [Unit.OClock]: { name: 'hour', accuracy: 2, symbol: 'h' },

    [Unit.Inch]: { name: 'inch', accuracy: 3, symbol: 'inch' },
    [Unit.Foot]: { name: 'foot', accuracy: 2, symbol: 'ft' },
    [Unit.Yard]: { name: 'yard', accuracy: 3, symbol: 'yd' },
    [Unit.Mile]: { name: 'mile', accuracy: 3, symbol: 'mi' },
    [Unit.NauticalMile]: { name: 'nautical mile', accuracy: 3, symbol: 'nm' },
    [Unit.Millimeter]: { name: 'millimeter', accuracy: 3, symbol: 'mm' },
    [Unit.Centimeter]: { name: 'centimeter', accuracy: 3, symbol: 'cm' },
    [Unit.Meter]: { name: 'meter', accuracy: 3, symbol: 'm' },
    [Unit.Kilometer]: { name: 'kilometer', accuracy: 3, symbol: 'km' },
    [Unit.Line]: { name: 'line', accuracy: 3, symbol: 'ln' },

    [Unit.FootPound]: { name: 'foot * pound', accuracy: 0, symbol: 'ft·lb' },
    [Unit.Joule]: { name: 'joule', accuracy: 0, symbol: 'J' },

    [Unit.MmHg]: { name: 'mmHg', accuracy: 0, symbol: 'mmHg' },
    [Unit.InHg]: { name: 'inHg', accuracy: 6, symbol: 'inHg' },
    [Unit.Bar]: { name: 'bar', accuracy: 2, symbol: 'bar' },
    [Unit.HP]: { name: 'hPa', accuracy: 4, symbol: 'hPa' },
    [Unit.PSI]: { name: 'psi', accuracy: 4, symbol: 'psi' },

    [Unit.Fahrenheit]: { name: 'fahrenheit', accuracy: 1, symbol: '°F' },
    [Unit.Celsius]: { name: 'celsius', accuracy: 1, symbol: '°C' },
    [Unit.Kelvin]: { name: 'kelvin', accuracy: 1, symbol: '°K' },
    [Unit.Rankin]: { name: 'rankin', accuracy: 1, symbol: '°R' },

    [Unit.MPS]: { name: 'mps', accuracy: 0, symbol: 'm/s' },
    [Unit.KMH]: { name: 'kmh', accuracy: 1, symbol: 'km/h' },
    [Unit.FPS]: { name: 'fps', accuracy: 1, symbol: 'ft/s' },
    [Unit.MPH]: { name: 'mph', accuracy: 1, symbol: 'mph' },
    [Unit.KT]: { name: 'knots', accuracy: 1, symbol: 'kt' },

    [Unit.Grain]: { name: 'grain', accuracy: 1, symbol: 'gr' },
    [Unit.Ounce]: { name: 'ounce', accuracy: 1, symbol: 'oz' },
    [Unit.Gram]: { name: 'gram', accuracy: 1, symbol: 'g' },
    [Unit.Pound]: { name: 'pound', accuracy: 3, symbol: 'lb' },
    [Unit.Kilogram]: { name: 'kilogram', accuracy: 3, symbol: 'kg' },
    [Unit.Newton]: { name: 'newton', accuracy: 3, symbol: 'N' },
};


// Angular unit constants
Angular.Radian = Unit.RAD;
Angular.Degree = Unit.Degree;
Angular.MOA = Unit.MOA;
Angular.Mil = Unit.MIL;
Angular.MRad = Unit.MRAD;
Angular.Thousand = Unit.Thousand;
Angular.InchesPer100Yd = Unit.InchesPer100Yd;
Angular.CmPer100M = Unit.CmPer100M;
Angular.OClock = Unit.OClock;


// Distance unit constants
Distance.Inch = Unit.Inch;
Distance.Foot = Unit.Foot;
Distance.Yard = Unit.Yard;
Distance.Mile = Unit.Mile;
Distance.NauticalMile = Unit.NauticalMile;
Distance.Line = Unit.Line;
Distance.Millimeter = Unit.Millimeter;
Distance.Centimeter = Unit.Centimeter;
Distance.Meter = Unit.Meter;
Distance.Kilometer = Unit.Kilometer;


// Velocity unit constants
Velocity.MPS = Unit.MPS;
Velocity.KMH = Unit.KMH;
Velocity.FPS = Unit.FPS;
Velocity.MPH = Unit.MPH;
Velocity.KT = Unit.KT;


// Weight unit constants
Weight.Grain = Unit.Grain;
Weight.Ounce = Unit.Ounce;
Weight.Gram = Unit.Gram;
Weight.Pound = Unit.Pound;
Weight.Kilogram = Unit.Kilogram;
Weight.Newton = Unit.Newton;


// Pressure unit constants
Pressure.MmHg = Unit.MmHg;
Pressure.InHg = Unit.InHg;
Pressure.Bar = Unit.Bar;
Pressure.HP = Unit.HP;
Pressure.PSI = Unit.PSI;


// Temperature unit constants
Temperature.Fahrenheit = Unit.Fahrenheit;
Temperature.Celsius = Unit.Celsius;
Temperature.Kelvin = Unit.Kelvin;
Temperature.Rankin = Unit.Rankin;


// Energy unit constants
Energy.FootPound = Unit.FootPound;
Energy.Joule = Unit.Joule;


//// reference of usage
// let di
// distance = new Distance(1, Distance.Foot);
// console.log(distance.toString());
// console.log(distance.to(Distance.Centimeter));
// console.log(distance.in(Distance.Inch));


module.exports = {
    AbstractUnit, Angular, Distance, Velocity, Weight, Temperature, Pressure, Energy, Unit, UnitPropsDict
}

// // ES6 syntax
// export { AbstractUnit, Angular, Distance, Velocity, Weight, Temperature, Pressure, Energy, Unit, UnitPropsDict }
