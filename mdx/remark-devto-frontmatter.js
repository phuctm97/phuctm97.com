module.exports = () => (_, file) => {
  const { pageMetadata } = file.data;
  if (!pageMetadata) return file.message("Not a page, skip.");

  file.data.frontmatter = {
    title: pageMetadata.title,
    description: pageMetadata.description,
    canonical_url: pageMetadata.url,
  };
};
