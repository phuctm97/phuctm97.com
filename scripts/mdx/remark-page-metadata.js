const path = require("path");
const revalidator = require("revalidator");

const { rootDir } = require("../path-utils");
const siteMetadata = require("../../metadata.json");
const pagesDir = path.join(rootDir, "pages");

const inferURLParams = (filePath) => {
  let t = filePath;

  // Trim pages/ dir.
  if (t.startsWith(pagesDir)) t = t.substr(pagesDir.length + 1);
  else if (t.startsWith(`pages${path.sep}`)) t = t.substr(6);

  // Trim extension.
  if (t.endsWith(".mdx")) t = t.substr(0, t.length - 4);

  const subpage = path.dirname(t);
  const slug = path.basename(t);
  return { subpage, slug };
};

const isPage = (filePath) => {
  const { subpage, slug } = inferURLParams(filePath);

  // A page is valid if its file path can infer a valid pair of subpage and slug.
  return (
    subpage.length > 0 && subpage.indexOf(path.sep) === -1 && slug.length > 0
  );
};

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

  const { subpage, slug } = inferURLParams(file.path);
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
