//Tile objects for the map
//____________NOTE TO SELF____ separate the items and add to tiles by reference.

let tiles = function tiles(char) {
  let tiles = {
    g: {
      //output if you look at the object
      lookRes: 'a gate',
      //Collision variable
      canPass: false,
      //outputs when you move or try to move onto the location
      message: 'There is an iron gate here, it will not budge.',
      //items that might be in the tile.
      items: [],
    },
    x: {
      lookRes: 'a wall',
      canPass: false,
      message: 'There is a wall here, it is unscalable.',
      items: [],
    },
    o: {
      lookRes: 'a pillar',
      canPass: false,
      message: 'There is a pillar here blocking your path.',
      items: [],
      canOpen: {},
    },
    U: {
      lookRes: 'a rough dirt floor',
      canPass: true,
      message: 'The floor here is rough.',
      items: [],
      canOpen: {},
    },
    u: {
      lookRes: 'a smooth dirt floor',
      canPass: true,
      message: 'The floor here is well trodden.',
      items: [],
      canOpen: {},
    },
    v: {
      lookRes: 'a blood stained dirt floor',
      canPass: true,
      message: 'There are black stains scattered about the floor.',
      items: [],
      canOpen: {},
    },
    w: {
      lookRes: 'a dirt floor',
      canPass: true,
      message: 'You feel a breeze.',
      items: [],
      canOpen: {},
    },
    G: {
      lookRes: 'a gated exit',
      canPass: false,
      message:
        'There is a gate before you, it is fitted with a large brass lock.',
      items: [],
      //canOpen checks for the key to set canPass to true, message is updated to "you are in an open passage"
      canOpen: {},
    },
    E: {
      lookRes: 'an exit to the outdoors',
      canPass: true,
      message: 'You found the exit!.',
      items: [],
      canOpen: {},
    },
  };

  let tile = tiles[char];
  return tile;
};

exports.tiles = tiles;
