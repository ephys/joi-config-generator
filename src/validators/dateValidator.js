// @flow

import type { Validator } from '../types';
import InvalidData from '../InvalidData';
import optionalValidator, { type OptionalArgs } from './optionalValidator';

export default function dateValidator(config: ?OptionalArgs): Validator {
  if (config) {
    return optionalValidator(validateDate, config);
  }

  return validateDate;
}

function validateDate(item) {
  if (item instanceof Date) {
    return item;
  }

  const timestamp = Date.parse(item);
  if (Number.isNaN(timestamp)) {
    throw new InvalidData('Not a date');
  }

  return new Date(timestamp);
}
