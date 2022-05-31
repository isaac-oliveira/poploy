const { version } = require("../package.json");

const defaultValue = {
  version,
};

const main = (args, type) => {
  const founded = args.find((item) => item.includes(type));
  if (!founded) {
    return defaultValue[type];
  }

  return founded.split(":")[1];
};

module.exports = main;
