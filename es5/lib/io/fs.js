'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _path = require('path');

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  stat: function stat(path) {
    return new Promise(function (resolve, reject) {
      _fs3.default.stat(path, function (err, response) {
        if (err) {
          if (err.code === 'ENOENT') {
            return resolve(null);
          }

          return reject(err);
        }

        return resolve(response);
      });
    });
  },
  readFile: function readFile(filePath) {
    return new Promise(function (resolve, reject) {
      _fs3.default.readFile(filePath, function (err, response) {
        if (err) {
          return reject(err);
        }

        return resolve(response);
      });
    });
  },


  writeFile: _fsPromise2.default.writeFile,

  ensureDirectoryExistence: function ensureDirectoryExistence(filePath) {
    var dirname;
    return regeneratorRuntime.async(function ensureDirectoryExistence$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dirname = path.dirname(filePath);
            _context.next = 3;
            return regeneratorRuntime.awrap(this.directoryExists(dirname));

          case 3:
            if (!_context.sent) {
              _context.next = 5;
              break;
            }

            return _context.abrupt('return', true);

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(this.ensureDirectoryExistence(dirname));

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(_fsPromise2.default.mkdir(dirname));

          case 9:
            return _context.abrupt('return', true);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this);
  },
  directoryExists: function directoryExists(path) {
    return regeneratorRuntime.async(function directoryExists$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(this.stat(path).isDirectory());

          case 3:
            return _context2.abrupt('return', _context2.sent);

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2['catch'](0);
            return _context2.abrupt('return', false);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this, [[0, 6]]);
  }
};