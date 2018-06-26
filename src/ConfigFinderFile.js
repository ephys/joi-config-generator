// @flow

import Joi from 'joi';
import chalk from 'chalk';
import { findConfigValue, pathToEnvName, readConfig, writeConfig } from './util';
import { JOI_CONFIG } from './index';

export type CfFileOptions = {
  /** The type of configuration file, "env" or "json" */
  format?: string,

  /** The path of the configuration file */
  path?: string,
};

export default class ConfigFinderFile {

  constructor(options: CfFileOptions) {

    const format = options.format || 'env';
    this._options = {
      format,
      path: options.path || (format === 'env' ? `${process.cwd()}/.env` : `${process.cwd()}/.config.json`),
    };

    this.inputtedValues = {};
  }

  async init() {
    this._config = await readConfig(this._options);
  }

  getInstructionsForField(key) {
    const stringifiedKey = this._options.format === 'env' ? pathToEnvName(key) : key.join('.');

    return `Add the key ${chalk.magenta(stringifiedKey)} to your configuration file ${chalk.blue(this._options.path)} and verify its value.`;
  }

  find({ schemaPart, key }) {
    const configValue = findConfigValue({
      format: this._options.format,
      config: this._config,
      key,
    });

    if (configValue === void 0) {
      return void 0;
    }

    const configValueValidationResults = Joi.validate(configValue, schemaPart, JOI_CONFIG);
    if (configValueValidationResults.error != null) {
      console.warn(`${chalk.yellow('!')} [Config] Found value for key ${chalk.magenta(key.join('.'))} in Config File but it is not valid (${chalk.cyan(JSON.stringify(configValue))})`);
      console.warn(chalk.yellow('>> ') + configValueValidationResults.error.details[0].message);

      return void 0;
    }

    return configValue;
  }

  async finalize() {

    await writeConfig({
      ...this.inputtedValues,
      ...this._config,
    }, this._options);
  }
}
