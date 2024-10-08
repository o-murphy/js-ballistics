// Use-full types for units of measurement conversion for ballistics calculations


// Unit types enum
enum Unit {
    Radian = 0,
    Degree = 1,
    MOA = 2,
    MIL = 3,
    MRad = 4,
    Thousand = 5,
    InchesPer100Yd = 6,
    CmPer100M = 7,
    OClock = 8,
    Inch = 10,
    Foot = 11,
    Yard = 12,
    Mile = 13,
    NauticalMile = 14,
    Millimeter = 15,
    Centimeter = 16,
    Meter = 17,
    Kilometer = 18,
    Line = 19,
    FootPound = 30,
    Joule = 31,
    MmHg = 40,
    InHg = 41,
    Bar = 42,
    hPa = 43,
    PSI = 44,
    Fahrenheit = 50,
    Celsius = 51,
    Kelvin = 52,
    Rankin = 53,
    MPS = 60,
    KMH = 61,
    FPS = 62,
    MPH = 63,
    KT = 64,
    Grain = 70,
    Ounce = 71,
    Gram = 72,
    Pound = 73,
    Kilogram = 74,
    Newton = 75,
}


class AbstractUnit {
    /**
     * Abstract class for unit of measure instance definition.
     * Stores defined unit and value, applies conversions to other units.
     *
     * @param {number} value - Numeric value of the unit.
     * @param {Unit} units - Unit as Unit enum.
     */

    ["constructor"]: typeof AbstractUnit;
    _value: number
    _definedUnits: Unit

    constructor(value: number, units: Unit) {
        // this["constructor"] = this.constructor;
        this._value = this.toRaw(value, units);
        this._definedUnits = units;
    }

    /**
     * Returns a human-readable representation of the value with its unit.
     *
     * @return {string} A string representing the value with its unit.
     */
    toString(): string {
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
    protected _unit_support_error(value: number, units: any): number {

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
    protected toRaw(value: number, units: Unit): number {
        return this._unit_support_error(value, units);
    }

    /**
     * Converts raw value to specified units.
     *
     * @param {number} value - Raw value of the unit.
     * @param {Unit} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    protected fromRaw(value: number, units: Unit): number {
        return this._unit_support_error(value, units);
    }

    /**
     * Returns a new unit instance in specified units.
     *
     * @param {Unit} units - Unit enum type.
     * @return {AbstractUnit} New unit instance in specified units.
     */
    to(units: Unit): AbstractUnit {
        const value: number = this.In(units);
        return new this.constructor(value, units);
    }

    /**
     * Returns value in specified units.
     *
     * @param {Unit} units - Unit enum type.
     * @return {number} Value in specified units.
     */
    In(units: Unit): number {
        return this.fromRaw(this._value, units);
    }

    /**
     * Returns defined units.
     *
     * @return {Unit} Defined units.
     */
    get units(): Unit {
        return this._definedUnits;
    }

    /**
     * Raw unit value getter.
     *
     * @return {number} Raw unit value.
     */
    get rawValue(): number {
        return this._value;
    }
}

/**
 * Angular unit
 */
class Angular extends AbstractUnit {

    // Angular unit constants
    static Radian = Unit.Radian;
    static Degree = Unit.Degree;
    static MOA = Unit.MOA;
    static MIL = Unit.MIL;
    static MRad = Unit.MRad;
    static Thousand = Unit.Thousand;
    static InchesPer100Yd = Unit.InchesPer100Yd;
    static CmPer100M = Unit.CmPer100M;
    static OClock = Unit.OClock;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
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

    protected fromRaw(value: number, units: Unit): number {
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

/**
 * Distance unit
 */
class Distance extends AbstractUnit {

    // Distance unit constants
    static Inch = Unit.Inch;
    static Foot = Unit.Foot;
    static Yard = Unit.Yard;
    static Mile = Unit.Mile;
    static NauticalMile = Unit.NauticalMile;
    static Line = Unit.Line;
    static Millimeter = Unit.Millimeter;
    static Centimeter = Unit.Centimeter;
    static Meter = Unit.Meter;
    static Kilometer = Unit.Kilometer;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
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

    protected fromRaw(value: number, units: Unit): number {
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

/**
 * Velocity unit
 */
class Velocity extends AbstractUnit {

    // Velocity unit constants
    static MPS = Unit.MPS;
    static KMH = Unit.KMH;
    static FPS = Unit.FPS;
    static MPH = Unit.MPH;
    static KT = Unit.KT;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
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

    protected fromRaw(value: number, units: Unit): number {
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

/**
 * Weight unit
 */
class Weight extends AbstractUnit {

    // Weight unit constants
    static Grain = Unit.Grain;
    static Ounce = Unit.Ounce;
    static Gram = Unit.Gram;
    static Pound = Unit.Pound;
    static Kilogram = Unit.Kilogram;
    static Newton = Unit.Newton;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
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

    protected fromRaw(value: number, units: Unit): number {
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

/**
 * Pressure unit
 */
class Pressure extends AbstractUnit {

    // Pressure unit constants
    static MmHg = Unit.MmHg;
    static InHg = Unit.InHg;
    static Bar = Unit.Bar;
    static hPa = Unit.hPa;
    static PSI = Unit.PSI;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
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

    protected fromRaw(value: number, units: Unit): number {
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

/**
 * Temperature unit
 */
class Temperature extends AbstractUnit {

    // Temperature unit constants
    static Fahrenheit = Unit.Fahrenheit;
    static Celsius = Unit.Celsius;
    static Kelvin = Unit.Kelvin;
    static Rankin = Unit.Rankin;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
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

    protected fromRaw(value: number, units: Unit): number {
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

/**
 * Energy unit
 */
class Energy extends AbstractUnit {

    // Energy unit constants
    static FootPound = Unit.FootPound;
    static Joule = Unit.Joule;

    constructor(value: number, units: Unit) {
        super(value, units);
    }

    protected toRaw(value: number, units: Unit): number {
        if (units === Unit.FootPound) {
            return value;
        }
        if (units === Unit.Joule) {
            return value * 0.737562149277;
        }
        return super.toRaw(value, units);
    }

    protected fromRaw(value: number, units: Unit): number {
        if (units === Unit.FootPound) {
            return value;
        }
        if (units === Unit.Joule) {
            return value / 0.737562149277;
        }
        return super.fromRaw(value, units);
    }
}


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


const Measure = {
    Angular: Angular,
    Distance: Distance,
    Velocity: Velocity,
    Weight: Weight,
    Temperature: Temperature,
    Pressure: Pressure,
    Energy: Energy,
}


const UNew = {
    Radian: (value: number) => new Angular(value, Unit.Radian),
    Degree: (value: number) => new Angular(value, Unit.Degree),
    MOA: (value: number) => new Angular(value, Unit.MOA),
    MIL: (value: number) => new Angular(value, Unit.MIL),
    MRad: (value: number) => new Angular(value, Unit.MRad),
    Thousand: (value: number) => new Angular(value, Unit.Thousand),
    InchesPer100Yd: (value: number) => new Angular(value, Unit.InchesPer100Yd),
    CmPer100M: (value: number) => new Angular(value, Unit.CmPer100M),
    OClock: (value: number) => new Angular(value, Unit.OClock),
    Inch: (value: number) => new Distance(value, Unit.Inch),
    Foot: (value: number) => new Distance(value, Unit.Foot),
    Yard: (value: number) => new Distance(value, Unit.Yard),
    Mile: (value: number) => new Distance(value, Unit.Mile),
    NauticalMile: (value: number) => new Distance(value, Unit.NauticalMile),
    Millimeter: (value: number) => new Distance(value, Unit.Millimeter),
    Centimeter: (value: number) => new Distance(value, Unit.Centimeter),
    Meter: (value: number) => new Distance(value, Unit.Meter),
    Kilometer: (value: number) => new Distance(value, Unit.Kilometer),
    Line: (value: number) => new Distance(value, Unit.Line),
    FootPound: (value: number) => new Energy(value, Unit.FootPound),
    Joule: (value: number) => new Energy(value, Unit.Joule),
    MmHg: (value: number) => new Pressure(value, Unit.MmHg),
    InHg: (value: number) => new Pressure(value, Unit.InHg),
    Bar: (value: number) => new Pressure(value, Unit.Bar),
    hPa: (value: number) => new Pressure(value, Unit.hPa),
    PSI: (value: number) => new Pressure(value, Unit.PSI),
    Fahrenheit: (value: number) => new Temperature(value, Unit.Fahrenheit),
    Celsius: (value: number) => new Temperature(value, Unit.Celsius),
    Kelvin: (value: number) => new Temperature(value, Unit.Kelvin),
    Rankin: (value: number) => new Temperature(value, Unit.Rankin),
    MPS: (value: number) => new Velocity(value, Unit.MPS),
    KMH: (value: number) => new Velocity(value, Unit.KMH),
    FPS: (value: number) => new Velocity(value, Unit.FPS),
    MPH: (value: number) => new Velocity(value, Unit.MPH),
    KT: (value: number) => new Velocity(value, Unit.KT),
    Grain: (value: number) => new Weight(value, Unit.Grain),
    Ounce: (value: number) => new Weight(value, Unit.Ounce),
    Gram: (value: number) => new Weight(value, Unit.Gram),
    Pound: (value: number) => new Weight(value, Unit.Pound),
    Kilogram: (value: number) => new Weight(value, Unit.Kilogram),
    Newton: (value: number) => new Weight(value, Unit.Newton),

    [Unit.Radian]: (value: number) => new Angular(value, Unit.Radian),
    [Unit.Degree]: (value: number) => new Angular(value, Unit.Degree),
    [Unit.MOA]: (value: number) => new Angular(value, Unit.MOA),
    [Unit.MIL]: (value: number) => new Angular(value, Unit.MIL),
    [Unit.MRad]: (value: number) => new Angular(value, Unit.MRad),
    [Unit.Thousand]: (value: number) => new Angular(value, Unit.Thousand),
    [Unit.InchesPer100Yd]: (value: number) => new Angular(value, Unit.InchesPer100Yd),
    [Unit.CmPer100M]: (value: number) => new Angular(value, Unit.CmPer100M),
    [Unit.OClock]: (value: number) => new Angular(value, Unit.OClock),
    [Unit.Inch]: (value: number) => new Distance(value, Unit.Inch),
    [Unit.Foot]: (value: number) => new Distance(value, Unit.Foot),
    [Unit.Yard]: (value: number) => new Distance(value, Unit.Yard),
    [Unit.Mile]: (value: number) => new Distance(value, Unit.Mile),
    [Unit.NauticalMile]: (value: number) => new Distance(value, Unit.NauticalMile),
    [Unit.Millimeter]: (value: number) => new Distance(value, Unit.Millimeter),
    [Unit.Centimeter]: (value: number) => new Distance(value, Unit.Centimeter),
    [Unit.Meter]: (value: number) => new Distance(value, Unit.Meter),
    [Unit.Kilometer]: (value: number) => new Distance(value, Unit.Kilometer),
    [Unit.Line]: (value: number) => new Distance(value, Unit.Line),
    [Unit.FootPound]: (value: number) => new Energy(value, Unit.FootPound),
    [Unit.Joule]: (value: number) => new Energy(value, Unit.Joule),
    [Unit.MmHg]: (value: number) => new Pressure(value, Unit.MmHg),
    [Unit.InHg]: (value: number) => new Pressure(value, Unit.InHg),
    [Unit.Bar]: (value: number) => new Pressure(value, Unit.Bar),
    [Unit.hPa]: (value: number) => new Pressure(value, Unit.hPa),
    [Unit.PSI]: (value: number) => new Pressure(value, Unit.PSI),
    [Unit.Fahrenheit]: (value: number) => new Temperature(value, Unit.Fahrenheit),
    [Unit.Celsius]: (value: number) => new Temperature(value, Unit.Celsius),
    [Unit.Kelvin]: (value: number) => new Temperature(value, Unit.Kelvin),
    [Unit.Rankin]: (value: number) => new Temperature(value, Unit.Rankin),
    [Unit.MPS]: (value: number) => new Velocity(value, Unit.MPS),
    [Unit.KMH]: (value: number) => new Velocity(value, Unit.KMH),
    [Unit.FPS]: (value: number) => new Velocity(value, Unit.FPS),
    [Unit.MPH]: (value: number) => new Velocity(value, Unit.MPH),
    [Unit.KT]: (value: number) => new Velocity(value, Unit.KT),
    [Unit.Grain]: (value: number) => new Weight(value, Unit.Grain),
    [Unit.Ounce]: (value: number) => new Weight(value, Unit.Ounce),
    [Unit.Gram]: (value: number) => new Weight(value, Unit.Gram),
    [Unit.Pound]: (value: number) => new Weight(value, Unit.Pound),
    [Unit.Kilogram]: (value: number) => new Weight(value, Unit.Kilogram),
    [Unit.Newton]: (value: number) => new Weight(value, Unit.Newton)
};


/**
 * Coerces the given instance to the specified class type or creates a new instance.
 *
 * @param {AbstractUnit|Object} instance - The instance to coerce or create.
 * @param {AbstractUnit|Object|function} expectedClass - The expected class type.
 * @param {Unit|number} defaultUnit - The default unit for creating a new instance.
 * @returns {AbstractUnit} An instance of the expected class type.
 * @throws {TypeError} If the instance is not of the expected class type or 'number'.
 */
function unitTypeCoerce(
    instance: (number | AbstractUnit),
    expectedClass: (typeof AbstractUnit | any),
    defaultUnit: Unit
): any {
    if (instance instanceof expectedClass) {
        // If the instance is already of the expected class type, return it.
        return instance;
    } else if (typeof instance === 'number') {
        // If the instance is a number, create a new instance using the default unit.
        return new expectedClass(instance, defaultUnit);
    }
    else {
        // If the instance is not of the expected type, throw a TypeError.
        throw new TypeError(`Instance must be a type of ${expectedClass.name
            } or 'number'`);
    }
}


export interface IPreferredUnits {
    angular: Unit;
    distance: Unit;
    velocity: Unit;
    pressure: Unit;
    temperature: Unit;
    diameter: Unit;
    length: Unit;
    weight: Unit;
    adjustment: Unit;
    drop: Unit;
    energy: Unit;
    ogw: Unit;
    sight_height: Unit;
    target_height: Unit;
    twist: Unit;
    defaults(): void;
    setUnits(units: Partial<IPreferredUnits>): void;
}

// Type guard to check if a value is a valid Unit
function isUnit(value: any): value is Unit {
    return Object.values(Unit).includes(value);
}

export class PreferredUnits implements IPreferredUnits {
    angular: Unit = Unit.Degree;
    distance: Unit = Unit.Yard;
    velocity: Unit = Unit.FPS;
    pressure: Unit = Unit.InHg;
    temperature: Unit = Unit.Fahrenheit;
    diameter: Unit = Unit.Inch;
    length: Unit = Unit.Inch;
    weight: Unit = Unit.Grain;
    adjustment: Unit = Unit.MIL;
    drop: Unit = Unit.Inch;
    energy: Unit = Unit.FootPound;
    ogw: Unit = Unit.Pound;
    sight_height: Unit = Unit.Inch;
    target_height: Unit = Unit.Inch;
    twist: Unit = Unit.Inch;

    defaults(): void {
        this.angular = Unit.Degree;
        this.distance = Unit.Yard;
        this.velocity = Unit.FPS;
        this.pressure = Unit.InHg;
        this.temperature = Unit.Fahrenheit;
        this.diameter = Unit.Inch;
        this.length = Unit.Inch;
        this.weight = Unit.Grain;
        this.adjustment = Unit.MIL;
        this.drop = Unit.Inch;
        this.energy = Unit.FootPound;
        this.ogw = Unit.Pound;
        this.sight_height = Unit.Inch;
        this.target_height = Unit.Inch;
        this.twist = Unit.Inch;
    }

    setUnits(units: Partial<IPreferredUnits>): void {
        for (const [key, value] of Object.entries(units)) {
            if (isUnit(value)) {
                (this as any)[key] = value;
            } else {
                console.warn(`${value} is not a valid Unit`);
            }
        }
    }
}

const preferredUnits = new PreferredUnits();

export {
    AbstractUnit, Angular, Distance, Velocity, Weight, Temperature, Pressure, Energy,
    Unit, UnitProps, unitTypeCoerce, UNew, Measure, preferredUnits
}
