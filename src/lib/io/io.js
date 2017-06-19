import fs from './fs';
import stdin from './stdin';

export default {
  async readConfig(filePath) {
    if (!await fs.fileExists(filePath)) {
      return {};
    }

    const contents = await fs.readFile(filePath);

    if (contents.length === 0) {
      return {};
    }

    try {
      return JSON.parse(contents);
    } catch (e) {
      throw new Error(`File "${filePath}" already has content, which is not JSON.`);
    }
  },

  async writeConfig(filepath, config) {
    if (!await fs.fileExists(filepath)) {
      await fs.ensureDirectoryExistence(filepath);
    }

    return fs.writeFile(filepath, JSON.stringify(config), 2);
  },

  async getValue(question, validator) {

    do {
      const rawData = await stdin.readLine(question);

      let parsedData;
      if (rawData === '') {
        parsedData = void 0;
      } else {
        try {
          parsedData = JSON.parse(rawData);
        } catch (e) {
          parsedData = rawData;
        }
      }

      const validation = validator(parsedData);
      if (validation !== true) {
        console.error(`Invalid response '${rawData}': ${validation || 'Constraint violated.'}`);
        continue;
      }

      return parsedData;
    } while (true);
  }
};
