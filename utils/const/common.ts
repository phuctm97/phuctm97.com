import PKG_JSON from "~/package.json";

export { PKG_JSON };

export const HOMEPAGE = new URL(PKG_JSON.homepage);

export const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
