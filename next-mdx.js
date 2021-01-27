const syspath = require("path");

const configs = {
  base: require("./unified/configs/base"),
  blog: require("./unified/configs/blog"),
};

const dirs = {
  blog: syspath.join(__dirname, "pages", "blog"),
};

const configureMDX = ({ realResource }) => {
  if (realResource.startsWith(dirs.blog)) return configs.blog();
  return configs.base();
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
            options: configureMDX(info),
          },
        ],
      });

      if (typeof next.webpack === "function") {
        return next.webpack(config, appOptions);
      }

      return config;
    },
  });
