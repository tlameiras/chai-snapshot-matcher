const fs = require("fs");
const checkCI = require("./checkCI");

const getExistingSnaps = (snapshotDir, snapshotFilePath) => {
  let snaps = {};

  if (!fs.existsSync(snapshotDir)) {
    checkCI();
    fs.mkdirSync(snapshotDir, { recursive: true });
  }

  if (fs.existsSync(snapshotFilePath)) snaps = require(snapshotFilePath);
  else checkCI();

  return snaps;
};

module.exports = getExistingSnaps;
