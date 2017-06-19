// @flow

import readLineSync from 'readline-sync';
import chalk from 'chalk';
import constantCase from 'constant-case';
import { readJsonFile, writeJsonFile } from './fs';

export type Options = {
  file?: string,
  useEnv?: boolean,
  envPrefix?: string,
  schema: Function,
};

/**
 * Builds a JSON configuration file and returns it.
 */
export default async function buildConfig(opts: Options) {
  const config = opts.file ? await readJsonFile(opts.file) : {};
  const schema = opts.schema; // .name === 'structValidator' ? opts.schema : structValidator({ item: opts.schema });

  schema[fieldName] = '$';

  schema[queryField] = makeQuerier(opts);

  const newConfig = schema(config);

  if (opts.file) {
    await writeJsonFile(opts.file, newConfig);
  }

  return newConfig;
}

function makeQuerier(opts: Options) {
  if (opts.useEnv === true) {
    const envPrefix = opts.envPrefix || 'CFG_';
    return function onMissingEnv(currentValue, error, validator) {
      const name = getName(validator) || error.key;
      const key = envPrefix + constantCase(name);

      const newValue = getEnv(key);

      if (currentValue === newValue) {
        throw new Error(`Env variable "${key}" is invalid: ${error.reason}`);
      } else {
        return newValue;
      }
    };
  } else {
    return queryCli;
  }
}

function getEnv(key) {
  const value = process.env[key];

  // value redirection
  // this way, a key like APP_API_PORT with a value of $PORT uses the PORT env variable
  // (use "$PORT" if you wish to use the raw value.)
  if (typeof value === 'string' && value.charAt(0) === '$') {
    return getEnv(value.substr(1));
  }

  return JSON.parse(value);
}

function getName(validator) {

  if (validator[parent]) {
    return `${getName(validator[parent])}.${validator[fieldName]}`;
  }

  return validator[fieldName];
}

function queryCli(currentValue, error, validator) {
  let newValue = readLineSync.question(`Entry ${chalk.blue(error.key)} (${chalk.magenta(JSON.stringify(currentValue))}) is invalid: ${chalk.blue(error.reason)}. Please enter a new value:\n`);

  try {
    newValue = JSON.parse(newValue);
  } catch (ignored) {} // eslint-disable-line no-empty

  return newValue;
}

export const description = Symbol('field-description');
export const queryField = Symbol('querier');
export const parent = Symbol('parent');
export const fieldName = Symbol('field-name');

