import type { Validator } from '../types';
import InvalidData from '../InvalidData';
import { fieldName, parent, queryField } from '../index';
import optionalValidator, { type OptionalArgs } from './optionalValidator';

export default function structValidator(validators: { [key: string]: Validator },
  options: ?OptionalArgs = {}): Validator {

  if (!validators || typeof validators !== 'object') {
    throw new TypeError('missing struct component validators');
  }

  const validatorKeys = Object.getOwnPropertyNames(validators);
  Object.freeze(validatorKeys);

  function validateStruct(item, metadata) {
    if (typeof item !== 'object') {
      throw new InvalidData('Not an object');
    }

    for (const key of validatorKeys) {
      const validator = validators[key];
      item[key] = executeValidator(validator, key, item[key], metadata, validateStruct);
    }

    const itemKeys = Object.getOwnPropertyNames(item).filter(key => !validators[key]);
    if (itemKeys.length > 0) {
      throw new InvalidData(`Extraneous properties: ${itemKeys.map(JSON.stringify).join(', ')}`);
    }

    return item;
  }

  let _refetcher;
  Object.defineProperty(validateStruct, queryField, {
    get() {
      return _refetcher;
    },
    set(refetcher) {
      _refetcher = refetcher;
      for (const validatorKey of validatorKeys) {
        validators[validatorKey][queryField] = refetcher;
      }

      if (refetcher !== null) {
        options.defaultValue = function createEmptyObject() {
          return {};
        };
      }
    },
  });

  for (const validatorKey of validatorKeys) {
    const validator = validators[validatorKey];
    validator[parent] = validateStruct;
    validator[fieldName] = validatorKey;
  }

  return optionalValidator(validateStruct, options);
}

function executeValidator(validator, key, value, metadata, validateStruct) {
  try {
    return validator(value, metadata);
  } catch (e) {
    if (!(e instanceof InvalidData)) {
      throw e;
    }

    if (!e.key) {
      e.key = key;
    }

    if (validateStruct[queryField]) {
      const newValue = validateStruct[queryField](value, e, validator);
      return executeValidator(validator, key, newValue, metadata, validateStruct);
    }

    e.reason = `Invalid property ${JSON.stringify(key)} (val: ${JSON.stringify(value)}): ${e.reason}`;

    throw e;
  }
}
