// this file is the entry point (first file to be loaded) for the frontend src code
const init = require('./init/init');
const animate = require('./animate');

animate.start(init());
