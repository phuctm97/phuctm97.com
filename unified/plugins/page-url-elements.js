const syspath = require("path");
const pkg = require("../../package.json");

const pagesDir = syspath.join(process.cwd(), "pages");

const trimPagesDir = (path) =>
  path.startsWith(pagesDir) ? path.substr(pagesDir.length + 1) : path;

const trimMDXExt = (path) =>
  (path.endsWith(".mdx") && path.substring(0, path.length - 4)) ||
  (path.endsWith(".md") && path.substring(0, path.length - 3)) ||
  path;

const getURLElements = (abspath) => {
  const trimmed = trimPagesDir(trimMDXExt(abspath));
  const folder = syspath.dirname(trimmed);
  const slug = syspath.basename(trimmed);
  const path = `/${folder}/${slug}`;
  return { url: `${pkg.homepage}${path}`, path, folder, slug };
};

module.exports = () => (_, file) => {
  Object.assign(file.data, getURLElements(file.path));
};
