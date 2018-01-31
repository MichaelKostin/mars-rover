const board = require('./board');
const five = require('johnny-five');

let leftMotors;
let rightMotors;

module.exports = {
  changeMotors
};

board.on('ready', () => {
  leftMotors = new five.Motor({
    pins: [5, 6, 7],
    controller: "PCA9685",
    address: 0x40
  });

  rightMotors = new five.Motor({
    pins: [8, 9, 10],
    controller: "PCA9685",
    address: 0x40
  });
});

board.on('exit', () => {
  fullStop();
});

function changeMotors(left, right) {
  console.log(left, right, typeof left);

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

function fullStop() {

}
