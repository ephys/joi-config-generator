import ObjectBuilder from './ObjectBuilder';
import Symbols from './Symbols';
import io from '../io';

export default class ConfigBuilder extends ObjectBuilder {

  /**
   * @param {!String} filePath
   */
  constructor(filePath) {
    super(`<${filePath}>`);

    this._filePath = filePath;
  }

  async then(callback) {
    const config = await io.readConfig(this._filePath);

    const newConfig = await this[Symbols.build](config);

    io.writeConfig(this._filePath, newConfig);

    return callback(newConfig);
  }
}
