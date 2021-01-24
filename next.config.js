const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const parseBlog = require("./js/packages/next-blog/unified-parser").default;
const exportBlog = require("./js/packages/next-blog/unified-exporter").default;
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter, parseFrontmatter, parseBlog, exportBlog],
    rehypePlugins: [prism, a11yEmojis],
  },
});

const withPreact = require("./next-preact");

module.exports = withPreact(
  withMDX({
    pageExtensions: ["ts", "tsx", "mdx"],
    env: {
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
  })
);
