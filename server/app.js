const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/app.json')[ENV];
const path = require('path');
const tempService = require('./services/temp');
const wifiService = require('./services/wifi');
const towerService = require('./services/tower');
const chassisService = require('./services/chassis');
const imuService = require('./services/imu');
const distanceService = require('./services/distance');
require('./services/geiger');

server.listen(config.port, function() {
  console.log('Server has been started on port ', config.port);
});

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, config.static)));

app.get('/ping', function(req, res) {
  console.log('ping');
  res.sendStatus(200);
});

io.on('connection', function (socket) {
  console.log('ws connected');
  let fromFront = {
    towerEnabled: 0,
    towerX: 90,
    towerY: 90,
    leftMotors: 0,
    rightMotors: 0,
    direction: 0
  };

  let toFront = {
    CPTemp: 16,
    distance: 0,
    wifiQuality: 100,
    //MPU6050
    accelerometerX: 0,
    accelerometerY: 0,
    accelerometerZ: 0,
    gyroPitch: 0,
    gyroRoll: 0,
    gyroYaw: 0,

    // BMP180
    barometerPressure: 0,
    altimeterMeters: 0,
    thermometer: 0,
    //HMC5883L
    compass: 0
  };

  const dataSendInterval = setInterval(() => {
    socket.emit('a', Object.values(toFront));
  }, 250);

  tempService.onData((err, temp) => {
    toFront.CPTemp = temp;
  });

  distanceService.onData((distance) => {
    toFront.distance = distance;
  });

  wifiService.onData((percentage) => {
    toFront.wifiQuality = percentage;
  });

  imuService.onData((imuData)=> {
    toFront = { ...toFront, ...imuData };
  });

  socket.on('a', function(dataArr) {
    const [
      towerEnabled,
      towerX,
      towerY,
      leftMotors,
      rightMotors,
      direction
    ] = dataArr;
    towerService.changePositionX(towerX);
    towerService.changePositionY(towerY);
    towerService.changeServosState(towerEnabled);
    chassisService.changeMotors(leftMotors, rightMotors);
    chassisService.changeDirection(direction);
  });

  socket.on('disconnect', function () {
    tempService.off();
    distanceService.off();
    clearInterval(dataSendInterval);
    io.emit('user disconnected');
  });
  socket.on('error', () => {
    console.log('ws error')
  })

});
