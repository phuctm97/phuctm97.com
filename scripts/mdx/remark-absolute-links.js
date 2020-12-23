const visit = require("unist-util-visit");
const siteMetadata = require("../../metadata.json");

/**
 * Replaces all relative links with absolute links.
 *
 * Is useful when distributing a post to another platform.
 */
module.exports = () => (tree) => {
  visit(
    tree,
    ({ type }) => type === "link" || type === "definition",
    (node) => {
      if (!node.url.startsWith("/")) return;
      node.url = `${siteMetadata.url}${node.url}`;
    }
  );
};
