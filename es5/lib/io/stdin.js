'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rl = _readline2.default.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.default = {
  readLine: function readLine(question) {
    return regeneratorRuntime.async(function readLine$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve) {
              return rl.question(question + ': ', resolve);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  }
};