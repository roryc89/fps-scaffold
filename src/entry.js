var THREE = require('three');
var PointerLockControls = require('three-pointerlock');
var blocker = require('./blocker');
var controls = require('./controls');
var getFloor = require('./get_floor');
var movePlayer = require('./move_player');

var camera;
var scene;
var renderer;
var pointerLockControls;

var objects = [];
var raycaster;

var prevTime = performance.now();

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  scene = new THREE.Scene();
  pointerLockControls = new PointerLockControls(camera);
  blocker(pointerLockControls);
  controls.init(scene, pointerLockControls)

  raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

  var ambient = new THREE.AmbientLight(0x444444);
  scene.add(ambient);

  var light = new THREE.SpotLight(0xffffff, 0.85, 0, Math.PI / 2, 1);
  light.position.set(0, 1500, 1000);
  light.target.position.set(0, 0, 0);

  scene.add(light);

  var floor = getFloor();

  scene.add(getFloor());
  objects.push(floor);

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (!blocker.enabled) {
    var time = performance.now();
    movePlayer(pointerLockControls, objects, raycaster, prevTime, time)
    prevTime = time;
  }
  renderer.render(scene, camera);
}
