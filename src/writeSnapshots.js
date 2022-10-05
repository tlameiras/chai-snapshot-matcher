const fs = require('fs');
const checkCI = require('./checkCI');

const writeSnapshots = (snaps, snapshotFilePath) => {
  checkCI();

  const snapsFileContent = Object.entries(snaps).reduce((prev, [name, value]) => {
    const snapshot = JSON.stringify(value, null, '\t')
      .replace(/\\n/g, '\n')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${')
      .replace(/(^")|("$)/g, '`');

    return `${prev}exports["${name}"] = ${snapshot};\n\n`;
  }, '');

  fs.writeFileSync(snapshotFilePath, snapsFileContent);
};

module.exports = writeSnapshots;
