const { select } = require("unist-util-select");
const toString = require("mdast-util-to-string");

module.exports = () => (tree, file) => {
  const { data } = file;
  if (data.title) return; // Already has title (from frontmatter, etc).

  const h1 = select("heading[depth=1]", tree);
  if (!h1) file.fail("No h1.");

  data.title = toString(h1);
  tree.children.splice(tree.children.indexOf(h1), 1); // Remove title, delegate rendering title to layout.
};
