#!/usr/bin/env node

const { execSync } = require("child_process");

console.log("Welcome Poploy");

execSync("npx rimraf teste-script");
execSync("git clone https://github.com/isaac-oliveira/teste-script.git");
execSync("cp -r teste.md teste-script");
execSync("cd teste-script && git add .");
execSync('cd teste-script && git commit -m "publish"');
execSync("cd teste-script && git push origin main");
execSync("npx rimraf teste-script");
