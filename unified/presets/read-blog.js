const parse = require("remark-parse");
const compileNothing = require("../plugins/compile-nothing");
const configs = {
  default: require("../configs/default"),
  blog: require("../configs/blog"),
};

module.exports = {
  plugins: [
    parse,
    ...configs.default.remarkPlugins,
    ...configs.blog.extraRemarkPlugins.slice(0, 2), // Only use plugins that manipulates data.
    compileNothing,
  ],
};
