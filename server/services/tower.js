const board = require('./board');
const five = require('johnny-five');
let xServo;
let yServo;

let currentX = null;
let currentY = null;
let enabled = false;

module.exports = {
  changePositionX,
  changePositionY,
  changeServosState
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

  const animation = new five.Animation(yServo);

  animation.enqueue({
    duration: 2000,
    cuePoints: [0, 0.25, 0.75, 1.0],
    keyFrames: [ {degrees: 90}, {degrees: 135}, {degrees: 45}, {degrees: 90}]
  });

  goToStart();
});

board.on('exit', () => {
  changeServosState(false);
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

function changeServosState(enable = false) {
  if (enabled && !enable) {
    enabled = false;
    xServo.stop();
    yServo.stop();
  } else if (!enabled && enable) {
    enabled = true;
  }
}

function goToStart() {

}
