const snapshotDirConstructor = require('../../src/snapshotDirConstructor');
const { expect } = require('chai');

describe('snapshotDirConstructor', function () {
  describe('when the snapshotPath is provided', function () {
    describe('and the testDir and the additionalFolder are also provided', function () {
      it('returns the snapshotPath', function () {
        const dirPath = snapshotDirConstructor(
          '/Users/my_user/Projects/chai-snapshot-matcher/tests/unit',
          'qa',
          '/Users/my_user/Downloads/MySnapshots/'
        );

        expect(dirPath).to.equal('/Users/my_user/Downloads/MySnapshots/');
      });
    });

    describe('and the testDir and the additionalFolder are empty strings', function () {
      it('returns the snapshotPath', function () {
        const dirPath = snapshotDirConstructor('', '', '/Users/my_user/Downloads/MySnapshots/');

        expect(dirPath).to.equal('/Users/my_user/Downloads/MySnapshots/');
      });
    });
  });

  describe('when the snapshotPath is an empty string', function () {
    describe('and the additionalFolder is provided', function () {
      describe('and the testDir is also provided', function () {
        it('returns the concatenation of the testDir with the __snapshots__ folder and the additionalFolder', function () {
          const dirPath = snapshotDirConstructor('/Users/my_user/Projects/chai-snapshot-matcher/tests/unit', 'qa', '');

          expect(dirPath).to.equal('/Users/my_user/Projects/chai-snapshot-matcher/tests/unit/__snapshots__/qa');
        });
      });

      describe('and the testDir is an empty string', function () {
        it('returns the concatenation of the __snapshots__ folder with the additionalFolder', function () {
          const dirPath = snapshotDirConstructor('', 'qa', '');

          expect(dirPath).to.equal('__snapshots__/qa');
        });
      });
    });

    describe('and the additionalFolder is an empty string', function () {
      describe('and the testDir is provided', function () {
        it('returns the concatenation of the testDir with the __snapshots__ folder', function () {
          const dirPath = snapshotDirConstructor('/Users/my_user/Projects/chai-snapshot-matcher/tests/unit', '', '');

          expect(dirPath).to.equal('/Users/my_user/Projects/chai-snapshot-matcher/tests/unit/__snapshots__');
        });
      });

      describe('and the testDir is an empty string', function () {
        it('returns the snapshots folder', function () {
          const dirPath = snapshotDirConstructor('', '', '');

          expect(dirPath).to.equal('__snapshots__');
        });
      });
    });
  });
});
