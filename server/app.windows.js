const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/app.json')[ENV];
const path = require('path');

server.listen(config.port, function() {
  console.log('NODE_ENV', ENV);
  console.log('Server has been started on port ', config.port);
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, config.static)));

app.get('/ping', function(req, res) {
  console.log('ping');
  res.sendStatus(200);
});

io.on('connection', function (socket) {
  console.log('new client connected');

  socket.on('action', function (action) {
    console.log(action, process.pid);
  });

  socket.on('disconnect', function () {
    io.emit('user disconnected');
  });

});
