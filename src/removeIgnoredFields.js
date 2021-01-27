const _ = require('lodash');

const removeIgnoredFields = (obj, ignore) => {
  if (!ignore) {
    return obj;
  }

  ignore.forEach((element) => {
    _.unset(obj, element);
  });

  return obj;
};

module.exports = removeIgnoredFields;
