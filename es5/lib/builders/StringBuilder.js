'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PrimitiveBuilder2 = require('./PrimitiveBuilder');

var _PrimitiveBuilder3 = _interopRequireDefault(_PrimitiveBuilder2);

var _TypeValidators = require('../validators/TypeValidators');

var _TypeValidators2 = _interopRequireDefault(_TypeValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringBuilder = function (_PrimitiveBuilder) {
  _inherits(StringBuilder, _PrimitiveBuilder);

  function StringBuilder() {
    var _Object$getPrototypeO;

    _classCallCheck(this, StringBuilder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(StringBuilder)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.addValidator(_TypeValidators2.default.string);
    return _this;
  }

  /**
   * Sets the minimum length of the string.
   *
   * @param {!number} length
   * @returns {!StringBuilder} this
   */


  _createClass(StringBuilder, [{
    key: 'minLength',
    value: function minLength(length) {
      //noinspection JSValidateTypes
      return this.addValidator(function (value) {
        return value.length >= length;
      });
    }

    /**
     * Sets the maximum length of the string.
     *
     * @param {!number} length
     * @returns {!StringBuilder} this
     */

  }, {
    key: 'maxLength',
    value: function maxLength(length) {
      //noinspection JSValidateTypes
      return this.addValidator(function (value) {
        return value.length <= length;
      });
    }
  }]);

  return StringBuilder;
}(_PrimitiveBuilder3.default);

exports.default = StringBuilder;