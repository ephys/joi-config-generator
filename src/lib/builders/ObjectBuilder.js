import BaseBuilder from './BaseBuilder';
import ArrayBuilder from './ArrayBuilder';
import StringBuilder from './StringBuilder';
import NumberBuilder from './NumberBuilder';
import BooleanBuilder from './BooleanBuilder';
import Symbols from './Symbols';

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
   * @inheritDoc
   */
  addObject(name) {
    return this._add(name, ObjectBuilder);
  }

  /**
   * @inheritDoc
   */
  addArray(name) {
    return this._add(name, ArrayBuilder);
  }

  /**
   * @inheritDoc
   */
  addString(name) {
    return this._add(name, StringBuilder);
  }

  /**
   * @inheritDoc
   */
  addNumber(name) {
    return this._add(name, NumberBuilder);
  }

  /**
   * @inheritDoc
   */
  addBoolean(name) {
    return this._add(name, BooleanBuilder);
  }

  _add(name, Builder) {
    this._checkName(name);

    const propertyBuilder = new Builder(`${this._name}.${name}`, this);
    this._properties.set(name, propertyBuilder);

    return propertyBuilder;
  }

  /**
   * Checks if a name is valid as a new property.
   * @param {!*} name
   * @private
   */
  _checkName(name) {
    if (typeof name !== 'string') {
      throw new Error(`Invalid property name "${JSON.stringify(name)}", must be a string.`);
    }

    if (this._properties.has(name)) {
      throw new Error(`Property "${name}" is already set on this builder`);
    }
  }

  async [Symbols.build](config = {}) {
    console.log('Building object ' + this._name);
    const newConfig = {};

    for (const [propertyName, propertyBuilder] of this._properties) {
      const currentValue = config[propertyName];

      newConfig[propertyName] = await propertyBuilder[Symbols.build](currentValue);
    }

    return newConfig;
  }
}
