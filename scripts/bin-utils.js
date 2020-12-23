const chalk = require("chalk");

const logger = {
  debug: (...msgs) => {
    console.log(chalk.cyan("debug"), ...msgs);
  },
  info: (...msgs) => {
    console.log(chalk.blue("info"), ...msgs);
  },
  success: (...msgs) => {
    console.log(chalk.green("success"), ...msgs);
  },
  warn: (...msgs) => {
    console.log(chalk.yellow("warn"), ...msgs);
  },
  error: (...msgs) => {
    console.error(chalk.red("error"), ...msgs);
  },
};

module.exports = {
  logger,
};
