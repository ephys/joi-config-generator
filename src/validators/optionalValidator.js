// @flow

import type { Validator } from '../types';
import InvalidData from '../InvalidData';
import { fieldName, queryField } from '../index';

export type OptionalArgs = {
  allowNull?: boolean,
  defaultValue?: any,
  threatAsVoid?: boolean,
};

const defaultOptionalArgs: OptionalArgs = {
  allowNull: false,
  defaultValue: void 0,
  threatAsVoid: false,
};

Object.freeze(defaultOptionalArgs);

export default function optionalValidator(
  validator: Validator,
  options: ?OptionalArgs = defaultOptionalArgs
): Validator {

  const newValidator = function validateOptional(item, metadata) {
    if (item === null) {
      if (options.allowNull) {
        return null;
      }

      throw new InvalidData('Cannot be null');
    }

    if (
      item === void 0
      || (options.threatAsVoid && options.threatAsVoid === item)
      || (Array.isArray(options.threatAsVoid) && options.threatAsVoid.includes(item))
    ) {
      if (options.defaultValue === void 0) {
        throw new InvalidData('Missing value');
      }

      if (typeof options.defaultValue === 'function') {
        item = options.defaultValue();
      } else {
        item = options.defaultValue;
      }
    }

    return validator(item, metadata);
  };

  Object.defineProperty(newValidator, queryField, {
    set(refetcher) {
      validator[queryField] = refetcher;
    },
    get() {
      return validator[queryField];
    },
  });

  Object.defineProperty(newValidator, fieldName, {
    configurable: true,
    set(name) {
      validator[fieldName] = name;
    },
    get() {
      return validator[fieldName];
    },
  });

  return newValidator;
}

