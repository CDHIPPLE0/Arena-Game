setItemMapPos = (key) => {
  let itemSet = {
    31: {
      message: 'a small silver key',
      canTake: true,
      canSeeFromDistance: false,
    },
    41: {
      message: 'deep scratches on the pillar',
      canTake: false,
      canSeeFromDistance: true,
    },
    62: {
      message: 'a strange stain on the wall',
      canTake: false,
      canSeeFromDistance: true,
    },
  };

  return itemSet[key];
};

module.exports.setItemMapPos = setItemMapPos;
