module.exports = {
  plugins: [
    require("remark-frontmatter"),
    require("./remark-parse-frontmatter"),
    require("./remark-page-metadata"),
    require("./remark-devto-frontmatter"),
    require("remark-squeeze-paragraphs"),
    require("./remark-trim-text-newlines"),
    require("./remark-remove-frontmatter"),
  ],
};
