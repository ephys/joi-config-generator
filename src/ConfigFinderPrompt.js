// @flow

import Joi from 'joi';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { setValue } from './util';
import { JOI_CONFIG } from './index';

export default class configFinderPrompt {

  constructor(config) {
    this._config = config;
  }

  async find({ schemaPart, key }) {

    const description = schemaPart._description || '';
    const propertyName = key.join('.');
    const defaultValue = schemaPart._flags.default;
    const validValues = schemaPart._valids.values();
    const allowOnly = schemaPart._flags.allowOnly || false;

    let question = `[Config] ${chalk.magenta(propertyName)}`;
    if (description) {
      question += ` (${description})`;
    }

    const { promptResults } = await inquirer.prompt([{
      type: allowOnly ? 'list' : 'input',
      name: 'promptResults',
      message: question,
      default: defaultValue,
      choices: validValues,

      validate(input) {
        const subValidationResults = Joi.validate(input, schemaPart, JOI_CONFIG);

        if (!subValidationResults.error) {
          return true;
        }

        return subValidationResults.error.details[0].message;
      },
    }]);

    if (this._config.inputtedValues) {
      // only persist values that were inputted by the user along with those that existed before.
      setValue(this._config.inputtedValues, key, promptResults);
    }

    return promptResults;
  }
}
