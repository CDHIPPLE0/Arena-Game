module.exports.gameState = gameState = {
  time: 0,
  posY: 5,
  posX: 2,
  facing: 'north',
  inventory: [],
  debugToggle: false,
  selectionUse: [],
  actionQue: [],
  transfer: () => {
    gameState.inventory.push(map[gameState.posY][gameState.posX].items[0]);
    map[gameState.posY][gameState.posX].items = [];
    handleOutput('fromObject', 'you stash it away');
  },
  transferReject: () => {
    handleOutput('fromObject', 'you leave it alone');
  },
};
