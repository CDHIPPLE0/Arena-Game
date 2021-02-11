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
