'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)('config.dev.json').addObject('database').addString('username').minLength(1).maxLength(100).defaultValue('John').description('The username used to connect to the database').addNumber('port').integer().min(1000).max(25565).description('The port of the database').nullable().addString('ip').addValidator([_index.validator.string.ip, _index.validator.string.url]).description('The IP or URL of the database').done().addBoolean('isDev').defaultValue(true)
// .addArray('authors').ofString().addItemValidator(validator.string.email)

.then(function (configObject) {
  console.log('\nDone', configObject);
}).catch(function (e) {
  return console.error(e);
});