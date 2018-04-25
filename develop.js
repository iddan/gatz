const liveServer = require("live-server");
const Watchpack = require('watchpack');
const build = require('./build')

module.exports = function develop(directory) {
  var wp = new Watchpack({
    ignored: /build/,
  });
  wp.on("change", (filePath, mtime) => {
    build(directory);
  });
  wp.watch([], [directory], Date.now() - 10000);
  liveServer.start({
    root: './build'
  });
}
