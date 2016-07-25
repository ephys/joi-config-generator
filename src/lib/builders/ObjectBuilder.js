import Symbols from './Symbols';
import ComplexBuilder from './abstract/ComplexBuilder';

/**
 * @class ObjectBuilder
 */
export default class ObjectBuilder extends ComplexBuilder {

  /**
   * @param {!String} name - The name of the property.
   * @param {ObjectBuilder} parent
   */
  constructor(name, parent) {
    super(name, parent);

    this._properties = new Map();
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
    if (typeof name !== 'string') {
      throw new Error(`Invalid property name "${JSON.stringify(name)}", must be a string.`);
    }

    if (this._properties.has(name)) {
      throw new Error(`Property "${name}" is already set on this builder`);
    }

    const propertyBuilder = new Builder(name, this);
    this._properties.set(name, propertyBuilder);

    this._setBuilderProperties(propertyBuilder, builderProperties);

    return propertyBuilder;
  }

  async [Symbols.build](config = {}, canSkip = false) {
    const newConfig = {};

    for (const [propertyName, propertyBuilder] of this._properties) {
      const currentValue = config[propertyName];

      newConfig[propertyName] = await propertyBuilder[Symbols.build](currentValue, canSkip);

      // Skipping object
      if (canSkip && newConfig[propertyName] === void 0) {
        return void 0;
      }
    }

    return newConfig;
  }
}
