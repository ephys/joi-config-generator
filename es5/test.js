'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filename = 'mmc/config/config_' + (process.env.NODE_ENV || 'production') + '.json';

var configBuilder = (0, _index2.default)(filename).addBoolean('debug').nullable().defaultValue(null).addString('JWT_SECRET').addObject('database').addString('database').addString('username').addString('password').addObject('options').addString('dialect').addString('host').end().end();

configBuilder.then(function (newConfig) {
  console.log(newConfig);
}).catch(function (e) {
  console.log(e);
});

// buildConfig('test/array.json')
//   .addObject('database')
//     .addArray('roles', {
//       minItems: 2,
//       maxItems: 10
//     })
//       .addString()
//       .addObject()
//         .addBoolean('test')
//       .end()
//     .end()
//   .end()
//
//   .then(configObject => console.log('Config contents: ', configObject))
//   .catch(e => console.error(e));

// buildConfig('test/database.json')
//   .addObject('database')
//     .addString('username').minLength(1).maxLength(100).defaultValue('John').description('The username used to connect to the database')
//     .addNumber('port').integer().min(1000).max(25565).description('The port of the database').nullable()
//     .addString('ip').validator([validator.string.ip, validator.string.url]).description('The IP or URL of the database')
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
//       validator: validator.decorators.or(validator.string.ip, validator.string.url),
//       description: 'The IP or URL of the database'
//     })
//   .endObject()
//   .addBoolean('isDev', { defaultValue: true })
//   .addString('author', { defaultValue: 'Ephys' })
//
//   .then(configObject => console.log('Config contents: ', configObject))
//   .catch(e => console.error(e));