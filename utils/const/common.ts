export const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
