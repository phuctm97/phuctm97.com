const chalk = require("chalk");

const logger = {
  debug: (...msgs) => {
    console.log(chalk.bold.cyan("debug"), ...msgs);
  },
  info: (...msgs) => {
    console.log(chalk.bold.blue("info"), ...msgs);
  },
  success: (...msgs) => {
    console.log(chalk.bold.green("success"), ...msgs);
  },
  warn: (...msgs) => {
    console.log(chalk.bold.yellow("warn"), ...msgs);
  },
  error: (...msgs) => {
    console.error(chalk.bold.red("error"), ...msgs);
  },
};

module.exports = {
  logger,
};
