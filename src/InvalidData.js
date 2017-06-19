export default class InvalidData {
  key: ?string;
  reason: string;

  constructor(reason, key) {
    this.reason = reason;
    this.key = key;
  }

  toString() {
    return `${this.key}: ${this.reason}`;
  }
}
