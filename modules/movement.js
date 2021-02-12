const { gameState } = require('../assets/gameState');

movement = (command, method) => {
  let initY = gameState.posY;
  let initX = gameState.posX;
  let isMessage;
  let notMessage;
  let statement = [];
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }
  if (statement.length == 0) {
    return 0;
  }
  if (statement.length < 2) {
    handleOutput('invalidMove2');
  } else {
    if (statement[0] == 'walk') {
      move(statement[1], 'walk');
    } else if (statement[0] == 'look') {
      move(statement[1], 'look');
    }
  }
  function move(command, method) {
    if (command == 'north') {
      if (method == 'look') {
        refPos = map[initY - 1][initX];
      } else if (method == 'walk') {
        initY--;
      }
      gameState.facing = 'north';
    } else if (command == 'south') {
      if (method == 'look') {
        refPos = map[initY + 1][initX];
      } else initY++;
      gameState.facing = 'south';
    } else if (command == 'east') {
      if (method == 'look') {
        refPos = map[initY][initX + 1];
      } else initX++;
      gameState.facing = 'east';
    } else if (command == 'west') {
      if (method == 'look') {
        refPos = map[initY][initX - 1];
      } else initX--;
      gameState.facing = 'west';
    } else if (command == 'here') {
      method == 'look' && (refPos = map[initY][initX]);
    }
    if (method == 'walk') {
      if (initY !== gameState.posY || initX !== gameState.posX) {
        if (map[initY][initX].canPass) {
          gameState.time++;
          map[gameState.posY][gameState.posX].charHere = false;
          gameState.posY = initY;
          gameState.posX = initX;
          map[initY][initX].charHere = true;
          handleOutput(
            'fromObject',
            map[gameState.posY][gameState.posX].message.green.italic
          );
        } else {
          gameState.time++;
          handleOutput('invalidMove3', map[initY][initX].message.cyan);
        }
        if (map[initY][initX].actions) {
          map[gameState.posY][gameState.posX].actions.forEach((element) => {
            element();
          });
        }
      } else {
        gameState.time++;
        handleOutput('fromObject', 'You shuffle around in place');
        if (map[initY][initX].actions) {
          map[gameState.posY][gameState.posX].actions.forEach((element) => {
            element();
          });
        }
      }
    }
    if (method == 'look') {
      let items;
      !!refPos.items[0]
        ? (items = refPos.items[0].getItemForTile)
        : (items = undefined);
      let itemDesc;
      if (items != undefined) {
        !!items.canSeeFromDistance
          ? (itemDesc = items.message)
          : (itemDesc = 'something that catches your eye');
        let secMess = 'and';
        if (command == 'here') {
          items.canSeeFromDistance = true;
          isMessage = `A careful search of the area reveals 
${map[initY][initX].lookRes.yellow} ${secMess.green} ${items.message.white}`;
        } else {
          isMessage = `You see ${refPos.lookRes.yellow} ${secMess.green} ${itemDesc.white}`;
        }
        handleOutput('fromObject', isMessage);
      } else {
        if (command == 'here') {
          gameState.time++;
          notMessage = `A careful search of the area reveals ${map[initY][initX].lookRes.yellow}`;
        } else {
          notMessage = `You see ${refPos.lookRes.yellow}`;
        }
        handleOutput('fromObject', notMessage);
      }
    }
  }
};

module.exports.movement = movement;
