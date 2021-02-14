const { gameState } = require('../assets/gameState');
const { map } = require('../assets/map');

handleInventory = (command) => {
  let statement = [];
  let inventoryList;
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }
  if (statement == 'one') statement = 1;
  if (statement == 'two') statement = 2;
  if (statement == 'three') statement = 3;
  if (statement == 'four') statement = 4;
  if (statement == 'five') statement = 5;

  if (gameState.isEquipping == true) {
    if (Number(statement) != NaN) {
      if (gameState.inventory[Number(statement - 1)]) {
        let item = gameState.inventory[Number(statement - 1)];
        gameState.inventoryQue.push(gameState.equipItem(Number(statement - 1)));
        gameState.isEquipping = false;
        handleOutput('fromObject', `You equip the ${item.name.white}`);
      } else {
        handleOutput('fromObject', `That slot is empty`.green);
      }
      gameState.isEquipping = false;
    }
  }
  if (statement == 'wield') {
    if (gameState.inventory.length > 0) {
      const items = gameState.inventory.map((element, index) => {
        return `${(index + 1).toString().cyan}: ${element.name.white}`;
      });
      inventoryList = items.join(' | ');
      handleOutput(
        'fromObject',
        `You reach in your pack for:
   ${inventoryList}`
      );
      gameState.isEquipping = true;
    } else {
      handleOutput('fromObject', 'You have nothing to wield');
    }
  }
  if (statement == 'drop') {
    if (gameState.inventory.length > 0) {
      let item = gameState.inventory[0].name;
      map[gameState.posY][gameState.posX].items.push({
        getItemForTile: gameState.inventory[0],
      });
      gameState.inventory.shift(1);
      handleOutput('fromObject', `You drop the ${item.white}`);
    } else {
      handleOutput('fromObject', 'There is nothing to drop');
    }
  }
};

module.exports.handleInventory = handleInventory;
