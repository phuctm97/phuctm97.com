const axios = require("axios");
const { delay } = require("./utils");

const agent = axios.create({
  baseURL: "https://dev.to/api",
  headers: { "api-key": process.env.DEVTO_API_KEY },
  timeout: 10000,
});

const throttleDuration = 5000;

const throttle = (fn) => (...args) =>
  Promise.all([fn(...args), delay(throttleDuration)]);

const createArticle = throttle(({ frontmatter, content }) =>
  agent
    .post("/articles", {
      article: { ...frontmatter, body_markdown: content },
    })
    .then(({ data }) => data)
);

const updateArticle = throttle((id, { frontmatter, content }) =>
  agent
    .put(`/articles/${id}`, {
      article: { ...frontmatter, body_markdown: content },
    })
    .then(({ data }) => data)
);

module.exports = {
  createArticle,
  updateArticle,
};
