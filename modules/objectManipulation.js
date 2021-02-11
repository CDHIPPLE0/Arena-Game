objectManipulation = (command) => {
  take = () => {
    initY = gameState.posY;
    initX = gameState.posX;
    let item;
    if (map[initY][initX].items[0] != undefined) {
      item = map[initY][initX].items[0].getItemForTile;
    } else item = undefined;
    if (item != undefined) {
      handleOutput('fromObject', `take ${item.message.white}? yes/no`);
      let command = process.stdin.on('data', (data) => {
        let command = data.toString().trim();
        command == 'yes'
          ? gameState.transfer()
          : handleOutput('fromObject', 'you leave the item');
      });
    } else handleOutput('fromObject', `nothing to take!`);
  };
  let statement = [];
  for (const [key, value] of Object.entries(command)) {
    if (value == true) {
      statement.push(key);
    }
  }
  if (statement[0] == 'take') {
    take('take');
  }
};

module.exports.objectManipulation = objectManipulation;
