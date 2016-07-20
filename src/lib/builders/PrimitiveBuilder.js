import BaseBuilder from './BaseBuilder';
import Symbols from './Symbols';
import io from '../io/io';
import colors from 'cli-color';

//TODO refactor
export default class PrimitiveBuilder extends BaseBuilder {

  constructor(name, parent) {
    super(name, parent);

    this._validators = [];
  }

  /**
   * Adds validators function to the builder. The determine if the input is valid or not.
   *
   * Validator call order is undefined.
   * The validity is determined by a logical AND on the output of each validators.
   * For a logical OR on some validators, put these validators in the same array.
   *
   * @param {!(Array.<function>|function)} validators - The list of validators, each validator should return true if the input is valid, false otherwise.
   * @example stringBuilder.addValidator([validator.string.url, validator.string.ip]) // Valid if it is an url _OR_ an IP
   * @example stringBuilder.addValidator(validator.string.url, validator.string.ip) // Valid if it is an url _AND_ an IP (obviously the input would always be invalid).
   *
   * @returns {!PrimitiveBuilder} this
   */
  addValidator(...validators) {
    this._validators.push(validators);
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
  nullable(nullable = true) { // parameter is a hack for the alternative parameter set method
    this._nullable = nullable;
    return this;
  }

  async [Symbols.build](currentValue) {
    const validation = this[Symbols.validate](currentValue);
    if (validation === true) {
      return currentValue;
    }

    if (currentValue !== void 0) {
      console.info(`The current value for "${this._name}" (${colors.yellow(JSON.stringify(currentValue))}) failed constraint validation (${validation}). Please enter a new value.`);
    }

    const hints = this[Symbols.getHints]();

    const description = this._description ? ` - ${colors.cyan(this._description)}` : '';
    const hintText = hints.length > 0 ? colors.magenta(` (${hints.join(', ')})`) : '';
    const message = colors.cyan(this._name) + description + hintText;

    const value = await io.getValue(message, val => {
      if (val === void 0) {
        if (this._defaultValue === void 0) {
          return 'No default value.';
        }

        return true;
      }

      return this[Symbols.validate](val);
    });

    if (value === void 0) {
      return this._defaultValue;
    }

    return value;
  }

  [Symbols.getHints]() {
    // TODO extract from validators.
    const hints = [];

    if (this._nullable) {
      hints.push('Nullable');
    } else {
      hints.push('Not Null');
    }

    if (this._defaultValue) {
      hints.push(`Default: ${JSON.stringify(this._defaultValue)}`);
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

    if (!_checkValidatorsAnd(this._validators, value)) {
      return 'Validator check failed';
    }

    return true;
  }
}

function _checkValidatorsAnd(validators, value) {
  for (const validator of validators) {
    if (Array.isArray(validator)) {
      if (!_checkValidatorOr(validator, value)) {
        return false;
      }

      continue;
    }

    if (!validator(value)) {
      return false;
    }
  }

  return true;
}

function _checkValidatorOr(validators, value) {
  for (const validator of validators) {
    if (Array.isArray(validator)) {
      if (_checkValidatorsAnd(validator, value)) {
        return true;
      }

      continue;
    }

    if (validator(value)) {
      return true;
    }
  }

  return false;
}
