'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseBuilder2 = require('./BaseBuilder');

var _BaseBuilder3 = _interopRequireDefault(_BaseBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ArrayBuilder = function (_BaseBuilder) {
  _inherits(ArrayBuilder, _BaseBuilder);

  function ArrayBuilder() {
    _classCallCheck(this, ArrayBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayBuilder).apply(this, arguments));
  }

  _createClass(ArrayBuilder, [{
    key: 'ofString',


    /**
     * @return {!ArrayBuilder}
     */
    value: function ofString() {
      return this;
    }
  }, {
    key: 'ofDouble',
    value: function ofDouble() {
      return this;
    }
  }, {
    key: 'ofInteger',
    value: function ofInteger() {
      return this;
    }
  }, {
    key: 'ofBooleans',
    value: function ofBooleans() {
      return this;
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
     * @return {!ArrayBuilder} this
     */

  }, {
    key: 'addItemValidator',
    value: function addItemValidator() {
      return this;
    }
  }]);

  return ArrayBuilder;
}(_BaseBuilder3.default);

exports.default = ArrayBuilder;