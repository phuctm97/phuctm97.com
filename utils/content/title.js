const { select } = require("unist-util-select");
const toString = require("mdast-util-to-string");
const extractFrontmatter = require("../vfile/extract-frontmatter");
const remove = require("../unist/remove");

const extractTitleFromContents = (tree, file) => {
  const h1 = select("heading[depth=1]", tree);
  if (!h1) return file.fail("No title.");

  remove(tree, h1);
  return toString(h1);
};

module.exports = () => (tree, file) => {
  extractFrontmatter(file, { title: { type: "string" } });

  const { data } = file;
  if (!data.title) data.title = extractTitleFromContents(tree, file);

  tree.children.push({
    type: "export",
    value: `export const title = ${JSON.stringify(data.title)};`,
  });
};
