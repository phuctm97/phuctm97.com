const path = require("path");
const find = require("unist-util-find");

const getRoute = (file) => {
  const pagesDir = path.join(file.cwd, "pages");

  const fileGrandDir = path.dirname(file.dirname);
  if (fileGrandDir !== pagesDir)
    return file.fail(`MDX pages must be in 'pages/*' ('${pagesDir}/*').`);

  const dir = path.basename(file.dirname);
  const slug = file.stem;
  return {
    dir,
    slug,
    path: `${dir}/${slug}`,
  };
};

module.exports = () => {
  const transformer = (tree, file) => {
    const defExport = find(tree, { type: "export", default: true });
    if (!defExport) return;

    const route = getRoute(file);
    console.log("Default export:", defExport);
    console.log("Route:", route);
  };

  return transformer;
};
