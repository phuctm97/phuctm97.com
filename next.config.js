const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter, parseFrontmatter],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
