import regeneratorRuntime from 'regenerator-runtime';

import ConfigBuilder from './lib/builders/ConfigBuilder';
import stringValidators from './lib/validators/string';
import numberValidators from './lib/validators/number';

global.regeneratorRuntime = regeneratorRuntime;

/**
 * Builds a JSON configuration file and returns it.
 *
 * @param {!String} filePath - The location of the config file.
 * @return {!ConfigBuilder}
 */
export default function(filePath) {
  return new ConfigBuilder(filePath);
}

export const validator = {
  string: stringValidators,
  number: numberValidators
};
