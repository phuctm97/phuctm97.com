const beautifyAxiosErrorMessage = (err) =>
  err.response
    ? `${err.message}:\n${JSON.stringify(err.response.data, null, 2)}`
    : err.message;

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

module.exports = {
  beautifyAxiosErrorMessage,
  delay,
};
