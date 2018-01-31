const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/app.json')[ENV];
const path = require('path');
const tempService = require('./services/temp');
const towerService = require('./services/tower');
const motorService = require('./services/motor');

server.listen(config.port, function() {
  console.log('Server has been started on port ', config.port);
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, config.static)));

app.get('/ping', function(req, res) {
  console.log('ping');
  res.sendStatus(200);
});

io.on('connection', function (socket) {
  tempService.run((err, temp) => {
    if (err) {
      console.error(err);
    } else {
      socket.emit('action', { type: 'CHANGE_TEMP_CP', temp });
    }
  });

  socket.on('action', function (action) {
    switch (action.type) {
      case 'S_T_XY':
        towerService.changePositionX(action.x);
        towerService.changePositionY(action.y);
       // socket.emit('action', { type: `||||||:${action.type}`, degree: action.degree });
        break;
      case 'S_TOWER_CTR':
        towerService.stopServos();
        break;
      case 'S_CHANGE_MOTORS':
        motorService.changeMotors(action.left, action.right);
        break;
      default:
        console.error('Unhandled event: ', action);
    }
  });

  socket.on('disconnect', function () {
    tempService.stop();
    io.emit('user disconnected');
  });

});
