import BaseBuilder from './BaseBuilder';
import Symbols from './Symbols';
import typeValidator from '../validators/TypeValidators';
import StringUtil from '../util/StringUtil';

/**
 * @class ArrayBuilder
 */
export default class ArrayBuilder extends BaseBuilder {

  /**
   * Sets the minimum count of items to put in the array.
   * @param {!number} itemCount
   * @returns {!ArrayBuilder}
   */
  minItems(itemCount) {
    this._min = itemCount;
    return this;
  }

  /**
   * Sets the maximum count of items to put in the array.
   * @param {!number} itemCount
   * @returns {!ArrayBuilder}
   */
  maxItems(itemCount) {
    this._max = itemCount;
    return this;
  }

  /**
   * Adds a validator that will be run on each items of the array.
   *
   * @param {!function} validator
   * @returns {!ArrayBuilder}
   */
  addItemValidator(validator) {
    // TODO
    return this;
  }

  async [Symbols.build](currentValue) {
    // TODO
    // Validate every item + Directly replace those incorrect (but allow their deletion)
    // insert up to minimum length
    // force stop at maximum length
    // empty value = stop inserting (unless the minimum length hasn't been reached yet).

    // Run array validators. If it does not pass, start over.
    return [];
  }
};

/**
 * @method
 * @name ArrayBuilder#ofStrings
 * @returns {!ArrayBuilder}
 * @public
 */

/**
 * @method
 * @name ArrayBuilder#ofBooleans
 * @returns {!ArrayBuilder}
 * @public
 */

/**
 * @method
 * @name ArrayBuilder#ofNumbers
 * @returns {!ArrayBuilder}
 * @public
 */

['string', 'number', 'boolean'].forEach(type => {
  Object.defineProperty(ArrayBuilder.prototype, `of${StringUtil.capitalizeFirstLetter(type)}s`, {
    value: function () {
      return this.addItemValidator(typeValidator[type]);
    }
  });
});


