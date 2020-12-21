const path = require("path");
const fs = require("fs");
const md5 = require("md5");
const axios = require("axios").default;
const matter = require("gray-matter");
const log = require("./log");
const {
  getAllPagePaths,
  pagePath2URLParams,
  getPageCanonicalURL,
} = require("../scripts/page-utils");
const { beautifyAxiosErrorMessage, delay } = require("../scripts/async-utils");

const getPageData = ({ pagePath, subpage, slug }) => {
  const { data, content } = matter(fs.readFileSync(pagePath, "utf-8"));

  const devto = {
    data: {
      title: data.title,
      description: data.description,
      canonical_url: getPageCanonicalURL({ subpage, slug }),
    },
    content,
  };

  const blob = matter.stringify(devto.content, devto.data);
  return { ...devto, blob, md5: md5(blob) };
};

const createArticle = async ({ data, content, md5 }) => {
  try {
    const {
      data: { id, url },
    } = await axios.post(
      "https://dev.to/api/articles",
      { article: { ...data, body_markdown: content } },
      { headers: { "api-key": process.env.DEVTO_API_KEY } }
    );

    return {
      id,
      url,
      md5,
    };
  } catch (err) {
    throw new Error(beautifyAxiosErrorMessage(err));
  } finally {
    await delay(5000);
  }
};

const updateArticle = async (id, { data, content, md5 }) => {
  try {
    const {
      data: { url },
    } = await axios.put(
      `https://dev.to/api/articles/${id}`,
      { article: { ...data, body_markdown: content } },
      { headers: { "api-key": process.env.DEVTO_API_KEY } }
    );

    return {
      id,
      url,
      md5,
    };
  } catch (err) {
    throw new Error(beautifyAxiosErrorMessage(err));
  } finally {
    await delay(5000);
  }
};

const exec = async () => {
  const syncJSON = require("../data/devto-sync.json");
  const pagePaths = getAllPagePaths();

  for (let pagePath of pagePaths) {
    const { subpage, slug } = pagePath2URLParams(pagePath);
    const id = `${subpage}/${slug}`;

    const data = getPageData({ pagePath, subpage, slug });

    if (!syncJSON[id]) {
      log.debug(`New article '${id}': Creating DEV.to article...`);
      syncJSON[id] = await createArticle(data);
      log.success(`Created DEV.to article '${syncJSON[id].url}'.`);
    } else {
      const { md5: prev } = syncJSON[id];
      const { md5: curr } = data;
      if (prev === curr) continue;

      log.debug(`Article '${id}' changed: Updating DEV.to article...`);
      syncJSON[id] = await updateArticle(syncJSON[id].id, data);
      log.success(`Updated DEV.to article '${syncJSON[id].url}'.`);
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../data/devto-sync.json"),
    JSON.stringify(syncJSON, null, 2)
  );
  log.info("All DEV.to articles are up to date.");
};

exec().catch((err) => {
  log.error(err);
  process.exit(1);
});
