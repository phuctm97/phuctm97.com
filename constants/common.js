const PKG = require("../package.json");

const HOMEPAGE = new URL(PKG.homepage);

const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";

module.exports = {
  PKG,
  HOMEPAGE,
  IS_PRODUCTION,
};
