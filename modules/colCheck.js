let { map } = require('../assets/map');
let {
  gameState,
  time,
  posY,
  posX,
  facing,
  inventory,
  debugToggle,
} = require('./gameState');
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
        handleOutput('fromObject', `You see ${map[yM][initX].lookRes.yellow}`);
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
        handleOutput('fromObject', `You see ${map[initY][xP].lookRes.yellow}`);
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
        handleOutput('fromObject', `You see ${map[yP][initX].lookRes.yellow}`);
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
        handleOutput('fromObject', `You see ${map[initY][xM].lookRes.yellow}`);
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
};

exports.colCheck = colCheck;
