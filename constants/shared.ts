import PKG from "~/package.json";

export { PKG };

export const HOMEPAGE = new URL(PKG.homepage);

export const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
