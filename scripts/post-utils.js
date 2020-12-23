const path = require("path");
const { trimPagesDir, trimExt } = require("./path-utils");

const inferPostURLParams = (filePath) => {
  let p = filePath;
  p = trimPagesDir(p);
  p = trimExt(p, "mdx");

  const folder = path.dirname(p);
  const slug = path.basename(p);
  return { folder, slug };
};

const validFolders = ["blog"];

const isPost = (filePath) => {
  const { folder, slug } = inferPostURLParams(filePath);

  // A file is a post if its path is a valid folder/slug.
  return validFolders.indexOf(folder) !== -1 && slug.length > 0;
};

module.exports = {
  inferPostURLParams,
  isPost,
};
