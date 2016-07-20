'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseBuilder2 = require('./BaseBuilder');

var _BaseBuilder3 = _interopRequireDefault(_BaseBuilder2);

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _io = require('../io/io');

var _io2 = _interopRequireDefault(_io);

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//TODO refactor
var PrimitiveBuilder = function (_BaseBuilder) {
  _inherits(PrimitiveBuilder, _BaseBuilder);

  function PrimitiveBuilder(name, parent) {
    _classCallCheck(this, PrimitiveBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PrimitiveBuilder).call(this, name, parent));

    _this._validators = [];
    return _this;
  }

  /**
   * Adds validators function to the builder. The determine if the input is valid or not.
   *
   * Validator call order is undefined.
   * The validity is determined by a logical AND on the output of each validators.
   * For a logical OR on some validators, put these validators in the same array.
   *
   * @param {!(Array.<function>|function)} validators - The list of validators, each validator should return true if the input is valid, false otherwise.
   * @example stringBuilder.addValidator([validator.string.url, validator.string.ip]) // Valid if it is an url _OR_ an IP
   * @example stringBuilder.addValidator(validator.string.url, validator.string.ip) // Valid if it is an url _AND_ an IP (obviously the input would always be invalid).
   *
   * @returns {!PrimitiveBuilder} this
   */


  _createClass(PrimitiveBuilder, [{
    key: 'addValidator',
    value: function addValidator() {
      for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
        validators[_key] = arguments[_key];
      }

      this._validators.push(validators);
      return this;
    }

    /**
     * Sets the default value of this primitive.
     *
     * @param {!*} value - The default value.
     * @returns {!PrimitiveBuilder} this
     */

  }, {
    key: 'defaultValue',
    value: function defaultValue(value) {
      this._defaultValue = value;

      return this;
    }

    /**
     * Marks this property as accepting the value "null".
     *
     * @returns {!PrimitiveBuilder} this
     */

  }, {
    key: 'nullable',
    value: function nullable() {
      var _nullable = arguments.length <= 0 || arguments[0] === void 0 ? true : arguments[0];

      // parameter is a hack for the alternative parameter set method
      this._nullable = _nullable;
      return this;
    }
  }, {
    key: _Symbols2.default.build,
    value: function value(currentValue) {
      var _this2 = this;

      var validation, hints, description, hintText, message, value;
      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              validation = this[_Symbols2.default.validate](currentValue);

              if (!(validation === true)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt('return', currentValue);

            case 3:

              if (currentValue !== void 0) {
                console.info('The current value for "' + this._name + '" (' + _cliColor2.default.yellow(JSON.stringify(currentValue)) + ') failed constraint validation (' + validation + '). Please enter a new value.');
              }

              hints = this[_Symbols2.default.getHints]();
              description = this._description ? ' - ' + _cliColor2.default.cyan(this._description) : '';
              hintText = hints.length > 0 ? _cliColor2.default.magenta(' (' + hints.join(', ') + ')') : '';
              message = _cliColor2.default.cyan(this._name) + description + hintText;
              _context.next = 10;
              return regeneratorRuntime.awrap(_io2.default.getValue(message, function (val) {
                if (val === void 0) {
                  if (_this2._defaultValue === void 0) {
                    return 'No default value.';
                  }

                  return true;
                }

                return _this2[_Symbols2.default.validate](val);
              }));

            case 10:
              value = _context.sent;

              if (!(value === void 0)) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', this._defaultValue);

            case 13:
              return _context.abrupt('return', value);

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: _Symbols2.default.getHints,
    value: function value() {
      // TODO extract from validators.
      var hints = [];

      if (this._nullable) {
        hints.push('Nullable');
      } else {
        hints.push('Not Null');
      }

      if (this._defaultValue) {
        hints.push('Default: ' + JSON.stringify(this._defaultValue));
      }

      return hints;
    }
  }, {
    key: _Symbols2.default.validate,
    value: function value(_value) {
      if (_value === null) {
        if (this._nullable) {
          return true;
        } else {
          return 'Cannot be null';
        }
      }

      if (!_checkValidatorsAnd(this._validators, _value)) {
        return 'Validator check failed';
      }

      return true;
    }
  }]);

  return PrimitiveBuilder;
}(_BaseBuilder3.default);

exports.default = PrimitiveBuilder;


function _checkValidatorsAnd(validators, value) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;

  var _iteratorError = void 0;

  try {
    for (var _iterator = validators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var validator = _step.value;

      if (Array.isArray(validator)) {
        if (!_checkValidatorOr(validator, value)) {
          return false;
        }

        continue;
      }

      if (!validator(value)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}

function _checkValidatorOr(validators, value) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;

  var _iteratorError2 = void 0;

  try {
    for (var _iterator2 = validators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var validator = _step2.value;

      if (Array.isArray(validator)) {
        if (_checkValidatorsAnd(validator, value)) {
          return true;
        }

        continue;
      }

      if (validator(value)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}