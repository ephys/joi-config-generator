'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ObjectBuilder2 = require('./ObjectBuilder');

var _ObjectBuilder3 = _interopRequireDefault(_ObjectBuilder2);

var _ArrayBuilder = require('./ArrayBuilder');

var _ArrayBuilder2 = _interopRequireDefault(_ArrayBuilder);

var _StringBuilder = require('./StringBuilder');

var _StringBuilder2 = _interopRequireDefault(_StringBuilder);

var _BooleanBuilder = require('./BooleanBuilder');

var _BooleanBuilder2 = _interopRequireDefault(_BooleanBuilder);

var _NumberBuilder = require('./NumberBuilder');

var _NumberBuilder2 = _interopRequireDefault(_NumberBuilder);

var _ComplexBuilder = require('./abstract/ComplexBuilder');

var _ComplexBuilder2 = _interopRequireDefault(_ComplexBuilder);

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _io = require('../io/io');

var _io2 = _interopRequireDefault(_io);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ConfigBuilder
 * @extends ObjectBuilder
 */
var ConfigBuilder = function (_ObjectBuilder) {
  _inherits(ConfigBuilder, _ObjectBuilder);

  /**
   * @param {!String} filePath
   */
  function ConfigBuilder(filePath) {
    _classCallCheck(this, ConfigBuilder);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConfigBuilder).call(this));

    _this._filePath = filePath;
    return _this;
  }

  _createClass(ConfigBuilder, [{
    key: 'then',
    value: function then(callback) {
      var config, newConfig;
      return regeneratorRuntime.async(function then$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log('Checking config setup.');

              _context.next = 3;
              return regeneratorRuntime.awrap(_io2.default.readConfig(this._filePath));

            case 3:
              config = _context.sent;
              _context.next = 6;
              return regeneratorRuntime.awrap(this[_Symbols2.default.build](config, false));

            case 6:
              newConfig = _context.sent;
              _context.next = 9;
              return regeneratorRuntime.awrap(_io2.default.writeConfig(this._filePath, newConfig));

            case 9:
              return _context.abrupt('return', callback(newConfig));

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ConfigBuilder;
}(_ObjectBuilder3.default);

// Import post-export, circular dependencies bug

exports.default = ConfigBuilder;
[_ObjectBuilder3.default, _ArrayBuilder2.default, _StringBuilder2.default, _NumberBuilder2.default, _BooleanBuilder2.default].forEach(function (Builder) {

  var builderName = Builder.name;
  var type = builderName.substr(0, builderName.length - 'builder'.length);

  Object.defineProperty(_ComplexBuilder2.default.prototype, 'add' + type, {
    value: function value(name, properties) {
      return this._addProperty(name, properties, Builder);
    }
  });
});