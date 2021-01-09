const frontmatter = require("remark-frontmatter");
const frontmatterParser = require("remark-parse-frontmatter");
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;
const { postParser, postExporter } = require("./js/lib/post");

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [frontmatter, frontmatterParser, postParser, postExporter],
    rehypePlugins: [prism, a11yEmojis],
  },
});

const withPreact = (next = {}) =>
  Object.assign({}, next, {
    webpack(config, options) {
      const { dev, isServer } = options;

      // Use Preact only in client production bundle.
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom": "preact/compat",
          "create-react-class": "preact-compat/lib/create-react-class",
          "react-dom-factories": "preact-compat/lib/react-dom-factories",
        });
      }

      if (typeof next.webpack === "function") {
        return next.webpack(config, options);
      }

      return config;
    },
  });

module.exports = withPreact(
  withMDX({
    pageExtensions: ["ts", "tsx", "mdx"],
  })
);
