const remarkExtractFrontmatter = require("remark-frontmatter");
const remarkParseFrontmatter = require("./mdx/remark-parse-frontmatter");
const remarkTransformPage = require("./mdx/remark-transform-page");
const { rehypeAccessibleEmojis } = require("rehype-accessible-emojis");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkParseFrontmatter,
      remarkTransformPage,
    ],
    rehypePlugins: [rehypeAccessibleEmojis],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
