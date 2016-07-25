import Symbols from './Symbols';
import ComplexBuilder from './abstract/ComplexBuilder';

/**
 * @class ArrayBuilder
 * @extends ComplexBuilder
 */
export default class ArrayBuilder extends ComplexBuilder {

  constructor(...args) {
    super(...args);

    this._properties = [];
  }

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
   * Adds a new property to the object
   * @param {!String} name - The property name.
   * @param {Object} builderProperties - The new property's own properties.
   * @param {!Function} Builder - The property builder class.
   * @returns {!Object} The property builder instance.
   * @protected
   */
  _addProperty(name, builderProperties, Builder) {
    const propertyBuilder = new Builder(name, this);
    this._properties.push(propertyBuilder);

    this._setBuilderProperties(propertyBuilder, builderProperties);

    return propertyBuilder;
  }

  async [Symbols.build](currentArray = [], canSkipArray = false) {
    let i = 0;

    console.info('Building array, leave blank to stop adding items.');
    if (this._min) {
      console.info('Minimum items in array: ' + this._min);
    }

    if (this._max) {
      console.info('Maximum items in array: ' + this._max);
    }

    do {
      if (_isAboveMax(i, this._max)) {
        break;
      }

      const propertyBuilder = this._properties[i % this._properties.length];
      propertyBuilder.name(i);

      const canSkip = canSkipArray || _isAboveMin(i, this._min);
      const newValue = await propertyBuilder[Symbols.build](currentArray[i], canSkip);
      if (newValue === void 0) { // skipped
        delete currentArray[i];
        break;
      }

      currentArray[i] = newValue;
      i++;
    } while (true);

    return currentArray;
  }
};

function _isAboveMax(i, max) {
  if (max === void 0) {
    return false;
  }

  return i > max;
}

function _isAboveMin(i, min) {
  if (min === void 0) {
    return true;
  }

  return i >= min;
}
