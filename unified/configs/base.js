// 3rd Remark plugins.
const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const unwrapTexts = require("remark-unwrap-texts");

// This project's Remark plugins.
const extractFrontmatter = require("../plugins/extract-frontmatter");
const titleFromContents = require("../plugins/title-from-contents");
const descriptionFromContents = require("../plugins/description-from-contents");
const pageURLElements = require("../plugins/page-url-elements");
const namedExports = require("../plugins/export-data");

// 3rd Rehype plugins.
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const defaultOpts = {
  extraFrontmatterAttrs: {},
  extraExports: [],
  extraRemarkPlugins: [],
  extraRehypePlugins: [],
};

module.exports = (opts) => {
  const {
    extraFrontmatterAttrs,
    extraExports,
    extraRemarkPlugins,
    extraRehypePlugins,
  } = Object.assign({}, defaultOpts, opts);

  return {
    remarkPlugins: [
      frontmatter,
      parseFrontmatter,
      [
        extractFrontmatter,
        {
          title: { type: "string" },
          description: { type: "string" },
          ...extraFrontmatterAttrs,
        },
      ],
      unwrapTexts,
      titleFromContents,
      descriptionFromContents,
      pageURLElements,
      ...extraRemarkPlugins,
      [
        namedExports,
        [
          "title",
          "description",
          "url",
          "path",
          "folder",
          "slug",
          ...extraExports,
        ],
      ],
    ],
    rehypePlugins: [prism, a11yEmojis, ...extraRehypePlugins],
  };
};
