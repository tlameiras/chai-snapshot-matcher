const checkCI = () => {
  if (process.argv.includes('--ci')) throw new Error("Snapshots can't be created on CI environment");
};

module.exports = checkCI;
