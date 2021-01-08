const plugin = require("tailwindcss/plugin");

const lineClamps = plugin(
  ({ addUtilities, theme, e }) => {
    const clamps = theme("lineClamps");
    const utils = clamps.reduce(
      (res, value) =>
        Object.assign(res, {
          [`.${e(`line-clamp-${value}`)}`]: {
            display: "-webkit-box",
            "-webkit-line-clamp": value.toString(),
            "-webkit-box-orient": "vertical",
          },
        }),
      {}
    );
    addUtilities(utils);
  },
  { theme: { lineClamps: [1, 2, 3] } }
);

module.exports = lineClamps;
