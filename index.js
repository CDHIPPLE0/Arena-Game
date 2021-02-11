#!/usr/bin/env node

let { gameState } = require('./modules/gameState');
const stdIn = require('./modules/stdIn');
const stdOut = require('./modules/stdOut');
const objectManipulation = require('./modules/objectManipulation');
const movement = require('./modules/movement');
const handleInput = require('./modules/handleInput');
var colors = require('colors');

function main() {
  if (gameState.time === 0) {
    console.clear();
    handleOutput('start');
  }
}

main();
