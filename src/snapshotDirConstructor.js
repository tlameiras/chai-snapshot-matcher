const path = require('path');

const snapshotsFolder = '__snapshots__';

const snapshotDirConstructor = (testDir, additionalFolder, snapshotPath) => {
  if (snapshotPath !== '') return snapshotPath;

  if (additionalFolder !== '') return path.join(testDir, snapshotsFolder, additionalFolder);

  return path.join(testDir, snapshotsFolder);
};

module.exports = snapshotDirConstructor;
