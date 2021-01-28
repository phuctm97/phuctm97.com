import PKG from "~/package.json";

export { PKG };

export const ME = {
  ...PKG.author,
  username: "phuctm97",
  avatarURL: "/static/avatar.jpg",
};

export const SECONDS = 1000;

export const IS_PRODUCTION =
  process.env.NODE_ENV === "production" &&
  process.env.VERCEL_ENV === "production";
