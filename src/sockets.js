// handles socket communication with server for updating your player location
// and getting other player locations
const io = require('socket.io-client');
const Avatar = require('./Avatar');
const getScene = require('./get_scene');
const otherPlayers = require('./other_players');

const socket = io('http://localhost:1080');

socket.on('player data', (playerData) => {

  delete playerData[socket.id];
  otherPlayers.set(playerData);

  Object.keys(playerData).forEach((id) => {
    const avatar = Avatar.create();

    getScene().add(avatar.mesh);
    avatar.name = id;

    otherPlayers.get()[id].avatar = avatar;
    const {x, y, z} = playerData[id].position;
    avatar.mesh.position.set(x, y, z);
  });
});

socket.on('new player', ({id}) => {

  const avatar = Avatar.create();
  getScene().add(avatar.mesh);

  avatar.name = id;
  otherPlayers.get()[id] = {position:{}, avatar};
});

socket.on('other player position', ({id, position}) => {
  otherPlayers.get()[id].position = position;
});

socket.on('other player disconnected', ({id}) => {
  console.log('other player disconnected')
  const players = otherPlayers.get();

  const avatar = players[id].avatar;
  getScene().remove(avatar);
  delete players[id];
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

const positionsDifferent = (p1, p2) =>
 !p1 || !p2 || p1.x !== p2.x || p1.y !== p2.y || p1.z !== p2.z;

module.exports = {
  emitPlayerPosition
};
