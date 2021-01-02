const path = require("path");

const rootDir = process.cwd();

const relPagesDir = "pages";

const absPagesDir = path.join(rootDir, relPagesDir);

const trimPagesDir = (filePath) => {
  if (filePath.startsWith(`${absPagesDir}${path.sep}`))
    return filePath.substr(absPagesDir.length + 1);

  if (filePath.startsWith(`${relPagesDir}${path.sep}`))
    return filePath.substr(relPagesDir.length + 1);

  return filePath;
};

const trimExt = (filePath, ext) =>
  filePath.endsWith(`.${ext}`)
    ? filePath.substr(0, filePath.length - ext.length - 1)
    : filePath;

module.exports = {
  rootDir,
  relPagesDir,
  absPagesDir,
  trimPagesDir,
  trimExt,
};
