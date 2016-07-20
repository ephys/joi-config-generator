'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _index2.default)('test/array.json').addArray('array_test').ofStrings().minItems(5).maxItems(10).addItemValidator(_index.validator.string.url).then(function (configObject) {
  return console.log('Config contents: ', configObject);
}).catch(function (e) {
  return console.error(e);
});

// buildConfig('test/database.json')
//   .addObject('database')
//     .addString('username').minLength(1).maxLength(100).defaultValue('John').description('The username used to connect to the database')
//     .addNumber('port').integer().min(1000).max(25565).description('The port of the database').nullable()
//     .addString('ip').addValidator([validator.string.ip, validator.string.url]).description('The IP or URL of the database')
//   .endObject()
//   .addBoolean('isDev').defaultValue(true)
//   .addString('owner').defaultValue('Ephys')
//
//   .then(configObject => console.log('Config contents: ', configObject))
//   .catch(e => console.error(e));

// Alternative system
// buildConfig('config.dev.json')
//   .addObject('database')
//     .addString('username', {
//       minLength: 1,
//       maxLength: 100,
//       defaultValue: 'John',
//       description: 'The username used to connect to the database'
//     })
//     .addNumber('port', {
//       integer: true,
//       nullable: true,
//       min: 1000,
//       max: 25565,
//       description: 'The port of the database'
//     })
//     .addString('ip', {
//       validator: [validator.string.ip, validator.string.url],
//       description: 'The IP or URL of the database'
//     })
//   .endObject()
//   .addBoolean('isDev', { defaultValue: true })
//   .addString('author', { defaultValue: 'Ephys' })
//
//   .then(configObject => console.log('Config contents: ', configObject))
//   .catch(e => console.error(e));