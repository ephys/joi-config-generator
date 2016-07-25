"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  or: function or() {
    for (var _len = arguments.length, decorators = Array(_len), _key = 0; _key < _len; _key++) {
      decorators[_key] = arguments[_key];
    }

    return function (input) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;

      var _iteratorError = void 0;

      try {
        for (var _iterator = decorators[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var decorator = _step.value;

          if (decorator(input)) {
            return true;
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

      return false;
    };
  }
};