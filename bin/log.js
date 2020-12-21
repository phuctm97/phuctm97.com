const chalk = require("chalk");

const debug = (msg) => {
  console.log(`[${chalk.bold.cyan("debug")}] ${msg}`);
};

const info = (msg) => {
  console.log(`[${chalk.bold.blue("info")}] ${msg}`);
};

const success = (msg) => {
  console.log(`[${chalk.bold.green("success")}] ${msg}`);
};

const warn = (msg) => {
  console.log(`[${chalk.bold.yellow("warn")}] ${msg}`);
};

const error = (msg) => {
  console.error(`[${chalk.bold.red("error")}] ${msg}`);
};

module.exports = { debug, info, success, warn, error };
