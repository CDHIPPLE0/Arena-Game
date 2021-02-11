#!/usr/bin/env node
const { gameState } = require('./assets/gameState');
const { outputMessage } = require('./assets/outputMessage');
const { tiles } = require('./assets/tiles');
const { setItemMapPos } = require('./assets/setItemMapPos');
const { map } = require('./assets/map');
const { stdIn } = require('./modules/stdIn');
const { stdOut } = require('./modules/stdOut');
const { objectManipulation } = require('./modules/objectManipulation');
const { handleInput } = require('./modules/handleInput');
const colors = require('colors');
const { movement } = require('./modules/movement');

function main() {
  if (gameState.time === 0) {
    console.clear();
    handleOutput('start');
  }
}

main();
