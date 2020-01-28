// @flow

import chalk from 'chalk';
import { setValue } from './util';
import ConfigFinderEnv, { type CfEnvOptions } from './ConfigFinderEnv';
import ConfigFinderFile, { type CfFileOptions } from './ConfigFinderFile';
import ConfigFinderPrompt from './ConfigFinderPrompt';

export type Options = {
  /** A Joi Schema */
  schema: Object,

  debug?: boolean,

  allowFile?: boolean,
  allowEnv?: boolean,
  allowPrompt?: boolean,

  file?: CfFileOptions,
  env?: CfEnvOptions,
};

export const JOI_CONFIG = {
  abortEarly: true,
  convert: true,
  noDefaults: true,
  presence: 'required',
};

/**
 * Generates the app configuration using available configuration files, environment and prompts the user if a value is missing.
 */
export default async function buildConfig(opts: Options) {

  const schema = opts.schema;
  let newConfig = {};

  const configFinders = [];
  if (opts.allowEnv) {
    configFinders.push(new ConfigFinderEnv(opts.env, opts.debug));
  }

  let inputtedValues;
  if (opts.allowFile) {
    const finder = new ConfigFinderFile(opts.file);
    inputtedValues = finder.inputtedValues;

    configFinders.push(finder);
  }

  if (opts.allowPrompt) {
    configFinders.push(new ConfigFinderPrompt({
      inputtedValues,
    }));
  }

  const initPromises = [];
  for (const finder of configFinders) {
    if (finder.init) {
      initPromises.push(finder.init());
    }
  }

  await Promise.all(initPromises);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const validationResults = schema.validate(newConfig, JOI_CONFIG);
    if (!validationResults.error) {
      newConfig = validationResults.value;
      break;
    }

    const error = validationResults.error.details[0];
    const keyPath = error.path;

    const rejectingSchemaPart = getSchemaPart(schema, keyPath);

    const schemaType = rejectingSchemaPart.type;

    // create objects automatically, no need for user input here
    if (schemaType === 'object') {
      setValue(newConfig, keyPath, {});
      continue;
    }

    if (schemaType === 'array') {
      setValue(newConfig, keyPath, []);
      continue;
    }

    let newValue;
    for (const configFinder of configFinders) {
      // eslint-disable-next-line no-await-in-loop
      const value = await configFinder.find({
        key: keyPath,
        schemaPart: rejectingSchemaPart,
      });

      if (value !== void 0) {
        newValue = value;
        break;
      }
    }

    if (newValue === void 0) {
      // try getting the default from the schema
      const defaultResult = rejectingSchemaPart.validate(newValue, { ...JOI_CONFIG, noDefaults: false, presence: 'optional' });
      if (defaultResult.value && !defaultResult.error) {
        newValue = defaultResult.value;
        setValue(inputtedValues, keyPath, newValue);
      }
    }

    if (newValue !== void 0) {
      setValue(newConfig, keyPath, newValue);
    } else {
      const availableOptions = [];

      for (const configFinder of configFinders) {
        availableOptions.push(`-> ${configFinder.getInstructionsForField(keyPath)}`);
      }

      const helpMsg = availableOptions.length > 0
        ? `How to provide this configuration option (select one):\n${availableOptions.join('\n')}`
        : 'All configuration sources have been disabled. Please check your code related to building your configuration.';

      throw new Error(
        `Could not find valid value for configuration option ${chalk.magenta(keyPath.join('.'))}.\n\n${helpMsg}`,
      );
    }
  }

  const finalizePromises = [];
  for (const finder of configFinders) {
    if (finder.finalize) {
      finalizePromises.push(finder.finalize());
    }
  }

  await Promise.all(finalizePromises);

  return newConfig;
}

function getSchemaPart(schema, path) {
  if (path.length === 0) {
    return schema;
  }

  const children = schema._ids._byKey;

  for (const [key, subSchema] of children.entries()) {
    if (key === path[0]) {
      const newPath = Array.from(path);
      newPath.shift();

      return getSchemaPart(subSchema.schema, newPath);
    }
  }

  throw new Error(`Could not find child matching requested key: ${path.join(', ')}`);
}
