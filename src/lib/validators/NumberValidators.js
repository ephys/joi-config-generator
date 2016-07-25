
import Symbols from './Symbols';

/**
 * @typedef {!function} Validator
 * @param {*} value
 * @returns {!boolean}
 */

const validators = {

  /**
   * Validator checking the the input is an integer.
   */
  integer(value) {
    return Number.isInteger(value);
  },

  build: {

    /**
     * Creates a validator that checks that the input if smaller than or equal to min
     * @param {!number} min - The lower limit of the input.
     * @returns {!Validator}
     */
    min(min) {
      const validator = (value) => (value >= min);
      validator[Symbols.constraint] = `Smaller than or equal to ${min}`;

      return validator;
    },

    /**
     * Creates a validator that checks that the input if greater than or equal to max
     * @param {!number} max - The upper limit of the input.
     * @returns {!Validator}
     */
    max(max) {
      const validator = (value) => (value <= max);
      validator[Symbols.constraint] = `Greater than or equal to ${max}`;

      return validator;
    }
  }
};

export default validators;
