const tiles = require('./tiles');
const setItemMapPos = require('./setItemMapPos');
let { gameState } = require('../modules/gameState');

const map = [
  ['x', 'x', 'x', 'x', 'x'],
  ['x', 'U', 'x', 'E', 'x'],
  ['x', 'U', 'x', 'G', 'x'],
  ['x', 'v', 'u', 'w', 'x'],
  ['x', 'o', 'u', 'o', 'x'],
  ['x', 'U', 'u', 'U', 'x'],
  ['x', 'x', 'g', 'x', 'x'],
];

let itY = (itX = 0);
while (itY < map.length) {
  while (itX < map[0].length) {
    let refElement = tiles.tiles(map[itY][itX].toString());
    let newElement = {
      lookRes: refElement.lookRes,
      canPass: refElement.canPass,
      message: refElement.message,
      items: [],
      canOpen: {},
    };
    map[itY][itX] = newElement;
    let coordinates = itY.toString() + itX.toString();
    let getItemForTile = setItemMapPos.setItemMapPos(coordinates);
    if (!!getItemForTile) {
      map[itY][itX].items.push({ getItemForTile });
    }
    itX++;
  }
  itX = 0;
  itY++;
}

exports.map = map;
