const withPreact = require("./next-preact");
const withMDX = require("./next-mdx");

module.exports = withPreact(
  withMDX({
    pageExtensions: ["ts", "tsx", "mdx"],
    env: {
      VERCEL_ENV: process.env.VERCEL_ENV,
    },
  })
);
