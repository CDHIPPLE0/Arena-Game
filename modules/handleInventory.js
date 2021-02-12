const { gameState } = require('../assets/gameState');

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
        handleOutput(
          'fromObject',
          `That slot is empty
          You reach in your pack for:
    ${inventoryList}`
        );
      }
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
};

module.exports.handleInventory = handleInventory;
