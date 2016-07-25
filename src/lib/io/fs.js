import _fs from 'fs';
import fs from 'fs-promise';
import * as path from 'path';

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

  writeFile: fs.writeFile,

  async ensureDirectoryExistence(filePath) {
    const dirname = path.dirname(filePath);

    if (await this.directoryExists(dirname)) {
      return true;
    }

    await this.ensureDirectoryExistence(dirname);
    await fs.mkdir(dirname);

    return true;
  },

  async directoryExists(path) {
    try {
      return await this.stat(path).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
