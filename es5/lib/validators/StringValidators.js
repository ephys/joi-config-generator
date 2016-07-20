'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var validators = {
  email: function email(string) {
    // TODO check if is email
    return true;
  },
  url: function url(string) {
    // TODO check if url
    return true;
  },
  alphanum: function alphanum(string) {
    // TODO check if alphanum
    return true;
  },
  urlfriendly: function urlfriendly(string) {
    // TODO check if alphanum, _ or -
    return true;
  },
  ip: function ip(string) {
    return true;
  }
};

validators.alphanum.description = 'Alphanumeric only';
validators.urlfriendly.description = 'URL Friendly characters only';

exports.default = validators;