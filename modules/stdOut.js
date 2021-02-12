const { outputMessage } = require('../assets/outputMessage');

let {
  error,
  start,
  invalidMove1,
  invalidMove2,
  debug,
  dead,
  gameScreen,
} = outputMessage;
module.exports.stdOut = handleOutput = (message, detail) => {
  let output;
  let printMessage = {
    fromObject: `${detail}`.green,
    invalidMove3: `${detail}\n`,
    error: error.red,
    start: start.green,
    invalidMove1: invalidMove1.green,
    invalidMove2: invalidMove2.green,
    moveHere: detail,
    debug: debug.red,
  };
  //This is the debug information that can be toggled on/off.
  output = printMessage[message] + '\n' + '\n';
  if (gameState.time > 0) {
    console.log(gameScreen.green);
  }
  process.stdout.write(output);
};
