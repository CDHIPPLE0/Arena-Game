let outputMessage = {
  invalidMove3: `${detail}\n`,
  error: 'ERROR !.',
  start: `You are standing in front of a closed gate, before you lies a dark arena
     Base Commands: walk 
     Directions : west, east, north etc.
     System : exit, restart`,
  fromObject: detail,
  invalidMove1: 'You cannot move in multiple directions',
  invalidMove2: 'Be more specific',
};

exports.outputMessage = outputMessage;
