import PrimitiveBuilder from './PrimitiveBuilder';
import numberValidators from '../validators/number';
import Symbols from './Symbols';

export default class NumberBuilder extends PrimitiveBuilder {

  /**
   * Deny any non integer input.
   * @returns {!NumberBuilder}
   */
  integer() {
    //noinspection JSValidateTypes
    return this.addValidator(numberValidators.integer);
  }

  /**
   * Sets the minimum value (inclusive) for the input. For exclusive validators, see validators.
   * @param {!number} min - The minimum value.
   * @returns {!NumberBuilder} this
   */
  min(min) {
    this._min = min;
    return this;
  }

  /**
   * Sets the maximum value (inclusive) for the input. For exclusive validators, see validators.
   * @param {!number} max - The maximum value.
   * @returns {!NumberBuilder} this
   */
  max(max) {
    this._max = max;
    return this;
  }

  [Symbols.validate](value) {
    const sup = super[Symbols.validate](value);
    if (sup !== true) {
      return sup;
    }

    if (value === null) {
      return true;
    }

    if (typeof value !== 'number') {
      return 'Not a number';
    }

    if (this._min !== void 0 && value < this._min) {
      return `${value} is below minimum value ${this._min}`;
    }

    if (this._max !== void 0 && value > this._max) {
      return `${value} is above maximum value ${this._max}`;
    }

    return true;
  }
}
