//This is the first function run in main, it takes in what is typed in the console
let {
  gameState,
  time,
  posY,
  posX,
  facing,
  inventory,
  debugToggle,
} = require('../modules/gameState');

exports.stdIn = process.stdin.on('data', (data) => {
  let command = data.toString().trim().split(' ');
  //the first three conditions are for system commands debug, reset, and exit.
  if (command[0] == 'debug') {
    gameState.debugToggle == false
      ? (gameState.debugToggle = true)
      : (gameState.debugToggle = false);
    console.clear();
    handleOutput('debug');
  } else if (command[0] == 'exit') {
    console.clear();
    process.exit(0);
  } else if (command[0] == 'reset') {
    gameState.time = 0;
    gameState.posY = 5;
    gameState.posX = 2;
    gameState.facing = 'north';
    gameState.inventory = {};
    gameState.debugToggle = false;
    console.clear();
    handleOutput('start');
  } else {
    console.clear();
    //Here the data is sent to the handleInput function
    handleInput(data);
  }
});
