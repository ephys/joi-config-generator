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

var _StringValidators = require('./lib/validators/StringValidators');

var _StringValidators2 = _interopRequireDefault(_StringValidators);

var _NumberValidators = require('./lib/validators/NumberValidators');

var _NumberValidators2 = _interopRequireDefault(_NumberValidators);

var _TypeValidators = require('./lib/validators/TypeValidators');

var _TypeValidators2 = _interopRequireDefault(_TypeValidators);

var _ValidatorDecorators = require('./lib/validators/ValidatorDecorators');

var _ValidatorDecorators2 = _interopRequireDefault(_ValidatorDecorators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.regeneratorRuntime = _regeneratorRuntime2.default;

/**
 * Builds a JSON configuration file and returns it.
 *
 * @param {!String} filePath - The location of the config file.
 * @return {!ConfigBuilder}
 */
var validator = exports.validator = {
  string: _StringValidators2.default,
  number: _NumberValidators2.default,
  type: _TypeValidators2.default,
  decorators: _ValidatorDecorators2.default
};