// 3rd Remark plugins.
const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const unwrapTexts = require("remark-unwrap-texts");

// This project's Remark plugins.
const extractFrontmatter = require("../plugins/extract-frontmatter");
const titleFromContents = require("../plugins/title-from-contents");
const descriptionFromContents = require("../plugins/description-from-contents");
const pageURLElements = require("../plugins/page-url-elements");
const namedExports = require("../plugins/named-exports");

// 3rd Rehype plugins.
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const defaultOpts = {
  extraFrontmatterAttrs: {},
  extraNamedExports: [],
  extraRemarkPlugins: [],
  extraRehypePlugins: [],
};

module.exports = (opts) => {
  const {
    extraFrontmatterAttrs,
    extraNamedExports,
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
          ...extraNamedExports,
        ],
      ],
    ],
    rehypePlugins: [prism, a11yEmojis, ...extraRehypePlugins],
  };
};
