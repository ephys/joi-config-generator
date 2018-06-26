// @flow

import * as dotenv from 'dotenv-parser-serializer';
import fs from 'mz/fs';
import constantCase from 'constant-case/constant-case';

export async function readConfig({ path, format }) {

  let contents;
  try {
    contents = (await fs.readFile(path)).toString();
  } catch (e) {
    if (e.code === 'ENOENT') {
      return {};
    }

    throw e;
  }

  switch (format) {
    case 'env':
      return dotenv.parse(contents);

    case 'json':
      return JSON.parse(contents);

    default:
      throw new TypeError(`Unknown format ${JSON.stringify(format)}`);
  }
}

export function writeConfig(newConfig, { path, format }) {

  if (format === 'env') {
    const stringified = dotenv.serialize(flattenKeys(newConfig));

    return fs.writeFile(path, stringified);
  }

  if (format === 'json') {
    return fs.writeFile(path, JSON.stringify(newConfig, null, 2));
  }
}

export function flattenKeys(obj, prefix = '') {
  const flatObj = {};

  for (const [key, val] of Object.entries(obj)) {

    if (val == null) {
      continue;
    }

    const upperKey = constantCase(key);

    if (typeof val === 'object') {
      Object.assign(flatObj, flattenKeys(val, `${prefix}${upperKey}_`));
      continue;
    }

    flatObj[prefix + upperKey] = val;
  }

  return flatObj;
}

export function findConfigValue({ config, format, key }) {

  if (format === 'json') {
    return getValue(config, key);
  }

  if (format === 'env') {
    const envKey = pathToEnvName(key);

    if (Object.prototype.hasOwnProperty.call(config, envKey)) {
      return config[envKey];
    }

    return void 0;
  }

  throw new Error(`Unknown file format ${format}`);
}

export function pathToEnvName(path) {
  return path.map(keyPart => constantCase(keyPart)).join('_');
}

export function setValue(obj, path, val) {
  let currentObj = obj;

  for (let i = 0; i < (path.length - 1); i++) {
    const pathPart = path[i];
    if (!Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
      currentObj[pathPart] = {};
    }

    currentObj = currentObj[pathPart];
  }

  currentObj[path[path.length - 1]] = val;
}

export function getValue(obj, path) {

  let currentObj = obj;

  for (let i = 0; i < path.length; i++) {
    const pathPart = path[i];

    if (!Object.prototype.hasOwnProperty.call(currentObj, pathPart)) {
      return void 0;
    }

    currentObj = currentObj[pathPart];
  }

  return currentObj;
}
