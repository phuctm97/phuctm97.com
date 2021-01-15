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
    env: {
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
  })
);
