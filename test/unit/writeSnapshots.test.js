/* eslint-disable mocha/no-setup-in-describe */
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');
const writeSnapshots = require('../../src/writeSnapshots');

const ENV_VARS = process.argv;

const currentPath = __dirname;

describe('writeSnapshots', function () {
  describe('when a single or multiple snapshots are provided', function () {
    const folderPath = path.join(currentPath, '__snapshots__', 'writeSnapshots');
    const defaultsFolderPath = path.join(folderPath, 'defaults');
    const sourceEmptyFile = path.join(defaultsFolderPath, 'emptyFile.snap');
    const sourceSnapshotFile = path.join(defaultsFolderPath, 'snapshotFile.snap');

    const single = {
      newFile: path.join(folderPath, 'newFile_single.snap'),
      emptyFile: path.join(folderPath, 'emptyFile_single.snap'),
      snapshotFile: path.join(folderPath, 'snapshotFile_single.snap'),
      baselineFile: path.join(defaultsFolderPath, 'baselineSingleSnapshot.snap'),
      snaps: { 'snapshot title': 'Single snapshot test' },
    };

    const multiple = {
      newFile: path.join(folderPath, 'newFile_multiple.snap'),
      emptyFile: path.join(folderPath, 'emptyFile_multiple.snap'),
      snapshotFile: path.join(folderPath, 'snapshotFile_multiple.snap'),
      baselineFile: path.join(defaultsFolderPath, 'baselineMultipleSnapshots.snap'),
      snaps: {
        'first snapshot': {
          a: {
            b: 1,
            c: 2,
          },
          d: 3,
        },
        'second snapshot': [1, 2, 3, 4, 5],
      },
    };

    before(function () {
      fs.copyFileSync(sourceEmptyFile, single.emptyFile);
      fs.copyFileSync(sourceSnapshotFile, single.snapshotFile);

      fs.copyFileSync(sourceEmptyFile, multiple.emptyFile);
      fs.copyFileSync(sourceSnapshotFile, multiple.snapshotFile);
    });

    describe('and the snapshotFilePath points to an non-existent file', function () {
      const runs = [
        { it: 'creates the file and writes the single snapshot', option: single },
        { it: 'creates the file and writes the multiple snapshots', option: multiple },
      ];

      runs.forEach(function (run) {
        it(run.it, function () {
          writeSnapshots(run.option.snaps, run.option.newFile);

          expect(fs.existsSync(run.option.newFile)).to.be.true;

          const baselineFile = require(run.option.baselineFile);
          const newFile = require(run.option.newFile);

          expect(newFile).to.eql(baselineFile);
        });
      });
    });

    describe('and the snapshotFilePath points to an empty file', function () {
      const runs = [
        { it: 'writes the single snapshot on the empty file', option: single },
        { it: 'writes the multiple snapshots on the empty file', option: multiple },
      ];

      runs.forEach(function (run) {
        it(run.it, function () {
          writeSnapshots(run.option.snaps, run.option.emptyFile);

          expect(fs.existsSync(run.option.emptyFile)).to.be.true;

          const baselineFile = require(run.option.baselineFile);
          const emptyFile = require(run.option.emptyFile);

          expect(emptyFile).to.eql(baselineFile);
        });
      });
    });

    describe('and the snapshotFilePath points to an existing file with other snapshots', function () {
      const runs = [
        { it: 'writes the single snapshot over the existing ones', option: single },
        { it: 'writes the multiple snapshos over the existing ones', option: multiple },
      ];

      runs.forEach(function (run) {
        it(run.it, function () {
          writeSnapshots(run.option.snaps, run.option.snapshotFile);

          expect(fs.existsSync(run.option.snapshotFile)).to.be.true;

          const baselineFile = require(run.option.baselineFile);
          const snapshotFile = require(run.option.snapshotFile);

          expect(snapshotFile).to.eql(baselineFile);
        });
      });
    });

    after(function () {
      fs.unlinkSync(single.emptyFile);
      fs.unlinkSync(single.snapshotFile);
      fs.unlinkSync(single.newFile);
      fs.unlinkSync(multiple.emptyFile);
      fs.unlinkSync(multiple.snapshotFile);
      fs.unlinkSync(multiple.newFile);
    });
  });

  describe('when we are in a CI environment', function () {
    it('returns an error', function () {
      const folderPath = path.join(currentPath, '__snapshots__', 'writeSnapshots');
      const filePath = path.join(folderPath, 'ciSystem.snap');

      process.argv = [...process.argv, '--ci'];

      const snaps = { 'snapshot title': 'Hello World!' };

      expect(() => {
        writeSnapshots(snaps, filePath);
      }).to.throw("Snapshots can't be created on CI environment");
    });

    after(function () {
      process.argv = ENV_VARS;
    });
  });
});
