// @flow

import InvalidData from '../InvalidData';
import type { Validator } from '../types';
import optionalValidator, { type OptionalArgs } from './optionalValidator';

export default function booleanValidator(config: ?OptionalArgs): Validator {

  if (config) {
    return optionalValidator(validateBoolean, config);
  }

  return validateBoolean;
}

function validateBoolean(item) {
  if (typeof item === 'boolean') {
    return item;
  }

  if (typeof item === 'string') {
    if (item === 'true' || item === 't') {
      return true;
    }

    if (item === 'false' || item === 'f') {
      return false;
    }
  }

  throw new InvalidData('Not a boolean (true/false).');
}
