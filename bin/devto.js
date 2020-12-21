const axios = require("axios");

const agent = axios.create({
  baseURL: "https://dev.to/api",
  timeout: 5000,
  headers: { "api-key": process.env.DEVTO_API_KEY },
});

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const createArticle = async ({ frontmatter, content }) => {
  try {
    const { data } = await agent.post("/articles", {
      article: { ...frontmatter, body_markdown: content },
    });
    return data;
  } finally {
    await delay(5000);
  }
};

const updateArticle = async (id, { frontmatter, content }) => {
  try {
    const { data } = await agent.put(`/articles/${id}`, {
      article: { ...frontmatter, body_markdown: content },
    });
    return data;
  } finally {
    await delay(5000);
  }
};

module.exports = {
  createArticle,
  updateArticle,
};
