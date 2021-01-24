module.exports = (next = {}) =>
  Object.assign({}, next, {
    webpack(config, appOptions) {
      const { dev, isServer } = appOptions;

      // Replace React with Preact in client production bundle.
      if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom": "preact/compat",
        });
      }

      if (typeof next.webpack === "function") {
        return next.webpack(config, appOptions);
      }

      return config;
    },
  });
