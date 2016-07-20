import BaseBuilder from './BaseBuilder';
import Symbols from './Symbols';
import io from '../io';

export default class PrimitiveBuilder extends BaseBuilder {

  /**
   * @param {!ObjectBuilder} parent
   */
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
   * @returns {!PrimitiveBuilder}
   */
  defaultValue(value) {
    this._defaultValue = value;
    return this;
  }

  /**
   * Marks this property as accepting the value "null".
   *
   * @returns {!PrimitiveBuilder}
   */
  nullable() {
    this._nullable = true;
    return this;
  }

  async [Symbols.build](currentValue) {
    if (this[Symbols.validate](currentValue)) {
      return currentValue;
    }

    const message = this._description || 'Please enter a value';

    return io.getValue(this._description, val => this[Symbols.validate](val));
  }

  [Symbols.validate](value) {
    if (value === void 0) {
      return false;
    }

    if (value === null) {
      return this._nullable;
    }

    return _checkValidatorsAnd(this._validators, value);
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
