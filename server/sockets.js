const socketIo = require('socket.io');
const http = require('http');
const playerData = require('./player_data')

module.exports = (app) => {

  const server = http.Server(app);
  const io = socketIo(server);

  server.listen(1080);

  io.on('connection', (socket) => {
    console.log('player connected');
    socket.emit('player data', playerData);

    const {id} = socket;

    socket.broadcast.emit('new player', {id});

    socket.on('position', (position) => {
      playerData[id] = {position};
      socket.broadcast.emit('other player position', {id, position});
    });

    socket.on('disconnect', function() {
      socket.broadcast.emit('other player disconnected', {id});
    });

  });

};
