const THREE = require('three');
const PointerLockControls = require('three-pointerlock');
const blocker = require('../blocker');
const controls = require('../controls');
const getFloor = require('./get_floor');
const getSpotLight = require('./get_spot_light');
const getRenderer = require('./get_renderer');
const getPlayer = require('../get_player');
const getScene = require('../get_scene');

module.exports = () => {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  const scene = new THREE.Scene();
  getScene.init(scene);
  const pointerLockControls = new PointerLockControls(camera);
  blocker(pointerLockControls);
  scene.add(pointerLockControls.getObject());
  controls.init(scene, pointerLockControls);
  getPlayer.init(pointerLockControls);

  const raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

  const ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);

  const light = getSpotLight();
  scene.add(light);

  const floor = getFloor();
  scene.add(getFloor());
  const objects = [ floor ];

  const renderer = getRenderer();
  document.body.appendChild(renderer.domElement);
  //
  window.addEventListener('resize', onWindowResize, false);

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  return {
    camera,
    scene,
    renderer,
    raycaster,
    objects
  };
};
