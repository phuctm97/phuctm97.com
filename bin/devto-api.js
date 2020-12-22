const axios = require("axios");
const { delay } = require("./utils");

const agent = axios.create({
  baseURL: "https://dev.to/api",
  timeout: 5000,
  headers: { "api-key": process.env.DEVTO_API_KEY },
});

const throttleDuration = 5000;

const throttle = async (fn) => {
  try {
    return await fn();
  } finally {
    await delay(throttleDuration);
  }
};

const createArticle = throttle(async ({ frontmatter, content }) => {
  const { data } = await agent.post("/articles", {
    article: { ...frontmatter, body_markdown: content },
  });
  return data;
});

const updateArticle = throttle(async (id, { frontmatter, content }) => {
  const { data } = await agent.put(`/articles/${id}`, {
    article: { ...frontmatter, body_markdown: content },
  });
  return data;
});

module.exports = {
  createArticle,
  updateArticle,
};
