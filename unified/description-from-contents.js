const { select } = require("unist-util-select");
const toString = require("mdast-util-to-string");

module.exports = () => (tree, file) => {
  const { data } = file;
  if (data.description) return; // Already has description (from frontmatter, etc).

  const p = select("paragraph", tree);
  if (!p) file.fail("No paragraph.");

  data.description = toString(p);
};
