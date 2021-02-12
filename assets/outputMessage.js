const outputMessage = {
  error: 'ERROR !.',
  start: String.raw` 

       -- Behind you is a sealed gate it is too dark to see far --
  -----------------------------------------------------------------------
                  AAA   RRRRRR  EEEEEEE NN   NN   AAA   
                 AAAAA  RR   RR EE      NNN  NN  AAAAA  
                AA   AA RRRRRR  EEEEE   NN N NN AA   AA 
                AAAAAAA RR  RR  EE      NN  NNN AAAAAAA 
                AA   AA RR   RR EEEEEEE NN   NN AA   AA 
  -----------------------------------------------------------------------
  Base Commands: walk, look, take, wield
  Directions : north, east, south, west, here
  System : exit, reset, debug `,
  gameScreen: String.raw`                          
  -----------------------------------------------------------------------
                  AAA   RRRRRR  EEEEEEE NN   NN   AAA   
                 AAAAA  RR   RR EE      NNN  NN  AAAAA  
                AA   AA RRRRRR  EEEEE   NN N NN AA   AA 
                AAAAAAA RR  RR  EE      NN  NNN AAAAAAA 
                AA   AA RR   RR EEEEEEE NN   NN AA   AA 
  -----------------------------------------------------------------------
 `,
  invalidMove1: 'You can perform one action per turn',
  commandList: `Base Commands: walk, look, use, take, wield
              Directions : north, east, south, west, here
              System : exit, debug `,
  invalidMove2: 'Invalid command',
  invalidMove3: 'You cannot move there',
  win: 'You made it out alive!',
  debug: 'debug toggled',
};

module.exports.outputMessage = outputMessage;
