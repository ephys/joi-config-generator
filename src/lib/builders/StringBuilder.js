import PrimitiveBuilder from './abstract/PrimitiveBuilder';
import TypeValidators from '../validators/TypeValidators';
import StringValidators from '../validators/StringValidators';

export default class StringBuilder extends PrimitiveBuilder {

  constructor(...args) {
    super(...args);

    this.validator(TypeValidators.string);
  }

  /**
   * Sets the minimum length of the string.
   *
   * @param {!number} length
   * @returns {!StringBuilder} this
   */
  minLength(length) {
    //noinspection JSValidateTypes
    return this.validator(StringValidators.build.minLength(length));
  }

  /**
   * Sets the maximum length of the string.
   *
   * @param {!number} length
   * @returns {!StringBuilder} this
   */
  maxLength(length) {
    //noinspection JSValidateTypes
    return this.validator(StringValidators.build.maxLength(length));
  }
}
