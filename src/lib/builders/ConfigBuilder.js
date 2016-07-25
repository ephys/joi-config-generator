import ObjectBuilder from './ObjectBuilder';
import ArrayBuilder from './ArrayBuilder';
import StringBuilder from './StringBuilder';
import BooleanBuilder from './BooleanBuilder';
import NumberBuilder from './NumberBuilder';
import ComplexBuilder from './abstract/ComplexBuilder';
import Symbols from './Symbols';
import io from '../io/io';

/**
 * @class ConfigBuilder
 * @extends ObjectBuilder
 */
export default class ConfigBuilder extends ObjectBuilder {

  /**
   * @param {!String} filePath
   */
  constructor(filePath) {
    super();

    this._filePath = filePath;
  }

  async then(callback) {
    console.log('Checking config setup.');

    const config = await io.readConfig(this._filePath);

    const newConfig = await this[Symbols.build](config, false);

    await io.writeConfig(this._filePath, newConfig);

    return callback(newConfig);
  }
}

// Import post-export, circular dependencies bug

[ObjectBuilder, ArrayBuilder, StringBuilder, NumberBuilder, BooleanBuilder].forEach(Builder => {

  const builderName = Builder.name;
  const type = builderName.substr(0, builderName.length - 'builder'.length);

  Object.defineProperty(ComplexBuilder.prototype, `add${type}`, {
    value: function (name, properties) {
      return this._addProperty(name, properties, Builder);
    }
  });
});

