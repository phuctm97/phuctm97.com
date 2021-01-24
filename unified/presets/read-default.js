const parse = require("remark-parse");
const compileNothing = require("../plugins/compile-nothing");
const { remarkPlugins } = require("../configs/default");

module.exports = {
  plugins: [parse, ...remarkPlugins, compileNothing],
};
