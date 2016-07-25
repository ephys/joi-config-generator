'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _ComplexBuilder2 = require('./abstract/ComplexBuilder');

var _ComplexBuilder3 = _interopRequireDefault(_ComplexBuilder2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ArrayBuilder
 * @extends ComplexBuilder
 */
var ArrayBuilder = function (_ComplexBuilder) {
  _inherits(ArrayBuilder, _ComplexBuilder);

  function ArrayBuilder() {
    var _Object$getPrototypeO;

    _classCallCheck(this, ArrayBuilder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ArrayBuilder)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this._properties = [];
    return _this;
  }

  /**
   * Sets the minimum count of items to put in the array.
   * @param {!number} itemCount
   * @returns {!ArrayBuilder}
   */


  _createClass(ArrayBuilder, [{
    key: 'minItems',
    value: function minItems(itemCount) {
      this._min = itemCount;
      return this;
    }

    /**
     * Sets the maximum count of items to put in the array.
     * @param {!number} itemCount
     * @returns {!ArrayBuilder}
     */

  }, {
    key: 'maxItems',
    value: function maxItems(itemCount) {
      this._max = itemCount;
      return this;
    }

    /**
     * Adds a new property to the object
     * @param {!String} name - The property name.
     * @param {Object} builderProperties - The new property's own properties.
     * @param {!Function} Builder - The property builder class.
     * @returns {!Object} The property builder instance.
     * @protected
     */

  }, {
    key: '_addProperty',
    value: function _addProperty(name, builderProperties, Builder) {
      var propertyBuilder = new Builder(name, this);
      this._properties.push(propertyBuilder);

      this._setBuilderProperties(propertyBuilder, builderProperties);

      return propertyBuilder;
    }
  }, {
    key: _Symbols2.default.build,
    value: function value() {
      var currentArray = arguments.length <= 0 || arguments[0] === void 0 ? [] : arguments[0];
      var canSkipArray = arguments.length <= 1 || arguments[1] === void 0 ? false : arguments[1];
      var i, propertyBuilder, canSkip, newValue;
      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;


              console.info('Building array, leave blank to stop adding items.');
              if (this._min) {
                console.info('Minimum items in array: ' + this._min);
              }

              if (this._max) {
                console.info('Maximum items in array: ' + this._max);
              }

            case 4:
              if (!_isAboveMax(i, this._max)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('break', 18);

            case 6:
              propertyBuilder = this._properties[i % this._properties.length];

              propertyBuilder.name(i);

              canSkip = canSkipArray || _isAboveMin(i, this._min);
              _context.next = 11;
              return regeneratorRuntime.awrap(propertyBuilder[_Symbols2.default.build](currentArray[i], canSkip));

            case 11:
              newValue = _context.sent;

              if (!(newValue === void 0)) {
                _context.next = 15;
                break;
              }

              // skipped
              delete currentArray[i];
              return _context.abrupt('break', 18);

            case 15:

              currentArray[i] = newValue;
              i++;

            case 17:
              if (true) {
                _context.next = 4;
                break;
              }

            case 18:
              return _context.abrupt('return', currentArray);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ArrayBuilder;
}(_ComplexBuilder3.default);

exports.default = ArrayBuilder;
;

function _isAboveMax(i, max) {
  if (max === void 0) {
    return false;
  }

  return i > max;
}

function _isAboveMin(i, min) {
  if (min === void 0) {
    return true;
  }

  return i >= min;
}