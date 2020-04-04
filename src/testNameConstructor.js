const testNameConstructor = (defaultTestName, hint, newName) => {
  if (newName !== "") return newName;

  if (hint !== "") return `${defaultTestName} ${hint}`;

  return defaultTestName;
};

module.exports = testNameConstructor;
