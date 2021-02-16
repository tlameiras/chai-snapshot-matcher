const chai = require('chai');
const matchSnapshot = require('./matchSnapshot');

chai.util.addMethod(chai.Assertion.prototype, 'matchSnapshot', function (ctx, properties = {}) {
  const obj = chai.util.flag(this, 'object');
  matchSnapshot(obj, ctx, properties);
});
