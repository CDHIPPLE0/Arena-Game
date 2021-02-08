function main() {
  let gameState = {
    time: 0,
    posY: 3,
    posX: 2,
  };

  world = (command) => {
    gameState.time++;
    console.log(command);
    let { posY, posX } = gameState;
    let x = {
      canPass: false,
      message: 'There is a wall here, it is unscalable.',
      objects: [],
    };
    let o = {
      canPass: false,
      message: 'There is a pillar here.',
      objects: [],
    };
    let u = {
      canPass: true,
      message: 'The arena floor is dusty and damp.',
      objects: [],
    };
    const map = [
      [x, x, x, x, x],
      [x, u, u, u, x],
      [x, o, u, o, x],
      [x, u, u, u, x],
      [x, x, x, x, x],
    ];
  };

  handleInput = (data) => {
    let command = {
      walk: false,
      north: false,
      east: false,
      south: false,
      west: false,
    };
    let input = data.toString().trim().split(' ');
    input.forEach((element) => {
      command[element] = true;
    });
    const { north, east, south, west } = command;
    let directionCount = !!north + !!east + !!south + !!west;
    directionCount <= 1 ? world(command) : handleOutput('invalidMove');
  };

  handleOutput = (message) => {
    let outputMessage = {
      invalidMove: 'You cannot move in multiple directions',
      start:
        'You are standing in front of a closed gate, before you lies a dark arena',
    };
    let output = outputMessage[message] + '\n';
    gameState.outPut = output;
    process.stdout.write(gameState.outPut);
  };
  console.clear();
  handleOutput('start');
  process.stdin.on('data', (data) => {
    console.clear();
    handleInput(data);
  });
}
main();
