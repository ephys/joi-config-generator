'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectBuilderSymbols = void 0;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = void 0; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseBuilder2 = require('./BaseBuilder');

var _BaseBuilder3 = _interopRequireDefault(_BaseBuilder2);

var _ArrayBuilder = require('./ArrayBuilder');

var _ArrayBuilder2 = _interopRequireDefault(_ArrayBuilder);

var _StringBuilder = require('./StringBuilder');

var _StringBuilder2 = _interopRequireDefault(_StringBuilder);

var _NumberBuilder = require('./NumberBuilder');

var _NumberBuilder2 = _interopRequireDefault(_NumberBuilder);

var _BooleanBuilder = require('./BooleanBuilder');

var _BooleanBuilder2 = _interopRequireDefault(_BooleanBuilder);

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _StringValidators = require('../validators/StringValidators');

var _StringValidators2 = _interopRequireDefault(_StringValidators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectBuilderSymbols = exports.ObjectBuilderSymbols = {
  separator: Symbol('separator')
};

var ObjectBuilder = function (_BaseBuilder) {
  _inherits(ObjectBuilder, _BaseBuilder);

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
   * Returns this object's parent or itself if it's the root element.
   *
   * @return {!ObjectBuilder}
   */


  _createClass(ObjectBuilder, [{
    key: 'endObject',
    value: function endObject() {
      return this._parent || this;
    }
  }, {
    key: '_add',
    value: function _add(name, itemProperties, Builder) {
      if (typeof name !== 'string') {
        throw new Error('Invalid property name "' + JSON.stringify(name) + '", must be a string.');
      }

      if (this._properties.has(name)) {
        throw new Error('Property "' + name + '" is already set on this builder');
      }

      var displayName = _StringValidators2.default.urlfriendly(name) ? name : JSON.stringify(name);

      var propertyBuilder = new Builder(this._name + this[ObjectBuilderSymbols.separator] + displayName, this);
      this._properties.set(name, propertyBuilder);

      // Copy properties over. Per request.
      if (itemProperties) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;

        var _iteratorError = void 0;

        try {
          for (var _iterator = Object.getOwnPropertyNames(itemProperties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var propertyName = _step.value;

            var propertyValue = itemProperties[propertyName];

            if (!propertyBuilder[propertyName]) {
              throw new Error('No method "' + propertyName + '" in "' + propertyBuilder.constructor.name + '"');
            }

            propertyBuilder[propertyName](propertyValue);
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

      return propertyBuilder;
    }
  }, {
    key: _Symbols2.default.build,
    value: function value() {
      var config = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

      var newConfig, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, propertyName, propertyBuilder, currentValue;

      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              newConfig = {};
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = void 0;
              _context.prev = 4;
              _iterator2 = this._properties[Symbol.iterator]();

            case 6:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 17;
                break;
              }

              _step2$value = _slicedToArray(_step2.value, 2);
              propertyName = _step2$value[0];
              propertyBuilder = _step2$value[1];
              currentValue = config[propertyName];
              _context.next = 13;
              return regeneratorRuntime.awrap(propertyBuilder[_Symbols2.default.build](currentValue));

            case 13:
              newConfig[propertyName] = _context.sent;

            case 14:
              _iteratorNormalCompletion2 = true;
              _context.next = 6;
              break;

            case 17:
              _context.next = 23;
              break;

            case 19:
              _context.prev = 19;
              _context.t0 = _context['catch'](4);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 23:
              _context.prev = 23;
              _context.prev = 24;

              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }

            case 26:
              _context.prev = 26;

              if (!_didIteratorError2) {
                _context.next = 29;
                break;
              }

              throw _iteratorError2;

            case 29:
              return _context.finish(26);

            case 30:
              return _context.finish(23);

            case 31:
              return _context.abrupt('return', newConfig);

            case 32:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[4, 19, 23, 31], [24,, 26, 30]]);
    }
  }]);

  return ObjectBuilder;
}(_BaseBuilder3.default);

exports.default = ObjectBuilder;


Object.defineProperty(ObjectBuilder.prototype, ObjectBuilderSymbols.separator, {
  value: '.',
  writable: false,
  enumerable: false
});

[ObjectBuilder, _ArrayBuilder2.default, _StringBuilder2.default, _NumberBuilder2.default, _BooleanBuilder2.default].forEach(function (Builder) {

  var builderName = Builder.name;
  var type = builderName.substr(0, builderName.length - 'builder'.length);

  Object.defineProperty(ObjectBuilder.prototype, 'add' + type, {
    value: function value(name, properties) {
      return this._add(name, properties, Builder);
    }
  });
});