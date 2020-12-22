const find = require("unist-util-find");
const { stringify } = require("yaml");

module.exports = () => (tree, file) => {
  const { frontmatter } = file.data;
  if (!frontmatter) return file.message("No frontmatter, skip.");

  const yamlNode = find(tree, { type: "yaml" });
  if (!yamlNode) return file.fail("No 'yaml' node.");

  try {
    yamlNode.value = stringify(frontmatter).trim();
  } catch (err) {
    file.fail(err, yamlNode);
  }
};
