const remove = require("unist-util-remove");

/**
 * Removes all `yaml` nodes. Is useful to avoid rendering frontmatter on compilation.
 */
module.exports = () => (tree) => {
  remove(tree, "yaml");
};
