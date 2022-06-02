#!/usr/bin/env node
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

const updateVersion = require("./update-version");
const getValue = require("./get-value");
const io = require("./io");

const argv = require("minimist")(process.argv.slice(2));

const {
  _: [firstArg, ...args],
} = argv;

io.log("\n-----------------------------------", "green");
io.log("      Welcome to the Popploy!      ", "green");
io.log("-----------------------------------\n", "green");

if (firstArg === "init") {
  require("./init");
  return;
}

const popploy = require("../popploy.json");

const env = firstArg;

const clonePath = "tmp-clone";

const gitUrl = popploy.gitUrl;
const branch = popploy.branchsEnv[env];
const exclude = popploy.exclude;
const version = getValue(args, "version");

const main = async () => {
  io.table({ gitUrl, env, branch, version });

  const response = await io.question(
    "\nConfira se as variáveis estão corretas. Podemos prosseguir? (s/n): "
  );

  if (response !== "s") {
    return;
  }

  if (version) {
    updateVersion(version);
  }

  shell.exec(`npx rimraf ${clonePath}`);

  try {
    shell.exec(`git clone ${gitUrl} ${clonePath}`);
    shell.cd(clonePath);
    shell.exec(`git checkout -B ${branch}`);

    shell.cd("..");
    const files = fs
      .readdirSync(path.resolve(__dirname, ".."))
      .filter((item) => !exclude.includes(item) && item !== clonePath);
    const fileToAdd = files.join(" ");

    shell.exec(`cp -r ${fileToAdd} ${clonePath}`);
    shell.cd(clonePath);
    shell.exec("git add .");
    shell.exec(`git commit -m "publish ${version}"`);
    shell.exec(`git push origin ${branch} --force`);
  } catch (e) {
    io.error(e);
    console.log("Nenhuma alteração encontrada.");
    shell.cd("..");
    shell.exec(`npx rimraf ${clonePath}`);
    return;
  }

  shell.cd("..");
  shell.exec(`npx rimraf ${clonePath}`);
};

try {
  main();
} catch (e) {
  shell.exec(`npx rimraf ${clonePath}`);
}
