'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = void 0; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
 * @class ObjectBuilder
 */
var ObjectBuilder = function (_ComplexBuilder) {
  _inherits(ObjectBuilder, _ComplexBuilder);

  /**
   * @param {!String} name - The name of the property.
   * @param {ObjectBuilder} parent
   */
  function ObjectBuilder(name, parent) {
    _classCallCheck(this, ObjectBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectBuilder).call(this, name, parent));

    _this._properties = new Map();
    return _this;
  }

  /**
   * Adds a new property to the object
   * @param {!String} name - The property name.
   * @param {Object} builderProperties - The new property's own properties.
   * @param {!Function} Builder - The property builder class.
   * @returns {!Object} The property builder instance.
   * @protected
   */


  _createClass(ObjectBuilder, [{
    key: '_addProperty',
    value: function _addProperty(name, builderProperties, Builder) {
      if (typeof name !== 'string') {
        throw new Error('Invalid property name "' + JSON.stringify(name) + '", must be a string.');
      }

      if (this._properties.has(name)) {
        throw new Error('Property "' + name + '" is already set on this builder');
      }

      var propertyBuilder = new Builder(name, this);
      this._properties.set(name, propertyBuilder);

      this._setBuilderProperties(propertyBuilder, builderProperties);

      return propertyBuilder;
    }
  }, {
    key: _Symbols2.default.build,
    value: function value() {
      var config = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];
      var canSkip = arguments.length <= 1 || arguments[1] === void 0 ? false : arguments[1];

      var newConfig, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, propertyName, propertyBuilder, currentValue;

      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newConfig = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = void 0;
              _context.prev = 4;
              _iterator = this._properties[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 19;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2);
              propertyName = _step$value[0];
              propertyBuilder = _step$value[1];
              currentValue = config[propertyName];
              _context.next = 13;
              return regeneratorRuntime.awrap(propertyBuilder[_Symbols2.default.build](currentValue, canSkip));

            case 13:
              newConfig[propertyName] = _context.sent;

              if (!(canSkip && newConfig[propertyName] === void 0)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt('return', void 0);

            case 16:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;

            case 19:
              _context.next = 25;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 25:
              _context.prev = 25;
              _context.prev = 26;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 28:
              _context.prev = 28;

              if (!_didIteratorError) {
                _context.next = 31;
                break;
              }

              throw _iteratorError;

            case 31:
              return _context.finish(28);

            case 32:
              return _context.finish(25);

            case 33:
              return _context.abrupt('return', newConfig);

            case 34:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[4, 21, 25, 33], [26,, 28, 32]]);
    }
  }]);

  return ObjectBuilder;
}(_ComplexBuilder3.default);

exports.default = ObjectBuilder;