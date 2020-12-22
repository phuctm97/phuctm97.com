const remove = require("unist-util-remove");

module.exports = () => (tree) => {
  remove(tree, "yaml");
};
