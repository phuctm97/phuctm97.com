const syspath = require("path");

const presets = {
  default: require("./unified/presets/default"),
  blog: require("./unified/presets/blog"),
};
const dirs = {
  blog: syspath.join(__dirname, "pages", "blog"),
};
const exportPlugin = require("./unified/plugins/export-data");

const makeMDXOptions = ({ realResource }) => {
  const extraRemarkPlugins = [];
  const extraRehypePlugins = [];
  const extraExportAttrs = [];

  if (realResource.startsWith(dirs.blog)) {
    extraRemarkPlugins.push(...presets.blog.extraRemarkPlugins);
    extraExportAttrs.push(...presets.blog.extraExportAttrs);
  }

  return {
    remarkPlugins: [
      ...presets.default.remarkPlugins,
      ...extraRemarkPlugins,
      [exportPlugin, [...presets.default.exportAttrs, ...extraExportAttrs]],
    ],
    rehypePlugins: [...presets.default.rehypePlugins, ...extraRehypePlugins],
  };
};

module.exports = (next = {}) =>
  Object.assign({}, next, {
    webpack(config, appOptions) {
      config.module.rules.push({
        test: /\.(md|mdx)$/,
        use: (info) => [
          appOptions.defaultLoaders.babel,
          {
            loader: require.resolve("@mdx-js/loader"),
            options: makeMDXOptions(info),
          },
        ],
      });

      if (typeof next.webpack === "function") {
        return next.webpack(config, appOptions);
      }

      return config;
    },
  });
