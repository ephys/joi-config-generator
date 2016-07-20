import PrimitiveBuilder from './PrimitiveBuilder';
import TypeValidators from '../validators/TypeValidators';

export default class StringBuilder extends PrimitiveBuilder {

  constructor(...args) {
    super(...args);

    this.addValidator(TypeValidators.string);
  }

  /**
   * Sets the minimum length of the string.
   *
   * @param {!number} length
   * @returns {!StringBuilder} this
   */
  minLength(length) {
    //noinspection JSValidateTypes
    return this.addValidator(value => value.length >= length);
  }

  /**
   * Sets the maximum length of the string.
   *
   * @param {!number} length
   * @returns {!StringBuilder} this
   */
  maxLength(length) {
    //noinspection JSValidateTypes
    return this.addValidator(value => value.length <= length);
  }
}
