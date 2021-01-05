const frontmatter = require("remark-frontmatter");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
