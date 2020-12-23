/**
 * Converts a post's metadata to DEV.to-equivalent frontmatter, assigns to `file.data.frontmatter`.
 * Is useful to convert a post into DEV.to-equivalent format.
 *
 * Requires `remark-post-metadata`.
 */
module.exports = () => (_, file) => {
  const { post } = file.data;
  if (!post) file.fail("Not a post.");

  const { title, description, tags, url } = post;
  file.data.frontmatter = {
    title,
    description,
    tags,
    canonical_url: url,
    published: true,
  };
};
