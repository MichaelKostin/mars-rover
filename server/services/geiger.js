const board = require('./board');
const five = require('johnny-five');
let triggerPin = null;

board.on('ready', () => {
  triggerPin = new five.Pin({
    mode: five.Pin.INPUT,
    pin: 1
  });

  triggerPin.on('high', () => {
    console.log('high');
  })

  triggerPin.on('low', () => {
    console.log('low');
  })

  triggerPin.query(function(state) {
    console.log(state);
  });

});

board.on('exit', () => {
  //exit
});
