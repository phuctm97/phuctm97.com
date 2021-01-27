const generatedCover = require("../plugins/generated-cover");
const defaultExport = require("../plugins/export-layout");
const config = require("./base");

module.exports = () =>
  config({
    extraFrontmatterAttrs: {
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
    extraExports: ["date", "tags", "cover"],
    extraRemarkPlugins: [generatedCover, [defaultExport, "~/layouts/blog"]],
  });
