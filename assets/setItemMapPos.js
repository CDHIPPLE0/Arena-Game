setItemMapPos = (key) => {
  let itemSet = {
    53: {
      name: 'ruby key',
      message: 'a small ruby key',
      canTake: true,
      canSeeFromDistance: false,
    },
    31: {
      name: 'silver key',
      message: 'a small silver key',
      canTake: true,
      canSeeFromDistance: false,
    },
    51: {
      name: 'golden key',
      message: 'a small golden key',
      canTake: true,
      canSeeFromDistance: false,
    },
    41: {
      name: 'prop',
      message: 'deep scratches on the pillar',
      canTake: false,
      canSeeFromDistance: true,
    },
    50: {
      name: 'prop',
      message: 'a strange stain on the wall',
      canTake: false,
      canSeeFromDistance: true,
    },
  };

  return itemSet[key];
};

module.exports.setItemMapPos = setItemMapPos;
