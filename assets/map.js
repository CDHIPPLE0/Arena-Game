const tiles = require('./tiles');
const { x, o, u, v, w, G, E, U, g } = tiles.tiles;
//each map letter represents a tile object as imported above on a coordinate ^
const map = [
  [x, x, x, x, x],
  [x, U, x, E, x],
  [x, U, x, G, x],
  [x, v, u, w, x],
  [x, o, u, o, x],
  [x, U, u, U, x],
  [x, x, g, x, x],
];

exports.map = map;
