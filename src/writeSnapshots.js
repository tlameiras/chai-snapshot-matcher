const fs = require("fs");
const checkCI = require("./checkCI");

const writeSnapshots = (snaps, snapshotFilePath) => {
  checkCI();

  const snapsFileContent = Object.keys(snaps).reduce(
    (prev, curr) => `${prev}exports["${curr}"] = ${JSON.stringify(snaps[curr], null, "\t")};\n\n`,
    ""
  );

  fs.writeFileSync(snapshotFilePath, snapsFileContent);
};

module.exports = writeSnapshots;
