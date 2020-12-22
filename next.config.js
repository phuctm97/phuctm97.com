const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      require("remark-frontmatter"),
      require("./scripts/mdx/remark-parse-frontmatter"),
      require("./scripts/mdx/remark-page-metadata"),
      require("./scripts/mdx/remark-page-layout"),
    ],
    rehypePlugins: [require("rehype-accessible-emojis").rehypeAccessibleEmojis],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
