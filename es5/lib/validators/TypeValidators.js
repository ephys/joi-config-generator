'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * @property {!function} string
 * @property {!function} number
 * @property {!function} boolean
 * @property {!function} object
 */
var validators = {};

['string', 'number', 'boolean', 'object'].forEach(function (type) {
  Object.defineProperty(validators, type, {
    value: function value(input) {
      return (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === type;
    }
  });
});

exports.default = validators;