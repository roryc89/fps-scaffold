const io = require('socket.io-client');

const socket = io('http://localhost:1080');

socket.on('new player', (data) => {
  console.log('newdata');
});

socket.on('other player position', (data) => {
  console.log('other pos', data);
});

const lastPosition = {x: null, y: null, z:null};

const emitPlayerPosition = (position) => {
  if (positionsDifferent(position, lastPosition)) {
    socket.emit('position', position);
    lastPosition.x = position.x;
    lastPosition.y = position.y;
    lastPosition.z = position.z;
  }
};

const positionsDifferent = (p1, p2) => !p1 || !p2 || (p1.x !== p2.x || p1.y !== p2.y || p1.z !== p2.z);

module.exports = {
  emitPlayerPosition
};
