const { gameState } = require('../assets/gameState');

handleInventory = (command) => {
  let statement = [];
  let inventoryList;
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }
  if (statement[0] == 'one') statement[0] = 1;
  if (statement[0] == 'two') statement[0] = 2;
  if (statement[0] == 'three') statement[0] = 3;
  if (statement[0] == 'four') statement[0] = 4;
  if (statement[0] == 'five') statement[0] = 5;

  if (gameState.isEquipping == true) {
    if (Number(statement[0]) != NaN) {
      let item = gameState.inventory[Number(statement[0] - 1)];
      gameState.inventoryQue.push(gameState.equipItem(statement[0] - 1));
      handleOutput(
        'fromObject',
        `You equip the ${item.getItemForTile.name.white}`
      );
    }
    handleOutput('fromObject', 'invalidMove2');
    handleOutput('fromObject', 'You reach in your pack for:');
    handleOutput('fromObject', inventoryList);
  }
  if (statement == 'wield') {
    if (gameState.inventory.length > 0) {
      const items = gameState.inventory.map((element, index) => {
        return `${(index + 1).toString().cyan}: ${
          element.getItemForTile.name.white
        }`;
      });
      inventoryList = items.join(' | ');
      handleOutput('fromObject', 'You reach in your pack for:');
      handleOutput('fromObject', inventoryList);
      gameState.isEquipping = true;
    } else {
      handleOutput('fromObject', 'You have nothing to wield');
    }
  }
};

module.exports.handleInventory = handleInventory;
