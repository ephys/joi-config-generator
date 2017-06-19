// @flow

import type { Validator } from '../types';
import InvalidData from '../InvalidData';
import optionalValidator, { type OptionalArgs } from './optionalValidator';

type NumberValidatorArgs = {
  unsigned?: boolean,
  integer?: boolean,
  allowInfinite?: boolean,
  min?: number,
  max?: number,
  ...OptionalArgs,
};

const defaultNumberValidatorArgs: NumberValidatorArgs = {};
Object.freeze(defaultNumberValidatorArgs);

export default function numberValidator(options: NumberValidatorArgs = defaultNumberValidatorArgs): Validator {

  const {
    unsigned = false,
    integer = false,
    allowInfinite = false,
    min = Number.NEGATIVE_INFINITY,
    max = Number.POSITIVE_INFINITY,
  } = options;

  function validateNumber(item) {
    const type = typeof item;
    if (type !== 'string' && type !== 'number') {
      throw new InvalidData('Not a valid number format');
    }

    item = Number(item);
    if (Number.isNaN(item)) {
      throw new InvalidData('Not a valid number format');
    }

    if (unsigned && item < 0) {
      throw new InvalidData('Must be unsigned');
    }

    if (!Number.isFinite(item)) {
      if (allowInfinite) {
        return item;
      }

      throw new InvalidData('Must be a finite number');
    }

    if (integer && !Number.isSafeInteger(item)) {
      throw new InvalidData('Must be a representable integer');
    }

    // $FlowFixMe flow's stupid
    if (item < min) {
      // $FlowFixMe
      throw new InvalidData(`Below the minimum value of ${min}`);
    }

    // $FlowFixMe
    if (item > max) {
      // $FlowFixMe
      throw new InvalidData(`Above the maximum value of ${max}`);
    }

    return item;
  }

  return optionalValidator(validateNumber, options);
}
