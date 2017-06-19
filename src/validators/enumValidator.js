// @flow

import InvalidData from '../InvalidData';
import { type Validator } from '../types';
import optionalValidator, { type OptionalArgs } from './optionalValidator';

export default function enumValidator(
  values: (any[] | { [key: string]: any }),
  options: ?OptionalArgs,
): Validator {

  let map = null;
  if (!Array.isArray(values)) {
    map = values;
    values = Object.keys(values);
  }

  function validateEnum(item) {

    if (!values.includes(item)) {
      throw new InvalidData(`Item not in enum [${values.join(', ')}]`);
    }

    if (map) {
      return map[item];
    }

    return item;
  }

  return optionalValidator(validateEnum, options);
}
