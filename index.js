#!/usr/bin/env node

// --PROGRAM FLOW-- MAIN => stdIn => handleInput => movement => colCheck => handleOutput => MAIN
let { gameState } = require('./modules/gameState');
const stdIn = require('./modules/stdIn');
const stdOut = require('./modules/stdOut');
const objectManipulation = require('./modules/objectManipulation');
const movement = require('./modules/movement');
const handleInput = require('./modules/handleInput');
//colors for console
var colors = require('colors');

function main() {
  //when the game is started the console is cleared, the output message is set to 'start' if the time is at 0, indicating a new or reset game.
  if (gameState.time === 0) {
    console.clear();
    handleOutput('start');
  }
}

//calls main :)
main();
