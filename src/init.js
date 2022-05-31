const fs = require("fs");
const path = require("path");

const io = require("./io");

const main = async () => {
  const gitUrl = await io.question("\nGit remote (URL): ");
  const defaultBranch = await io.question(
    "\nBranch default (master or main): "
  );

  fs.writeFileSync(
    path.resolve(__dirname, "..", "popploy.json"),
    `{\n\t"gitUrl": "${gitUrl}",\n\t"branchsEnv": {\n\t\t"production": "${defaultBranch}"\n\t}\n}`,
    { encoding: "utf-8" }
  );
};

main();
