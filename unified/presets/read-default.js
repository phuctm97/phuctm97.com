const parse = require("remark-parse");
const config = require("../configs/default");
const compileNothing = require("../plugins/compile-nothing");

module.exports = {
  plugins: [parse, ...config.remarkPlugins, compileNothing],
};
