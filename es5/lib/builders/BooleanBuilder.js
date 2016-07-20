'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === void 0) { var parent = Object.getPrototypeOf(object); if (parent === null) { return void 0; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === void 0) { return void 0; } return getter.call(receiver); } };

var _PrimitiveBuilder2 = require('./PrimitiveBuilder');

var _PrimitiveBuilder3 = _interopRequireDefault(_PrimitiveBuilder2);

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BooleanBuilder = function (_PrimitiveBuilder) {
  _inherits(BooleanBuilder, _PrimitiveBuilder);

  function BooleanBuilder() {
    _classCallCheck(this, BooleanBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BooleanBuilder).apply(this, arguments));
  }

  _createClass(BooleanBuilder, [{
    key: _Symbols2.default.validate,
    value: function value(_value) {
      var sup = _get(Object.getPrototypeOf(BooleanBuilder.prototype), _Symbols2.default.validate, this).call(this, _value);
      if (sup !== true) {
        return sup;
      }

      if (_value === null) {
        return true;
      }

      if (typeof _value !== 'boolean') {
        return 'Not a boolean. (true/false)';
      }

      return true;
    }
  }]);

  return BooleanBuilder;
}(_PrimitiveBuilder3.default);

exports.default = BooleanBuilder;