'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Symbols = require('./Symbols');

var _Symbols2 = _interopRequireDefault(_Symbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseBuilder = function () {

  /**
   * @param {!String} name
   * @param {!ObjectBuilder} parent
   */
  function BaseBuilder(name, parent) {
    _classCallCheck(this, BaseBuilder);

    this._name = name;
    this._parent = parent;
  }

  /**
   * Finalizes the current builder and gives control back to the parent.
   * @returns {!BaseBuilder}
   */


  _createClass(BaseBuilder, [{
    key: 'endObject',
    value: function endObject() {
      if (this._parent && this._parent._parent) {
        return this._parent._parent;
      }

      return this;
    }
  }, {
    key: 'then',
    value: function then() {
      var _getParent2;

      return (_getParent2 = this._getParent()).then.apply(_getParent2, arguments);
    }

    /**
     * Adds an object property to the current object.
     *
     * @param {!String} name - The name of the property.
     * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
     * @returns {!ObjectBuilder} The property builder.
     */

  }, {
    key: 'addObject',
    value: function addObject(name, properties) {
      return this._getParent().addObject(name, properties);
    }

    /**
     * Adds an Array property to the current object.
     *
     * @param {!String} name - The name of the property.
     * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
     * @returns {!ArrayBuilder} The property builder.
     */

  }, {
    key: 'addArray',
    value: function addArray(name, properties) {
      return this._getParent().addArray(name, properties);
    }

    /**
     * Adds a String property to the current object.
     *
     * @param {!String} name - The name of the property.
     * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
     * @returns {!StringBuilder}
     */

  }, {
    key: 'addString',
    value: function addString(name, properties) {
      return this._getParent().addString(name, properties);
    }

    /**
     * Adds a Number property to the current object.
     *
     * @param {!String} name - The name of the property.
     * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
     * @returns {!NumberBuilder} The property builder.
     */

  }, {
    key: 'addNumber',
    value: function addNumber(name, properties) {
      return this._getParent().addNumber(name, properties);
    }

    /**
     * Adds a Boolean property to the current object.
     *
     * @param {!String} name - The name of the property.
     * @param {!Object} [properties = {}] - Properties to set on the object. Same as calling the methods.
     * @returns {!BooleanBuilder} The property builder.
     */

  }, {
    key: 'addBoolean',
    value: function addBoolean(name, properties) {
      return this._getParent().addBoolean(name, properties);
    }

    /**
     * Sets the description of the property.
     *
     * @param {!String} description - The property description.
     * @returns {!BaseBuilder} this
     */

  }, {
    key: 'description',
    value: function description(_description) {
      this._description = _description;
      return this;
    }
  }, {
    key: _Symbols2.default.build,
    value: function value() {
      return regeneratorRuntime.async(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              throw new Error('Builder not implemented');

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }

    /**
     * Returns the parent of this object.
     *
     * @return {!ObjectBuilder}
     * @private
     */

  }, {
    key: '_getParent',
    value: function _getParent() {
      if (!this._parent) {
        throw new Error('This builder does not have a parent, this should not have happened.');
      }

      return this._parent;
    }
  }]);

  return BaseBuilder;
}();

exports.default = BaseBuilder;