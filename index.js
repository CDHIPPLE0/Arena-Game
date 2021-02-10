#!/usr/bin/env node

// --PROGRAM FLOW-- MAIN => stdIn => handleInput => world => colCheck => handleOutput => MAIN

//messages for the handleOutput function

let {
  gameState,
  time,
  posY,
  posX,
  facing,
  inventory,
  debugToggle,
} = require('./modules/gameState');
const stdIn = require('./modules/stdIn');
const stdOut = require('./modules/stdOut');
const world = require('./modules/world');
const handleInput = require('./modules/handleInput');
//the tile objects for the map
//colors for console
let { map } = require('./assets/map');
var colors = require('colors');

function main() {
  //when the game is started the console is cleared, the output message is set to 'start' if the time is at 0, indicating a new or reset game.
  if (gameState.time === 0) {
    console.clear();
    handleOutput('start');
  }
  stdIn;
}

//calls main :)
main();
