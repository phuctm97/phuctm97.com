const frontmatter = require("remark-frontmatter");
const frontmatterYAML = require("remark-parse-frontmatter");
const title = require("./utils/content/title");
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

module.exports = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter, frontmatterYAML, title],
    rehypePlugins: [prism, a11yEmojis],
  },
});
