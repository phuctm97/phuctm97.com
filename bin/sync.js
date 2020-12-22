const path = require("path");
const glob = require("glob");
const fs = require("fs");

const { rootDir } = require("../scripts/path-utils");
const { logger } = require("../scripts/bin-utils");
const { inferPageURLParams } = require("../scripts/page-utils");

const devtoAPI = require("../scripts/devto-api");
const renderFor = require("../scripts/mdx/render-for");

const devtoSyncJSONPath = path.resolve(__dirname, "../data/devto-sync.json");
const toDEVtoSync = ({ id, url }, md5) => ({ id, url, md5 });

const sync = async () => {
  const devtoSync = require(devtoSyncJSONPath);

  const filePaths = glob.sync("pages/**/*.mdx", {
    cwd: rootDir,
    absolute: true,
  });

  for (let filePath of filePaths) {
    const { subpage, slug } = inferPageURLParams(filePath);
    const pageID = `${subpage}/${slug}`;

    const devtoPage = renderFor(filePath, "devto");

    if (!devtoSync[pageID]) {
      logger.debug(`New page '${pageID}': creating DEV.to article...`);

      devtoSync[pageID] = toDEVtoSync(
        await devtoAPI.createArticle(devtoPage),
        devtoPage.md5
      );

      logger.success(`Created DEV.to article '${devtoSync[pageID].url}'.`);
    } else {
      const { id, url, md5: prevMD5 } = devtoSync[pageID];
      if (prevMD5 !== devtoPage.md5) {
        logger.debug(
          `Page '${pageID}' changed: updating DEV.to article '${url}'...`
        );

        devtoSync[pageID] = toDEVtoSync(
          await devtoAPI.updateArticle(id, devtoPage),
          devtoPage.md5
        );

        logger.success(`Updated DEV.to article '${devtoSync[pageID].url}'.`);
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
