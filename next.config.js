const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      require("remark-frontmatter"),
      require("remark-parse-frontmatter"),
      require("./scripts/mdx/remark-post-metadata"),
      require("remark-unwrap-texts"),
      require("./scripts/mdx/remark-post-layout"),
    ],
    rehypePlugins: [
      require("rehype-accessible-emojis").rehypeAccessibleEmojis,
      require("@mapbox/rehype-prism"),
    ],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
