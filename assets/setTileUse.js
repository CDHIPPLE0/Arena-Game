setTileUse = (key) => {
  let objectProperty = {
    23: function (name, y, x) {
      if (name == 'key') {
        console.log(name);
        map[y][x].canPass = true;
        map[y][x].message = 'You are standing in an open passage';
        map[y][x].lookRes = 'An open gate';
        handleOutput('fromObject', 'the gate is open');
      }
    },
  };

  return objectProperty[key];
};

module.exports.setTileUse = setTileUse;
