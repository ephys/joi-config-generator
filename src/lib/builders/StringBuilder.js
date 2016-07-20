import PrimitiveBuilder from './PrimitiveBuilder';
import Symbols from './Symbols';

export default class StringBuilder extends PrimitiveBuilder {

  minLength(length) {
    this._min = length;
    return this;
  }

  maxLength(length) {
    this._max = length;
    return this;
  }

  /**
   * @param {!String} value
   * @returns {!(boolean|string)}
   */
  [Symbols.validate](value) {
    const sup = super[Symbols.validate](value);
    if (sup !== true) {
      return sup;
    }

    if (value === null) {
      return true;
    }

    if (typeof value !== 'string') {
      return 'Not a string';
    }

    if (this._min !== void 0 && value.length < this._min) {
      return `Length (${value}) is below minimum value ${this._min}`;
    }

    if (this._max !== void 0 && value.length > this._max) {
      return `Length (${value}) is above maximum value ${this._max}`;
    }

    return true;
  }
}
