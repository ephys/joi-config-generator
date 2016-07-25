import BaseBuilder from './BaseBuilder';
import Symbols from '../Symbols';
import ValidatorSymbols from '../../validators/Symbols';
import io from '../../io/io';
import colors from 'cli-color';

export default class PrimitiveBuilder extends BaseBuilder {

  constructor(name, parent) {
    super(name, parent);

    this._validators = [];
  }

  /**
   * @inheritDoc
   */
  end() {
    // End this and parent object.
    return super.end().end();
  }

  /**
   * Adds validators function to the builder. Its output will determine if the input is valid or not.
   *
   * Validator call order is undefined.
   * The validity is determined by a logical AND on the output of each validators.
   * For a logical OR on some validators, use a decorator.
   *
   * @param {!(Array.<function>|function)} validators - The list of validators, each validator should return true if the input is valid, false otherwise.
   *
   * @returns {!PrimitiveBuilder} this
   */
  validator(...validators) {
    this._validators.push(...validators);
    return this;
  }

  /**
   * Sets the default value of this primitive.
   *
   * @param {!*} value - The default value.
   * @returns {!PrimitiveBuilder} this
   */
  defaultValue(value) {
    this._defaultValue = value;

    return this;
  }

  /**
   * Marks this property as accepting the value "null".
   *
   * @returns {!PrimitiveBuilder} this
   */
  nullable() {
    this._nullable = true;
    return this;
  }

  async [Symbols.build](currentValue, allowUndefined = false) {
    const validation = this[Symbols.validate](currentValue);
    if (validation === true) {
      return currentValue;
    }

    const name = this[Symbols.name]();

    if (currentValue !== void 0) {
      console.info(`The current value for "${name}" (${colors.yellow(JSON.stringify(currentValue))}) failed constraint validation (${validation}). Please enter a new value.`);
    }

    const hints = this[Symbols.getHints]();

    const description = this._description ? ` - ${colors.cyan(this._description)}` : '';
    const hintText = hints.length > 0 ? colors.magenta(` (${hints.join(', ')})`) : '';
    const message = colors.cyan(name) + description + hintText;

    const value = await io.getValue(message, val => {
      if (val === void 0) {
        if (allowUndefined || this._defaultValue !== void 0) {
          return true;
        }

        return 'No default value.';
      }

      return this[Symbols.validate](val);
    });

    if (value === void 0) {
      return this._defaultValue;
    }

    return value;
  }

  [Symbols.getHints]() {
    const hints = [];

    if (this._nullable) {
      hints.push('Nullable');
    } else {
      hints.push('Not Null');
    }

    if (this._defaultValue) {
      hints.push(`Default: ${JSON.stringify(this._defaultValue)}`);
    }

    for (const validator of this._validators) {
      hints.push(_getValidatorName(validator));
    }

    return hints;
  }

  [Symbols.validate](value) {
    if (value === null) {
      if (this._nullable) {
        return true;
      } else {
        return 'Cannot be null';
      }
    }

    return _checkValidators(this._validators, value);
  }
}

function _checkValidators(validators, value) {
  for (const validator of validators) {
    const result = validator(value);
    if (result !== true) {
      return result || `Constraint violation: ${_getValidatorName(validator)}`;
    }
  }

  return true;
}

function _getValidatorName(validator) {
  return validator[ValidatorSymbols.constraint] || validator.name || validator.constructor.name;
}
