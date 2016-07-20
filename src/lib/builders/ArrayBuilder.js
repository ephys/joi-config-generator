import BaseBuilder from './BaseBuilder';

export default class ArrayBuilder extends BaseBuilder {

  /**
   * @return {!ArrayBuilder}
   */
  ofString() {
    return this;
  }

  ofDouble() {
    return this;
  }

  ofInteger() {
    return this;
  }

  ofBooleans() {
    return this;
  }

  /**
   * Adds validators function to the builder. The determine if the input is valid or not.
   *
   * Validator call order is undefined.
   * The validity is determined by a logical AND on the output of each validators.
   * For a logical OR on some validators, put these validators in the same array.
   *
   * @param {!(Array.<function>|function)} validators - The list of validators, each validator should return true if the input is valid, false otherwise.
   * @example stringBuilder.addValidator([validator.string.url, validator.string.ip]) // Valid if it is an url _OR_ an IP
   * @example stringBuilder.addValidator(validator.string.url, validator.string.ip) // Valid if it is an url _AND_ an IP (obviously the input would always be invalid).
   *
   * @return {!ArrayBuilder} this
   */
  addItemValidator(...validators) {
    return this;
  }
}
