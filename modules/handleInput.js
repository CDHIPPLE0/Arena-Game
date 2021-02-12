const { handleInventory } = require('./handleInventory');
const { outputMessage } = require('../assets/outputMessage');
const { gameState } = require('../assets/gameState');
let { gameScreen } = outputMessage;
handleInput = (data) => {
  if (gameState.time == 0) {
    gameState.time++;
  }
  let trueCount = 0;
  statement = [];
  let command = {
    walk: false,
    look: false,
    take: false,
    wield: false,
    drop: false,
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
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
  if (input == '1') input = ['one'];
  if (input == '2') input = ['two'];
  if (input == '3') input = ['three'];
  if (input == '4') input = ['four'];
  if (input == '5') input = ['five'];
  input.forEach((element) => {
    if (command[element] != undefined) {
      command[element] = true;
      trueCount++;
    }
  });
  if (trueCount > 0) {
    const {
      walk,
      look,
      take,
      wield,
      one,
      two,
      three,
      four,
      five,
      drop,
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
    let inventoryCount =
      !!wield + !!drop + !!one + !!two + !!three + !!four + !!five;
    let manipulationCount = !!use + !!strike + !!take + !!yes + !!no;
    let moveCount = !!walk + !!look;
    let directionCount = !!north + !!east + !!south + !!west + !!here;
    if (
      moveCount <= 1 &&
      directionCount <= 1 &&
      manipulationCount <= 0 &&
      inventoryCount <= 0
    ) {
      movement(command);
    } else if (
      manipulationCount == 1 &&
      moveCount <= 0 &&
      directionCount <= 0
    ) {
      objectManipulation(command);
    } else if (
      inventoryCount == 1 &&
      moveCount <= 0 &&
      directionCount <= 0 &&
      manipulationCount <= 0
    ) {
      handleInventory(command);
    } else {
      handleOutput('invalidMove1');
    }
    console.log(`Health: ${gameState.character.health}`.magenta);
    console.log(
      !!gameState.inventory.length > 0
        ? `Wielding: ${gameState.inventory[0].name}`.white
        : `Wielding: nothing`.white
    );
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
      console.log(outputMessage.commandList.cyan);
    }
  } else {
    handleOutput('invalidMove2');
  }
};

module.exports.handleInput = handleInput;
