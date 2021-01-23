const frontmatter = require("remark-frontmatter");
const frontmatterYAML = require("remark-parse-frontmatter");
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const content = require("./unified/content");

module.exports = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter, frontmatterYAML, content],
    rehypePlugins: [prism, a11yEmojis],
  },
});
