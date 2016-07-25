
export default {
  or(...decorators) {
    return function (input) {
      for (const decorator of decorators) {
        if (decorator(input)) {
          return true;
        }
      }

      return false;
    };
  }
};
