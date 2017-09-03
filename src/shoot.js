const getPlayer = require('./get_player');
const sockets = require('./sockets');
const blocker = require('./blocker');

module.exports = () => {
  console.log('ive shot');
  if(!blocker.enabled){
    sockets.emitShotFired(getPlayer());
  }
};
