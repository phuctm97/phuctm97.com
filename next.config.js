const withMDX = require("./next-mdx");

const withPreact = require("./next-preact");

module.exports = withPreact(
  withMDX({
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    env: {
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
  })
);
