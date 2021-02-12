const { gameState } = require('./gameState');

tiles = (char) => {
  let tiles = {
    g: {
      lookRes: 'a gate',
      canPass: false,
      message: 'There is an iron gate here, it will not budge.',
    },
    x: {
      lookRes: 'a wall',
      canPass: false,
      message: 'There is a wall here, it is unscalable.',
    },
    o: {
      lookRes: 'a pillar',
      canPass: false,
      message: 'There is a pillar here blocking your path.',
    },
    U: {
      lookRes: 'a rough dirt floor',
      canPass: true,
      message: 'The floor here is rough.',
    },
    u: {
      lookRes: 'a smooth dirt floor',
      canPass: true,
      message: 'The floor here is well trodden.',
    },
    v: {
      lookRes: 'a blood stained dirt floor',
      canPass: true,
      message: 'There are black stains scattered about the floor.',
    },
    w: {
      lookRes: 'a dirt floor',
      canPass: true,
      message: 'You feel a breeze.',
    },
    G: {
      lookRes: 'a gated exit',
      canPass: false,
      message: 'There is a gate before you, it is fitted with a lock.',
    },
    E: {
      lookRes: 'an exit to the outdoors',
      canPass: true,
      message: 'You found the exit!.',
      actions: [
        () => {
          console.log('You made it out alive'.green);
          endGame = () => {
            console.clear();
            process.exit(0);
          };
          setTimeout(endGame, 3000);
        },
      ],
    },
    V: {
      lookRes: 'sharp spikes on the floor',
      canPass: true,
      message: 'You are standing on spikes it is painful.',
      actions: [
        () => {
          gameState.character.inflictDamage(50);
        },
      ],
    },
  };

  let tile = tiles[char];
  return tile;
};
module.exports.tiles = tiles;
