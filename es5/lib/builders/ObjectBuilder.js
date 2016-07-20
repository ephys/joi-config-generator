'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
   * @inheritDoc
   */


  _createClass(ObjectBuilder, [{
    key: 'addObject',
    value: function addObject(name) {
      return this._add(name, ObjectBuilder);
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'addArray',
    value: function addArray(name) {
      return this._add(name, _ArrayBuilder2.default);
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'addString',
    value: function addString(name) {
      return this._add(name, _StringBuilder2.default);
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'addNumber',
    value: function addNumber(name) {
      return this._add(name, _NumberBuilder2.default);
    }

    /**
     * @inheritDoc
     */

  }, {
    key: 'addBoolean',
    value: function addBoolean(name) {
      return this._add(name, _BooleanBuilder2.default);
    }
  }, {
    key: '_add',
    value: function _add(name, Builder) {
      this._checkName(name);

      var propertyBuilder = new Builder(this._name + '.' + name, this);
      this._properties.set(name, propertyBuilder);

      return propertyBuilder;
    }

    /**
     * Checks if a name is valid as a new property.
     * @param {!*} name
     * @private
     */

  }, {
    key: '_checkName',
    value: function _checkName(name) {
      if (typeof name !== 'string') {
        throw new Error('Invalid property name "' + JSON.stringify(name) + '", must be a string.');
      }

      if (this._properties.has(name)) {
        throw new Error('Property "' + name + '" is already set on this builder');
      }
    }
  }, {
    key: _Symbols2.default.build,
    value: function value() {
      var config = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

      var newConfig, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, propertyName, propertyBuilder, currentValue;

      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('Building object ' + this._name);
              newConfig = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = void 0;
              _context.prev = 5;
              _iterator = this._properties[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 18;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2);
              propertyName = _step$value[0];
              propertyBuilder = _step$value[1];
              currentValue = config[propertyName];
              _context.next = 14;
              return regeneratorRuntime.awrap(propertyBuilder[_Symbols2.default.build](currentValue));

            case 14:
              newConfig[propertyName] = _context.sent;

            case 15:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 18:
              _context.next = 24;
              break;

            case 20:
              _context.prev = 20;
              _context.t0 = _context['catch'](5);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 24:
              _context.prev = 24;
              _context.prev = 25;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 27:
              _context.prev = 27;

              if (!_didIteratorError) {
                _context.next = 30;
                break;
              }

              throw _iteratorError;

            case 30:
              return _context.finish(27);

            case 31:
              return _context.finish(24);

            case 32:
              return _context.abrupt('return', newConfig);

            case 33:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this, [[5, 20, 24, 32], [25,, 27, 31]]);
    }
  }]);

  return ObjectBuilder;
}(_BaseBuilder3.default);

exports.default = ObjectBuilder;