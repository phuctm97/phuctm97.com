// This project's Remark plugins.
const extractFrontmatter = require("../plugins/extract-frontmatter");
const generatedCover = require("../plugins/generated-cover");
const exportLayout = require("../plugins/export-layout");

module.exports = {
  extraRemarkPlugins: [
    [
      extractFrontmatter,
      {
        date: { type: "string", format: "date", required: true },
        tags: {
          type: "array",
          items: { type: "string", minLength: 1, required: true },
          uniqueItems: true,
          maxItems: 4,
        },
        cover: {
          type: "object",
          properties: {
            url: { type: "string", format: "url" },
            icons: {
              type: "array",
              items: { type: "string", minLength: 1, required: true },
              uniqueItems: true,
              maxItems: 3,
            },
          },
        },
      },
    ],
    generatedCover,
    [exportLayout, "~/layouts/blog"],
  ],
  extraExports: ["date", "tags", "cover"],
};
