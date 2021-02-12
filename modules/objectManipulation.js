const { gameState } = require('../assets/gameState');

objectManipulation = (command) => {
  let statement = [];
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }
  if (gameState.actionQue.length == 0) {
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
        handleOutput('fromObject', `take ${item.message.white}? yes/no`);
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
        map[initY][initX].use(
          gameState.inventory[0].getItemForTile.name,
          initY,
          initX
        );
      } else {
        handleOutput('fromObject', `nothing to do here`);
      }
    };
    let inventory = gameState.inventory;
    if (statement[0] == 'take') {
      take();
    } else if (statement[0] == 'use') {
      use();
    }
  } else {
    if (statement == 'yes') {
      gameState.actionQue[0]();
      gameState.actionQue = [];
    } else if (statement == 'no') {
      gameState.actionQue[1]();
      gameState.actionQue = [];
    }
  }
};

module.exports.objectManipulation = objectManipulation;
