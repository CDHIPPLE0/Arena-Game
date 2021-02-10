//This sends the commands object as a statement to the world function
let {
  gameState,
  time,
  posY,
  posX,
  facing,
  inventory,
  debugToggle,
} = require('./gameState');

exports.handleInput = handleInput = (data) => {
  statement = [];
  //these are all currently accepted commands
  let command = {
    walk: false,
    look: false,
    take: false,
    use: false,
    north: false,
    east: false,
    south: false,
    west: false,
    here: false,
  };
  //Data here is being sent from the process.stdin() at the base of the main function, the string is split and all valid commands extracted.
  let input = data.toString().trim().split(' ');
  //iterates through the input array and sets any valid commands to true.
  input.forEach((element) => {
    if (command[element] != undefined) {
      command[element] = true;
    }
  });
  //Here we ensure that only one command and one direction is being used, otherwise we notify the player of an improper move.
  const { walk, look, take, use, north, east, south, west, here } = command;
  let commandCount = !!walk + !!look + !!take + !!use;
  let directionCount = !!north + !!east + !!south + !!west + !!here;
  if (commandCount <= 1 && directionCount <= 1) {
    //If the command is valid it is sent to the world function
    world(command);
  } else {
    handleOutput('invalidMove1');
  }
  //This is the debug information that can be toggled on/off.
  if (gameState.debugToggle == true) {
    console.log('\n');
    console.log(
      'time:',
      gameState.time.toString().red,
      'facing:',
      gameState.facing.toString().red
    );
    console.log(
      'posY:',
      gameState.posY.toString().red,
      'posX:',
      gameState.posX.toString().red
    );
  }
};
