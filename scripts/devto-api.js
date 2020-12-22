const axios = require("axios");
const { throttle } = require("./async-utils");

const agent = axios.create({
  baseURL: "https://dev.to/api",
  headers: { "api-key": process.env.DEVTO_API_KEY },
  timeout: 10000,
});

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

const devtoAPI = {
  createArticle,
  updateArticle,
};

module.exports = devtoAPI;
