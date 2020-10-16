const checkCI = require('../../src/checkCI');
const { expect } = require('chai');

ENV_VARS = process.argv;

describe('checkCI', function () {
  describe('when the --ci flag is not passed as environment variable', function () {
    it('returns no errors', function () {
      expect(checkCI()).to.be.undefined;
    });
  });

  describe('when the --ci flag is passed as environment variable', function () {
    it('returns an error', function () {
      process.argv = [...process.argv, '--ci'];

      expect(checkCI).to.throw("Snapshots can't be created on CI environment");
    });

    after(function () {
      process.argv = ENV_VARS;
    });
  });
});
