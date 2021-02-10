let itemsMisc = function itemsMisc(str) {
  let items = {
    key: {
      message: 'a small silver key',
      canTake: true,
      canSeeFromDistance: false,
    },
  };
  let item = items[str];
  return item;
};

exports.itemsMisc = itemsMisc;
