function main() {
  let gameState = {
    time: 0,
    posY: 5,
    posX: 2,
  };

  world = (command) => {
    gameState.time++;
    let x = {
      canPass: false,
      message: 'There is a wall here, it is unscalable.',
      objects: [],
    };
    let o = {
      canPass: false,
      message: 'There is a pillar here.',
      objects: [],
    };
    let u = {
      canPass: true,
      message: 'The arena floor is damp and well trodden.',
      objects: [],
    };
    let v = {
      canPass: true,
      message: 'There are black stains scattered about the floor.',
      objects: [],
    };
    let w = {
      canPass: true,
      message: 'You feel a breeze.',
      objects: [],
    };
    let X = {
      canPass: false,
      message:
        'There is a hatch beneath your feet, it is fitted with a large brass lock.',
      objects: [],
    };
    let E = {
      canPass: true,
      message: 'You found the exit!.',
      objects: [],
    };
    const map = [
      [x, x, x, x, x],
      [x, x, x, E, x],
      [x, x, x, X, x],
      [x, v, u, w, x],
      [x, o, u, o, x],
      [x, u, u, v, x],
      [x, x, x, x, x],
    ];
    let colCheck = (command) => {
      let initY = gameState.posY;
      let initX = gameState.posX;
      switch (command) {
        case 'posY--':
          initY--;
          break;
        case 'posX++':
          initX++;
          break;
        case 'posY++':
          initY++;
          break;
        case 'posX--':
          initX--;
          break;
        default:
          handleOutput('error');
          break;
      }
      if (map[initY][initX].canPass) {
        gameState.posY = initY;
        gameState.posX = initX;
      } else {
        handleOutput('invalidMove3', map[initY][initX].message);
      }
    };
    let secCommands = {
      north: () => {
        colCheck('posY--');
      },
      east: () => {
        colCheck('posX++');
      },
      south: () => {
        colCheck('posY++');
      },
      west: () => {
        colCheck('posX--');
      },
    };
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
        secCommands[statement[1]]();
      }
    }
    handleOutput('fromObject', map[gameState.posY][gameState.posX].message);
  };

  handleInput = (data) => {
    //will need for non-movement based commands also
    statement = [];
    let command = {
      walk: false,
      north: false,
      east: false,
      south: false,
      west: false,
    };
    let input = data.toString().trim().split(' ');
    input.forEach((element) => {
      if (command[element] != undefined) {
        command[element] = true;
      }
    });
    const { north, east, south, west } = command;
    let directionCount = !!north + !!east + !!south + !!west;
    directionCount <= 1 ? world(command) : handleOutput('invalidMove1');
  };

  handleOutput = (message, detail) => {
    let output;
    let outputMessage = {
      invalidMove3: `${detail}\n`,
      error: 'ERROR !.',
      start:
        'You are standing in front of a closed gate, before you lies a dark arena',
      fromObject: detail,
      invalidMove1: 'You cannot move in multiple directions',
      invalidMove2: 'Be more specific',
    };
    output = outputMessage[message] + '\n';
    gameState.outPut = output;
    process.stdout.write(gameState.outPut);
  };
  console.clear();
  handleOutput('start');
  process.stdin.on('data', (data) => {
    console.clear();
    handleInput(data);
  });
}
main();
