import path from 'path';
import { structValidator as struct, numberValidator as number, stringValidator as string, enumValidator as Enum } from '../src/validators';
import buildConfig, { description } from '../src';

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
      [description]: 'Port to use for the HTTP server'
    }),
  }),
  hashRounds: number({
    integer: true,
    defaultValue: 8,
    [description]: 'Please read the doc on rounds: https://www.npmjs.com/package/bcrypt',
  }),
  logDirectory: string({ defaultValue: path.resolve(`${__dirname}/../../.app`) }),
  database: struct({
    database: string({ defaultValue: 'dbname' }),
    username: string(),
    password: string({ trim: false, defaultValue: '' }),
    options: struct({
      dialect: Enum(dialects, { defaultValue: 'postgres' }),
      host: string({ defaultValue: 'localhost '}),
      port: port({ defaultValue: 5432 }),
    }),
  }),
});

describe('json-config-generator', () => {
  test('main', async () => {
    const result = await buildConfig({
      file: `${__dirname}/../app/config.json`,
      schema,
    });

    console.log(result);
  });
});
