import _fs from 'fs';
import fs from 'fs-promise';
import getStdin from 'get-stdin';

function stat(path) {
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
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    _fs.readFile(filePath, function (err, response) {
      if (err) {
        return reject(err);
      }

      return resolve(response);
    });
  });
}

export default {
  async readConfig(filePath) {
    const fileStat = await stat(filePath);

    if (fileStat === null) {
      await fs.writeFile(filePath, '{}');
      return {};
    } else if (fileStat.isFile()) {
      const contents = await readFile(filePath);

      try {
        return JSON.parse(contents);
      } catch (e) {
        throw new Error(`File "${filePath}" already has content, which is not JSON.`);
      }
    }

    throw new Error(`File "${filePath}" is not a writable file.`);
  },

  async writeConfig(filepath, config) {
    return fs.writeFile(filepath, JSON.stringify(config));
  },

  async getValue(question, validator) {
    console.info(question);

    // TODO

    return await getStdin();
  }
}
