setItemMapPos = (key) => {
  let itemSet = {
    52: {
      name: 'key',
      message: 'a small silver key',
      canTake: true,
      canSeeFromDistance: false,
    },
    51: {
      name: 'key',
      message: 'a small silver key',
      canTake: true,
      canSeeFromDistance: false,
    },
    41: {
      name: 'prop',
      message: 'deep scratches on the pillar',
      canTake: false,
      canSeeFromDistance: true,
    },
    62: {
      name: 'prop',
      message: 'a strange stain on the wall',
      canTake: false,
      canSeeFromDistance: true,
    },
  };

  return itemSet[key];
};

module.exports.setItemMapPos = setItemMapPos;
