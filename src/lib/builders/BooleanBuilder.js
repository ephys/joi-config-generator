import PrimitiveBuilder from './PrimitiveBuilder';
import Symbols from './Symbols';

export default class BooleanBuilder extends PrimitiveBuilder {

  [Symbols.validate](value) {
    return typeof value === 'boolean' && super[Symbols.validate](value);
  }
}
