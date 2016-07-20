'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

var _getStdin = require('get-stdin');

var _getStdin2 = _interopRequireDefault(_getStdin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stat(path) {
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
}

function readFile(filePath) {
  return new Promise(function (resolve, reject) {
    _fs3.default.readFile(filePath, function (err, response) {
      if (err) {
        return reject(err);
      }

      return resolve(response);
    });
  });
}

exports.default = {
  readConfig: function readConfig(filePath) {
    var fileStat, contents;
    return regeneratorRuntime.async(function readConfig$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(stat(filePath));

          case 2:
            fileStat = _context.sent;

            if (!(fileStat === null)) {
              _context.next = 9;
              break;
            }

            _context.next = 6;
            return regeneratorRuntime.awrap(_fsPromise2.default.writeFile(filePath, '{}'));

          case 6:
            return _context.abrupt('return', {});

          case 9:
            if (!fileStat.isFile()) {
              _context.next = 20;
              break;
            }

            _context.next = 12;
            return regeneratorRuntime.awrap(readFile(filePath));

          case 12:
            contents = _context.sent;
            _context.prev = 13;
            return _context.abrupt('return', JSON.parse(contents));

          case 17:
            _context.prev = 17;
            _context.t0 = _context['catch'](13);
            throw new Error('File "' + filePath + '" already has content, which is not JSON.');

          case 20:
            throw new Error('File "' + filePath + '" is not a writable file.');

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, null, this, [[13, 17]]);
  },
  writeConfig: function writeConfig(filepath, config) {
    return regeneratorRuntime.async(function writeConfig$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt('return', _fsPromise2.default.writeFile(filepath, JSON.stringify(config)));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this);
  },
  getValue: function getValue(question, validator) {
    return regeneratorRuntime.async(function getValue$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.info(question);

            // TODO

            _context3.next = 3;
            return regeneratorRuntime.awrap((0, _getStdin2.default)());

          case 3:
            return _context3.abrupt('return', _context3.sent);

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, null, this);
  }
};