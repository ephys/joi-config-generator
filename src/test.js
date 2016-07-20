import buildConfig, { validator } from './index';

buildConfig('config.dev.json')
  .addObject('database')
    .addString('username').minLength(1).maxLength(100).defaultValue('John')
    .addNumber('port').integer().min(1000).max(25565)
    .addString('ip').addValidator([validator.string.ip, validator.string.url])
    .done()
  .addBoolean('env').defaultValue(true)//.nonRequired()
  // .addArray('authors').ofString().addItemValidator(validator.string.email)

  .then(configObject => console.log('Done', configObject))
  .catch(e => console.error(e));
