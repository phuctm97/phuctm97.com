const typography = require("@tailwindcss/typography")({
  modifiers: ["sm"],
});

module.exports = {
  purge: ["pages/**/*.tsx", "components/**/*.tsx", "layouts/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: { 950: "#111" },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
            "h1:first-of-type": {
              color: theme("colors.gray.900"),
              fontSize: theme("fontSize.2xl"),
              fontWeight: theme("fontWeight.extrabold"),
              letterSpacing: theme("letterSpacing.tight"),
            },
            "h1 strong, h2 strong, h3 strong, h4 strong, h5 strong": {
              fontWeight: theme("fontWeight.extrabold"),
            },
            pre: {
              backgroundColor: theme("colors.gray.50"),
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: theme("colors.gray.200"),
            },
          },
        },
        sm: {
          css: {
            "h1:first-of-type": {
              fontSize: theme("fontSize.3xl"),
              lineHeight: theme("lineHeight.none"),
            },
          },
        },
        md: {
          css: {
            "h1:first-of-type": {
              fontSize: theme("fontSize.5xl"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            "h1:first-of-type": {
              color: theme("colors.gray.100"),
            },
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
