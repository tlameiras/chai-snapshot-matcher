<h1 align="center">
  <img src="https://github.com/tlameiras/chai-snapshot-matcher/blob/master/logo/logo.png?raw=true" alt="chai-snapshot-matcher"/>
</h1>

chai-snapshot-matcher is a [node](https://nodejs.org/en/) library developed to offer the [jest](https://jestjs.io/) snapshot testing features to [mocha](https://mochajs.org/) and [chai](https://www.chaijs.com/) users.

## Why Snapshot Testing

Snapshot tests are a very useful tool whenever you want to make sure your API our UI does not change unexpectedly.

A typical snapshot test case for an API execute a http request, takes a snapshot to the requested response and then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected or the reference snapshot needs to be updated to the new version.

# Installation

Using [npm](https://www.npmjs.com/):

```
npm install chai-snapshot-matcher
```

Using [yarn](https://yarnpkg.com/):

```
yarn add chai-snapshot-matcher
```

# Usage

There are 2 ways to run chai-snapshot-matcher in your test script:

- Import the chai-snapshot-matcher package on the tests scripts where the `matchSnapshot` or `matchSpecificSnapshot` will be used:

```js
require('chai-snapshot-matcher');
```

- Add the `--require` argument to your test script/command:

```
mocha --require chai-snapshot-matcher
```

## .matchSnapchot(this [, config])

matchSnapshot is a customized chai matcher that creates a snapshot file on the first test run. On subsequent test runs, chai will compare the object that is being expected with the previous snapshot. If they match, the test will pass. If they don't match, the test will fail. If tests are failing due to a change decision implementation (and not a bug), snapshots needs to be updated (check how on **Update Snapshots** chapter).

### How it works

- **matchSnapshot** creates a new `__snapshots__` folder at the same level of the test file, with a snapshot file inside it.
- the snapshot file will use the test file name but the extension `.test.js` will be replaced by `.snap` (e.g. post-request.test.js will originate the post-request.snap).
- all snapshots that belong to the same test file will be saved in the same snapshot file.
- by default, the snapshot and test names will be the same, i. e. the joining of the `it` and all `describe` parent titles.

#### Example

**Test file:** (_path_: `./tests/myFirstSnapshotTest.test.js`)

```js
// myFirstSnapshotTest.test.js
describe('chai-snapshot-matcher', function () {
  describe('- matchSnapshot -', function () {
    it('check string', function () {
      const packageName = 'chai-snapshot-matcher';

      expect(name).to.matchSnapshot(this);
    });
  });
});
```

**Snapshot file:** (_path_: `./tests/__snapshots__/myFirstSnapshotTest.snap`)

```
exports["chai-snapshot-matcher - matchSapshot - check string"] = "chai-snapshot-matcher";
```

### Aditional Features

Extra functionalities are available through the _config_ attribute (`optional` argument). The following table describes each field of the _config_ attribute:

|     Field      |  Type  |                                                                                                               Description                                                                                                               |
| :------------: | :----: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|     `hint`     | String |                                                                                       customize the snapshot name by including a hint at the end                                                                                        |
|     `name`     | String |                                                                    rename a snapshot by giving it a completely new name (`it` and `describe` titles will be ignored)                                                                    |
|    `folder`    | String | change the path where the snapshot file is saved. Instead of saving all the snapshots inside the `__snapshots__` folder, one can organize the snapshots files inside nested folders. This could be useful for multi environment testing |
| `snapshotPath` | String |                                                set a completely new path (inside or outside the repositiory) to the snapshot files. The \_snapshotPath_only works with the absolute path                                                |
|    `ignore`    | Array  |                                        ignore a certain set of fields from an object. This can be useful for checking an entire object and ignoring only the mutable (e.g. time-changing) fields                                        |

> **NOTE:** > \- _hint_ attribute will be ignored if the _name_ attribute is used.
> \- _folder_ attribute will be ignored if the _snapshotPath_ attribute is used.
> \- Two snaps with the same name within the same snapshot file cannot exist. Therefore, if one wants to use the **matchSnapshot** twice inside a single `it` the _hint_, _name_, _folder_ or _snapshotPath_ argument will have to be used.

#### Example

**Test file:** (_path_: `./tests/mySecondSnapshotTest.test.js`)

```js
describe('chai-snapshot-matcher', function () {
  describe('- matchSnapshot (features) -', function () {
    it('new features examples', function () {
      const stringExample = 'Hello World';

      const objectExample = {
        id: '73as268f90sn.a4fju2',
        current_date: '2021-02-15T18:58Z',
      };

      // using hint argument
      expect(example).to.matchSnapshot(this, { hint: '(hint)' });
      // using name argument
      expect(example).to.matchSnapshot(this, { name: 'snapshot with a specific name' });
      // using folder argument
      expect(example).to.matchSnapshot(this, { folder: 'Examples' });
      // using snapshotPath argumentc
      expect(example).to.matchSnapshot(this, { snapshotPath: '/Users/my.user/Downloads/MySnapshots/' });
      // using ignore argument
      expect(example).to.matchSnapshot(this, { ignore: ['current_date'] });
    });
  });
});
```

**Snapshot files:**

- _path_: `./tests/__snapshots__/mySecondSnapshotTest.snap`

```
exports["chai-snapshot-matcher - matchSnapshot (features) - new features examples (hint)"] = "Hello World";

exports["snapshot with a specific name"] = "Hello World";

exports["chai-snapshot-matcher - matchSnapshot (features) - new features examples"] = { "id": "73as268f90sn.a4fju2"}
```

- _path_: `./tests/__snapshots__/Examples/mySecondSnapshotTest.snap`

```
exports["chai-snapshot-matcher - matchSnapshot (features) - new features examples"] = "Hello World";
```

- _path_: `/Users/my.user/Downloads/MySnapshots/mySecondSnapshotTest.snap`

```
exports["chai-snapshot-matcher - matchSnapshot (features) - new features examples"] = "Hello World";
```

# Update Snapshots

Add the `--update` argument when running mocha to update the snapshots of the tests that are failing:

```
mocha --update
```

> **NOTE:**
> \- Tests or snapshots that were not executed will not be updated.
> \- If a test or snapshot name has been changed, a new snapshot will be created. When running the tests using the `--update` flag, only the new ones will be updated.

# Recommendations

- Arrow functions must not be used in tests, otherwise `this` test context will not be passed to the _matchSnapshot_ and _matchSpecificSnapshot_.
- The snapshot files should be committed along with the code, and reviewed as part of the code reviewing process.
- When running tests on a Continuous Integration (CI) system `--ci` flag should be included. This will prevent the test to run in a CI environment when there are missing snapshot files.
- Snapshots are a fantastic tool for identifying unexpected interface changes within the application – whether that interface is an API response, UI, logs, or error messages. Use it well!

# Boilerplate project

Still not sure how to use the match-snapshot-matcher? Check [this](https://github.com/tlameiras/chai-snapshot-matcher-boilerplate) boilerplate project where you can find several examples.

# License

[MIT](https://github.com/tlameiras/chai-snapshot-matcher/blob/master/LICENSE)
