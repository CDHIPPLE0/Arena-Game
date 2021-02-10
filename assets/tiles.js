//Tile objects for the map
//____________NOTE TO SELF____ separate the items and add to tiles by reference.

exports.tiles = function Tiles(char) {
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
      items: [
        //the "item" here is scratches on the pillar.
        {
          scratches: {
            //message is output when looking at an item from a tile away and canSeeFromDistance = true or you are in the tile and look here.
            message: 'scratches in the stone',
            //Can add to inventory
            canTake: false,
            //If this is false, once you see it by looking "here" this is set to true
            canSeeFromDistance: true,
          },
        },
      ],
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
      items: [
        {
          key: {
            message: 'a small silver key',
            canTake: true,
            canSeeFromDistance: false,
          },
        },
      ],
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
      canOpen: {
        key: true,
      },
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
