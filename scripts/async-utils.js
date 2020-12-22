const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const throttle = (fn, duration = 5000) => (...args) =>
  Promise.all([fn(...args), delay(duration)]).then(([fnRet]) => fnRet);

module.exports = {
  delay,
  throttle,
};
