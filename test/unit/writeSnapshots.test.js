const writeSnapshots = require('../../src/writeSnapshots');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

ENV_VARS = process.argv;

currentPath = __dirname;

describe('writeSnapshots', function () {
  before(function () {
    this.folderPath = path.join(currentPath, '__snapshots__', 'writeSnapshots');
    this.defaultsFolderPath = path.join(this.folderPath, 'defaults');

    this.sourceEmptyFile = path.join(this.defaultsFolderPath, 'emptyFile.snap');

    this.sourceSnapshotFile = path.join(this.defaultsFolderPath, 'snapshotFile.snap');
  });

  describe('when a single snapshot is provided', function () {
    before(function () {
      this.newFile = path.join(this.folderPath, 'newFile_single.snap');

      this.emptyFile = path.join(this.folderPath, 'emptyFile_single.snap');

      this.snapshotFile = path.join(this.folderPath, 'snapshotFile_single.snap');

      this.baselineFile = path.join(this.defaultsFolderPath, 'baselineSingleSnapshot.snap');

      fs.copyFileSync(this.sourceEmptyFile, this.emptyFile);
      fs.copyFileSync(this.sourceSnapshotFile, this.snapshotFile);

      this.snaps = { 'snapshot title': 'Single snapshot test' };
    });

    describe('and the snapshotFilePath points to an non-existent file', function () {
      it('creates the file and writes the snapshot', function () {
        writeSnapshots(this.snaps, this.newFile);

        expect(fs.existsSync(this.newFile)).to.be.true;

        const baselineFile = require(this.baselineFile);
        const newFile = require(this.newFile);

        expect(newFile).to.eql(baselineFile);
      });
    });

    describe('and the snapshotFilePath points to an empty file', function () {
      it('writes the snapshot on the empty file', function () {
        writeSnapshots(this.snaps, this.emptyFile);

        expect(fs.existsSync(this.emptyFile)).to.be.true;

        const baselineFile = require(this.baselineFile);
        const emptyFile = require(this.emptyFile);

        expect(emptyFile).to.eql(baselineFile);
      });
    });

    describe('and the snapshotFilePath points to an existing file with other snapshots', function () {
      it('writes the snapshot over the existing ones', function () {
        writeSnapshots(this.snaps, this.snapshotFile);

        expect(fs.existsSync(this.snapshotFile)).to.be.true;

        const baselineFile = require(this.baselineFile);
        const snapshotFile = require(this.snapshotFile);

        expect(snapshotFile).to.eql(baselineFile);
      });
    });

    after(function () {
      fs.unlinkSync(this.emptyFile);
      fs.unlinkSync(this.snapshotFile);
      fs.unlinkSync(this.newFile);
    });
  });

  describe('when an object with multiple snapshots is provided', function () {
    before(function () {
      this.newFile = path.join(this.folderPath, 'newFile_multiple.snap');

      this.emptyFile = path.join(this.folderPath, 'emptyFile_multiple.snap');

      this.snapshotFile = path.join(this.folderPath, 'snapshotFile_multiple.snap');

      this.baselineFile = path.join(this.defaultsFolderPath, 'baselineMultipleSnapshots.snap');

      fs.copyFileSync(this.sourceEmptyFile, this.emptyFile);
      fs.copyFileSync(this.sourceSnapshotFile, this.snapshotFile);

      this.snaps = {
        'first snapshot': {
          a: {
            b: 1,
            c: 2,
          },
          d: 3,
        },
        'second snapshot': [1, 2, 3, 4, 5],
      };
    });

    describe('and the snapshotFilePath points to an non-existent file', function () {
      it('creates the file and writes the snapshot', function () {
        writeSnapshots(this.snaps, this.newFile);

        expect(fs.existsSync(this.newFile)).to.be.true;

        const baselineFile = require(this.baselineFile);
        const newFile = require(this.newFile);

        expect(newFile).to.eql(baselineFile);
      });
    });

    describe('and the snapshotFilePath points to an empty file', function () {
      it('writes the snapshot on the empty file', function () {
        writeSnapshots(this.snaps, this.emptyFile);

        expect(fs.existsSync(this.emptyFile)).to.be.true;

        const baselineFile = require(this.baselineFile);
        const emptyFile = require(this.emptyFile);

        expect(emptyFile).to.eql(baselineFile);
      });
    });

    describe('and the snapshotFilePath points to an existing file with other snapshots', function () {
      it('writes the snapshot over the existing ones', function () {
        writeSnapshots(this.snaps, this.snapshotFile);

        expect(fs.existsSync(this.snapshotFile)).to.be.true;

        const baselineFile = require(this.baselineFile);
        const snapshotFile = require(this.snapshotFile);

        expect(snapshotFile).to.eql(baselineFile);
      });
    });

    after(function () {
      fs.unlinkSync(this.emptyFile);
      fs.unlinkSync(this.snapshotFile);
      fs.unlinkSync(this.newFile);
    });
  });

  describe('when we are in a CI environment', function () {
    it('returns an error', function () {
      const folderPath = path.join(currentPath, '__snapshots__', 'writeSnapshots');
      const filePath = path.join(folderPath, 'ciSystem.snap');

      process.argv = [...process.argv, '--ci'];

      snaps = { 'snapshot title': 'Hello World!' };

      expect(() => {
        writeSnapshots(snaps, filePath);
      }).to.throw("Snapshots can't be created on CI environment");
    });

    after(function () {
      process.argv = ENV_VARS;
    });
  });
});
