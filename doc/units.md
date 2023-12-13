# Units Module Documentation

- [AbstractUnit Class](#abstractunit-class)
  - [Constructor](#constructor)
  - [Methods](#methods)
    - [`toString(): string`](#tostring-string)
    - [`_unit_support_error(value: number, units: Unit): number`](#_unit_support_error-value-number-units-unit-number)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)
    - [`to(units: Unit): AbstractUnit`](#to-units-unit-abstractunit)
    - [`in(units: Unit): number`](#in-units-unit-number)
    - [`get units: Unit`](#get-units-unit)
    - [`get rawValue: number`](#get-rawvalue-number)

- [Angular Class (extends AbstractUnit)](#angular-class-extends-abstractunit)
  - [Methods](#methods-1)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Distance Class (extends AbstractUnit)](#distance-class-extends-abstractunit)
  - [Methods](#methods-2)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Velocity Class (extends AbstractUnit)](#velocity-class-extends-abstractunit)
  - [Methods](#methods-3)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Weight Class (extends AbstractUnit)](#weight-class-extends-abstractunit)
  - [Methods](#methods-4)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Pressure Class (extends AbstractUnit)](#pressure-class-extends-abstractunit)
  - [Methods](#methods-5)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Temperature Class (extends AbstractUnit)](#temperature-class-extends-abstractunit)
  - [Methods](#methods-6)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Energy Class (extends AbstractUnit)](#energy-class-extends-abstractunit)
  - [Methods](#methods-7)
    - [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)
    - [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

- [Unit Enum](#unit-enum)
- [UnitPropsDict Object](#unitpropsdict-object)
- [unitTypeCoerce](#unittypecoerce)


## [AbstractUnit Class](#abstractunit-class)

An abstract class for unit of measure instance definition. It stores the defined unit and value, and applies conversions to other units.

### Constructor

- **Parameters:**
  - `value` (number): Numeric value of the unit.
  - `units` (Unit): Unit as a Unit enum.

### Methods

#### [`toString(): string`](#tostring-string)

Returns a human-readable representation of the value with its unit.

#### [`_unit_support_error(value: number, units: Unit): number`](#_unit_support_error-value-number-units-unit-number)

Validates the units.
- Parameters:
  - `value` (number): Value of the unit.
  - `units` (Unit): Unit enum type.
- Returns: number
- Throws:
  - `TypeError` when the provided units are not of the expected type.
  - `Error` when the provided units are not supported.

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Converts value with specified units to a raw value.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Converts raw value to specified units.

#### [`to(units: Unit): AbstractUnit`](#to-units-unit-abstractunit)

Returns a new unit instance in specified units.

#### [`in(units: Unit): number`](#in-units-unit-number)

Returns value in specified units.

#### [`get units: Unit`](#get-units-unit)

Returns defined units.

#### [`get rawValue: number`](#get-rawvalue-number)

Raw unit value getter.

---

## Angular Class (extends AbstractUnit)

Angular unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Angular-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Angular-specific conversion logic.

---

## Distance Class (extends AbstractUnit)

Distance unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Distance-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Distance-specific conversion logic.

---

## Velocity Class (extends AbstractUnit)

Velocity unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Velocity-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Velocity-specific conversion logic.

---

## Weight Class (extends AbstractUnit)

Weight unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Weight-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Weight-specific conversion logic.

---

## Pressure Class (extends AbstractUnit)

Pressure unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Pressure-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Pressure-specific conversion logic.

---

## Temperature Class (extends AbstractUnit)

Temperature unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Temperature-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Temperature-specific conversion logic.

---

## Energy Class (extends AbstractUnit)

Energy unit class, extending [AbstractUnit](#abstractunit-class).

### Methods

#### [`toRaw(value: number, units: Unit): number`](#toraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Energy-specific conversion logic.

#### [`fromRaw(value: number, units: Unit): number`](#fromraw-value-number-units-unit-number)

Overrides the method in AbstractUnit to provide Energy-specific conversion logic.

---

## Unit Enum

An enum representing unit types.

---

## UnitPropsDict Object

A dictionary of properties for the Unit enum type.

---

## unitTypeCoerce

Coerces the given instance to the specified class type or creates a new instance.
- Parameters:
  - `instance` (Object): The instance to coerce or create.
  - `expectedClass` (Class): The expected class type.
  - `defaultUnit` (Unit): The default unit for creating a new instance.
- Returns: `AbstractUnit` or `Object`
- Throws:
  - `TypeError` if the instance is