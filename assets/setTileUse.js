setTileUse = (key) => {
  let objectProperty = {
    23: function (name, y, x) {
      if (name == 'silver key') {
        map[y][x].canPass = true;
        map[y][x].message = 'You are standing in an open passage';
        map[y][x].lookRes = 'an open gateway';
        handleOutput('fromObject', 'The gate is open');
      } else {
        handleOutput(
          'fromObject',
          'The silver lock cannot be opened by this item'.green
        );
      }
    },
  };

  return objectProperty[key];
};

module.exports.setTileUse = setTileUse;
