const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      require("remark-frontmatter"),
      [
        require("./scripts/mdx/remark-parse-frontmatter"),
        {
          properties: {
            title: { type: "string", required: true },
            description: { type: "string", required: true },
            "published time": {
              type: "string",
              required: true,
              format: "date",
            },
          },
        },
      ],
      require("./scripts/mdx/remark-page-metadata"),
      require("./scripts/mdx/remark-page-layout"),
    ],
    rehypePlugins: [require("rehype-accessible-emojis").rehypeAccessibleEmojis],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
