#!/usr/bin/env node
//imports of tiles and messages
const outputMessage = require('./assets/messages');
const {
  error,
  start,
  invalidMove1,
  invalidMove2,
} = outputMessage.outputMessage;
const tiles = require('./assets/tiles');
const { x, o, u, v, w, G, E, U, g } = tiles.tiles;
var colors = require('colors'); //colors for console

function main() {
  let gameState = {
    time: 0,
    posY: 5,
    posX: 2,
    inventory: {},
  };

  world = (command) => {
    const map = [
      [x, x, x, x, x],
      [x, U, x, E, x],
      [x, U, x, G, x],
      [x, v, u, w, x],
      [x, o, u, o, x],
      [x, U, u, U, x],
      [x, x, g, x, x],
    ];

    let colCheck = (method, command) => {
      let initY = gameState.posY;
      let initX = gameState.posX;
      const look = {
        'posY--': () => {
          let yM = initY - 1;
          handleOutput(
            'fromObject',
            `You see ${map[yM][initX].lookRes.yellow}`
          );
        },
        'posX++': () => {
          let xP = initX + 1;
          handleOutput(
            'fromObject',
            `You see ${map[initY][xP].lookRes.yellow}`
          );
        },
        'posY++': () => {
          let yP = initY + 1;
          handleOutput(
            'fromObject',
            `You see ${map[yP][initX].lookRes.yellow}`
          );
        },
        'posX--': () => {
          let xM = initX - 1;
          handleOutput(
            'fromObject',
            `You see ${map[initY][xM].lookRes.yellow}`
          );
        },
        here: () => {
          handleOutput(
            'fromObject',
            `You see ${map[initY][initX].lookRes.yellow}`
          );
        },
      };

      const walk = {
        'posY--': () => {
          initY--;
        },
        'posX++': () => {
          initX++;
        },
        'posY++': () => {
          initY++;
        },
        'posX--': () => {
          initX--;
        },
        here: () => {
          handleOutput('moveHere', 'You shuffle around in place');
        },
      };

      // const take = {
      //   'posY--': () => {
      //     initY--;
      //   },
      //   'posX++': () => {
      //     initX++;
      //   },
      //   'posY++': () => {
      //     initY++;
      //   },
      //   'posX--': () => {
      //     initX--;
      //   },
      //   here: () => {
      //     handleOutput('moveHere', 'You shuffle around in place');
      //   },
      // };

      if (method === 'look') {
        gameState.time++;
        look[command]();
      } else if (method === 'walk') {
        walk[command]();
      }
      // } else if (method === 'take') {
      //   map[initY][initX].objects;
      //   take[command]();
      // }

      if (map[initY][initX].canPass && command !== 'here') {
        gameState.time++;
        gameState.posY = initY;
        gameState.posX = initX;
      } else {
        handleOutput('invalidMove3', map[initY][initX].message.cyan);
      }
    };

    let secCommands = {
      north: (method) => {
        colCheck(method, 'posY--');
      },
      east: (method) => {
        colCheck(method, 'posX++');
      },
      south: (method) => {
        colCheck(method, 'posY++');
      },
      west: (method) => {
        colCheck(method, 'posX--');
      },
      here: (method) => {
        colCheck(method, 'here');
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
        secCommands[statement[1]]('walk');
      }
      if (statement[0] == 'look') {
        secCommands[statement[1]]('look');
      }
    }
    handleOutput('fromObject', map[gameState.posY][gameState.posX].message.dim);
  };

  handleInput = (data) => {
    //will need for non-movement based commands also
    statement = [];
    let command = {
      walk: false,
      look: false,
      take: false,
      use: false,
      north: false,
      east: false,
      south: false,
      west: false,
      here: false,
    };
    let input = data.toString().trim().split(' ');
    input.forEach((element) => {
      if (command[element] != undefined) {
        command[element] = true;
      }
    });
    const { walk, look, take, use, north, east, south, west, here } = command;
    let commandCount = !!walk + !!look + !!take + !!use;
    let directionCount = !!north + !!east + !!south + !!west + !!here;
    if (commandCount <= 1 && directionCount <= 1) {
      world(command);
    } else {
      handleOutput('invalidMove1');
    }
  };

  handleOutput = (message, detail) => {
    let output;
    let outputMessage = {
      fromObject: detail,
      invalidMove3: `${detail}\n`,
      error: error.red,
      start: start.yellow,
      invalidMove1: invalidMove1,
      invalidMove2: invalidMove2,
      moveHere: detail,
    };
    output = outputMessage[message] + '\n';
    gameState.outPut = output;
    process.stdout.write(gameState.outPut);
  };
  console.clear();
  if (gameState.time === 0) {
    handleOutput('start');
  }
  process.stdin.on('data', (data) => {
    let command = data.toString().trim().split(' ');
    if (command[0] == 'exit') {
      console.clear();
      process.exit(0);
    } else {
      console.clear();
      handleInput(data);
    }
  });
}
main();
