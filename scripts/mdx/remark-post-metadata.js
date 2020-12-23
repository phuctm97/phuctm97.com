const revalidator = require("revalidator");
const siteMetadata = require("../../metadata.json");
const { isPost, inferPostURLParams } = require("../post-utils");

const frontmatterSchema = {
  properties: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: { type: "array", maxItems: 4, uniqueItems: true },
    "published time": {
      type: "string",
      required: true,
      format: "date",
    },
  },
};

/**
 * Extracts and validates a post's metadata from frontmatter, assigns to `file.data.post`.
 */
module.exports = () => (_, file) => {
  if (!isPost(file.path)) file.fail("Not a post.");

  const { folder, slug } = inferPostURLParams(file.path);
  const postPath = `${folder}/${slug}`;
  const postURL = `${siteMetadata.url}/${postPath}`;

  const { frontmatter } = file.data;

  // Validate frontmatter.
  const result = revalidator.validate(frontmatter, frontmatterSchema);
  if (!result.valid) {
    file.fail("Invalid frontmatter: " + JSON.stringify(result.errors, null, 2));
  }

  const {
    title,
    description,
    tags,
    "published time": publishedTime,
  } = frontmatter;

  file.data.post = {
    title,
    description,
    tags: tags || [],
    publishedTime: new Date(publishedTime),
    url: postURL,
    path: postPath,
    folder,
    slug,
  };
};
