import path from 'path';
import {
  structValidator as struct,
  numberValidator as number,
  stringValidator as string,
  enumValidator as Enum,
} from './validators';
import buildConfig, { description } from '.';

const dialects = ['mariadb', 'mysql', 'postgres', 'sqlite', 'mssql'];

function port(opts) {
  return number({
    integer: true,
    min: 1024,
    max: 65535,
    ...opts,
  });
}

const schema = struct({
  api: struct({
    jwtSecret: string({
      minLength: 10,
      [description]: 'Secret to use to sign Json Web Tokens',
    }),
    port: port({
      defaultValue: 8080,
      [description]: 'Port to use for the HTTP server',
    }),
  }),
  hashRounds: number({
    integer: true,
    defaultValue: 8,
    [description]: 'Please read the doc on rounds: https://www.npmjs.com/package/bcrypt',
  }),
  logDirectory: string({
    defaultValue: path.resolve(`${__dirname}/../../.app`),
    allowNull: true,
  }),
  database: struct({
    database: string({ defaultValue: 'dbname' }),
    username: string(),
    password: string({ trim: false, defaultValue: '' }),
    options: struct({
      dialect: Enum(dialects, { defaultValue: 'postgres' }),
      host: string({ defaultValue: 'localhost ' }),
      port: port({ defaultValue: 5432 }),
    }),
  }),
});

Object.assign(process.env, {
  APP_API_JWT_SECRET: '12345678910',
  APP_API_PORT: 8080,
  APP_HASH_ROUNDS: 8,
  APP_LOG_DIRECTORY: null,
  APP_DATABASE_DATABASE: 'the_db',
  APP_DATABASE_USERNAME: 'ephys',
  APP_DATABASE_OPTIONS_DIALECT: 'postgres',
  APP_DATABASE_OPTIONS_HOST: 'test.net',
  APP_DATABASE_OPTIONS_PORT: 5432,
});

buildConfig({
  // file: `${__dirname}/../app/config.json`,
  useEnv: true,
  envPrefix: 'APP_',
  schema,
}).then(console.log.bind(console));

