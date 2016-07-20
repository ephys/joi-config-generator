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
   * @returns {boolean}
   */
  [Symbols.validate](value) {
    if (typeof value !== 'number') {
      return false;
    }

    const sup = super[Symbols.validate](value);

    if (!sup) {
      return false;
    }

    if (this._min !== void 0 && value.length < this._min) {
      return false;
    }

    return !(this._max !== void 0 && value.length > this._max);
  }
}
