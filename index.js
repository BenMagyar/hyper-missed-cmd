/**
 * User-input action type
 */
const SESSION_ADD_DATA = 'SESSION_ADD_DATA';

/**
 * Creates a regular expression from the command expression of all possible
 * unknown command responses.
 *
 * @param  {(string|RegExp)} command Command pattern
 * @return {RegExp}                  Regular expression of unknown command
 *                                   responses
 */
function createCommandPattern(command) {
  const source = (command instanceof RegExp)
    ? command.source
    : command;
  const patterns = [
    `${source}: command not found`,
    `command not found: ${source}`,
    `Unknown command '${source}'`,
    `'${source}' is not recognized.*`,
  ];
  return new RegExp(`^(${patterns.join(')|(')})`);
}

/**
 * Creates a function to detect if the command pattern provided is used and
 * no suitable script/program is found.
 *
 * @param  {(string|RegExp)} command Command pattern
 * @return {function}                Function to detect if a command was used
 */
function detector(command) {
  const commandPattern = createCommandPattern(command);
  /**
   * Detects if an action matches a pattern
   *
   * @param  {object} action Hyper redux action
   * @return {bool}        If the command pattern is matched true; otherwise,
   *                       false
   */
  return function detect(action) {
    if (action.type === SESSION_ADD_DATA) {
      return commandPattern.test(action.data);
    }
    return false;
  }
}

module.exports = detector;
