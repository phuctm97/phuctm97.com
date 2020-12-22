const visit = require("unist-util-visit");

module.exports = () => (tree) => {
  visit(tree, "text", (node, index, parent) => {
    if (node.value === "\n") parent.children.splice(index, 1);
    else node.value = node.value.replace(/\n/g, "");
  });
};
