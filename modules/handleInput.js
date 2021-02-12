handleInput = (data) => {
  statement = [];
  let command = {
    walk: false,
    look: false,
    take: false,
    use: false,
    yes: false,
    no: false,
    strike: false,
    north: false,
    east: false,
    south: false,
    west: false,
    here: false,
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
    yes,
    no,
    strike,
    north,
    east,
    south,
    west,
    here,
  } = command;
  let manipulationCount = !!use + !!strike + !!take + !!yes + !!no;
  let moveCount = !!walk + !!look;
  let directionCount = !!north + !!east + !!south + !!west + !!here;
  if (moveCount <= 1 && directionCount <= 1 && manipulationCount <= 0) {
    movement(command);
  } else if (manipulationCount == 1 && moveCount <= 0 && directionCount <= 0) {
    objectManipulation(command);
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
