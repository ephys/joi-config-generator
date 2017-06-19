// @flow

import InvalidData from '../InvalidData';
import type { Validator } from '../types';
import optionalValidator from './optionalValidator';
import type { OptionalArgs } from './optionalValidator';

type TrimFunction = (string) => string;

type TrimType = boolean | TrimFunction | 'start' | 'end' | 'both';

type StringValidatorArgs = {
  trim?: TrimType,
  minLength?: number,
  maxLength?: number,
  ...OptionalArgs,
};

const defaultStringValidatorArgs: StringValidatorArgs = {};
Object.freeze(defaultStringValidatorArgs);

export default function stringValidator(options: StringValidatorArgs = defaultStringValidatorArgs): Validator {

  const {
    trim = true,
    minLength = 0,
    maxLength = Number.POSITIVE_INFINITY,
  } = options;

  // $FlowFixMe
  const trimmer: ?TrimFunction = trim ? getTrimmer(trim) : null;

  function validateString(item: string) {
    if (typeof item !== 'string') {
      throw new InvalidData('Not a string');
    }

    if (trimmer) {
      item = trimmer(item);
    }

    // $FlowFixMe
    if (minLength && item.length < minLength) {
      // $FlowFixMe
      throw new InvalidData(`Too small (min ${minLength} characters)`);
    }

    // $FlowFixMe
    if (maxLength && item.length > maxLength) {
      // $FlowFixMe
      throw new InvalidData(`Too large (max ${maxLength} characters)`);
    }

    return item;
  }

  return optionalValidator(validateString, options);
}

const trimmers = {
  both: nativeTrim,
  start: nativeTrimStart,
  end: nativeTrimEnd,
};

function getTrimmer(trim: TrimType): ?TrimFunction {
  const type = typeof trim;
  if (type === 'function') {
    // $FlowFixMe
    return trim;
  }

  if (trim === true) {
    return nativeTrim;
  }

  if (type === 'string') {
    // $FlowFixMe
    return trimmers[trim];
  }

  return null;
}

function nativeTrim(str) {
  return str.trim();
}

// $FlowFixMe
const trimStart: Function = String.prototype.trimStart || String.prototype.trimLeft;
function nativeTrimStart(str: string): string {
  return trimStart.call(str);
}

// $FlowFixMe
const trimEnd: Function = String.prototype.trimEnd || String.prototype.trimRight;
function nativeTrimEnd(str: string): string {
  return trimEnd.call(str);
}
