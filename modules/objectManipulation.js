const { gameState } = require('../assets/gameState');
const { stdIn } = require('./stdIn');

objectManipulation = (command) => {
  let statement = [];
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }

  if (statement == 'yes' || statement == 'no') {
    if (gameState.actionQue.length == 0) {
      handleOutput('invalidMove2');
    }
  }
  if (gameState.actionQue.length > 0) {
    if (statement == 'yes') {
      gameState.actionQue[0]();
      gameState.actionQue = [];
    } else if (statement == 'no') {
      gameState.actionQue[1]();
      gameState.actionQue = [];
    }
  }

  take = () => {
    initY = gameState.posY;
    initX = gameState.posX;
    let item;
    if (map[initY][initX].items[0] != undefined) {
      item = map[initY][initX].items[0].getItemForTile;
    } else item = undefined;
    if (item != undefined) {
      gameState.actionQue.push(gameState.transfer);
      gameState.actionQue.push(gameState.transferReject);
      handleOutput('fromObject', `Take ${item.message.white}? yes / no`);
    } else handleOutput('fromObject', `there is nothing to take.`);
  };
  use = () => {
    initY = gameState.posY;
    initX = gameState.posX;
    let facing = {
      north: () => {
        initY--;
      },
      south: () => {
        initY++;
      },
      east: () => {
        initX++;
      },
      west: () => {
        initX++;
      },
    };
    facing[gameState.facing]();
    if (map[initY][initX].use != undefined) {
      if (gameState.inventory.length != 0) {
        map[initY][initX].use(gameState.inventory[0].name, initY, initX);
        console.log(`you use the ${gameState.inventory[0].name.white}`.green);
      } else handleOutput('fromObject', 'nothing to use');
    } else {
      handleOutput('fromObject', `nothing to do here`);
    }
  };
  if (statement[0] == 'take') {
    take();
  } else if (statement[0] == 'use') {
    use();
  }
};

module.exports.objectManipulation = objectManipulation;
