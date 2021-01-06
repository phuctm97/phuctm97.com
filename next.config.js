const frontmatter = require("remark-frontmatter");
const frontmatterParser = require("remark-parse-frontmatter");
const prism = require("@mapbox/rehype-prism");
const { postExtracter } = require("./lib/js/post");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter, frontmatterParser, postExtracter],
    rehypePlugins: [prism],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
