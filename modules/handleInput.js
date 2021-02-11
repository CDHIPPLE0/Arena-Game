handleInput = (data) => {
  statement = [];
  let command = {
    walk: false,
    look: false,
    take: false,
    use: false,
    strike: false,
    north: false,
    east: false,
    south: false,
    west: false,
    here: false,
    self: false,
  };
  let input = data.toString().trim().split(' ');
  input.forEach((element) => {
    if (command[element] != undefined) {
      command[element] = true;
    }
  });
  const {
    walk,
    look,
    take,
    use,
    strike,
    north,
    east,
    south,
    west,
    here,
    self,
  } = command;
  let objectManipulation = !!use + !!strike + !!take + !!self;
  let commandCount = !!walk + !!look + !!take + !!use + !!strike;
  let directionCount = !!north + !!east + !!south + !!west + !!here + !!self;
  if (commandCount <= 1 && directionCount <= 1) {
    if (objectManipulation > 0) {
      objectManipulation.objectManipulation(command);
    } else movement(command);
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

module.exports.handleInput = handleInput;
