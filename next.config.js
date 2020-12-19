const remarkPage = require("./scripts/remark-page");
const remarkA11yEmoji = require("@fec/remark-a11y-emoji");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [remarkPage, remarkA11yEmoji],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
