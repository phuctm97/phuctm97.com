const path = require("path");
const glob = require("glob");
const fs = require("fs");

const { rootDir } = require("../scripts/path-utils");
const { logger } = require("../scripts/bin-utils");
const { inferPageURLParams } = require("../scripts/page-utils");

const devtoAPI = require("../scripts/devto-api");
const renderFor = require("../scripts/mdx/render-for");

const devtoSyncJSONPath = path.resolve(__dirname, "../data/devto-sync.json");
const toDEVtoSync = (article, md5) => ({
  id: article.id,
  url: article.url,
  md5,
});

const sync = async () => {
  const devtoSync = require(devtoSyncJSONPath);

  const filePaths = glob.sync("pages/**/*.mdx", {
    cwd: rootDir,
    absolute: true,
  });

  for (let filePath of filePaths) {
    const { subpage, slug } = inferPageURLParams(filePath);
    const pageID = `${subpage}/${slug}`;

    const devtoDat = renderFor(filePath, "devto");

    if (!devtoSync[pageID]) {
      logger.debug(`New page '${pageID}': creating DEV.to article...`);

      const article = await devtoAPI.createArticle(devtoDat);
      devtoSync[pageID] = toDEVtoSync(article, devtoDat.md5);

      logger.success(`Created DEV.to article '${article.url}'.`);
    } else {
      const { id, url, md5: prevMD5 } = devtoSync[pageID];
      if (prevMD5 !== devtoDat.md5) {
        logger.debug(
          `Page '${pageID}' changed: updating DEV.to article '${url}'...`
        );

        const article = await devtoAPI.updateArticle(id, devtoDat);
        devtoSync[pageID] = toDEVtoSync(article, devtoDat.md5);

        logger.success(`Updated DEV.to article '${article.url}'.`);
      }
    }
  }

  fs.writeFileSync(
    devtoSyncJSONPath,
    JSON.stringify(devtoSync, null, 2) + "\n"
  );
  logger.info("DEV.to articles are up to date.");
};

sync().catch((err) => {
  logger.error(err);
  process.exit(1);
});
