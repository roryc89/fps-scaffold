let _pointerLockControls;
// returns player object that provides your player location and velocity
module.exports = () =>
  _pointerLockControls.getObject();

module.exports.init = (pointerLockControls) => {
  _pointerLockControls = pointerLockControls;
};
