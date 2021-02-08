const outputMessage = require('./assets/messages');
const {
  error,
  start,
  invalidMove1,
  invalidMove2,
} = outputMessage.outputMessage;
const tiles = require('./assets/tiles');
const { x, o, u, v, w, X, E } = tiles.tiles;

function main() {
  let gameState = {
    time: 0,
    posY: 5,
    posX: 2,
    inventory: [],
  };

  world = (command) => {
    gameState.time++;
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
      fromObject: detail,
      invalidMove3: `${detail}\n`,
      error: error,
      start: start,
      invalidMove1: invalidMove1,
      invalidMove2: invalidMove2,
    };
    output = outputMessage[message] + '\n';
    gameState.outPut = output;
    process.stdout.write(gameState.outPut);
  };
  console.clear();
  if (gameState.time == 0) {
    gameState.posY = 5;
    gameState.posX = 2;
    handleOutput('start');
  }
  process.stdin.on('data', (data) => {
    let command = data.toString().trim().split(' ');
    if (command[0] == 'exit') {
      console.clear();
      process.exit(0);
    } else if (command[0] == 'restart') {
      console.clear();
      gameState.time = 0;
      main();
    } else {
      console.clear();
      handleInput(data);
    }
  });
}
main();
