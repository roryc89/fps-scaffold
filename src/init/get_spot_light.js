const THREE = require('three');

const getSpotLight = () => {
  const light = new THREE.SpotLight(0xffffff, 0.85, 0, Math.PI / 2, 1);
  light.position.set(0, 1500, 1000);
  light.target.position.set(0, 0, 0);
  return light;
};

module.exports = getSpotLight;
