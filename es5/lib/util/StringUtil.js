"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  /**
   * Capitalizes the first character.
   *
   * @param {!String} string
   * @returns {!string} The new string.
   */
  capitalizeFirstLetter: function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};