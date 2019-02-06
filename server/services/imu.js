const board = require('./board');
const five = require('johnny-five');

let imu  = null;
let compass = null;
let multi = null;

module.exports = {
  onData,
  off
};

board.on('ready', function () {
  board.i2cWrite(0x68, [0x37, 0x02]);
  board.i2cWrite(0x68, [0x6A, 0x00]);
  board.i2cWrite(0x68, [0x6B, 0x00]);

  imu = new five.IMU({
    controller: 'MPU6050',
    freq: 250
  });

  compass = new five.Compass({
    controller: "HMC5883L",
  });

  multi = new five.Multi({
    controller: "BMP180"
  });

});



function onData(callback) {
  imu.on("change",()=> {

    console.log("gyro pitch", imu.gyro.rate, imu.gyro.pitch, " roll", imu.gyro.roll, "yaw", imu.gyro.yaw);
    callback({
      //MPU6050
      accelerometerX: imu.accelerometer.x,
      accelerometerY: imu.accelerometer.y,
      accelerometerZ: imu.accelerometer.z,
      gyroPitch: imu.gyro.pitch.angle,
      gyroRoll: imu.gyro.roll.angle,
      gyroYaw: imu.gyro.yaw.angle,
      // BMP180
      barometerPressure: multi.barometer.pressure,
      altimeterMeters: multi.altimeter.meters,
      thermometer: multi.thermometer.celsius,
      //HMC5883L
      compass: Math.floor(compass.heading)
    });
  });
}

function off() {
  imu.off('data');
}

board.on('exit', () => {

});


