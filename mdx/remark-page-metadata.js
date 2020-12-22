const pageUtils = require("./page-utils");

module.exports = () => (_, file) => {
  if (!pageUtils.isPage(file.path)) return file.message("Not a page, skip.");

  const { subpage, slug } = pageUtils.getURLParam(file.path);
  const url = pageUtils.getCanonicalURL(subpage, slug);

  file.data.pageMetadata = {
    ...file.data.frontmatter,
    subpage,
    slug,
    url,
  };
};
