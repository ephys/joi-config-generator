'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('./fs');

var _fs2 = _interopRequireDefault(_fs);

var _stdin = require('./stdin');

var _stdin2 = _interopRequireDefault(_stdin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  readConfig: function readConfig(filePath) {
    var fileStat, contents;
    return regeneratorRuntime.async(function readConfig$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_fs2.default.stat(filePath));

          case 2:
            fileStat = _context.sent;

            if (!(fileStat === null)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('return', {});

          case 7:
            if (!fileStat.isFile()) {
              _context.next = 20;
              break;
            }

            _context.next = 10;
            return regeneratorRuntime.awrap(_fs2.default.readFile(filePath));

          case 10:
            contents = _context.sent;

            if (!(contents.length === 0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt('return', {});

          case 13:
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
            return _context2.abrupt('return', _fs2.default.writeFile(filepath, JSON.stringify(config)));

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, null, this);
  },
  getValue: function getValue(question, validator) {
    var rawData, parsedData, validation;
    return regeneratorRuntime.async(function getValue$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(_stdin2.default.readLine(question));

          case 2:
            rawData = _context3.sent;
            parsedData = void 0;

            if (rawData === '') {
              parsedData = void 0;
            } else {
              try {
                parsedData = JSON.parse(rawData);
              } catch (e) {
                parsedData = rawData;
              }
            }

            validation = validator(parsedData);

            if (!(validation !== true)) {
              _context3.next = 9;
              break;
            }

            console.error('Invalid response \'' + rawData + '\': ' + (validation || 'Constraint violated.'));
            return _context3.abrupt('continue', 10);

          case 9:
            return _context3.abrupt('return', parsedData);

          case 10:
            if (true) {
              _context3.next = 0;
              break;
            }

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, null, this);
  }
};