import _fs from 'fs';
import fs from 'fs-promise';

export default {
  stat(path) {
    return new Promise((resolve, reject) => {
      _fs.stat(path, function (err, response) {
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

  readFile(filePath) {
    return new Promise((resolve, reject) => {
      _fs.readFile(filePath, function (err, response) {
        if (err) {
          return reject(err);
        }

        return resolve(response);
      });
    });
  },

  writeFile: fs.writeFile
};
