module.exports = {
  ci: {
    collect: {
      url: ["http://localhost:3000/"],
      startServerCommand: "yarn start",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
