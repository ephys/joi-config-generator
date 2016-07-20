import Symbols from './Symbols';

export default class BaseBuilder {

  /**
   * @param {!String} name
   * @param {!ObjectBuilder} parent
   */
  constructor(name, parent) {
    this._name = name;
    this._parent = parent;
  }

  /**
   * Finalizes the current builder and gives control back to the parent.
   * @returns {!BaseBuilder}
   */
  endObject() {
    if (this._parent && this._parent._parent) {
      return this._parent._parent;
    }

    return this;
  }

  then(...args) {
    return this._getParent().then(...args);
  }

  /**
   * Adds an object property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!ObjectBuilder} The property builder.
   */
  addObject(name, properties) {
    return this._getParent().addObject(name, properties);
  }

  /**
   * Adds an Array property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!ArrayBuilder} The property builder.
   */
  addArray(name, properties) {
    return this._getParent().addArray(name, properties);
  }

  /**
   * Adds a String property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!StringBuilder}
   */
  addString(name, properties) {
    return this._getParent().addString(name, properties);
  }

  /**
   * Adds a Number property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!NumberBuilder} The property builder.
   */
  addNumber(name, properties) {
    return this._getParent().addNumber(name, properties);
  }

  /**
   * Adds a Boolean property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!BooleanBuilder} The property builder.
   */
  addBoolean(name, properties) {
    return this._getParent().addBoolean(name, properties);
  }

  /**
   * Sets the description of the property.
   *
   * @param {!String} description - The property description.
   * @returns {!BaseBuilder} this
   */
  description(description) {
    this._description = description;
    return this;
  }

  async [Symbols.build]() {
    throw new Error('Builder not implemented');
  }

  /**
   * Returns the parent of this object.
   *
   * @return {!ObjectBuilder}
   * @private
   */
  _getParent() {
    if (!this._parent) {
      throw new Error('This builder does not have a parent, this should not have happened.');
    }

    return this._parent;
  }
}
