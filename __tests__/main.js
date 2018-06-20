// @flow

import path from 'path';
import Joi from 'joi';
import buildConfig from '../src';

const dialects = ['mariadb', 'mysql', 'postgres', 'sqlite', 'mssql'];

const schema = Joi.object().keys({
  api: Joi.object().keys({
    jwtSecret: Joi.string()
      .trim()
      .min(10)
      .description('Secret to use to sign Json Web Tokens'),
    port: Joi.number().port().description('Port to use for the HTTP server'),
  }),
  hashRounds: Joi.number()
    .integer()
    .default(8)
    .description('Please read the doc on rounds: https://www.npmjs.com/package/bcrypt'),
  logDirectory: Joi.string().trim().default(path.resolve(`${__dirname}/../../.app`)),
  database: Joi.object().keys({
    database: Joi.string().trim().default('dbname'),
    username: Joi.string().trim(),
    password: Joi.string().default(''),
    options: Joi.object().keys({
      dialect: Joi.string()
        .trim()
        .valid(dialects)
        .default('postgres'),
      host: Joi.string().trim().default('localhost'),
      port: Joi.number().port().default(5432),
    }),
  }),
});

describe('json-config-generator', () => {
  test('main', async () => {
    const result = await buildConfig({
      // file: `${__dirname}/../app/config.json`,
      file: `${__dirname}/.env`,
      schema,
      format: 'env',
    });

    console.log(result);
  });
});
