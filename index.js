#!/usr/bin/env node
//imports of tiles and messages
const outputMessage = require('./assets/messages');
const {
  error,
  start,
  invalidMove1,
  invalidMove2,
  debug,
} = outputMessage.outputMessage;
const tiles = require('./assets/tiles');
const { x, o, u, v, w, G, E, U, g } = tiles.tiles;
var colors = require('colors'); //colors for console

function main() {
  let gameState = {
    time: 0,
    posY: 5,
    posX: 2,
    facing: 'north',
    inventory: {},
    debug: false,
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
          gameState.facing = 'north';
          let yM = initY - 1;
          let object;
          object = map[yM][initX].objects[0];
          let objectDesc;
          if (object != undefined) {
            for (const [key, value] of Object.entries(object)) {
              if (value !== undefined) {
                objectDesc = value.message;
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[yM][initX].lookRes.yellow} You also see what appears to be ${objectDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `You see ${map[yM][initX].lookRes.yellow}`
            );
          }
        },
        'posX++': () => {
          gameState.facing = 'east';
          let xP = initX + 1;
          let object;
          object = map[initY][xP].objects[0];
          let objectDesc;
          if (object != undefined) {
            for (const [key, value] of Object.entries(object)) {
              if (value !== undefined) {
                objectDesc = value.message;
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[initY][xP].lookRes.yellow} You also see what appears to be ${objectDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `You see ${map[initY][xP].lookRes.yellow}`
            );
          }
        },
        'posY++': () => {
          gameState.facing = 'south';
          let yP = initY + 1;
          let object;
          object = map[yP][initX].objects[0];
          let objectDesc;
          if (object != undefined) {
            for (const [key, value] of Object.entries(object)) {
              if (value !== undefined) {
                objectDesc = value.message;
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[yP][initX].lookRes.yellow} You also see what appears to be ${objectDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `You see ${map[yP][initX].lookRes.yellow}`
            );
          }
        },
        'posX--': () => {
          gameState.facing = 'west';
          let xM = initX - 1;
          let object;
          object = map[initY][xM].objects[0];
          let objectDesc;
          if (object != undefined) {
            for (const [key, value] of Object.entries(object)) {
              if (value !== undefined) {
                objectDesc = value.message;
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[initY][xM].lookRes.yellow} You also see what appears to be ${objectDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `You see ${map[initY][xM].lookRes.yellow}`
            );
          }
        },
        here: () => {
          let object;
          object = map[initY][initX].objects[0];
          let objectDesc;
          if (object != undefined) {
            for (const [key, value] of Object.entries(object)) {
              if (value !== undefined) {
                objectDesc = value.message;
              }
            }
            handleOutput(
              'fromObject',
              `A careful search of the area reveals ${map[initY][initX].lookRes.yellow} and ${objectDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `A careful search of the area reveals ${map[initY][initX].lookRes.yellow}`
            );
          }
        },
      };

      const walk = {
        'posY--': () => {
          gameState.facing = 'north';
          initY--;
        },
        'posX++': () => {
          gameState.facing = 'east';
          initX++;
        },
        'posY++': () => {
          gameState.facing = 'south';
          initY++;
        },
        'posX--': () => {
          gameState.facing = 'west';
          initX--;
        },
        here: () => {
          handleOutput('moveHere', 'You shuffle around in place');
        },
      };

      // const take = {
      //   'posY--': () => {
      //   },
      //   'posX++': () => {
      //   },
      //   'posY++': () => {
      //   },
      //   'posX--': () => {
      //   },
      //   here: () => {
      //   },
      // };

      if (method === 'look') {
        look[command]();
      } else if (method === 'walk') {
        walk[command]();
      }
      if (command == 'here' || command == 'look') {
        gameState.time++;
      } else {
        if (map[initY][initX].canPass) {
          gameState.time++;
          gameState.posY = initY;
          gameState.posX = initX;
        } else {
          handleOutput('invalidMove3', map[initY][initX].message.cyan);
        }
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
    handleOutput(
      'fromObject',
      map[gameState.posY][gameState.posX].message.green.italic
    );
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
    if (gameState.debug == true) {
      console.log('\n');
      console.log(
        'time:',
        gameState.time.toString().red,
        'facing:',
        gameState.facing.toString().red
      );
      console.log(
        'posY:',
        gameState.posY.toString().red,
        'posX:',
        gameState.posX.toString().red
      );
    }
  };

  handleOutput = (message, detail) => {
    let output;
    let outputMessage = {
      fromObject: detail,
      invalidMove3: `${detail}\n`,
      error: error.red,
      start: start.green,
      invalidMove1: invalidMove1.green,
      invalidMove2: invalidMove2.green,
      moveHere: detail,
      debug: debug.red,
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
    if (command[0] == 'debug') {
      gameState.debug == false
        ? (gameState.debug = true)
        : (gameState.debug = false);
      console.clear();
      handleOutput('debug');
    } else if (command[0] == 'exit') {
      console.clear();
      process.exit(0);
    } else if (command[0] == 'reset') {
      gameState.time = 0;
      gameState.posY = 5;
      gameState.posX = 2;
      gameState.facing = 'north';
      gameState.inventory = {};
      gameState.debug = false;
      console.clear();
      handleOutput('start');
    } else {
      console.clear();
      handleInput(data);
    }
  });
}
main();
