setTileUse = (key) => {
  let objectProperty = {
    42: function (name, y, x) {
      if (name == 'key') {
        map[y][x].canPass = true;
        map[y][x].message = 'You are standing in an open passage';
        map[y][x].lookRes = 'an open gateway';
        handleOutput('fromObject', 'the gate is open');
      }
    },
  };

  return objectProperty[key];
};

module.exports.setTileUse = setTileUse;
