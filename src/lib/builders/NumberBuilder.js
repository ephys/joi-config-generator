import PrimitiveBuilder from './abstract/PrimitiveBuilder';
import NumberValidators from '../validators/NumberValidators';
import TypeValidators from '../validators/TypeValidators';

export default class NumberBuilder extends PrimitiveBuilder {

  constructor(...args) {
    super(...args);

    this.validator(TypeValidators.number);
  }

  /**
   * Deny any non integer input.
   * @returns {!NumberBuilder}
   */
  integer() {
    //noinspection JSValidateTypes
    return this.validator(NumberValidators.integer);
  }

  /**
   * Sets the minimum value (inclusive) for the input. For exclusive validators, see validators.
   * @param {!number} min - The minimum value.
   * @returns {!NumberBuilder} this
   */
  min(min) {
    //noinspection JSValidateTypes
    return this.validator(NumberValidators.build.min(min));
  }

  /**
   * Sets the maximum value (inclusive) for the input. For exclusive validators, see validators.
   * @param {!number} max - The maximum value.
   * @returns {!NumberBuilder} this
   */
  max(max) {
    //noinspection JSValidateTypes
    return this.validator(NumberValidators.build.max(max));
  }
}