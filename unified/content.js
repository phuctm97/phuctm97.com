const { select } = require("unist-util-select");
const toString = require("mdast-util-to-string");
const extractFrontmatter = require("../utils/vfile/extract-frontmatter");
const remove = require("../utils/unist/remove");
const pushExports = require("../utils/unist/push-exports");

const extractTitleFromContents = (tree, file) => {
  const h1 = select("heading[depth=1]", tree);
  if (!h1) return file.fail("No title.");
  remove(tree, h1);
  return toString(h1);
};

const extractDescriptionFromContents = (tree, file) => {
  const p = select("paragraph", tree);
  if (!p) return file.fail("No description.");
  return toString(p);
};

module.exports = () => (tree, file) => {
  extractFrontmatter(file, {
    title: { type: "string" },
    description: { type: "string" },
  });

  const { data } = file;
  if (!data.title) data.title = extractTitleFromContents(tree, file);
  if (!data.description)
    data.description = extractDescriptionFromContents(tree, file);

  pushExports(tree, data, "title", "description");
};
