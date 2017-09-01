const socketIo = require('socket.io');
const http = require('http');

module.exports = (app) => {

  const server = http.Server(app);
  const io = socketIo(server);

  server.listen(1080);

  io.on('connection', (socket) => {
    console.log('player connected');

    socket.broadcast.emit('new player');

    socket.on('position', (position) => {
      console.log('position', position)
      socket.broadcast.emit('other player position', position);
    });

  });

};
