'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validators = {
  alphanum: function alphanum(string) {
    return (/^[a-zA-Z]+$/.test(string)
    );
  },
  urlfriendly: function urlfriendly(string) {
    if (typeof string !== 'string') {
      return false;
    }

    return (/^[a-zA-Z\-_]+$/.test(string)
    );
  },


  build: {

    /**
     * Creates a validator that sets a lower limit for the string length.
     * @param {!number} length - The lower limit.
     * @returns {!Validator}
     */
    minLength: function minLength(length) {
      var validator = function validator(value) {
        return value.length >= length;
      };
      validator[_Symbols2.default.constraint] = 'Minimum ' + length + ' character(s)';

      return validator;
    },


    /**
     * Creates a validator that sets an upper limit for the string length.
     * @param {!number} length - The upper limit.
     * @returns {!Validator}
     */
    maxLength: function maxLength(length) {
      var validator = function validator(value) {
        return value.length <= length;
      };
      validator[_Symbols2.default.constraint] = 'Maximum ' + length + ' character(s)';

      return validator;
    }
  }
};

validators.alphanum[_Symbols2.default.constraint] = 'Alphanumeric only';
validators.urlfriendly[_Symbols2.default.constraint] = 'URL Friendly characters only';

exports.default = validators;