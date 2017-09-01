const THREE = require('three');

module.exports = function(){
  const floorTexture = new THREE.ImageUtils.loadTexture('images/grid.png');
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(50, 50);
  const geometry = new THREE.PlaneBufferGeometry(2500, 2500, 5, 5);
  geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  const material = new THREE.MeshLambertMaterial({map: floorTexture});
  const floor = new THREE.Mesh(geometry, material);
  floor.position.y = -25;

  floor.castShadow = false;
  floor.receiveShadow = true;
  return floor;
};
