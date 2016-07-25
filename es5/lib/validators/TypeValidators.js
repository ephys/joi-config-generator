'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @property {!function} string
 * @property {!function} number
 * @property {!function} boolean
 * @property {!function} object
 */
var validators = {};

['string', 'number', 'boolean', 'object'].forEach(function (type) {

  var validator = function validator(input) {
    return (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === type;
  };

  validator[_Symbols2.default.constraint] = 'Type ' + type;

  Object.defineProperty(validators, type, {
    value: validator
  });
});

exports.default = validators;