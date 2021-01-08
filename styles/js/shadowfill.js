const plugin = require("tailwindcss/plugin");
const flattenColors = require("./flatten-colors");

const shadowfill = plugin(
  ({ addUtilities, variants, theme, e }) => {
    const colors = flattenColors(theme("colors"));
    const utils = Object.entries(colors).reduce(
      (res, [key, value]) =>
        Object.assign(res, {
          [`.${e(`shadowfill-${key}`)}`]: {
            "--tw-shadow": `0 0 0 10em ${value} inset`,
            boxShadow:
              "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
          },
        }),
      {}
    );
    addUtilities(utils, variants("shadowfill"));
  },
  { variants: { shadowfill: [] } }
);

module.exports = shadowfill;
