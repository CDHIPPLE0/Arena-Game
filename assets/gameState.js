module.exports.gameState = gameState = {
  time: 0,
  posY: 5,
  posX: 2,
  facing: 'north',
  inventory: [],
  debugToggle: false,
  selectionUse: [],
  actionQue: [],
  inventoryQue: [],
  isEquipping: false,
  transfer: () => {
    if (gameState.inventory.length < 5) {
      gameState.inventory.push(map[gameState.posY][gameState.posX].items[0]);
      map[gameState.posY][gameState.posX].items = [];
      handleOutput('fromObject', 'you stash it away');
    } else handleOutput('fromObject', 'you cannot carry any more items');
  },
  transferReject: () => {
    handleOutput('fromObject', 'you leave it alone');
  },
  equipItem: (index) => {
    gameState.inventory.unshift(gameState.inventory[index]);
    gameState.inventory.splice(gameState.inventory[index + 1]);
  },
};
