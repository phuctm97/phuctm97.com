const plugin = require("tailwindcss/plugin");
const flatten = require("flatten-tailwindcss-theme");

const textfill = plugin(
  ({ addUtilities, variants, theme, e }) => {
    const colors = flatten(theme("colors"));
    const utils = Object.entries(colors).reduce(
      (res, [key, value]) =>
        Object.assign(res, {
          [`.${e(`textfill-${key}`)}`]: {
            "-webkit-text-fill-color": value,
          },
        }),
      {}
    );
    addUtilities(utils, variants("textfill"));
  },
  { variants: { textfill: [] } }
);

module.exports = textfill;
