let tiles = {
  g: {
    lookRes: 'a gate',
    canPass: false,
    message: 'There is an iron gate here, it will not budge.',
    objects: [],
  },
  x: {
    lookRes: 'a wall',
    canPass: false,
    message: 'There is a wall here, it is unscalable.',
    objects: [],
  },
  o: {
    lookRes: 'a pillar',
    canPass: false,
    message: 'There is a pillar here blocking your path.',
    objects: [],
  },
  U: {
    lookRes: 'a rough dirt floor',
    canPass: true,
    message: 'The floor here is rough.',
    objects: [],
  },
  u: {
    lookRes: 'a smooth dirt floor',
    canPass: true,
    message: 'The floor here is well trodden.',
    objects: [],
  },
  v: {
    lookRes: 'a blood stained dirt floor',
    canPass: true,
    message: 'There are black stains scattered about the floor.',
    objects: [{ key: { message: 'a small silver key', canTake: true } }],
  },
  w: {
    lookRes: 'a dirt floor',
    canPass: true,
    message: 'You feel a breeze.',
    objects: [],
  },
  G: {
    lookRes: 'a gated exit',
    canPass: false,
    message:
      'There is a gate before you, it is fitted with a large brass lock.',
    objects: [],
    canOpen: {
      key: true,
    },
  },
  E: {
    lookRes: 'an exit to the outdoors',
    canPass: true,
    message: 'You found the exit!.',
    objects: [],
  },
};

exports.tiles = tiles;
