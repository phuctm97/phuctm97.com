const typography = require("@tailwindcss/typography")({
  modifiers: ["sm"],
});
const autofill = require("tailwindcss-autofill");
const textFill = require("tailwindcss-text-fill");
const shadowFill = require("tailwindcss-shadow-fill");
const lineClamp = require("@tailwindcss/line-clamp");
const { em } = require("./styles/utils");

module.exports = {
  purge: ["pages/**/*.tsx", "components/**/*.tsx", "layouts/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: { 950: "#111" },
        green: { 250: "#88fdc5" },
        indigo: { 550: "#513eea" },
        magenta: "#ff0090",
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
              marginBottom: theme("spacing.8"),
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
            "pre > code": {
              color: theme("colors.gray.800"),
            },
            ".code-title": {
              marginTop: em(24, 14),
              "& > pre": {
                marginTop: 0,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              },
            },
            ".info img, .info p": {
              marginTop: 0,
              marginBottom: 0,
            },
            ".info p": {
              color: theme("colors.gray.600"),
              fontWeight: theme("fontWeight.light"),
            },
            ".info a": {
              textDecoration: "none",
            },
            ".tags p": {
              marginTop: 0,
              marginBottom: theme("spacing.1"),
              marginRight: theme("spacing.1"),
            },
            ".tags p:last-child": {
              marginRight: 0,
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
            "pre > code": {
              color: theme("colors.gray.200"),
            },
            ".info p": {
              color: theme("colors.gray.500"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
      backgroundOpacity: ["dark"],
      textOpacity: ["disabled", "dark"],
      opacity: ["disabled"],
      cursor: ["disabled"],
      textFill: ["autofill", "dark"],
      shadowFill: ["autofill", "dark"],
    },
  },
  plugins: [typography, autofill, textFill, shadowFill, lineClamp],
};
