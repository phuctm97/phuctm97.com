const revalidator = require("revalidator");

const siteMetadata = require("../../metadata.json");
const { isPage, inferPageURLParams } = require("../page-utils");

const frontmatterSchema = {
  properties: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    "published time": {
      type: "string",
      required: true,
      format: "date",
    },
  },
};

/**
 * Extracts and validates a page's metadata from frontmatter, then assigns to `file.data.page`.
 */
module.exports = () => (_, file) => {
  if (!isPage(file.path)) file.fail("Not a page.");

  const { subpage, slug } = inferPageURLParams(file.path);
  const fullPath = `${subpage}/${slug}`;
  const fullURL = `${siteMetadata.url}/${fullPath}`;

  const { frontmatter } = file.data;

  // Validate frontmatter.
  const result = revalidator.validate(frontmatter, frontmatterSchema);
  if (!result.valid) {
    file.fail("Invalid frontmatter: " + JSON.stringify(result.errors, null, 2));
  }

  const { title, description, "published time": publishedTime } = frontmatter;
  file.data.page = {
    title,
    description,
    publishedTime: new Date(publishedTime),
    url: fullURL,
    path: fullPath,
    subpage,
    slug,
  };
};
