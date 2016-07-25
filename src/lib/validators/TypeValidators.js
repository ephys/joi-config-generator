import Symbols from './Symbols';
/**
 * @property {!function} string
 * @property {!function} number
 * @property {!function} boolean
 * @property {!function} object
 */
const validators = {};

['string', 'number', 'boolean', 'object'].forEach(type => {

  const validator = function (input) {
    return typeof input === type;
  };

  validator[Symbols.constraint] = `Type ${type}`;

  Object.defineProperty(validators, type, {
    value: validator
  });
});

export default validators;
