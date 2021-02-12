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
  character: {
    health: 100,
    alive: true,
    inflictDamage: (dam) => {
      let damage = `You take ${dam} damage!`;
      gameState.character.health = gameState.character.health -= dam;
      if (gameState.character.health <= 0) {
        console.log(damage.red);
        console.log('you are dead'.red);
        endGame = () => {
          console.clear();
          process.exit(0);
        };
        setTimeout(endGame, 2000);
      } else {
        console.log(damage.red);
      }
    },
  },
  transfer: () => {
    if (gameState.inventory.length < 5) {
      gameState.inventory.push(
        map[gameState.posY][gameState.posX].items[0].getItemForTile
      );
      map[gameState.posY][gameState.posX].items = [];
      handleOutput('fromObject', 'you stash it away');
    } else handleOutput('fromObject', 'you cannot carry any more items');
  },
  transferReject: () => {
    handleOutput('fromObject', 'you leave it alone');
  },
  equipItem: (item) => {
    if (gameState.inventory.length > 1) {
      let thisItem = gameState.inventory[item];
      gameState.inventory.unshift({
        name: thisItem.name,
        message: thisItem.message,
        canTake: thisItem.canTake,
        canSeeFromDistance: thisItem.canSeeFromDistance,
      });
      gameState.inventory.splice(item + 1, 1);
    }
  },
};
