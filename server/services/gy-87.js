const board = require('./board');
const five = require('johnny-five');
const KalmanFilter = require('kalmanjs').default;
const kfX = new KalmanFilter({R: 0.01, Q: 3});
const kfY = new KalmanFilter({R: 0.01, Q: 3});
const kfZ = new KalmanFilter({R: 0.01, Q: 3});

let imu  = null;
let compass = null;
let barometer = null;

module.exports = {
  subscribe,
  unSubscribe
};

board.on('ready', () => {
  imu = new five.IMU({
    controller: 'MPU6050',
    freq: 300
  });

  //compass = new five.Compass({
  //  controller: "HMC5883L",
  //  freq: 300,
  //  address: 0x1E
  //});

  barometer = new five.Barometer({
    controller: "BMP180",
    freq: 300
  });

});



function subscribe(callback) {
  imu.on('data', (data) => {
    //
    //console.log("Gyro: %d, %d, %d", data.gyro.x, data.gyro.z, data.gyro.z);
    callback({
      accelerometer: {
        x: kfX.filter(data.accelerometer.x),
        y: kfY.filter(data.accelerometer.y),
        z: kfZ.filter(data.accelerometer.z)
      },
      gyro: {
        x: data.gyro.x,
        y: data.gyro.y,
        z: data.gyro.z
      },
      temperature: data.temperature.celsius
    })
  });
  //compass.on('data', (data) => {
  //  callback({
  //    heading: Math.floor(data.heading),
  //    bearing: data.bearing.point
  //  });
  //});


  barometer.on('data', (data) => {
    callback({
      pressure: data.pressure
    });
  })
}

function unSubscribe() {
  imu.off('data');
}

board.on('exit', () => {

});


