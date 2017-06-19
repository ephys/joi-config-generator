import path from 'path';
import nativeFs from 'fs';
import fs from 'mz/fs';

export function stat(filePath) {
  return new Promise((resolve, reject) => {
    nativeFs.stat(filePath, (err, response) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return resolve(null);
        }

        return reject(err);
      }

      return resolve(response);
    });
  });
}

export async function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);

  if (dirname === '.') {
    return true;
  }

  if (await directoryExists(dirname)) {
    return true;
  }

  await ensureDirectoryExistence(dirname);
  await fs.mkdir(dirname);

  return true;
}

export async function directoryExists(dirPath) {
  const dirStat = await stat(dirPath);
  if (dirStat === null) {
    return false;
  }

  if (!dirStat.isDirectory()) {
    throw new Error(`Resource "${dirPath}" exists but is not a directory.`);
  }

  return true;
}

export async function fileExists(filePath) {
  const fileStat = await stat(filePath);
  if (fileStat === null) {
    return false;
  }

  if (!fileStat.isFile()) {
    throw new Error(`Resource "${filePath}" exists but is not a file.`);
  }

  return true;
}

export async function readJsonFile(filePath) {
  if (!await fileExists(filePath)) {
    return {};
  }

  const contents = await fs.readFile(filePath);

  if (contents.length === 0) {
    return {};
  }

  try {
    return JSON.parse(contents);
  } catch (e) {
    throw new Error(`File "${filePath}" already has content, which is not JSON.`);
  }
}

export async function writeJsonFile(filepath, config) {
  if (!await fileExists(filepath)) {
    await ensureDirectoryExistence(filepath);
  }

  return fs.writeFile(filepath, JSON.stringify(config, null, 2));
}
