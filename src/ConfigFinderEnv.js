// @flow

import chalk from 'chalk';
import { pathToEnvName } from './util';
import { JOI_CONFIG } from '.';

export type CfEnvOptions = {
  aliasEnvValues?: boolean,
};

export default class configFinderEnv {

  constructor(options: CfEnvOptions = {}, debug: boolean) {
    this._options = options;
    this._debug = debug;
  }

  getInstructionsForField(key) {
    const name = pathToEnvName(key);

    return `Provide (or verify) the environment variable named ${chalk.magenta(name)}`;
  }

  find({ schemaPart, key }) {
    const envKey = pathToEnvName(key);
    let envValue = process.env[envKey];

    if (envValue === void 0) {
      return void 0;
    }

    // Maybe provide a way to escape $ ?
    if (this._options.aliasEnvValues) {
      // remove escape characters at very beginning of string.
      // Should we do it for the rest of the string too? I vote not as the character
      // only has special meaning at the beginning of the string.
      if (envValue.startsWith('\\\\') || envValue.startsWith('\\$')) {
        envValue = envValue.substr(1);
      } else if (envValue.charAt(0) === '$') {
        const aliasedEnvKey = envValue.substr(1);
        if (this._debug) {
          console.debug(`[Config] Environment key ${chalk.magenta(envKey)} (= ${chalk.green(envValue)}) starts with a $ and has been aliased to the environment variable ${chalk.magenta(aliasedEnvKey)}. Escape your dollar sign with \\ to prevent aliasing.`);
        }

        envValue = process.env[aliasedEnvKey];
      }
    }

    const configValueValidationResults = schemaPart.validate(envValue, JOI_CONFIG);
    if (configValueValidationResults.error != null) {
      console.warn(`${chalk.yellow('!')} [Config] Found ENV value for key ${chalk.magenta(key.join('.'))} in ENV but it is not valid (${chalk.cyan(JSON.stringify(envValue))})`);
      console.warn(chalk.yellow('>> ') + configValueValidationResults.error.details[0].message);

      return void 0;
    }

    return envValue;
  }
}
