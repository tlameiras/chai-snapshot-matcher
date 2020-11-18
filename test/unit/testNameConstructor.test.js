const { expect } = require('chai');
const testNameConstructor = require('../../src/testNameConstructor');

describe('testNameConstructor', function () {
  describe('when the newName is provided', function () {
    describe('and the defaultTestName and the hint are also provided', function () {
      it('returns the newName', function () {
        const testName = testNameConstructor('a random test name', 'an hint', 'final test name');

        expect(testName).to.equal('final test name');
      });
    });

    describe('and the defaultTestName and the hint are empty strings', function () {
      it('returns the newName', function () {
        const testName = testNameConstructor('', '', 'final test name');

        expect(testName).to.equal('final test name');
      });
    });
  });

  describe('when the newName is an empty string', function () {
    describe('and the hint is provided', function () {
      describe('and the defaultTestName is also provided', function () {
        it('returns the concatenation of the defaultTestName with the hint', function () {
          const testName = testNameConstructor('a random test name', 'with an hint', '');

          expect(testName).to.equal('a random test name with an hint');
        });
      });

      describe('and the defaultTestName is an empty string', function () {
        it('returns the concatenation of the defaultTestName with the hint', function () {
          const testName = testNameConstructor('', 'with an hint', '');

          expect(testName).to.equal(' with an hint');
        });
      });
    });

    describe('and the hint is an empty string', function () {
      describe('and the defaultTestName is provided', function () {
        it('returns the defaultTestName', function () {
          const testName = testNameConstructor('a random test name', '', '');

          expect(testName).to.equal('a random test name');
        });
      });

      describe('and the defaultTestName is an empty string', function () {
        it('returns an empty string', function () {
          const testName = testNameConstructor('', '', '');

          expect(testName).to.equal('');
        });
      });
    });
  });
});
