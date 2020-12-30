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

const getPostCoverURL = (post, target) => {
  const { cover } = post;
  if (typeof cover === "string") return cover;

  let icons = [];
  let { title } = post;

  if (cover) {
    if (typeof cover !== "object")
      throw new Error("Invalid post cover: " + JSON.stringify(cover, null, 2));

    if (cover.icons) icons = cover.icons;
    if (cover.title) title = cover.title;
  }

  const url = new URL(
    encodeURIComponent(`${title}.jpg`),
    "https://img.phuctm97.com/api/v2/"
  );
  if (target) url.searchParams.append("target", target);
  for (let icon of icons) {
    url.searchParams.append("icons", icon);
  }

  return url.toString();
};

const validFolders = ["blog"];

const isPost = (filePath) => {
  const { folder, slug } = inferPostURLParams(filePath);

  // A file is a post if its path is a valid folder/slug.
  return validFolders.indexOf(folder) !== -1 && slug.length > 0;
};

module.exports = {
  inferPostURLParams,
  getPostCoverURL,
  isPost,
};
