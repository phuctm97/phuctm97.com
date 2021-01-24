const withMDX = require("./next-mdx");

// TODO: Use Preact when it's compatible with `next-seo`.

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV,
  },
});
