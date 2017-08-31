var THREE = require('three');

module.exports = function(){
  var floorTexture = new THREE.ImageUtils.loadTexture('images/grid.png');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(50, 50);
  var geometry = new THREE.PlaneBufferGeometry(2500, 2500, 5, 5);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  var material = new THREE.MeshLambertMaterial({map: floorTexture});
  var floor = new THREE.Mesh(geometry, material);
  floor.position.y = -25;

  floor.castShadow = false;
  floor.receiveShadow = true;
  return floor;
};
