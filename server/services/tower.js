const board = require('./board');
const five = require('johnny-five');
let xServo;
let yServo;

let currentX = null;
let currentY = null;

module.exports = {
  changePositionX,
  changePositionY,
  stopServos
};

board.on('ready', () => {
  xServo = new five.Servo({
    controller: 'PCA9685',
    pin: 0,
    invert: true,
    offset: -20
  });

  yServo = new five.Servo({
    controller: 'PCA9685',
    pin: 1,
    invert: true
  });
});

board.on('exit', () => {
  stopServos();
});

function changePositionY(y) {
  if (currentY === y) {
    return;
  }

  yServo.to(y);
  currentY = y;
}

function changePositionX(x) {
  if (currentX === x) {
    return;
  }

  xServo.to(x);
  currentX = x;
}

function stopServos() {
  xServo.stop();
  yServo.stop();
}
