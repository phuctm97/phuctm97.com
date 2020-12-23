const path = require("path");
const glob = require("glob");
const fs = require("fs");
const jsonc = require("jsonc-parser");

const { logger } = require("../scripts/bin-utils");
const { rootDir, relPagesDir } = require("../scripts/path-utils");
const { isPost, inferPostURLParams } = require("../scripts/post-utils");

const devtoAPI = require("../scripts/devto-api");
const renderFor = require("../scripts/mdx/render-for");

const devtoSyncJSONPath = path.join(rootDir, "data", "devto-sync.json");
const toDEVtoSync = (article, md5) => ({
  id: article.id,
  url: article.url,
  md5,
});

const parseSyncJSON = (filePath) => {
  const errs = [];

  const syncJSON = jsonc.parse(fs.readFileSync(filePath, "utf-8"), errs);
  if (errs.length > 0)
    throw new Error("Invalid JSON: " + JSON.stringify(errs, null, 2));

  return syncJSON;
};

const writeSyncJSON = (filePath, syncJSON) => {
  fs.writeFileSync(filePath, JSON.stringify(syncJSON, null, 2) + "\n");
};

const sync = async () => {
  const devtoSync = parseSyncJSON(devtoSyncJSONPath);

  const filePaths = glob.sync(`${relPagesDir}/**/*.mdx`, {
    cwd: rootDir,
    absolute: true,
  });

  for (let filePath of filePaths) {
    if (!isPost(filePath)) continue;

    const { folder, slug } = inferPostURLParams(filePath);
    const postID = `${folder}/${slug}`;

    const devtoDat = renderFor(filePath, "devto");

    if (!devtoSync[postID]) {
      logger.debug(`New post '${postID}': creating DEV.to article...`);

      const article = await devtoAPI.createArticle(devtoDat);
      devtoSync[postID] = toDEVtoSync(article, devtoDat.md5);

      logger.success(`Created DEV.to article '${article.url}'.`);
    } else {
      const { id, url, md5: prevMD5 } = devtoSync[postID];

      if (prevMD5 !== devtoDat.md5) {
        logger.debug(
          `Post '${postID}' changed: updating DEV.to article '${url}'...`
        );

        const article = await devtoAPI.updateArticle(id, devtoDat);
        devtoSync[postID] = toDEVtoSync(article, devtoDat.md5);

        logger.success(`Updated DEV.to article '${article.url}'.`);
      }
    }
  }

  writeSyncJSON(devtoSyncJSONPath, devtoSync);
  logger.info("DEV.to articles are up to date.");
};

sync().catch((err) => {
  logger.error(err);
  process.exit(1);
});
