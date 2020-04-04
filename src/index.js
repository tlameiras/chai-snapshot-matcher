const chai = require("chai");
const matchSnapshot = require("./matchSnapshot");

chai.util.addMethod(chai.Assertion.prototype, "matchSnapshot", function (ctx, hint = "") {
  const obj = chai.util.flag(this, "object");
  matchSnapshot(obj, ctx, hint, "", "", "");
});

chai.util.addMethod(chai.Assertion.prototype, "matchSpecificSnapshot", function (
  ctx,
  { snapshotPath = "", folder = "", name = "", hint = "" }
) {
  const obj = chai.util.flag(this, "object");
  matchSnapshot(obj, ctx, hint, name, snapshotPath, folder);
});
