const path = require("path");
const fs = require("fs");
const md5 = require("md5");

const logger = require("./logger");
const processMDX = require("./process-mdx");
const pageUtils = require("../mdx/page-utils");

const DEVtoAPI = require("./devto-api");
const DEVtoMDXPreset = require("../mdx/remark-devto-preset");
const DEVtoSyncJSONPath = path.resolve(__dirname, "../data/devto-sync.json");

const toDEVtoSyncJSON = ({ id, url }, md5) => ({ id, url, md5 });

const sync = async () => {
  const devtoSync = require(DEVtoSyncJSONPath);

  const pagePaths = pageUtils.all();
  for (let pagePath of pagePaths) {
    const { subpage, slug } = pageUtils.getURLParam(pagePath);
    const pageID = `${subpage}/${slug}`;

    const devtoPage = processMDX(pagePath, DEVtoMDXPreset);
    const devtoMD5 = md5(
      `${JSON.stringify(devtoPage.frontmatter)}\n${devtoPage.content}`
    );

    if (!devtoSync[pageID]) {
      logger.debug(`New page '${pageID}': creating DEV.to article...`);

      devtoSync[pageID] = toDEVtoSyncJSON(
        await DEVtoAPI.createArticle(devtoPage),
        devtoMD5
      );

      logger.success(`Created DEV.to article '${devtoSync[pageID].url}'.`);
    } else {
      const { id, url, md5: prevMD5 } = devtoSync[pageID];
      if (prevMD5 !== devtoMD5) {
        logger.debug(
          `Page '${pageID}' changed: updating DEV.to article '${url}'...`
        );

        devtoSync[pageID] = toDEVtoSyncJSON(
          await DEVtoAPI.updateArticle(id, devtoPage),
          devtoMD5
        );

        logger.success(`Updated DEV.to article '${devtoSync[pageID].url}'.`);
      }
    }
  }

  fs.writeFileSync(DEVtoSyncJSONPath, JSON.stringify(devtoSync, null, 2));
  logger.info("DEV.to articles are up to date.");
};

sync().catch((err) => {
  logger.error(err);
  process.exit(1);
});
