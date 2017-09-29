const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const ENV = process.env.NODE_ENV || 'development';
const config = require('./config/app.json')[ENV];
const path = require('path');

server.listen(config.port);
app.use(bodyParser.json());
app.use('/', express.static(path.resolve(__dirname, config.static)));

app.get('/ping', function(req, res) {
  res.sendStatus(200);
});

io.on('connection', function (socket) {
  socket.emit('action', { type: 'CHANGE_TEMP_CP', temp: 18 });
  socket.on('action', function (data) {
    console.log(data);
  });
});
