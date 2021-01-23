const syspath = require("path");
const { BLOG_DIR } = require("./constants/server");

const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("remark-parse-frontmatter");
const prism = require("@mapbox/rehype-prism");
const a11yEmojis = require("rehype-accessible-emojis").rehypeAccessibleEmojis;

const extractFrontmatter = require("./unified/extract-frontmatter");
const titleFromContents = require("./unified/title-from-contents");
const descriptionFromContents = require("./unified/description-from-contents");
const urlElements = require("./unified/url-elements");
const autogenCover = require("./unified/autogen-cover");
const exportData = require("./unified/export-data");
const exportLayout = require("./unified/export-layout");

const makeMDXOpts = ({ realResource }) => {
  const remarkPlugins = [
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
  ];
  const rehypePlugins = [prism, a11yEmojis];

  if (realResource.startsWith(BLOG_DIR)) {
    const [exportPlugin] = remarkPlugins.splice(remarkPlugins.length - 1, 1);
    remarkPlugins.push(
      [
        extractFrontmatter,
        {
          date: {
            type: "string",
            format: "date",
          },
          tags: {
            type: "array",
            items: { type: "string" },
            uniqueItems: true,
            maxItems: 4,
          },
          cover: {
            type: "object",
            properties: {
              url: { type: "string", format: "url" },
              icons: { type: "array", uniqueItems: true, maxItems: 3 },
            },
          },
        },
      ],
      autogenCover,
      [exportPlugin[0], [...exportPlugin[1], "tags", "date", "cover"]],
      [exportLayout, "~/layouts/blog"]
    );
  }

  return {
    remarkPlugins,
    rehypePlugins,
  };
};

module.exports = (next = {}) => {
  return Object.assign({}, next, {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(md|mdx)$/,
        use: (info) => [
          options.defaultLoaders.babel,
          {
            loader: require.resolve("@mdx-js/loader"),
            options: makeMDXOpts(info),
          },
        ],
      });

      if (typeof next.webpack === "function") {
        return next.webpack(config, options);
      }

      return config;
    },
  });
};
