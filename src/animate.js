const sockets = require('./sockets');
const blocker = require('./blocker');
const movePlayer = require('./move_player');
const getPlayer = require('./get_player');
const otherPlayers = require('./other_players')
const moveOtherPlayer = require('./move_other_player')

const start = (options) => {
  const {
    camera,
    scene,
    renderer,
    raycaster,
    objects
  } = options;

  let prevTime = performance.now();

  const animate = () => {
     // this sets up animation to run again on the next available animation frame
    requestAnimationFrame(animate);
    if (!blocker.enabled) {
      const time = performance.now();
      movePlayer(objects, raycaster, prevTime, time);
      sockets.emitPlayerPosition(getPlayer().position);
      const players = otherPlayers.get();
      Object.keys(players).forEach((id) => {
        moveOtherPlayer(id, players[id]);
      });

      prevTime = time;
    }
    renderer.render(scene, camera);
  };
  animate();
};

module.exports = {
  start
};
