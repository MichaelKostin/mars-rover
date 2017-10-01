const board = require('./board');
const five = require('johnny-five');
let xServo;
let yServo;

module.exports = {
  changePositionX,
  changePositionY,
  stopServos
};

board.on('ready', () => {
  xServo = new five.Servo({
    controller: 'PCA9685',
    pin: 0,
    invert: true
  });

  yServo = new five.Servo({
    controller: 'PCA9685',
    pin: 1
  });
});

board.on('exit', () => {
  stopServos();
});

function changePositionY(y) {
  yServo.to(y);
}

function changePositionX(x) {
  xServo.to(x);
}

function stopServos() {
  xServo.stop();
  yServo.stop();
}
