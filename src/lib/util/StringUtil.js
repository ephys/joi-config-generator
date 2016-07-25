
export default  {

  /**
   * Capitalizes the first character.
   *
   * @param {!String} string
   * @returns {!string} The new string.
   */
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
