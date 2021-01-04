module.exports = {
  purge: ["pages/**/*.tsx", "components/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans:
          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            "h1, h2, h3, h4, h5, h6": {
              color: theme("colors.black"),
            },
            h1: {
              fontWeight: theme("fontWeight.bold"),
              letterSpacing: theme("letterSpacing.tighter"),
            },
            "h2, h3, h4, h5, h6": {
              letterSpacing: theme("letterSpacing.tight"),
            },
            blockquote: {
              color: theme("colors.gray.500"),
              fontWeight: theme("fontWeight.normal"),
              fontStyle: "normal",
            },
            "blockquote p:first-of-type::before": {
              content: '""',
            },
            "blockquote p:last-of-type::after": {
              content: '""',
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
