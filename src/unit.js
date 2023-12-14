// Use-full types for units of measurement conversion for ballistics calculations


class AbstractUnit {
    /**
     * Abstract class for unit of measure instance definition.
     * Stores defined unit and value, applies conversions to other units.
     *
     * @param {number} value - Numeric value of the unit.
     * @param {Unit} units - Unit as Unit enum.
     */
    constructor(value, units) {
        this._value = this.toRaw(value, units);
        this._definedUnits = units;
    }

    /**
     * Returns a human-readable representation of the value with its unit.
     *
     * @return {string} A string representing the value with its unit.
     */
    toString() {
        // Extract the unit details based on the defined units.
        const units = this._definedUnits;
        const props = UnitProps[units];

        // Convert the raw value to the specified unit.
        const v = this.fromRaw(this._value, units);

        // Format the value with a fixed number of decimal places and concatenate the unit symbol.
        return `${v.toFixed(props.accuracy)}${props.symbol}`;
    }

    /**
     * Validates the units.
     *
     * @param {number} value - Value of the unit.
     * @param {Unit} units - Unit enum type.
     * @return {number} Value in specified units.
     * @throws {TypeError} When the provided units are not of the expected type.
     * @throws {Error} When the provided units are not supported.
     */
    _unit_support_error(value, units) {

        if (!(units instanceof this.constructor)) {
            const err_msg = `Type expected: ${this.constructor.name}, ${typeof units} found: ${units} (${value})`;
            throw new TypeError(err_msg);
        }

        if (!Object.values(this).includes(units)) {
            throw new Error(`${this.constructor.name}: unit ${units} is not supported`);
        }

        return 0;
    }

    /**
     * Converts value with specified units to raw value.
     *
     * @param {number} value - Value of the unit.
     * @param {Unit} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    toRaw(value, units) {
        return this._unit_support_error(value, units);
    }

    /**
     * Converts raw value to specified units.
     *
     * @param {number} value - Raw value of the unit.
     * @param {Unit} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    fromRaw(value, units) {
        return this._unit_support_error(value, units);
    }

    /**
     * Returns a new unit instance in specified units.
     *
     * @param {Unit} units - Unit enum type.
     * @return {AbstractUnit} New unit instance in specified units.
     */
    to(units) {
        const value = this.in(units);
        return new this.constructor(value, units);
    }

    /**
     * Returns value in specified units.
     *
     * @param {Unit} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    in(units) {

        return this.fromRaw(this._value, units);
    }

    /**
     * Returns defined units.
     *
     * @return {Unit} Defined units.
     */
    get units() {
        return this._definedUnits;
    }

    /**
     * Raw unit value getter.
     *
     * @return {number} Raw unit value.
     */
    get rawValue() {
        return this._value;
    }
}


class Angular extends AbstractUnit {
    // Angular unit

    toRaw(value, units) {
        if (units === Unit.Radian) {
            return value;
        }
        if (units === Unit.Degree) {
            return (value / 180) * Math.PI;
        }
        if (units === Unit.MOA) {
            return (value / 180) * Math.PI / 60;
        }
        if (units === Unit.MIL) {
            return (value / 3200) * Math.PI;
        }
        if (units === Unit.MRad) {
            return value / 1000;
        }
        if (units === Unit.Thousand) {
            return (value / 3000) * Math.PI;
        }
        if (units === Unit.InchesPer100Yd) {
            return Math.atan(value / 3600);
        }
        if (units === Unit.CmPer100M) {
            return Math.atan(value / 10000);
        }
        if (units === Unit.OClock) {
            return (value / 6) * Math.PI;
        }

        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Unit.Radian) {
            return value;
        }
        if (units === Unit.Degree) {
            return (value * 180) / Math.PI;
        }
        if (units === Unit.MOA) {
            return (value * 180) / Math.PI * 60;
        }
        if (units === Unit.MIL) {
            return (value * 3200) / Math.PI;
        }
        if (units === Unit.MRad) {
            return value * 1000;
        }
        if (units === Unit.Thousand) {
            return (value * 3000) / Math.PI;
        }
        if (units === Unit.InchesPer100Yd) {
            return Math.tan(value) * 3600;
        }
        if (units === Unit.CmPer100M) {
            return Math.tan(value) * 10000;
        }
        if (units === Unit.OClock) {
            return (value * 6) / Math.PI;
        }

        return super.fromRaw(value, units);
    }
}


class Distance extends AbstractUnit {
    // Distance unit

    toRaw(value, units) {
        if (units === Unit.Inch) {
            return value;
        }
        if (units === Unit.Foot) {
            return value * 12;
        } else if (units === Unit.Yard) {
            return value * 36;
        } else if (units === Unit.Mile) {
            return value * 63360;
        } else if (units === Unit.NauticalMile) {
            return value * 72913.3858;
        } else if (units === Unit.Line) {
            return value / 10;
        } else if (units === Unit.Millimeter) {
            return value / 25.4;
        } else if (units === Unit.Centimeter) {
            return value / 2.54;
        } else if (units === Unit.Meter) {
            return value / 25.4 * 1000;
        } else if (units === Unit.Kilometer) {
            return value / 25.4 * 1000000;
        } else {
            return super.toRaw(value, units);
        }
    }

    fromRaw(value, units) {
        if (units === Unit.Inch) {
            return value;
        }
        if (units === Unit.Foot) {
            return value / 12;
        } else if (units === Unit.Yard) {
            return value / 36;
        } else if (units === Unit.Mile) {
            return value / 63360;
        } else if (units === Unit.NauticalMile) {
            return value / 72913.3858;
        } else if (units === Unit.Line) {
            return value * 10;
        } else if (units === Unit.Millimeter) {
            return value * 25.4;
        } else if (units === Unit.Centimeter) {
            return value * 2.54;
        } else if (units === Unit.Meter) {
            return value * 25.4 / 1000;
        } else if (units === Unit.Kilometer) {
            return value * 25.4 / 1000000;
        } else {
            return super.fromRaw(value, units);
        }
    }
}


class Velocity extends AbstractUnit {
    // Velocity unit

    toRaw(value, units) {
        if (units === Unit.MPS) {
            return value;
        }
        if (units === Unit.KMH) {
            return value / 3.6;
        }
        if (units === Unit.FPS) {
            return value / 3.2808399;
        }
        if (units === Unit.MPH) {
            return value / 2.23693629;
        }
        if (units === Unit.KT) {
            return value / 1.94384449;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Unit.MPS) {
            return value;
        }
        if (units === Unit.KMH) {
            return value * 3.6;
        }
        if (units === Unit.FPS) {
            return value * 3.2808399;
        }
        if (units === Unit.MPH) {
            return value * 2.23693629;
        }
        if (units === Unit.KT) {
            return value * 1.94384449;
        }
        return super.fromRaw(value, units);
    }
}


class Weight extends AbstractUnit {
    // Weight unit

    toRaw(value, units) {
        if (units === Unit.Grain) {
            return value;
        }
        if (units === Unit.Gram) {
            return value * 15.4323584;
        }
        if (units === Unit.Kilogram) {
            return value * 15432.3584;
        }
        if (units === Unit.Newton) {
            return value * 151339.73750336;
        }
        if (units === Unit.Pound) {
            return value / 0.000142857143;
        }
        if (units === Unit.Ounce) {
            return value * 437.5;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Unit.Grain) {
            return value;
        }
        if (units === Unit.Gram) {
            return value / 15.4323584;
        }
        if (units === Unit.Kilogram) {
            return value / 15432.3584;
        }
        if (units === Unit.Newton) {
            return value / 151339.73750336;
        }
        if (units === Unit.Pound) {
            return value * 0.000142857143;
        }
        if (units === Unit.Ounce) {
            return value / 437.5;
        }
        return super.fromRaw(value, units);
    }
}


class Pressure extends AbstractUnit {
    // Pressure unit

    toRaw(value, units) {
        if (units === Unit.MmHg) {
            return value;
        }
        if (units === Unit.InHg) {
            return value * 25.4;
        }
        if (units === Unit.Bar) {
            return value * 750.061683;
        }
        if (units === Unit.hPa) {
            return value * 750.061683 / 1000;
        }
        if (units === Unit.PSI) {
            return value * 51.714924102396;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Unit.MmHg) {
            return value;
        }
        if (units === Unit.InHg) {
            return value / 25.4;
        }
        if (units === Unit.Bar) {
            return value / 750.061683;
        }
        if (units === Unit.hPa) {
            return value / 750.061683 * 1000;
        }
        if (units === Unit.PSI) {
            return value / 51.714924102396;
        }
        return super.fromRaw(value, units);
    }
}


class Temperature extends AbstractUnit {
    // Temperature unit

    toRaw(value, units) {
        if (units === Unit.Fahrenheit) {
            return value;
        }
        if (units === Unit.Rankin) {
            return value - 459.67;
        }
        if (units === Unit.Celsius) {
            return value * 9 / 5 + 32;
        }
        if (units === Unit.Kelvin) {
            return (value - 273.15) * 9 / 5 + 32;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Unit.Fahrenheit) {
            return value;
        }
        if (units === Unit.Rankin) {
            return value + 459.67;
        }
        if (units === Unit.Celsius) {
            return (value - 32) * 5 / 9;
        }
        if (units === Unit.Kelvin) {
            return (value - 32) * 5 / 9 + 273.15;
        }
        return super.fromRaw(value, units);
    }
}


class Energy extends AbstractUnit {
    // Energy unit

    toRaw(value, units) {
        if (units === Unit.FootPound) {
            return value;
        }
        if (units === Unit.Joule) {
            return value * 0.737562149277;
        }
        return super.toRaw(value, units);
    }

    fromRaw(value, units) {
        if (units === Unit.FootPound) {
            return value;
        }
        if (units === Unit.Joule) {
            return value / 0.737562149277;
        }
        return super.fromRaw(value, units);
    }
}


// Unit types enum
const Unit = {
    Radian: 0,
    Degree: 1,
    MOA: 2,
    MIL: 3,
    MRad: 4,
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
    hPa: 43,
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


// Dict of properties of the Unit enum type
const UnitProps = {
    [Unit.Radian]: { name: 'radian', accuracy: 6, symbol: 'rad' },
    [Unit.Degree]: { name: 'degree', accuracy: 4, symbol: '°' },
    [Unit.MOA]: { name: 'MOA', accuracy: 2, symbol: 'MOA' },
    [Unit.MIL]: { name: 'MIL', accuracy: 2, symbol: 'MIL' },
    [Unit.MRad]: { name: 'MRAD', accuracy: 2, symbol: 'MRAD' },
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
    [Unit.hPa]: { name: 'hPa', accuracy: 4, symbol: 'hPa' },
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
Angular.Radian = Unit.Radian;
Angular.Degree = Unit.Degree;
Angular.MOA = Unit.MOA;
Angular.MIL = Unit.MIL;
Angular.MRad = Unit.MRad;
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
Pressure.hPa = Unit.hPa;
Pressure.PSI = Unit.PSI;


// Temperature unit constants
Temperature.Fahrenheit = Unit.Fahrenheit;
Temperature.Celsius = Unit.Celsius;
Temperature.Kelvin = Unit.Kelvin;
Temperature.Rankin = Unit.Rankin;


// Energy unit constants
Energy.FootPound = Unit.FootPound;
Energy.Joule = Unit.Joule;


const Measure = {
    Angular: Angular,
    Distance: Distance,
    Velocity: Velocity,
    Weight: Weight,
    Temperature: Temperature,
    Pressure: Pressure,
    Energy: Energy,
}


/**
 * Coerces the given instance to the specified class type or creates a new instance.
 *
 * @param {AbstractUnit|Object} instance - The instance to coerce or create.
 * @param {AbstractUnit|Object|function} expectedClass - The expected class type.
 * @param {Unit} defaultUnit - The default unit for creating a new instance.
 * @returns {AbstractUnit|Object} An instance of the expected class type.
 * @throws {TypeError} If the instance is not of the expected class type or 'number'.
 */
function unitTypeCoerce(instance, expectedClass, defaultUnit) {
    if (!instance) {
        // If the instance is falsy, create a new instance using the default unit.
        return new expectedClass(instance, defaultUnit);
    } else if (instance instanceof expectedClass) {
        // If the instance is already of the expected class type, return it.
        return instance;
    } else if (typeof instance === 'number') {
        // If the instance is a number, create a new instance using the default unit.
        return new expectedClass(instance, defaultUnit);
    } else {
        // If the instance is not of the expected type, throw a TypeError.
        throw new TypeError(`Instance must be a type of ${
            Object.getPrototypeOf(instance).constructor.name
        } or 'number'`);
    }
}


const UNew = {
        Radian: (value) => new Angular(value, Unit.Radian),
        Degree: (value) => new Angular(value, Unit.Degree),
        MOA: (value) => new Angular(value, Unit.MOA),
        MIL: (value) => new Angular(value, Unit.MIL),
        MRad: (value) => new Angular(value, Unit.MRad),
        Thousand: (value) => new Angular(value, Unit.Thousand),
        InchesPer100Yd: (value) => new Angular(value, Unit.InchesPer100Yd),
        CmPer100M: (value) => new Angular(value, Unit.CmPer100M),
        OClock: (value) => new Angular(value, Unit.OClock),
        Inch: (value) => new Distance(value, Unit.Inch),
        Foot: (value) => new Distance(value, Unit.Foot),
        Yard: (value) => new Distance(value, Unit.Yard),
        Mile: (value) => new Distance(value, Unit.Mile),
        Millimeter: (value) => new Distance(value, Unit.Millimeter),
        Centimeter: (value) => new Distance(value, Unit.Centimeter),
        Meter: (value) => new Distance(value, Unit.Meter),
        Kilometer: (value) => new Distance(value, Unit.Kilometer),
        Line: (value) => new Distance(value, Unit.Line),
        FootPound: (value) => new Energy(value, Unit.FootPound),
        Joule: (value) => new Energy(value, Unit.Joule),
        MmHg: (value) => new Pressure(value, Unit.MmHg),
        InHg: (value) => new Pressure(value, Unit.InHg),
        Bar: (value) => new Pressure(value, Unit.Bar),
        hPa: (value) => new Pressure(value, Unit.hPa),
        PSI: (value) => new Pressure(value, Unit.PSI),
        Fahrenheit: (value) => new Temperature(value, Unit.Fahrenheit),
        Celsius: (value) => new Temperature(value, Unit.Celsius),
        Kelvin: (value) => new Temperature(value, Unit.Kelvin),
        Rankin: (value) => new Temperature(value, Unit.Rankin),
        MPS: (value) => new Velocity(value, Unit.MPS),
        KMH: (value) => new Velocity(value, Unit.KMH),
        FPS: (value) => new Velocity(value, Unit.FPS),
        MPH: (value) => new Velocity(value, Unit.MPH),
        KT: (value) => new Velocity(value, Unit.KT),
        Grain: (value) => new Weight(value, Unit.Grain),
        Ounce: (value) => new Weight(value, Unit.Ounce),
        Gram: (value) => new Weight(value, Unit.Gram),
        Pound: (value) => new Weight(value, Unit.Pound),
        Kilogram: (value) => new Weight(value, Unit.Kilogram),
        Newton: (value) => new Weight(value, Unit.Newton)
};

UNew[Unit.Radian] = UNew.Radian
UNew[Unit.Degree] = UNew.Degree
UNew[Unit.MOA] = UNew.MOA
UNew[Unit.MIL] = UNew.MIL
UNew[Unit.MRad] = UNew.MRad
UNew[Unit.Thousand] = UNew.Thousand
UNew[Unit.InchesPer100Yd] = UNew.InchesPer100Yd
UNew[Unit.CmPer100M] = UNew.CmPer100M
UNew[Unit.OClock] = UNew.OClock
UNew[Unit.Inch] = UNew.Inch
UNew[Unit.Foot] = UNew.Foot
UNew[Unit.Yard] = UNew.Yard
UNew[Unit.Mile] = UNew.Mile
UNew[Unit.Millimeter] = UNew.Millimeter
UNew[Unit.Centimeter] = UNew.Centimeter
UNew[Unit.Meter] = UNew.Meter
UNew[Unit.Kilometer] = UNew.Kilometer
UNew[Unit.Line] = UNew.Line
UNew[Unit.FootPound] = UNew.FootPound
UNew[Unit.Joule] = UNew.Joule
UNew[Unit.MmHg] = UNew.MmHg
UNew[Unit.InHg] = UNew.InHg
UNew[Unit.Bar] = UNew.Bar
UNew[Unit.hPa] = UNew.hPa
UNew[Unit.PSI] = UNew.PSI
UNew[Unit.Fahrenheit] = UNew.Fahrenheit
UNew[Unit.Celsius] = UNew.Celsius
UNew[Unit.Kelvin] = UNew.Kelvin
UNew[Unit.Rankin] = UNew.Rankin
UNew[Unit.MPS] = UNew.MPS
UNew[Unit.KMH] = UNew.KMH
UNew[Unit.FPS] = UNew.FPS
UNew[Unit.MPH] = UNew.MPH
UNew[Unit.KT] = UNew.KT
UNew[Unit.Grain] = UNew.Grain
UNew[Unit.Ounce] = UNew.Ounce
UNew[Unit.Gram] = UNew.Gram
UNew[Unit.Pound] = UNew.Pound
UNew[Unit.Kilogram] = UNew.Kilogram
UNew[Unit.Newton] = UNew.Newton


/**
 * Second realisation of unit type coercion
 * Coerces the given instance to the specified class type or creates a new instance.
 *
 * @param {Object|AbstractUnit|number} instance - The instance to coerce or create.
 * @param {Unit} expected - The default unit for creating a new instance.
 * @returns {AbstractUnit|Object} An instance of the expected class type.
 * @throws {TypeError} If the instance is not of the expected class type or 'number'.
 */
function unitTypeCoerce2(instance, expected) {
    console.log(instance)
    console.log('Yard' in instance)
    console.log(instance.hasOwnProperty(expected))
    if (instance instanceof AbstractUnit) {
        // If the instance is already of the expected class type, return it.
        return instance;
    } else if (typeof instance === 'number') {
        // If the instance is a number, create a new instance using the default unit.
        return UNew[expected](instance)
    } else {
        // If the instance is not of the expected type, throw a TypeError.
        throw new TypeError("Instance must be a type of 'AbstractUnit' or 'number'");
    }
}


export {
    // AbstractUnit, Angular, Distance, Velocity, Weight, Temperature, Pressure, Energy,
    Unit, UnitProps, unitTypeCoerce, unitTypeCoerce2, UNew, Measure
}
