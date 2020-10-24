require('../../src/index');
const { expect } = require('chai');

describe('chai-snapshot-matcher', function () {
  describe('- matchSpecificSnapshot -', function () {
    it('use the same functionalities of matchSnapshot', function () {
      const testVarNumber = 1;
      const testVarString = typeof testVarNumber;
      const testVarBoolean = testVarNumber > 0;
      const testVarArray = [testVarNumber, testVarBoolean, testVarString];
      const testVarObject = {
        value: testVarNumber,
        type: testVarString,
        positive: testVarBoolean,
      };

      // Use the hint attribute to differentiate each snapshot (REMEMBER: There can't exist two snapshots with the same name)
      expect(testVarNumber).to.matchSpecificSnapshot(this, { hint: '(value)' });
      expect(testVarString).to.matchSpecificSnapshot(this, { hint: '(type)' });
      expect(testVarBoolean).to.matchSpecificSnapshot(this, { hint: "(it's positive?)" });
      expect(testVarArray).to.matchSpecificSnapshot(this, { hint: '(info in an array)' });
      expect(testVarObject).to.matchSpecificSnapshot(this, { hint: '(info in an object)' });
    });

    it('use matchSpecificSnapshot to rename the snapshot title', function () {
      const testVar = 'fully customised title';

      expect(testVar).to.matchSpecificSnapshot(this, {
        name: "Snapshot with a fully customised titled (doesn't use the 'describe' or 'it' titles)",
      });
    });

    it('use matchSpecificSnapshot to save the snapshots in nested folders (util to execute the same tests in different environments)', function () {
      let testVar;
      // TARGET_ENVIRONMENT is an environment variable that can be set using the command line or directly in the .env file
      // TARGET_ENVIRONMENT can have one of the following values: stg, qa, prd
      const TARGET_ENVIRONMENT = process.env.TARGET_ENVIRONMENT || 'qa';

      if (TARGET_ENVIRONMENT === 'stg') {
        testVar = 'stg environment';
      } else if (TARGET_ENVIRONMENT === 'qa') {
        testVar = 'qa environment';
      } else if (TARGET_ENVIRONMENT === 'prd') {
        testVar = 'prd environment';
      }

      // Note: this test was already executed for the 3 environment (such as you can confirm in the snapshots folder)
      expect(testVar).to.matchSpecificSnapshot(this, { folder: TARGET_ENVIRONMENT });
    });

    it('use matchSpecificSnapshot to so save the snapshots in a path at your choice', function () {
      // You can define the path that you want
      const snapPath = '/Users/tiago.lameiras/Downloads/MySnapshots/';
      const testVar = 'Hello World';

      // This sanpshot is not available in the project repository because the snapshot was saved out of it
      expect(testVar).to.matchSpecificSnapshot(this, { snapshotPath: snapPath });
    });

    it('combine more than one matchSpecificSnapshot features (e.g. folder and name)', function () {
      const testVar = 'Last example';

      expect(testVar).to.matchSpecificSnapshot(this, {
        folder: 'customFolder',
        name: 'Snapshot with a custom name, saved in a nested folder',
      });
    });
  });
});
