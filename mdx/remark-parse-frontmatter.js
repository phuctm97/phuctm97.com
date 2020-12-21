const find = require("unist-util-find");
const { parse } = require("yaml");

module.exports = () => (tree, file) => {
  const firstYAMLNode = find(tree, { type: "yaml" });
  if (!firstYAMLNode) return;

  try {
    file.data.frontmatter = parse(firstYAMLNode.value);
  } catch (err) {
    file.fail(err, firstYAMLNode);
  }
};
