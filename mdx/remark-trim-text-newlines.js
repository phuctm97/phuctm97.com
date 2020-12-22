const visit = require("unist-util-visit");

module.exports = () => (tree) => {
  visit(tree, "text", (node) => {
    node.value = node.value.replace(/\n/g, " ");
  });
};
