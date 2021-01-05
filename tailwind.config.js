const typography = require("@tailwindcss/typography");

module.exports = {
  purge: ["pages/**/*.tsx", "components/**/*.tsx", "layouts/**/*.tsx"],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [typography],
};
