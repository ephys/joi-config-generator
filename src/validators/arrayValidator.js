// @flow

import InvalidData from '../InvalidData';
import type { Validator } from '../types';
import optionalValidator, { type OptionalArgs } from './optionalValidator';
import noValidate from './noValidate';

type ArrayValidatorArgs = {
  unique?: boolean,
  min?: number,
  max?: number,
  strict?: boolean,
  ...OptionalArgs,
};

export default function arrayValidator(
  itemValidator_: ?(Validator | ArrayValidatorArgs),
  options_: ?(Validator | ArrayValidatorArgs)
): Validator {

  let itemValidator: Validator;
  let options: ?ArrayValidatorArgs;

  if (typeof itemValidator_ === 'function') {
    itemValidator = itemValidator_;
    options = options_;
  } else {
    itemValidator = options_;
    options = itemValidator_;
  }

  if (!itemValidator) {
    itemValidator = noValidate();
  }

  function validateArray(items, metadata) {

    if (!Array.isArray(items)) {
      if (options && options.strict) {
        throw new InvalidData('not an array');
      }

      items = [items];
    }

    let resultingArray = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item === void 0) {
        continue;
      }

      try {
        resultingArray.push(itemValidator(item, metadata));
      } catch (e) {
        if (!(e instanceof InvalidData)) {
          throw e;
        }

        e.reason = `Invalid value for array entry ${i} (val: ${JSON.stringify(item)}): ${e.reason}`;

        throw e;
      }
    }

    if (options) {
      if (options.unique) {
        resultingArray = resultingArray.filter(onlyUnique);
      }

      // $FlowFixMe
      if (options.min !== void 0 && resultingArray.length < options.min) {
        // $FlowFixMe
        throw new InvalidData(`Too few items (min ${options.min} items)`);
      }

      // $FlowFixMe
      if (options.max !== void 0 && resultingArray.length > options.max) {
        // $FlowFixMe
        throw new InvalidData(`Too many items (max ${options.max} items)`);
      }
    }

    return resultingArray;
  }

  return optionalValidator(validateArray, options);
}

function onlyUnique(value: any, index: number, self: any[]): boolean {
  return self.indexOf(value) === index;
}
