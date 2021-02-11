const { gameState } = require('./gameState');

module.exports.map = map = [
  ['x', 'x', 'x', 'x', 'x'],
  ['x', 'U', 'x', 'E', 'x'],
  ['x', 'U', 'x', 'G', 'x'],
  ['x', 'v', 'u', 'w', 'x'],
  ['x', 'o', 'u', 'o', 'x'],
  ['x', 'U', 'u', 'U', 'x'],
  ['x', 'x', 'g', 'x', 'x'],
];

gameState.time == 0;
let itY = (itX = 0);
while (itY < map.length) {
  while (itX < map[0].length) {
    let refElement = tiles(map[itY][itX].toString());
    let newElement = {
      lookRes: refElement.lookRes,
      canPass: refElement.canPass,
      message: refElement.message,
      items: [],
      use: refElement.use,
    };
    map[itY][itX] = newElement;
    let coordinates = itY.toString() + itX.toString();
    let getItemForTile = setItemMapPos(coordinates);
    let getTileUse = setTileUse(coordinates);
    if (!!getItemForTile) {
      map[itY][itX].items.push({ getItemForTile });
    }
    if (!!getTileUse) {
      map[itY][itX].use = getTileUse;
    }
    itX++;
  }
  itX = 0;
  itY++;
}
