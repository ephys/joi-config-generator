// @flow

import type { Validator } from '../types';

function noop(arg: any): any {
  return arg;
}

export default function noValidate(): Validator {
  return noop;
}
