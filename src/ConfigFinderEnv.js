// @flow

import Joi from 'joi';
import chalk from 'chalk';
import { findEnvValue } from './util';
import { JOI_CONFIG } from './index';

export default class configFinderEnv {

  find({ schemaPart, key }) {
    const envValue = findEnvValue(key);
    if (envValue === void 0) {
      return void 0;
    }

    const configValueValidationResults = Joi.validate(envValue, schemaPart, JOI_CONFIG);
    if (configValueValidationResults.error != null) {
      console.warn(`${chalk.yellow('!')} [Config] Found ENV value for key ${chalk.magenta(key.join('.'))} in ENV but it is not valid (${chalk.cyan(JSON.stringify(envValue))})`);
      console.warn(chalk.yellow('>> ') + configValueValidationResults.error.details[0].message);

      return void 0;
    }

    return envValue;
  }
}
