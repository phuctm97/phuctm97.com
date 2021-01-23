const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const extractFrontmatter = require("./unified/extract-frontmatter");
const titleFromContents = require("./unified/title-from-contents");
const descriptionFromContents = require("./unified/description-from-contents");
const urlElements = require("./unified/url-elements");
const exportData = require("./unified/export-data");

module.exports = require("@next/mdx")({
  options: {
    remarkPlugins: [
      frontmatter,
      parseFrontmatter,
      [
        extractFrontmatter,
        { title: { type: "string" }, description: { type: "string" } },
      ],
      titleFromContents,
      descriptionFromContents,
      urlElements,
      [exportData, ["title", "description", "url", "path", "folder", "slug"]],
    ],
    rehypePlugins: [prism, a11yEmojis],
  },
});
