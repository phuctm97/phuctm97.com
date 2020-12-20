const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

module.exports = {
  sleep,
};
