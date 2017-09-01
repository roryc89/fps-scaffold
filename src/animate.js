const sockets = require('./sockets');
const blocker = require('./blocker');
const movePlayer = require('./move_player');
const getPlayer = require('./get_player');

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
    requestAnimationFrame(animate);
    if (!blocker.enabled) {
      const time = performance.now();
      movePlayer(objects, raycaster, prevTime, time);
      sockets.emitPlayerPosition(getPlayer().position);
      prevTime = time;
    }
    renderer.render(scene, camera);
  };
  animate();
};

module.exports = {
  start
};
