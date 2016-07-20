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
    if (typeof value !== 'number') {
      return false;
    }

    const sup = super[Symbols.validate](value);

    if (!sup) {
      return false;
    }

    if (this._min !== void 0 && value < this._min) {
      return false;
    }

    return !(this._max !== void 0 && value > this._max);
  }
}
