import PrimitiveBuilder from './abstract/PrimitiveBuilder';
import TypeValidators from '../validators/TypeValidators';

export default class BooleanBuilder extends PrimitiveBuilder {

  constructor(name, parent) {
    super(name, parent);

    this.validator(TypeValidators.boolean);
  }
}
