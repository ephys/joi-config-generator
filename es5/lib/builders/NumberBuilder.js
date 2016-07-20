'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === void 0) { var parent = Object.getPrototypeOf(object); if (parent === null) { return void 0; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === void 0) { return void 0; } return getter.call(receiver); } };

var _PrimitiveBuilder2 = require('./PrimitiveBuilder');

var _PrimitiveBuilder3 = _interopRequireDefault(_PrimitiveBuilder2);

var _number = require('../validators/number');

var _number2 = _interopRequireDefault(_number);

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberBuilder = function (_PrimitiveBuilder) {
  _inherits(NumberBuilder, _PrimitiveBuilder);

  function NumberBuilder() {
    _classCallCheck(this, NumberBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NumberBuilder).apply(this, arguments));
  }

  _createClass(NumberBuilder, [{
    key: 'integer',


    /**
     * Deny any non integer input.
     * @returns {!NumberBuilder}
     */
    value: function integer() {
      //noinspection JSValidateTypes
      return this.addValidator(_number2.default.integer);
    }

    /**
     * Sets the minimum value (inclusive) for the input. For exclusive validators, see validators.
     * @param {!number} min - The minimum value.
     * @returns {!NumberBuilder} this
     */

  }, {
    key: 'min',
    value: function min(_min) {
      this._min = _min;
      return this;
    }

    /**
     * Sets the maximum value (inclusive) for the input. For exclusive validators, see validators.
     * @param {!number} max - The maximum value.
     * @returns {!NumberBuilder} this
     */

  }, {
    key: 'max',
    value: function max(_max) {
      this._max = _max;
      return this;
    }
  }, {
    key: _Symbols2.default.validate,
    value: function value(_value) {
      if (typeof _value !== 'number') {
        return false;
      }

      var sup = _get(Object.getPrototypeOf(NumberBuilder.prototype), _Symbols2.default.validate, this).call(this, _value);

      if (!sup) {
        return false;
      }

      if (this._min !== void 0 && _value < this._min) {
        return false;
      }

      return !(this._max !== void 0 && _value > this._max);
    }
  }]);

  return NumberBuilder;
}(_PrimitiveBuilder3.default);

exports.default = NumberBuilder;