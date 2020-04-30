const path = require("path");
const { expect } = require("chai");
const snapshotDirConstructor = require("./snapshotDirConstructor");
const testNameConstructor = require("./testNameConstructor");
const getExistingSnaps = require("./getExistingSnaps");
const writeSnapshots = require("./writeSnapshots");

const snapshotExtension = ".snap";
const updateSnapshots = process.argv.includes("--update");

const matchSnapshot = (value, context, hint, name, additionalFolder, snapshotPath) => {
  const testDir = path.dirname(context._runnable.file);
  const testFileName = path.basename(context._runnable.file).split(".test.js")[0];
  const snapshotDir = snapshotDirConstructor(testDir, additionalFolder, snapshotPath);
  const snapshotFilePath = path.join(snapshotDir, testFileName + snapshotExtension);
  const testName = testNameConstructor(context.test.fullTitle(), hint, name);
  const snaps = getExistingSnaps(snapshotDir, snapshotFilePath);

  if (Object.hasOwnProperty.call(snaps, testName) && !updateSnapshots) {
    expect(value).to.eql(snaps[testName]);
  } else {
    snaps[testName] = value;
    writeSnapshots(snaps, snapshotFilePath);
  }
};

module.exports = matchSnapshot;
