'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseBuilder2 = require('./BaseBuilder');

var _BaseBuilder3 = _interopRequireDefault(_BaseBuilder2);

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

var _TypeValidators = require('../validators/TypeValidators');

var _TypeValidators2 = _interopRequireDefault(_TypeValidators);

var _StringUtil = require('../util/StringUtil');

var _StringUtil2 = _interopRequireDefault(_StringUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class ArrayBuilder
 */
var ArrayBuilder = function (_BaseBuilder) {
  _inherits(ArrayBuilder, _BaseBuilder);

  function ArrayBuilder() {
    _classCallCheck(this, ArrayBuilder);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayBuilder).apply(this, arguments));
  }

  _createClass(ArrayBuilder, [{
    key: 'minItems',


    /**
     * Sets the minimum count of items to put in the array.
     * @param {!number} itemCount
     * @returns {!ArrayBuilder}
     */
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
     * Adds a validator that will be run on each items of the array.
     *
     * @param {!function} validator
     * @returns {!ArrayBuilder}
     */

  }, {
    key: 'addItemValidator',
    value: function addItemValidator(validator) {
      // TODO
      return this;
    }
  }, {
    key: _Symbols2.default.build,
    value: function value(currentValue) {
      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', []);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return ArrayBuilder;
}(_BaseBuilder3.default);

exports.default = ArrayBuilder;
;

/**
 * @method
 * @name ArrayBuilder#ofStrings
 * @returns {!ArrayBuilder}
 * @public
 */

/**
 * @method
 * @name ArrayBuilder#ofBooleans
 * @returns {!ArrayBuilder}
 * @public
 */

/**
 * @method
 * @name ArrayBuilder#ofNumbers
 * @returns {!ArrayBuilder}
 * @public
 */

['string', 'number', 'boolean'].forEach(function (type) {
  Object.defineProperty(ArrayBuilder.prototype, 'of' + _StringUtil2.default.capitalizeFirstLetter(type) + 's', {
    value: function value() {
      return this.addItemValidator(_TypeValidators2.default[type]);
    }
  });
});