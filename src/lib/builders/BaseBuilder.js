export default class BaseBuilder {

  constructor(name, parent) {
    this._name = name;
    this._parent = parent;
  }

  /**
   * Finalizes the current builder and gives control back to the parent.
   * @returns {!BaseBuilder}
   */
  done() {
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
   * @returns {!ObjectBuilder} The property builder.
   */
  addObject(name) {
    return this._getParent().addObject(name);
  }

  /**
   * Adds an Array property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @returns {!ArrayBuilder} The property builder.
   */
  addArray(name) {
    return this._getParent().addArray(name);
  }

  /**
   * Adds a String property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @returns {!StringBuilder}
   */
  addString(name) {
    return this._getParent().addString(name);
  }

  /**
   * Adds a Number property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @returns {!NumberBuilder}
   */
  addNumber(name) {
    return this._getParent().addNumber(name);
  }

  /**
   * Adds a Boolean property to the current object.
   *
   * @param {!String} name - The name of the property.
   * @returns {!BooleanBuilder}
   */
  addBoolean(name) {
    return this._getParent().addBoolean(name);
  }

  description(description) {
    this._description = description;
    return this;
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
