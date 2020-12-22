const visit = require("unist-util-visit");

/**
 * Unwrap all `text` nodes by replacing all newlines with spaces.
 *
 * Is useful when rendering to DEV.to, DEV.to reads wraps as newlines.
 */
module.exports = () => (tree) => {
  visit(tree, "text", (node) => {
    node.value = node.value.replace(/\n/g, " ");
  });
};
