const board = require('./board');
const five = require('johnny-five');

let sensor = null;
let virtual = null;
const pga = 6114;

module.exports = {
  onData,
  off
};

board.on('ready', function() {
  virtual = new five.Board.Virtual(new five.Expander({ controller: 'ADS1115' }));
  virtual.io.REGISTER.PIN_DATA = 0xa3;

  sensor = new five.Sensor({
    pin: 0,
    board: virtual,
    freq: 750
  });
});

function onData(callback) {
  sensor.enable();
  sensor.on('data', function() {
    let data = -1;
    const val = this.value;
    if (val > 0x7FFF) {
      data = (val - 0xFFFF) * pga / 32768.0;
    } else {
      data = val * pga / 32768.0;
    }

    const distance = getDistanceFromVoltage(data /1000);
    callback({ distance });
  });
}

function off() {
  sensor.disable();
}

board.on('exit', () => {
  sensor.disable();
});

function getDistanceFromVoltage(volts) {
  return 137.5 / (volts - 1.125);
}
