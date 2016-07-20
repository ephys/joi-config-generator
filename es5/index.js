'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validator = void 0;

exports.default = function (filePath) {
  return new _ConfigBuilder2.default(filePath);
};

var _regeneratorRuntime = require('regenerator-runtime');

var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

var _ConfigBuilder = require('./lib/builders/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _string = require('./lib/validators/string');

var _string2 = _interopRequireDefault(_string);

var _number = require('./lib/validators/number');

var _number2 = _interopRequireDefault(_number);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.regeneratorRuntime = _regeneratorRuntime2.default;

/**
 * Builds a JSON configuration file and returns it.
 *
 * @param {!String} filePath - The location of the config file.
 * @return {!ConfigBuilder}
 */
var validator = exports.validator = {
  string: _string2.default,
  number: _number2.default
};