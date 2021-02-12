#!/usr/bin/env node
const { gameState } = require('./assets/gameState');
const { outputMessage } = require('./assets/outputMessage');
const { tiles } = require('./assets/tiles');
const { setItemMapPos } = require('./assets/setItemMapPos');
const { setTileUse } = require('./assets/setTileUse');
const { map } = require('./assets/map');
const { stdIn } = require('./modules/stdIn');
const { stdOut } = require('./modules/stdOut');
const { objectManipulation } = require('./modules/objectManipulation');
const { handleInventory } = require('./modules/handleInventory');
const { handleInput } = require('./modules/handleInput');
const { movement } = require('./modules/movement');
const colors = require('colors');

function main() {
  if (gameState.time === 0) {
    console.clear();
    map[gameState.posY][gameState.posX].charHere = true;
    handleOutput('start');
  }
}

main();
