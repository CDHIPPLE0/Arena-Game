let { map } = require('../assets/map');
let { gameState } = require('./gameState');

movement = (command) => {
  let colCheck = (method, command) => {
    let initY = gameState.posY;
    let initX = gameState.posX;

    function look(command) {
      if (command != 'here') {
        if (command == 'posY--') {
          refPos = map[initY - 1][initX];
          gameState.facing = 'north';
        } else if (command == 'posY++') {
          refPos = map[initY + 1][initX];
          gameState.facing = 'south';
        } else if (command == 'posX--') {
          refPos = map[initY][initX - 1];
          gameState.facing = 'east';
        } else if (command == 'posX++') {
          refPos = map[initY][initX + 1];
          gameState.facing = 'west';
        } else if (command == 'here') {
          refPos = map[initY][initX];
        }
        items = refPos.items[0];
        let itemDesc;
        if (items != undefined) {
          for (const [key, value] of Object.entries(items)) {
            if (value !== undefined) {
              !!value.canSeeFromDistance
                ? (itemDesc = value.message)
                : (itemDesc = 'something that catches your eye');
            }
          }
          let secMess = 'you also see';
          handleOutput(
            'fromObject',
            `You see ${refPos.lookRes.yellow} ${secMess.green} ${itemDesc.white}`
          );
        } else {
          handleOutput('fromObject', `You see ${refPos.lookRes.yellow}`);
        }
      } else {
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
          let secMess = 'and';
          handleOutput(
            'fromObject',
            `A careful search of the area reveals ${map[initY][initX].lookRes.yellow} ${secMess.green} ${itemDesc.white}`
          );
        } else {
          handleOutput(
            'fromObject',
            `A careful search of the area reveals ${map[initY][initX].lookRes.yellow}`
          );
        }
      }
    }
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
    //these check the method passed in to movement by the handleInput command.
    if (method === 'look') {
      //calls look, and runs the method associated with the command passed in.
      look(command);
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
  //This portion of the movement function runs prior to the colCheck function and passes player input to seCommand methods, which call colCheck.
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
exports.movement = movement;
