const parse = require("remark-parse");
const compileNothing = require("../plugins/compile-nothing");
const config = require("../configs/blog");

module.exports = {
  plugins: [parse, ...config().remarkPlugins, compileNothing],
};
