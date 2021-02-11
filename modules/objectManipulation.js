const { gameState } = require('../assets/gameState');

objectManipulation = (command) => {
  take = () => {
    console.log('in take');
    initY = gameState.posY;
    initX = gameState.posX;
    let item;
    if (map[initY][initX].items[0] != undefined) {
      item = map[initY][initX].items[0].getItemForTile;
    } else item = undefined;
    if (item != undefined) {
      handleOutput('fromObject', `take ${item.message.white}? yes/no`);
      let command = process.stdin
        .on('data', (data) => {
          let command = data.toString().trim();
          command == 'yes'
            ? gameState.transfer()
            : handleOutput('fromObject', 'you leave the item');
          ('end');
        })
        .on('end', () => process.exit(exitCode));
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
      // console.log(map[initY][initX].use.key['key']);
      map[initY][initX].use(
        gameState.inventory[0].getItemForTile.name,
        initY,
        initX
      );
    } else {
      console.log(initY, initX, map[initY][initX]);
      handleOutput('fromObject', `nothing to do here`);
    }
  };
  let statement = [];
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }
  if (statement[0] == 'take') {
    take();
  } else if (statement[0] == 'use') {
    use();
  }
};

module.exports.objectManipulation = objectManipulation;
