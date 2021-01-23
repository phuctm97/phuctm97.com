const syspath = require("path");
const { select } = require("unist-util-select");
const toString = require("mdast-util-to-string");
const extractFrontmatter = require("../utils/vfile/extract-frontmatter");
const remove = require("../utils/unist/remove");
const pushExports = require("../utils/unist/push-exports");
const { HOMEPAGE } = require("../constants/shared");
const { PAGES_DIR } = require("../constants/server");

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

const trimPagesDir = (path) =>
  path.startsWith(PAGES_DIR) ? path.substr(PAGES_DIR.length + 1) : path;

const trimMDXExt = (path) =>
  path.endsWith(".mdx") ? path.substring(0, path.length - 4) : path;

const getURLElements = (abspath) => {
  const trimmed = trimPagesDir(trimMDXExt(abspath));
  const folder = syspath.dirname(trimmed);
  const slug = syspath.basename(trimmed);
  const path = `/${folder}/${slug}`;
  return { url: `${HOMEPAGE}${path}`, path, folder, slug };
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

  Object.assign(data, getURLElements(file.path));

  pushExports(tree, data, [
    "title",
    "description",
    "url",
    "path",
    "folder",
    "slug",
  ]);
};
