const fs = require("fs");
const { promisify } = require("util");
const mkdir = promisify(fs.mkdir);

exports.assureDir = async function assureDir(path) {
  try {
    await mkdir(buildDir);
  } catch (err) {
    if (!err.code == "EEXIST") {
      throw err;
    }
  }
};

exports.fromPairs = pairs =>
  pairs.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
