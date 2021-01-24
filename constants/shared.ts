import PKG from "~/package.json";

export { PKG };

export const HOMEPAGE = new URL(PKG.homepage);

export const ME = {
  ...PKG.author,
  username: "phuctm97",
  avatarURL: "/static/avatar.jpg",
};

export const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
