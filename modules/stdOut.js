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
  if (gameState.endGame != true) {
    if (gameState.character.alive == true) {
      output = printMessage[message] + '\n';
      if (gameState.time > 0) {
        console.log(gameScreen.green);
      }
      process.stdout.write(output);
    } else {
      endGame = () => {
        process.exit(0);
      };
      setTimeout(endGame, 2000);
    }
  } else {
    endGame = () => {
      process.exit(0);
    };
    setTimeout(endGame, 2000);
  }
};
