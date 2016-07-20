import PrimitiveBuilder from './PrimitiveBuilder';
import Symbols from './Symbols';

export default class BooleanBuilder extends PrimitiveBuilder {

  [Symbols.validate](value) {
    const sup = super[Symbols.validate](value);
    if (sup !== true) {
      return sup;
    }

    if (value === null) {
      return true;
    }

    if (typeof value !== 'boolean') {
      return 'Not a boolean. (true/false)';
    }

    return true;
  }
}
