
const validators = {

  email(string) {
    // TODO check if is email
    return true;
  },

  url(string) {
    // TODO check if url
    return true;
  },

  alphanum(string) {
    // TODO check if alphanum
    return true;
  },

  urlfriendly(string) {
    // TODO check if alphanum, _ or -
    return true;
  },

  ip(string) {
    return true;
  }
};

validators.alphanum.description = 'Alphanumeric only';
validators.urlfriendly.description = 'URL Friendly characters only';

export default validators;
