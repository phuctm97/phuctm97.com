const PKG_JSON = require("../package.json");

const HOMEPAGE = new URL(PKG_JSON.homepage);

const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";

module.exports = {
  PKG_JSON,
  HOMEPAGE,
  IS_PRODUCTION,
};
