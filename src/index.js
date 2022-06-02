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

const clonePath = "tmp-clone";
const env = firstArg;
const gitUrl = popploy.gitUrl;
const branch = popploy.branchsEnv[env];
const exclude = [...popploy.exclude, clonePath, ".git", "popploy.json"];
const version = getValue(args, "version");

const keys = Object.keys(popploy.branchsEnv);

if (!keys.includes(env)) {
  console.log(
    `'env' inválida! valores aceitos: ${Object.keys(popploy.branchsEnv).join(
      ", "
    )}`
  );
  return;
}

if (!/\d+.\d+.\d+/.test(version)) {
  console.log("'version' inválido, favor use o padrão x.x.x");
  return;
}

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
    shell.exec(`find . -type 'f' | grep -v ".git" | xargs rm -r`);

    const files = fs
      .readdirSync(path.resolve(__dirname, ".."))
      .filter((item) => !exclude.includes(item));
    const fileToAdd = files.join(" ");

    if (fileToAdd.length !== 0) {
      shell.exec(`cd .. && cp -r ${fileToAdd} ${clonePath} && cd ${clonePath}`);
      shell.exec("git add .");
      shell.exec(`git commit -m "publish ${version}"`);
      shell.exec(`git push origin ${branch} --force`);
    }
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
