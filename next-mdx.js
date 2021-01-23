const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

module.exports = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: [prism, a11yEmojis],
  },
});
