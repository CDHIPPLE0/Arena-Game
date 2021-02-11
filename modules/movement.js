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
      method == 'look'
        ? (refPos = map[initY][initX])
        : handleOutput('moveHere', 'You shuffle around in place');
    }
    if (method == 'walk') {
      if (map[initY][initX].canPass) {
        gameState.time++;
        gameState.posY = initY;
        gameState.posX = initX;
      } else {
        handleOutput('invalidMove3', map[initY][initX].message.cyan);
      }
      handleOutput(
        'fromObject',
        map[gameState.posY][gameState.posX].message.green.italic
      );
    }
    if (method == 'look') {
      let items;
      !!refPos.items[0]
        ? (items = refPos.items[0].getItemForTile)
        : (items = undefined);
      let itemDesc;
      if (items != undefined) {
        console.log(items.canSeeFromDistance);
        !!items.canSeeFromDistance
          ? (itemDesc = items.message)
          : (itemDesc = 'something that catches your eye');
        let secMess = 'and';
        if (command == 'here') {
          items.canSeeFromDistance = true;
          isMessage = `A careful search of the area reveals ${map[initY][initX].lookRes.yellow} ${secMess.green} ${items.message.white}`;
        } else {
          isMessage = `You see ${refPos.lookRes.yellow} ${secMess.green} ${itemDesc.white}`;
        }
        handleOutput('fromObject', isMessage);
      } else {
        if (command == 'here') {
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
