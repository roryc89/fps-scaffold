const init = require('./init/init');
const animate = require('./animate');

animate.start(init());

// function startAnimation(options){
//   const {
//     camera,
//     scene,
//     renderer,
//     pointerLockControls,
//     raycaster,
//     objects
//   } = options;
//
//   let prevTime = performance.now();
//
//   const animate = () => {
//     requestAnimationFrame(animate);
//     if (!blocker.enabled) {
//       const time = performance.now();
//       movePlayer(pointerLockControls, objects, raycaster, prevTime, time);
//       sockets.emitPlayerPosition(pointerLockControls.getObject().position);
//       prevTime = time;
//     }
//     renderer.render(scene, camera);
//   };
//   animate();
// }
