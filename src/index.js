// @flow

import Joi from 'joi';
import fs from 'mz/fs';
import * as dotenv from 'dotenv-parser-serializer';
import inquirer from 'inquirer';
import chalk from 'chalk';
import constantCase from 'constant-case';

export type Options = {
  file?: string,
  format?: string,
  useEnv?: boolean,
  envPrefix?: string,
  schema: Function,
};

/*
TODO write description in .env file

TODO support $FIELDS

TODO config:
- schema
- allowFile: boolean,
- allowEnv: boolean,
- allowPrompt: boolean,
- file: {
    format: json/env
    path
  }
- debug
 */

async function readConfig({ file, format = 'env' }) {

  if (!file) {
    if (format === 'env') {
      file = `${process.cwd()}/.env`;
    } else {
      file = `${process.cwd()}/.config.json`;
    }
  }

  let contents;
  try {
    contents = (await fs.readFile(file)).toString();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return {};
    }

    throw e;
  }

  switch (format) {
    case 'env':
      return dotenv.parse(contents);

    case 'json':
      return JSON.parse(contents);

    default:
      throw new TypeError(`Unknown format ${JSON.stringify(format)}`);
  }
}

function writeConfig(newConfig, existingConfig, { file, format }) {

  if (format === 'env') {
    const mergedConfig = {
      ...existingConfig,
      ...flattenKeys(newConfig),
    };

    const stringified = dotenv.serialize(mergedConfig);

    return fs.writeFile(file, stringified);
  }

  if (format === 'json') {
    return fs.writeFile(file, JSON.stringify({
      ...existingConfig,
      ...newConfig,
    }, null, 2));
  }
}

function flattenKeys(obj, prefix = '') {
  const flatObj = {};

  for (const [key, val] of Object.entries(obj)) {

    if (val == null) {
      continue;
    }

    const upperKey = constantCase(key);

    if (typeof val === 'object') {
      Object.assign(flatObj, flattenKeys(val, `${prefix}${upperKey}_`));
      continue;
    }

    flatObj[prefix + upperKey] = val;
  }

  return flatObj;
}

function findEnvValue(key) {

  const envKey = pathToEnvName(key);

  if (process.env[envKey]) {
    return process.env[envKey];
  }
}

function findConfigValue({ config, format, key }) {

  if (format === 'json') {
    return getValue(config, key);
  }

  if (format === 'env') {
    const envKey = pathToEnvName(key);

    if (Object.prototype.hasOwnProperty.call(config, envKey)) {
      return config[envKey];
    }

    return void 0;
  }

  throw new Error(`Unknown file format ${format}`);
}

function pathToEnvName(path) {
  return path.map(keyPart => constantCase(keyPart)).join('_');
}

const JOI_CONFIG = {
  abortEarly: true,
  convert: true,
  noDefaults: true,
  presence: 'required',
};

/**
 * Builds a JSON configuration file and returns it.
 */
export default async function buildConfig(opts: Options) {
  const rwOptions = { file: opts.file, format: opts.format };
  const config = await readConfig(rwOptions);
  const inputtedValues = {};

  const schema = opts.schema;
  const newConfig = {};

  while (true) {
    const validationResults = Joi.validate(newConfig, schema, JOI_CONFIG);
    if (!validationResults.error) {
      break;
    }

    const error = validationResults.error.details[0];
    const keyPath = error.path;

    const rejectingSchemaPart = getSchemaPart(schema, keyPath);

    // create objects automatically, no need for user input here
    if (rejectingSchemaPart._type === 'object') {
      setValue(newConfig, keyPath, {});
      continue;
    }

    if (rejectingSchemaPart._type === 'array') {
      setValue(newConfig, keyPath, []);
      continue;
    }

    const envValue = findEnvValue(keyPath);
    if (envValue !== void 0) {
      const configValueValidationResults = Joi.validate(envValue, rejectingSchemaPart, JOI_CONFIG);
      if (configValueValidationResults.error == null) {
        setValue(newConfig, keyPath, envValue);
        continue;
      } else {
        console.warn(`${chalk.yellow('!')} [Config] Found ENV value for key ${chalk.magenta(keyPath.join('.'))} in ENV but it is not valid (${chalk.cyan(JSON.stringify(envValue))})`);
        console.warn(chalk.yellow('>> ') + configValueValidationResults.error.details[0].message);
      }
    }

    const configValue = findConfigValue({
      format: opts.format,
      config,
      key: keyPath,
    });

    if (configValue !== void 0) {
      const configValueValidationResults = Joi.validate(configValue, rejectingSchemaPart, JOI_CONFIG);
      if (configValueValidationResults.error == null) {
        setValue(newConfig, keyPath, configValue);
        continue;
      } else {
        console.warn(`${chalk.yellow('!')} [Config] Found value for key ${chalk.magenta(keyPath.join('.'))} in Config File but it is not valid (${chalk.cyan(JSON.stringify(configValue))})`);
        console.warn(chalk.yellow('>> ') + configValueValidationResults.error.details[0].message);
      }
    }

    const description = rejectingSchemaPart._description || '';
    const propertyName = keyPath.join('.');
    const defaultValue = rejectingSchemaPart._flags.default;
    const validValues = rejectingSchemaPart._valids.values();
    const allowOnly = rejectingSchemaPart._flags.allowOnly || false;

    let question = `[Config] ${chalk.magenta(propertyName)}`;
    if (description) {
      question += ` (${description})`;
    }

    // eslint-disable-next-line no-await-in-loop
    const { promptResults } = await inquirer.prompt([{
      type: allowOnly ? 'list' : 'input',
      name: 'promptResults',
      message: question,
      default: defaultValue,
      choices: validValues,

      validate(input) {
        const subValidationResults = Joi.validate(input, rejectingSchemaPart, JOI_CONFIG);

        if (!subValidationResults.error) {
          return true;
        }

        return subValidationResults.error.details[0].message;
      },
    }]);

    // only persist values that were inputted by the user along with those that existed before.
    setValue(inputtedValues, keyPath, promptResults);

    setValue(newConfig, keyPath, promptResults);
  }

  await writeConfig(inputtedValues, config, rwOptions);

  return newConfig;
}

function setValue(obj, path, val) {
  let currentObj = obj;

  for (let i = 0; i < (path.length - 1); i++) {
    const pathPart = path[i];
    if (!Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
      currentObj[pathPart] = {};
    }

    currentObj = currentObj[pathPart];
  }

  currentObj[path[path.length - 1]] = val;
}

function getValue(obj, path) {

  let currentObj = obj;

  for (let i = 0; i < path.length; i++) {
    const pathPart = path[i];

    if (!Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
      return void 0;
    }

    currentObj = currentObj[pathPart];
  }

  return currentObj;
}

function getSchemaPart(schema, path) {
  if (path.length === 0) {
    return schema;
  }

  const children = schema._inner.children;

  for (const child of children) {
    if (child.key === path[0]) {
      const newPath = Array.from(path);
      newPath.shift();

      return getSchemaPart(child.schema, newPath);
    }
  }

  throw new Error('Could not find child matching requested key');
}
