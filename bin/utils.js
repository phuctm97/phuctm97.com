const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

module.exports = {
  delay,
};
