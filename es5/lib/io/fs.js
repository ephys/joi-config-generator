'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs2 = require('fs');

var _fs3 = _interopRequireDefault(_fs2);

var _fsPromise = require('fs-promise');

var _fsPromise2 = _interopRequireDefault(_fsPromise);

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


  writeFile: _fsPromise2.default.writeFile
};