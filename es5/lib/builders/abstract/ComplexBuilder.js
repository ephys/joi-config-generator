'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseBuilder2 = require('./BaseBuilder');

var _BaseBuilder3 = _interopRequireDefault(_BaseBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ComplexBuilder
 * @extends BaseBuilder
 * @abstract
 */
var ComplexBuilder = function (_BaseBuilder) {
  _inherits(ComplexBuilder, _BaseBuilder);

  /**
   * @param {!String} name - The name of the property.
   * @param {ObjectBuilder} parent
   */
  function ComplexBuilder(name, parent) {
    _classCallCheck(this, ComplexBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ComplexBuilder).call(this, name, parent));
  }

  /**
   * Sets the properties of a builder instance.
   * @param {!Object} builder - The builder instance.
   * @param {Object} properties - The list of properties.
   * @protected
   */


  _createClass(ComplexBuilder, [{
    key: '_setBuilderProperties',
    value: function _setBuilderProperties(builder, properties) {
      if (!properties) {
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError = void 0;

      try {
        for (var _iterator = Object.getOwnPropertyNames(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var methodName = _step.value;

          var methodArgument = properties[methodName];

          var method = builder[methodName];
          if (!method) {
            throw new Error('No method "' + methodName + '" in Builder type "' + builder.constructor.name + '"');
          }

          // For boolean properties, skip if the value is false.
          if (method.length === 0 && methodArgument === false) {
            continue;
          }

          if (Array.isArray(methodArgument)) {
            // For .validator which takes multiple parameters, a bit of a workaround, might need something cleaner, maybe
            builder[methodName].apply(builder, _toConsumableArray(methodArgument));
          } else {
            builder[methodName](methodArgument);
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
    }
  }]);

  return ComplexBuilder;
}(_BaseBuilder3.default);

exports.default = ComplexBuilder;