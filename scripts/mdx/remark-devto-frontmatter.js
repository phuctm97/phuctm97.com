/**
 * Converts `file.data.page` to DEV.to-equivalent frontmatter and writes to `file.data.frontmatter`.
 * Is useful to convert a page into DEV.to-equivalent format.
 *
 * Requires `remark-page-metadata`.
 */
module.exports = () => (_, file) => {
  const { page } = file.data;
  if (!page) file.fail("Not a page.");

  const { title, description, url } = page;
  file.data.frontmatter = {
    title,
    description,
    canonical_url: url,
  };
};
