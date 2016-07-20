import buildConfig, { validator } from './index';

buildConfig('config.dev.json')
  .addObject('database')
    .addString('username').minLength(1).maxLength(100).defaultValue('John').description('The username used to connect to the database')
    .addNumber('port').integer().min(1000).max(25565).description('The port of the database').nullable()
    .addString('ip').addValidator([validator.string.ip, validator.string.url]).description('The IP or URL of the database')
    .done()
  .addBoolean('isDev').defaultValue(true)
  // .addArray('authors').ofString().addItemValidator(validator.string.email)

  .then(configObject => {
    console.log('\nDone', configObject);
  })
  .catch(e => console.error(e));
