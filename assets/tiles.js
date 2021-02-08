let tiles = {
  x: {
    canPass: false,
    message: 'There is a wall here, it is unscalable.',
    objects: [],
  },
  o: {
    canPass: false,
    message: 'There is a pillar here blocking your path.',
    objects: [],
  },
  u: {
    canPass: true,
    message: 'The arena floor is damp and well trodden.',
    objects: [],
  },
  v: {
    canPass: true,
    message: 'There are black stains scattered about the floor.',
    objects: [],
  },
  w: {
    canPass: true,
    message: 'You feel a breeze.',
    objects: [],
  },
  X: {
    canPass: false,
    message:
      'There is a hatch beneath your feet, it is fitted with a large brass lock.',
    objects: [],
  },
  E: {
    canPass: true,
    message: 'You found the exit!.',
    objects: [],
  },
};

exports.tiles = tiles;
