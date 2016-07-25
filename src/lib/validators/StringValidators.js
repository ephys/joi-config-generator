
import Symbols from './Symbols';

const validators = {

  alphanum(string) {
    return /^[a-zA-Z]+$/.test(string);
  },

  urlfriendly(string) {
    if (typeof string !== 'string') {
      return false;
    }

    return /^[a-zA-Z\-_]+$/.test(string);
  },

  build: {

    /**
     * Creates a validator that sets a lower limit for the string length.
     * @param {!number} length - The lower limit.
     * @returns {!Validator}
     */
    minLength(length) {
      const validator = (value) => (value.length >= length);
      validator[Symbols.constraint] = `Minimum ${length} character(s)`;

      return validator;
    },

    /**
     * Creates a validator that sets an upper limit for the string length.
     * @param {!number} length - The upper limit.
     * @returns {!Validator}
     */
    maxLength(length) {
      const validator = (value) => (value.length <= length);
      validator[Symbols.constraint] = `Maximum ${length} character(s)`;

      return validator;
    }
  }
};

validators.alphanum[Symbols.constraint] = 'Alphanumeric only';
validators.urlfriendly[Symbols.constraint] = 'URL Friendly characters only';

export default validators;
