const { expect } = require('chai');
const removeIgnoredFields = require('../../src/removeIgnoredFields');

describe('removeIgnoredFields', function () {
  beforeEach(function () {
    this.obj = {
      a: 1,
      b: 2,
      c: {
        d: 3,
        e: {
          f: 4,
        },
        g: [
          { h: 5 },
          { i: 6 },
          {
            k: {
              l: 7,
            },
          },
        ],
      },
    };
  });

  describe('when there is no fields to ignore', function () {
    it('returns the original object', function () {
      const newObj = removeIgnoredFields(this.obj, '');
      const newEmptyObj = removeIgnoredFields({}, '');

      expect(newObj).to.eql(this.obj);
      expect(newEmptyObj).to.eql({});
    });
  });

  describe('when a valid array of fields (incluiding nested fields, and fields inside arrays) are provided', function () {
    it('returns the object without that fields', function () {
      const newObj = removeIgnoredFields(this.obj, ['b', 'c.e', 'c.g[2].k.l']);

      expect(newObj).to.eql({
        a: 1,
        c: {
          d: 3,
          g: [
            { h: 5 },
            { i: 6 },
            {
              k: {},
            },
          ],
        },
      });
    });
  });

  describe('when is provided a field to be ignored that does not exist', function () {
    it('returns the original object', function () {
      const newObj = removeIgnoredFields(this.obj, ['z']);

      expect(newObj).to.eql(this.obj);
    });
  });
});
