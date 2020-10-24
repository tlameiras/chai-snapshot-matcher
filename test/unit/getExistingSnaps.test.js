const getExistingSnaps = require('../../src/getExistingSnaps');
const { expect } = require('chai');
const path = require('path');
const fs = require('fs');

ENV_VARS = process.argv;

currentPath = __dirname;

describe('getExistingSnaps', function () {
  describe('when the snapshotDir and the snapshotFilePath point to a snapshot file', function () {
    describe('and the snapshot file is empty', function () {
      before(function () {
        this.folderPath = path.join(currentPath, '__snapshots__', 'getExistingSnaps');
        this.filePath = path.join(this.folderPath, 'emptyFile.snap');
      });

      it('returns an empty object', function () {
        const snaps = getExistingSnaps(this.folderPath, this.filePath);
        expect(snaps).to.eql({});
      });

      describe('in a CI system', function () {
        it('returns an empty object', function () {
          process.argv = [...process.argv, '--ci'];

          const snaps = getExistingSnaps(this.folderPath, this.filePath);
          expect(snaps).to.eql({});
        });

        after(function () {
          process.argv = ENV_VARS;
        });
      });
    });

    describe('and the snapshot file has a single snapshot', function () {
      before(function () {
        this.folderPath = path.join(currentPath, '__snapshots__', 'getExistingSnaps');
        this.filePath = path.join(this.folderPath, 'singleSnapshot.snap');

        this.expectedSnapshot = {
          'single snapshot': {
            a: {
              b: 1,
              c: 2,
            },
            d: 3,
          },
        };
      });

      it('returns the snapshot object', function () {
        const snaps = getExistingSnaps(this.folderPath, this.filePath);
        expect(snaps).to.eql(this.expectedSnapshot);
      });

      describe('in a CI system', function () {
        it('returns the snapshot object', function () {
          process.argv = [...process.argv, '--ci'];

          const snaps = getExistingSnaps(this.folderPath, this.filePath);
          expect(snaps).to.eql(this.expectedSnapshot);
        });

        after(function () {
          process.argv = ENV_VARS;
        });
      });
    });

    describe('and the snapshot file has a more than one snapshot', function () {
      before(function () {
        this.folderPath = path.join(currentPath, '__snapshots__', 'getExistingSnaps');
        this.filePath = path.join(this.folderPath, 'moreSnapshots.snap');

        this.expectedSnapshot = {
          'snapshot (1)': 1,
          'snapshot (2)': true,
          'snapshot (3)': 'Hello World!',
        };
      });

      it('returns the snapshot object', function () {
        const snaps = getExistingSnaps(this.folderPath, this.filePath);
        expect(snaps).to.eql(this.expectedSnapshot);
      });

      describe('in a CI system', function () {
        it('returns the snapshot object', function () {
          process.argv = [...process.argv, '--ci'];

          const snaps = getExistingSnaps(this.folderPath, this.filePath);
          expect(snaps).to.eql(this.expectedSnapshot);
        });

        after(function () {
          process.argv = ENV_VARS;
        });
      });
    });
  });

  describe('when the snapshotDir and the snapshotFilePath point to an non-existent snapshot file in an exting folder', function () {
    describe('and the snapshot file is empty', function () {
      before(function () {
        this.folderPath = path.join(currentPath, '__snapshots__', 'getExistingSnaps');
        this.filePath = path.join(this.folderPath, 'nonExistentFile.snap');
      });

      it('returns an empty object', function () {
        const snaps = getExistingSnaps(this.folderPath, this.filePath);
        expect(snaps).to.eql({});
      });

      describe('in a CI system', function () {
        it('returns an error', function () {
          process.argv = [...process.argv, '--ci'];

          expect(() => {
            getExistingSnaps(this.folderPath, this.filePath);
          }).to.throw("Snapshots can't be created on CI environment");
        });

        after(function () {
          process.argv = ENV_VARS;
        });
      });
    });
  });

  describe('when the snapshotDir and the snapshotFilePath point to an non-existent folder', function () {
    describe('and the snapshot file is empty', function () {
      before(function () {
        this.folderPath = path.join(currentPath, '__snapshots__', 'nonExistentFolder');
        this.filePath = path.join(this.folderPath, 'nonExistentFile.snap');
      });

      it('returns an empty object', function () {
        const snaps = getExistingSnaps(this.folderPath, this.filePath);

        expect(fs.existsSync(this.folderPath)).to.be.true;
        expect(snaps).to.eql({});
      });

      describe('in a CI system', function () {
        it('returns an error', function () {
          process.argv = [...process.argv, '--ci'];

          expect(() => {
            getExistingSnaps(this.folderPath, this.filePath);
          }).to.throw("Snapshots can't be created on CI environment");
        });

        after(function () {
          process.argv = ENV_VARS;
        });
      });

      after(function () {
        fs.rmdirSync(this.folderPath);
      });
    });
  });
});
