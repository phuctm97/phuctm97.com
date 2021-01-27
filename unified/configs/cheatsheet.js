const prebuiltIcon = require("../plugins/prebuilt-icon");
const defaultExport = require("../plugins/default-export");
const config = require("./base");

module.exports = () =>
  config({
    extraFrontmatterAttrs: {
      icon: { type: "string", required: true },
    },
    extraNamedExports: ["icon"],
    extraRemarkPlugins: [prebuiltIcon, [defaultExport, "~/layouts/cheatsheet"]],
  });
