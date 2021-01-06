const frontmatter = require("remark-frontmatter");
const frontmatterParser = require("remark-parse-frontmatter");
const prism = require("@mapbox/rehype-prism");
const { postSchema, postParser, postExporter } = require("./lib/js/post");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      frontmatter,
      [frontmatterParser, postSchema],
      postParser,
      postExporter,
    ],
    rehypePlugins: [prism],
  },
});

module.exports = withMDX({
  pageExtensions: ["tsx", "mdx"],
});
