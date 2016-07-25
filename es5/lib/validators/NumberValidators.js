'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {!function} Validator
 * @param {*} value
 * @returns {!boolean}
 */

var validators = {

  /**
   * Validator checking the the input is an integer.
   */
  integer: function integer(value) {
    return Number.isInteger(value);
  },


  build: {

    /**
     * Creates a validator that checks that the input if smaller than or equal to min
     * @param {!number} min - The lower limit of the input.
     * @returns {!Validator}
     */
    min: function min(_min) {
      var validator = function validator(value) {
        return value >= _min;
      };
      validator[_Symbols2.default.constraint] = 'Smaller than or equal to ' + _min;

      return validator;
    },


    /**
     * Creates a validator that checks that the input if greater than or equal to max
     * @param {!number} max - The upper limit of the input.
     * @returns {!Validator}
     */
    max: function max(_max) {
      var validator = function validator(value) {
        return value <= _max;
      };
      validator[_Symbols2.default.constraint] = 'Greater than or equal to ' + _max;

      return validator;
    }
  }
};

exports.default = validators;