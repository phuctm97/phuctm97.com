// 3rd Remark plugins
const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const unwrapTexts = require("remark-unwrap-texts");

// Application-specific Remark plugins
const extractFrontmatter = require("../plugins/extract-frontmatter");
const titleFromContents = require("../plugins/title-from-contents");
const descriptionFromContents = require("../plugins/description-from-contents");
const pageURLElements = require("../plugins/page-url-elements");

// 3rd Rehype plugins
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const remarkPlugins = [
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
];

const rehypePlugins = [prism, a11yEmojis];

const exportAttrs = ["title", "description", "url", "path", "folder", "slug"];

module.exports = {
  remarkPlugins,
  rehypePlugins,
  exportAttrs,
};
