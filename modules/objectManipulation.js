let { map } = require('../assets/map');
let { gameState } = require('./gameState');

objectManipulation = (command) => {
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
    self: (method) => {
      colCheck(method, 'self');
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
exports.objectManipulation = objectManipulation;
