const { map } = require('../assets/map');

module.exports.stdIn = process.stdin.on('data', (data) => {
  let command = data.toString().trim().split(' ');
  if (command[0] == 'debug') {
    gameState.debugToggle == false
      ? (gameState.debugToggle = true)
      : (gameState.debugToggle = false);
    console.clear();
    handleOutput('debug');
  } else if (command[0] == 'exit') {
    console.clear();
    process.exit(0);
  } else {
    console.clear();
    handleInput(data);
  }
});
