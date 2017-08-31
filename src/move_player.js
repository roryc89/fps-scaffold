var THREE = require('three');
const {movements} = require('./controls');

var velocity = new THREE.Vector3();

module.exports = function(pointerLockControls, objects, raycaster, prevTime, time){
  raycaster.ray.origin.copy(pointerLockControls.getObject().position);
  raycaster.ray.origin.y -= 10;
  var intersections = raycaster.intersectObjects(objects);
  var isOnObject = intersections.length > 0;
  var delta = (time - prevTime) / 1000;
  velocity.x -= velocity.x * 10.0 * delta;
  velocity.z -= velocity.z * 10.0 * delta;
  velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

  if (movements.forward)
    velocity.z -= 2000.0 * delta;

  if (movements.backward)
    velocity.z += 1000.0 * delta;

  if (movements.left)
    velocity.x -= 1000.0 * delta;

  if (movements.right)
    velocity.x += 1000.0 * delta;

  if (isOnObject === true) {
    velocity.y = Math.max(0, velocity.y);
    movements.canJump = true;
  }

  if (movements.jumping){
    velocity.y = 350;
    movements.jumping = false;
    movements.canJump = false;
  }

  pointerLockControls.getObject().translateX(velocity.x * delta);
  pointerLockControls.getObject().translateY(velocity.y * delta);
  pointerLockControls.getObject().translateZ(velocity.z * delta);
  if (pointerLockControls.getObject().position.y < 10) {
    velocity.y = 0;
    pointerLockControls.getObject().position.y = 10;
    movements.canJump = true;
  }
};
