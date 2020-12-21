const chalk = require("chalk");

const debug = (...msgs) => {
  console.log(chalk.bold.cyan("debug"), ...msgs);
};

const info = (...msgs) => {
  console.log(chalk.bold.blue("info"), ...msgs);
};

const success = (...msgs) => {
  console.log(chalk.bold.green("success"), ...msgs);
};

const warn = (...msgs) => {
  console.log(chalk.bold.yellow("warn"), ...msgs);
};

const error = (...msgs) => {
  console.error(chalk.bold.red("error"), ...msgs);
};

const logger = { debug, info, success, warn, error };

module.exports = logger;
