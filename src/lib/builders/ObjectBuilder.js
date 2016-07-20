import BaseBuilder from './BaseBuilder';
import ArrayBuilder from './ArrayBuilder';
import StringBuilder from './StringBuilder';
import NumberBuilder from './NumberBuilder';
import BooleanBuilder from './BooleanBuilder';
import Symbols from './Symbols';
import stringValidator from '../validators/StringValidators';

export const ObjectBuilderSymbols = {
  separator: Symbol('separator')
};

export default class ObjectBuilder extends BaseBuilder {

  /**
   * @param {!String} name - The name of the property.
   * @param {ObjectBuilder} parent
   */
  constructor(name, parent) {
    super(name, parent);

    this._properties = new Map();
  }

  /**
   * Returns this object's parent or itself if it's the root element.
   *
   * @return {!ObjectBuilder}
   */
  endObject() {
    return this._parent || this;
  }

  _add(name, itemProperties, Builder) {
    if (typeof name !== 'string') {
      throw new Error(`Invalid property name "${JSON.stringify(name)}", must be a string.`);
    }

    if (this._properties.has(name)) {
      throw new Error(`Property "${name}" is already set on this builder`);
    }

    const displayName = stringValidator.urlfriendly(name) ? name : JSON.stringify(name);

    const propertyBuilder = new Builder(this._name + this[ObjectBuilderSymbols.separator] + displayName, this);
    this._properties.set(name, propertyBuilder);

    // Copy properties over. Per request.
    if (itemProperties) {
      for (const propertyName of Object.getOwnPropertyNames(itemProperties)) {
        const propertyValue = itemProperties[propertyName];

        if (!propertyBuilder[propertyName]) {
          throw new Error(`No method "${propertyName}" in "${propertyBuilder.constructor.name}"`);
        }

        propertyBuilder[propertyName](propertyValue)
      }
    }

    return propertyBuilder;
  }

  async [Symbols.build](config = {}) {
    const newConfig = {};

    for (const [propertyName, propertyBuilder] of this._properties) {
      const currentValue = config[propertyName];

      newConfig[propertyName] = await propertyBuilder[Symbols.build](currentValue);
    }

    return newConfig;
  }
}

Object.defineProperty(ObjectBuilder.prototype, ObjectBuilderSymbols.separator, {
  value: '.',
  writable: false,
  enumerable: false
});

[ObjectBuilder, ArrayBuilder, StringBuilder, NumberBuilder, BooleanBuilder].forEach(Builder => {

  const builderName = Builder.name;
  const type = builderName.substr(0, builderName.length - 'builder'.length);

  Object.defineProperty(ObjectBuilder.prototype, `add${type}`, {
    value: function (name, properties) {
      return this._add(name, properties, Builder);
    }
  });
});
