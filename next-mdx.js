const syspath = require("path");

const configs = {
  base: require("./unified/configs/base"),
  blog: require("./unified/configs/blog"),
  cheatsheet: require("./unified/configs/cheatsheet"),
};

const folders = {
  blog: syspath.join(__dirname, "pages", "blog"),
  cheatsheet: syspath.join(__dirname, "pages", "cheatsheets"),
};

const configureMDX = ({ realResource }) => {
  if (realResource.startsWith(folders.blog)) return configs.blog();
  if (realResource.startsWith(folders.cheatsheet)) return configs.cheatsheet();
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
