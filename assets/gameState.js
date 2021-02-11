module.exports.gameState = gameState = {
  time: 0,
  posY: 5,
  posX: 2,
  facing: 'north',
  inventory: [],
  debugToggle: false,
  transfer: () => {
    gameState.inventory = [map[gameState.posY][gameState.posX].items[0]];
    map[gameState.posY][gameState.posX].items = [];
  },
};
