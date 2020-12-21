const axios = require("axios");

const agent = axios.create({
  baseURL: "https://dev.to/api",
  timeout: 5000,
  headers: { "api-key": process.env.DEVTO_API_KEY },
});

const createArticle = async ({ frontmatter, content }) => {
  const { data } = await agent.post("/articles", {
    article: { ...frontmatter, body_markdown: content },
  });
  return data;
};

const updateArticle = async (id, { frontmatter, content }) => {
  const { data } = await agent.put(`/articles/${id}`, {
    article: { ...frontmatter, body_markdown: content },
  });
  return data;
};

module.exports = {
  createArticle,
  updateArticle,
};
