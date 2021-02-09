#!/usr/bin/env node

// --PROGRAM FLOW-- MAIN => stdIn => handleInput => world => colCheck => handleOutput => MAIN

//messages for the handleOutput function
const outputMessage = require('./assets/messages');
const {
  error,
  start,
  invalidMove1,
  invalidMove2,
  debug,
} = outputMessage.outputMessage;
//the tile objects for the map
const tiles = require('./assets/tiles');
const { x, o, u, v, w, G, E, U, g } = tiles.tiles;
//colors for console
var colors = require('colors');

function main() {
  //player coordinates and player/game condition
  let gameState = {
    time: 0,
    posY: 5,
    posX: 2,
    facing: 'north',
    inventory: {},
    debug: false,
  };

  world = (command) => {
    //each map letter represents a tile object as imported above on a coordinate ^
    const map = [
      [x, x, x, x, x],
      [x, U, x, E, x],
      [x, U, x, G, x],
      [x, v, u, w, x],
      [x, o, u, o, x],
      [x, U, u, U, x],
      [x, x, g, x, x],
    ];

    //Takes in player movement or action commands and checks for collisions, reveals information, facilitates coordinate object interaction
    let colCheck = (method, command) => {
      //Current location according to gameState
      let initY = gameState.posY;
      let initX = gameState.posX;
      //These are method lookups for the look command
      const look = {
        //in this example 'posY--' equates to the direction the player wants to 'look' relative to their X/Y coordinate.
        'posY--': () => {
          //GameState is set to "North" b/c looking in the direction of player position - Y == a tile to their north.
          gameState.facing = 'north';
          //yM == the new Y coordinate to return data from
          let yM = initY - 1;
          let items;
          //Checks to see if there is an "item" within the tile at the coordinates to see when looking, if not the description of the tile (lookRes) is returned.
          items = map[yM][initX].items[0];
          let itemDesc;
          if (items != undefined) {
            for (const [key, value] of Object.entries(items)) {
              if (value !== undefined) {
                //checks to see if the item is visible from a distance.
                !!value.canSeeFromDistance
                  ? (itemDesc = value.message)
                  : (itemDesc = 'something that catches your eye');
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[yM][initX].lookRes.yellow} You also see ${itemDesc.white}`
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
          let items;
          items = map[initY][xP].items[0];
          let itemDesc;
          if (items != undefined) {
            for (const [key, value] of Object.entries(items)) {
              if (value !== undefined) {
                !!value.canSeeFromDistance
                  ? (itemDesc = value.message)
                  : (itemDesc = 'something that catches your eye');
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[initY][xP].lookRes.yellow} You also see ${itemDesc.white}`
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
          let items;
          items = map[yP][initX].items[0];
          let itemDesc;
          if (items != undefined) {
            for (const [key, value] of Object.entries(items)) {
              if (value !== undefined) {
                !!value.canSeeFromDistance
                  ? (itemDesc = value.message)
                  : (itemDesc = 'something that catches your eye');
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[yP][initX].lookRes.yellow} You also see ${itemDesc.white}`
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
          let items;
          items = map[initY][xM].items[0];
          let itemDesc;
          if (items != undefined) {
            for (const [key, value] of Object.entries(items)) {
              if (value !== undefined) {
                !!value.canSeeFromDistance
                  ? (itemDesc = value.message)
                  : (itemDesc = 'something that catches your eye');
              }
            }
            handleOutput(
              'fromObject',
              `You see ${map[initY][xM].lookRes.yellow} You also see ${itemDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `You see ${map[initY][xM].lookRes.yellow}`
            );
          }
        },
        here: () => {
          items = map[initY][initX].items[0];
          let itemDesc;
          if (items != undefined) {
            for (const [key, value] of Object.entries(items)) {
              if (value !== undefined) {
                itemDesc = value.message;
                //If an object is found while looking "here", it then becomes visible from a distance.
                value.canSeeFromDistance = true;
              }
            }
            handleOutput(
              'fromObject',
              `A careful search of the area reveals ${map[initY][initX].lookRes.yellow} and ${itemDesc.white}`
            );
          } else {
            handleOutput(
              'fromObject',
              `A careful search of the area reveals ${map[initY][initX].lookRes.yellow}`
            );
          }
        },
      };
      //These are method lookups for the walk command
      const walk = {
        'posY--': () => {
          //set the facing direction and local index to the desired location, to be later checked at the end of the function for collision.
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
          //moving here does not do much :P
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

      //these check the method passed in to world by the handleInput command.
      if (method === 'look') {
        //calls look, and runs the method associated with the command passed in.
        look[command]();
      } else if (method === 'walk') {
        walk[command]();
      }
      //No movement will take place if looking or moving here, but the game timer will increment
      if (command == 'here' || command == 'look') {
        gameState.time++;
      } else {
        //Checks for movement collision and increments time, then sets the player coordinates in gameState to the local coordinates.
        if (map[initY][initX].canPass) {
          gameState.time++;
          gameState.posY = initY;
          gameState.posX = initX;
        } else {
          //In the case that there is a collision the message from the tile will output in cyan. The program will then wait for further input
          handleOutput('invalidMove3', map[initY][initX].message.cyan);
        }
      }
    };
    //This portion of the world function runs prior to the colCheck function and passes player input to seCommand methods, which call colCheck.
    let secCommands = {
      //In the case that the direction command from the player == north this method calls colCheck, and passes in the "method" which could be walk or look etc; and the direction inc/dec.
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
    //This function validates the statement made by the player and sends them to the secCommand function ot be executed.
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
    //After all that is run, this outputs the current tiles "message"..a description of your surroundings.
    handleOutput(
      'fromObject',
      map[gameState.posY][gameState.posX].message.green.italic
    );
  };

  //The following code is outside the scope of the world function and executes first.

  //This sends the commands object as a statement to the world function
  handleInput = (data) => {
    statement = [];
    //these are all currently accepted commands
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
    //Data here is being sent from the process.stdin() at the base of the main function, the string is split and all valid commands extracted.
    let input = data.toString().trim().split(' ');
    //iterates through the input array and sets any valid commands to true.
    input.forEach((element) => {
      if (command[element] != undefined) {
        command[element] = true;
      }
    });
    //Here we ensure that only one command and one direction is being used, otherwise we notify the player of an improper move.
    const { walk, look, take, use, north, east, south, west, here } = command;
    let commandCount = !!walk + !!look + !!take + !!use;
    let directionCount = !!north + !!east + !!south + !!west + !!here;
    if (commandCount <= 1 && directionCount <= 1) {
      //If the command is valid it is sent to the world function
      world(command);
    } else {
      handleOutput('invalidMove1');
    }
    //This is the debug information that can be toggled on/off.
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
  //This function is called whenever a process ends and informs the player of their surroundings, errors etc.
  handleOutput = (message, detail) => {
    let output;
    //these messages below are derived from the imported messages module.
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
    //Output is set in gameState and process.stdout writes to the terminal
    gameState.outPut = output;
    process.stdout.write(gameState.outPut);
  };
  //when the game is started the console is cleared, the output message is set to 'start' if the time is at 0, indicating a new or reset game.
  console.clear();
  if (gameState.time === 0) {
    handleOutput('start');
  }
  //This is the first function run in main, it takes in what is typed in the console
  process.stdin.on('data', (data) => {
    let command = data.toString().trim().split(' ');
    //the first three conditions are for system commands debug, reset, and exit.
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
      //Here the data is sent to the handleInput function
      handleInput(data);
    }
  });
}
//calls main :)
main();
