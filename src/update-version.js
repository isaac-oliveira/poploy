const path = require("path");
const fs = require("fs");

const rootProjectPath = path.join(__dirname, "..");
const packageFilePath = path.join(rootProjectPath, "package.json");

const searchRegex = /("version": ")\d+\.\d+\.\d+/;

const main = (version) => {
  const fileContent = fs.readFileSync(packageFilePath, { encoding: "utf-8" });
  const newFileContent = fileContent.replace(searchRegex, `$1${version}`);
  fs.writeFileSync(packageFilePath, newFileContent, { encoding: "utf-8" });
};

module.exports = main;
