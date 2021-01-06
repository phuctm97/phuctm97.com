const typography = require("@tailwindcss/typography")({
  modifiers: ["sm"],
});

module.exports = {
  purge: ["pages/**/*.tsx", "components/**/*.tsx", "layouts/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            pre: {
              backgroundColor: theme("colors.gray.50"),
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: theme("colors.gray.200"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            "h1, h2, h3, h4, h5, h6, a, thead, :not(pre) code": {
              color: theme("colors.gray.100"),
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.300") },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
            blockquote: {
              color: theme("colors.gray.500"),
              borderLeftColor: theme("colors.gray.700"),
            },
            pre: {
              backgroundColor: theme("colors.gray.900"),
              borderColor: theme("colors.gray.700"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      backgroundOpacity: ["dark"],
      typography: ["dark"],
    },
  },
  plugins: [typography],
};
