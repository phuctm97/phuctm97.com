const syspath = require("path");

const configs = {
  default: require("./unified/configs/default"),
  blog: require("./unified/configs/blog"),
};

const dirs = {
  blog: syspath.join(__dirname, "pages", "blog"),
};

const exportData = require("./unified/plugins/export-data");

const makeMDXOptions = ({ realResource }) => {
  const extraRemarkPlugins = [];
  const extraRehypePlugins = [];
  const extraExports = [];

  if (realResource.startsWith(dirs.blog)) {
    extraRemarkPlugins.push(...configs.blog.extraRemarkPlugins);
    extraExports.push(...configs.blog.extraExports);
  }

  return {
    remarkPlugins: [
      ...configs.default.remarkPlugins,
      ...extraRemarkPlugins,
      [exportData, [...configs.default.exports, ...extraExports]],
    ],
    rehypePlugins: [...configs.default.rehypePlugins, ...extraRehypePlugins],
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
