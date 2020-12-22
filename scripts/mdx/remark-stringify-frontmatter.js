const find = require("unist-util-find");
const { stringify } = require("yaml");

/**
 * Renders `file.data.frontmatter` to an `yaml` node.
 *
 * Requires `remark-frontmatter` v2, may need an upgrade when `mdx` upgrades to `remark` v13.
 */
module.exports = () => (tree, file) => {
  const { frontmatter } = file.data;
  if (!frontmatter) file.fail("No frontmatter.");

  const yamlNode = find(tree, { type: "yaml" });
  if (!yamlNode) file.fail("No 'yaml' node.");

  try {
    yamlNode.value = stringify(frontmatter).trim();
  } catch (err) {
    file.fail(err, yamlNode);
  }
};
