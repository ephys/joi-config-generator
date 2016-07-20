import PrimitiveBuilder from './PrimitiveBuilder';
import TypeValidators from '../validators/TypeValidators';

export default class BooleanBuilder extends PrimitiveBuilder {

  constructor(name, parent) {
    super(name, parent);

    this.addValidator(TypeValidators.boolean);
  }
}
