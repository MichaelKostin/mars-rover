const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/app.json')[ENV];
const path = require('path');
const tempService = require('./services/temp');

server.listen(config.port);
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

  socket.on('action', function (data) {
    console.log(data);
  });

  socket.on('disconnect', function () {
    tempService.stop();
    io.emit('user disconnected');
  });

});
