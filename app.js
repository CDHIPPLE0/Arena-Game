function main() {
  let gameState = {
    time: 0,
    posY: 3,
    posX: 2,
    lastPosY: 3,
    lastPosX: 2,
  };

  world = (command) => {
    gameState.time++;
    let { posY, posX } = gameState;
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
      message: 'The arena floor is dusty and damp.',
      objects: [],
    };
    const map = [
      [x, x, x, x, x],
      [x, u, u, u, x],
      [x, o, u, o, x],
      [x, u, u, u, x],
      [x, x, x, x, x],
    ];
    console.log('y:', posY, 'x:', posX);
    handleOutput('fromObject', map[posY][posX].message);
    let secCommands = {
      north: () => {
        gameState.posY--;
      },
      east: () => {
        gameState.posX++;
      },
      south: () => {
        gameState.posY++;
      },
      west: () => {
        gameState.posX--;
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
      console.log(gameState.posY, gameState.posX);
    }
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
    let outputMessage = {
      start:
        'You are standing in front of a closed gate, before you lies a dark arena',
      fromObject: detail,
      invalidMove1: 'You cannot move in multiple directions',
      invalidMove2: 'Be more specific',
    };
    let output = outputMessage[message] + '\n';
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
