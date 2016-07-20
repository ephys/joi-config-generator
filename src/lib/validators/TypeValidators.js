/**
 * @property {!function} string
 * @property {!function} number
 * @property {!function} boolean
 * @property {!function} object
 */
const validators = {};

['string', 'number', 'boolean', 'object'].forEach(type => {
  Object.defineProperty(validators, type, {
    value: function (input) {
      return typeof input === type;
    }
  });
});

export default validators;
