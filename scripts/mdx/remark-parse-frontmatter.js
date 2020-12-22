const find = require("unist-util-find");
const { parse } = require("yaml");

/**
 * Parses YAML frontmatter into `file.data.frontmatter`.
 *
 * Requires `remark-frontmatter` v2, may need an upgrade when `mdx` upgrades to `remark` v13.
 */
module.exports = () => (tree, file) => {
  const yamlNode = find(tree, { type: "yaml" });
  if (!yamlNode) return file.fail("No 'yaml' node.");

  try {
    file.data.frontmatter = parse(yamlNode.value);
  } catch (err) {
    file.fail(err, yamlNode);
  }
};
