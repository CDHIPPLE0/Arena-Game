//This function is called whenever a process ends and informs the player of their surroundings, errors etc.
const outputMessage = require('../assets/messages');
const {
  error,
  start,
  invalidMove1,
  invalidMove2,
  debug,
} = outputMessage.outputMessage;

exports.stdOut = handleOutput = (message, detail) => {
  let output;
  //these messages below are derived from the imported messages module.
  let outputMessage = {
    fromObject: `${detail}`.green,
    invalidMove3: `${detail}\n`,
    error: error.red,
    start: start.green,
    invalidMove1: invalidMove1.green,
    invalidMove2: invalidMove2.green,
    moveHere: detail,
    debug: debug.red,
  };
  output = outputMessage[message] + '\n';
  process.stdout.write(output);
};
