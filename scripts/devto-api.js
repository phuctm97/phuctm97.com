const axios = require("axios").default;
const logplease = require("logplease");
const { getPageCanonicalURL } = require("./page-utils");
const { beautifyAxiosErrorMessage, delay } = require("./async-utils");

const logger = logplease.create("DEV.to API");

const page2DEVtoAritcle = ({ title, description, subpage, slug, content }) => ({
  title,
  published: false,
  canonical_url: getPageCanonicalURL({ subpage, slug }),
  description,
  body_markdown: content,
});

const createDEVtoArticle = async (page) => {
  logger.debug(`Creating a DEV.to article.`);

  try {
    const { data } = await axios.post(
      "https://dev.to/api/articles",
      { article: page2DEVtoAritcle(page) },
      { headers: { "api-key": process.env.DEVTO_API_KEY } }
    );

    logger.info(`Created DEV.to article: ${data.url}.`);
    return data;
  } catch (err) {
    logger.error(
      `Failed to create DEV.to article for ${page.subpage}/${page.slug}.`
    );
    throw new Error(beautifyAxiosErrorMessage(err));
  } finally {
    await delay(5000);
  }
};

module.exports = {
  createDEVtoArticle,
};
