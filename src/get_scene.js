let _scene;
// returns scene for use in various other files
module.exports = () => _scene;

module.exports.init = (scene) => {
  _scene = scene;
};
