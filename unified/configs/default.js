// 3rd Remark plugins.
const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const unwrapTexts = require("remark-unwrap-texts");

// This project's Remark plugins.
const extractFrontmatter = require("../plugins/extract-frontmatter");
const titleFromContents = require("../plugins/title-from-contents");
const descriptionFromContents = require("../plugins/description-from-contents");
const pageURLElements = require("../plugins/page-url-elements");

// 3rd Rehype plugins.
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

module.exports = {
  remarkPlugins: [
    frontmatter,
    parseFrontmatter,
    unwrapTexts,
    [
      extractFrontmatter,
      { title: { type: "string" }, description: { type: "string" } },
    ],
    titleFromContents,
    descriptionFromContents,
    pageURLElements,
  ],
  rehypePlugins: [prism, a11yEmojis],
  exports: ["title", "description", "url", "path", "folder", "slug"],
};
