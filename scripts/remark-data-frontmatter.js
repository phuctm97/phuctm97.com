const find = require("unist-util-find");
const { parse } = require("yaml");

module.exports = () => (tree, file) => {
  const yaml = find(tree, { type: "yaml" });
  if (!yaml) return;

  try {
    file.data.frontmatter = parse(yaml.value);
  } catch (err) {
    file.fail(err, yaml);
  }
};
