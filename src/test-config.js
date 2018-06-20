// @flow

import path from 'path';
import Joi from 'joi';
import buildConfig from '../';

const schema = Joi.object().keys({
  NODE_ENV: Joi.string().valid(['production', 'development']).description('Is this a production or development environment?'),
  api: Joi.object().keys({
    port: Joi.number().port().description('Port to use for the HTTP server'),
    hashRounds: Joi.number()
      .integer()
      .default(8)
      .description('Please read the doc on rounds: https://www.npmjs.com/package/bcrypt'),
  }),
  logDirectory: Joi.string().trim().default(path.resolve(`${__dirname}/../../.app`)),
  database: Joi.object().keys({
    database: Joi.string().trim().default('dbname'),
    username: Joi.string().trim(),
    password: Joi.string().allow('').default(''),
    options: Joi.object().keys({
      dialect: Joi.string()
        .trim()
        .valid(['mariadb', 'mysql', 'postgres', 'sqlite', 'mssql'])
        .default('postgres'),
      host: Joi.string().trim().default('localhost'),
      port: Joi.number().port().default(5432),
    }),
  }),
});

buildConfig({
  schema,

  allowEnv: true,
  allowFile: true,
  allowPrompt: true,
  file: {
    path: `${__dirname}/.env`,
    format: 'env',
  },
}).then(result => {
  console.log(result);
});
