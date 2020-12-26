/**
 * Converts a post's metadata to Hashnode-equivalent frontmatter, assigns to `file.data.frontmatter`.
 * Is useful to convert a post into Hashnode-equivalent format.
 *
 * Requires `remark-post-metadata`.
 */
module.exports = () => (_, file) => {
  const { post } = file.data;
  if (!post) file.fail("Not a post.");

  const { title, url, slug } = post;
  file.data.frontmatter = {
    title,
    slug,
    tags: [], // Hashnode API currently don't support tags yet.
    canonicalURL: url,
  };
};
