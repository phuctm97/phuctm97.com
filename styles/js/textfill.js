const plugin = require("tailwindcss/plugin");
const flattenColors = require("./flatten-colors");

const textfill = plugin(({ addUtilities, variants, theme, e }) => {
  const colors = flattenColors(theme("colors"));
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
});

module.exports = textfill;
