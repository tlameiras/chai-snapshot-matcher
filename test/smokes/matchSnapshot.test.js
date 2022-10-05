require('../../src/index');
const { expect } = require('chai');

describe('chai-snapshot-matcher', function () {
  it('use matchSnapshot to expect numbers', function () {
    const testVar = 1;

    expect(testVar).to.matchSnapshot(this);
  });

  it('use matchSnapshot to expect booleans', function () {
    const testVar = true;

    expect(testVar).to.matchSnapshot(this);
  });

  it('use matchSnapshot to expect strings', function () {
    const testVar = 'Hello World!';

    expect(testVar).to.matchSnapshot(this);
  });

  it('use matchSnapshot to expect arrays', function () {
    const testVar = [1, 'two', '3'];

    expect(testVar).to.matchSnapshot(this);
  });

  it('use matchSnapshot to expect objects', function () {
    const testVar = {
      a: {
        b: 1,
        c: 2,
      },
      d: 3,
    };

    expect(testVar).to.matchSnapshot(this);
  });

  it('use matchSnapshot to expect multiline strings', function () {
    const testVar = {
      a: {
        b: 1,
        c: 2,
      },
      d: 3,
    };

    expect(JSON.stringify(testVar, null, 2)).to.matchSnapshot(this);
  });

  it('use the hint attribute to customize the snapshot title', function () {
    const testVar = 'custom name';

    expect(testVar).to.matchSnapshot(this, { hint: '(go check the __snapshots__ folder)' });
  });

  it('use the hint attribute to have more than one matchSnapshot per it', function () {
    const testVar = 10;

    expect(testVar).to.matchSnapshot(this, { hint: '(value)' });
    expect(typeof testVar).to.matchSnapshot(this, { hint: '(type)' });
  });

  it('use the name attribute to rename the snapshot title', function () {
    const testVar = 'fully customised title';

    expect(testVar).to.matchSnapshot(this, {
      name: "Snapshot with a fully customised titled (doesn't use the 'describe' or 'it' titles)",
    });
  });

  it('use the ignore attribute to compare partial objects (by ignoring part of the fields)', function () {
    const testVar = {
      a: {
        b: 1,
        c: 2,
      },
      d: 3,
    };

    expect(testVar).to.matchSnapshot(this, { ignore: ['a.c', 'd'] });
  });

  it('use the folder attribute to save the snapshots in nested folders (util to execute the same tests in different environments)', function () {
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
    expect(testVar).to.matchSnapshot(this, { folder: TARGET_ENVIRONMENT });
  });

  it('use the snapshotPath attribute to so save the snapshots in a path at your choice', function () {
    // You can define the path that you want
    const snapPath = '/Users/tiago.lameiras/Downloads/MySnapshots/';
    const testVar = 'Hello World';

    // This sanpshot is not available in the project repository because the snapshot was saved out of it
    expect(testVar).to.matchSnapshot(this, { snapshotPath: snapPath });
  });

  it('combine more than one features (e.g. folder and name)', function () {
    const testVar = 'Last example';

    expect(testVar).to.matchSnapshot(this, {
      folder: 'customFolder',
      name: 'Snapshot with a custom name, saved in a nested folder',
    });
  });
});
