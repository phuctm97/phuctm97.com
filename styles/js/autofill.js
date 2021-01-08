const plugin = require("tailwindcss/plugin");

const autofill = plugin(({ addVariant, e }) => {
  addVariant("autofill", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const newClass = e(`autofill${separator}${className}`);
      return [
        `.${newClass}:-webkit-autofill`,
        `.${newClass}:-webkit-autofill:hover`,
        `.${newClass}:-webkit-autofill:focus`,
      ].join(",");
    });
  });
});

module.exports = autofill;
