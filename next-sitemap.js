const pkg = require("./package.json");

module.exports = {
  siteUrl: pkg.homepage,
  generateRobotsTxt: true,
  autoLastmod: false,
};
