const remove = (tree, node) =>
  tree.children.splice(tree.children.indexOf(node), 1);

module.exports = remove;
