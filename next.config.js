const remarkExtractFrontmatter = require("remark-frontmatter");
const remarkParseFrontmatter = require("./scripts/remark-parse-frontmatter");
const remarkTransformPage = require("./scripts/remark-transform-page");
const remarkA11yEmoji = require("@fec/remark-a11y-emoji");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkParseFrontmatter,
      remarkTransformPage,
      remarkA11yEmoji,
    ],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
