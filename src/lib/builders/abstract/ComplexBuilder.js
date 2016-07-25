import BaseBuilder from './BaseBuilder';

/**
 * @class ComplexBuilder
 * @extends BaseBuilder
 * @abstract
 */
export default class ComplexBuilder extends BaseBuilder {

  /**
   * @param {!String} name - The name of the property.
   * @param {ObjectBuilder} parent
   */
  constructor(name, parent) {
    super(name, parent);
  }

  /**
   * Sets the properties of a builder instance.
   * @param {!Object} builder - The builder instance.
   * @param {Object} properties - The list of properties.
   * @protected
   */
  _setBuilderProperties(builder, properties) {
    if (!properties) {
      return;
    }

    for (const methodName of Object.getOwnPropertyNames(properties)) {
      const methodArgument = properties[methodName];

      const method = builder[methodName];
      if (!method) {
        throw new Error(`No method "${methodName}" in Builder type "${builder.constructor.name}"`);
      }

      // For boolean properties, skip if the value is false.
      if (method.length === 0 && methodArgument === false) {
        continue;
      }

      if (Array.isArray(methodArgument)) {
        // For .validator which takes multiple parameters, a bit of a workaround, might need something cleaner, maybe
        builder[methodName](...methodArgument);
      } else {
        builder[methodName](methodArgument);
      }
    }
  }
}
