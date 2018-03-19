const board = require('./board');
const five = require('johnny-five');

const LEFT = 1;
const RIGHT = 2;

let leftMotors;
let rightMotors;
let leftFrontServo;
let rightFrontServo;
let leftBackServo;
let rightBackServo;

module.exports = {
  changeMotors,
  changeDirection
};

board.on('ready', () => {
  leftMotors = new five.Motor({
    pins: [4, 5, 6],
    controller: 'PCA9685',
    address: 0x40
  });

  rightMotors = new five.Motor({
    pins: [7, 8, 9],
    controller: 'PCA9685',
    address: 0x40
  });

  leftFrontServo = new five.Servo({
    controller: 'PCA9685',
    pin: 12,
    invert: true,
    offset: -7,
    startAt: 90
  });

  leftBackServo = new five.Servo({
    controller: 'PCA9685',
    pin: 13,
    invert: true,
    offset: -7,
    startAt: 90
  });

  rightFrontServo = new five.Servo({
    controller: 'PCA9685',
    pin: 14,
    invert: true,
    offset: 10,
    startAt: 90
  });

  rightBackServo = new five.Servo({
    controller: 'PCA9685',
    pin: 15,
    invert: true,
    offset: -7,
    startAt: 90
  });
});

board.on('exit', () => {
  fullStop();
});

function changeMotors(left, right) {
  if (left > 0) {
    leftMotors.forward(left);
  } else if (left < 0) {
    leftMotors.reverse(Math.abs(left));
  } else {
    leftMotors.stop();
  }

  if (right > 0) {
    rightMotors.forward(right);
  } else if (right < 0) {
    rightMotors.reverse(Math.abs(right));
  } else {
    rightMotors.stop();
  }
}

function changeDirection(dir) {
  switch (dir) {
    case LEFT:
      turnLeft();
      break;
    case RIGHT:
      turnRight();
      break;
    default:
      goStraight();
  }
}

function goStraight() {
  leftFrontServo.to(90);
  leftBackServo.to(90);
  rightFrontServo.to(90);
  rightBackServo.to(90);
}

function turnRight() {
  leftFrontServo.to(60);
  leftBackServo.to(120);
  rightFrontServo.to(60);
  rightBackServo.to(120);
}

function turnLeft() {
  leftFrontServo.to(120);
  leftBackServo.to(60);
  rightFrontServo.to(120);
  rightBackServo.to(60);
}

function fullStop() {
  rightMotors.stop();
  leftMotors.stop();
}
