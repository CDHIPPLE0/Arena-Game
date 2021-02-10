const itemsMisc = require('../assets/itemsMisc');

let setItemMapPos = function setItemMapPos(key) {
  let itemSet = {
    31: {
      message: 'a small silver key',
      canTake: true,
      canSeeFromDistance: false,
    },
  };
  let search = itemsMisc.itemsMisc(key);

  return itemSet[key];
};

exports.setItemMapPos = setItemMapPos;
