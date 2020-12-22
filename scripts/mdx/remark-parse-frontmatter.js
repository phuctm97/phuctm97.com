const find = require("unist-util-find");
const { parse } = require("yaml");
const revalidator = require("revalidator");

/**
 * Parses YAML frontmatter into `file.data.frontmatter`.
 *
 * Requires `remark-frontmatter` v2, may need an upgrade when `mdx` upgrades to `remark` v13.
 */
module.exports = (schema) => (tree, file) => {
  const yamlNode = find(tree, { type: "yaml" });
  if (!yamlNode) file.fail("No 'yaml' node.");

  let frontmatter;
  try {
    frontmatter = parse(yamlNode.value);
  } catch (err) {
    file.fail(err, yamlNode);
  }

  if (schema) {
    const result = revalidator.validate(frontmatter, schema);
    if (!result.valid)
      file.fail(
        "Invalid frontmatter:\n" + JSON.stringify(result.errors, null, 2),
        yamlNode
      );
  }

  file.data.frontmatter = frontmatter;
};
