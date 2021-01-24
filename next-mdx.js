module.exports = (options = {}) => (next = {}) =>
  Object.assign({}, next, {
    webpack(config, appOptions) {
      config.module.rules.push({
        test: /\.(md|mdx)$/,
        use: [
          appOptions.defaultLoaders.babel,
          {
            loader: require.resolve("@mdx-js/loader"),
            options,
          },
        ],
      });

      if (typeof next.webpack === "function") {
        return next.webpack(config, appOptions);
      }

      return config;
    },
  });
