'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PrimitiveBuilder2 = require('./abstract/PrimitiveBuilder');

var _PrimitiveBuilder3 = _interopRequireDefault(_PrimitiveBuilder2);

var _NumberValidators = require('../validators/NumberValidators');

var _NumberValidators2 = _interopRequireDefault(_NumberValidators);

var _TypeValidators = require('../validators/TypeValidators');

var _TypeValidators2 = _interopRequireDefault(_TypeValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberBuilder = function (_PrimitiveBuilder) {
  _inherits(NumberBuilder, _PrimitiveBuilder);

  function NumberBuilder() {
    var _Object$getPrototypeO;

    _classCallCheck(this, NumberBuilder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(NumberBuilder)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.validator(_TypeValidators2.default.number);
    return _this;
  }

  /**
   * Deny any non integer input.
   * @returns {!NumberBuilder}
   */


  _createClass(NumberBuilder, [{
    key: 'integer',
    value: function integer() {
      //noinspection JSValidateTypes
      return this.validator(_NumberValidators2.default.integer);
    }

    /**
     * Sets the minimum value (inclusive) for the input. For exclusive validators, see validators.
     * @param {!number} min - The minimum value.
     * @returns {!NumberBuilder} this
     */

  }, {
    key: 'min',
    value: function min(_min) {
      //noinspection JSValidateTypes
      return this.validator(_NumberValidators2.default.build.min(_min));
    }

    /**
     * Sets the maximum value (inclusive) for the input. For exclusive validators, see validators.
     * @param {!number} max - The maximum value.
     * @returns {!NumberBuilder} this
     */

  }, {
    key: 'max',
    value: function max(_max) {
      //noinspection JSValidateTypes
      return this.validator(_NumberValidators2.default.build.max(_max));
    }
  }]);

  return NumberBuilder;
}(_PrimitiveBuilder3.default);

exports.default = NumberBuilder;