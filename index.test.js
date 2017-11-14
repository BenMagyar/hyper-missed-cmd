const missedCommand = require('hyper-missed-cmd');

function createInvalidCommand(attemptedCommand) {
  return {
    type: 'SESSION_ADD_DATA',
    data: `${attemptedCommand}: command not found`,
  }
}

describe('hyper-missed-cmd', () => {

  it('should be able to detect a string command', () => {
    const wasMissed = missedCommand('invalid');
    expect(wasMissed(createInvalidCommand('invalid'))).toEqual(true);
  });

  it('should be able to detect a string regex command', () => {
    const wasMissed = missedCommand('invalid[d]?');
    expect(wasMissed(createInvalidCommand('invalid'))).toEqual(true);
    expect(wasMissed(createInvalidCommand('invalidd'))).toEqual(true);
  });

  it('should be able to detect a regex command', () => {
    const wasMissed = missedCommand(/invalid[d]?/);
    expect(wasMissed(createInvalidCommand('invalid'))).toEqual(true);
    expect(wasMissed(createInvalidCommand('invalidd'))).toEqual(true);
  });

});
