const axios = require("axios").default;
const { getPageCanonicalURL } = require("./page-utils");
const { beautifyAxiosErrorMessage, delay } = require("./async-utils");

const page2DEVtoAritcle = ({ title, description, subpage, slug, content }) => ({
  title,
  published: false,
  canonical_url: getPageCanonicalURL({ subpage, slug }),
  description,
  body_markdown: content,
});

const createDEVtoArticle = async (page) => {
  console.log(`Creating a DEV.to article.`);

  try {
    const { data } = await axios.post(
      "https://dev.to/api/articles",
      { article: page2DEVtoAritcle(page) },
      { headers: { "api-key": process.env.DEVTO_API_KEY } }
    );

    console.log(`Created DEV.to article: ${data.url}.`);
    return data;
  } catch (err) {
    throw new Error(beautifyAxiosErrorMessage(err));
  } finally {
    await delay(5000);
  }
};

module.exports = {
  createDEVtoArticle,
};
