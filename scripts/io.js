#!/usr/bin/env node

const readline = require("readline");

const colors = {
  white: 97,
  red: 91,
  green: 92,
  yellow: 93,
};

const io = {
  log: (message, color = "white") =>
    console.log(`\x1b[${colors[color]}m${message}\x1b[0m`),
  warn: (message) => console.warn(`\x1b[93m${message}\x1b[0m`),
  error: (message) => console.error(`\x1b[91m${message}\x1b[0m`),
  table: (message) => console.table(message),
  question: (message, color = "white") =>
    new Promise((resolve) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question(`\x1b[${colors[color]}m${message}\x1b[0m`, (response) => {
        rl.close();
        resolve(response);
      });
    }),
};

module.exports = io;
