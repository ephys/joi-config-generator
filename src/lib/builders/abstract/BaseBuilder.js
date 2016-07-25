import Symbols from '../Symbols';

export default class BaseBuilder {

  /**
   * @param {!*} name
   * @param {!ObjectBuilder} parent
   */
  constructor(name, parent) {
    this._name = name;
    this._parent = parent;
  }

  /**
   * Sets the name of the property.
   * @param {!String} name - The name of the property.
   * @returns {!BaseBuilder} this
   */
  name(name) {
    this._name = name;
    return this;
  }

  [Symbols.name]() {
    if (this._name == null) {
      return null;
    }

    const brackets = !/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(this._name);

    const displayName = brackets ? `[${JSON.stringify(this._name)}]` : this._name;
    const separator = brackets ? '' : '.';
    const parentName = this._parent ? this._parent[Symbols.name]() : null;

    return (parentName ? (parentName + separator) : '') + displayName;
  }

  /**
   * Finalizes the current builder and gives control back to the parent.
   * @returns {!BaseBuilder}
   */
  end() {
    return this._parent || this;
  }

  then(...args) {
    return _getParent(this).then(...args);
  }

  /**
   * Adds an object property to the current object.
   *
   * @param {!String} [name] - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!ObjectBuilder} The property builder.
   */
  addObject(name, properties) {
    return _getParent(this).addObject(name, properties);
  }

  /**
   * Adds an Array property to the current object.
   *
   * @param {!String} [name] - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!ArrayBuilder} The property builder.
   */
  addArray(name, properties) {
    return _getParent(this).addArray(name, properties);
  }

  /**
   * Adds a String property to the current object.
   *
   * @param {!String} [name] - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!StringBuilder}
   */
  addString(name, properties) {
    return _getParent(this).addString(name, properties);
  }

  /**
   * Adds a Number property to the current object.
   *
   * @param {!String} [name] - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!NumberBuilder} The property builder.
   */
  addNumber(name, properties) {
    return _getParent(this).addNumber(name, properties);
  }

  /**
   * Adds a Boolean property to the current object.
   *
   * @param {!String} [name] - The name of the property.
   * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
   * @returns {!BooleanBuilder} The property builder.
   */
  addBoolean(name, properties) {
    return _getParent(this).addBoolean(name, properties);
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
}

/**
 * Returns the parent of this object.
 *
 * @return {!ObjectBuilder}
 * @private
 */
function _getParent(self) {
  if (!self._parent) {
    throw new Error('This builder does not have a parent, this should not have happened.');
  }

  return self._parent;
}
