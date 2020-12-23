const path = require("path");
const glob = require("glob");
const fs = require("fs");
const jsonc = require("jsonc-parser");

const { logger } = require("../scripts/bin-utils");
const { rootDir, relPagesDir } = require("../scripts/path-utils");
const { isPost, inferPostURLParams } = require("../scripts/post-utils");

const hashnodeAPI = require("../scripts/hashnode-api");
const renderFor = require("../scripts/mdx/render-for");

const hashnodeSyncJSONPath = path.join(rootDir, "data", "hashnode-sync.json");
const toHashnodeSync = (story, md5) => ({
  id: story._id,
  cuid: story.cuid,
  slug: story.slug,
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
  const hashnodeSync = parseSyncJSON(hashnodeSyncJSONPath);

  const filePaths = glob.sync(`${relPagesDir}/**/*.mdx`, {
    cwd: rootDir,
    absolute: true,
  });

  for (let filePath of filePaths) {
    if (!isPost(filePath)) continue;

    const { folder, slug } = inferPostURLParams(filePath);
    const postID = `${folder}/${slug}`;

    const hashnodeDat = renderFor(filePath, "hashnode");

    if (!hashnodeSync[postID]) {
      logger.debug(`New post '${postID}': creating Hashnode article...`);

      const story = await hashnodeAPI.createStory(hashnodeDat);
      hashnodeSync[postID] = toHashnodeSync(story, hashnodeDat.md5);

      logger.success(`Created Hashnode article '${story.slug}'.`);
    } else {
      const { id, slug: prevSlug, md5: prevMD5 } = hashnodeSync[postID];

      if (prevMD5 !== hashnodeDat.md5) {
        logger.debug(
          `Post '${postID}' changed: updating Hashnode article '${prevSlug}'...`
        );

        const story = await hashnodeAPI.updateStory(id, hashnodeDat);
        hashnodeSync[postID] = toHashnodeSync(story, hashnodeDat.md5);

        logger.success(`Updated Hashnode article '${story.slug}'.`);
      }
    }
  }

  writeSyncJSON(hashnodeSyncJSONPath, hashnodeSync);
  logger.info("Hashnode articles are up to date.");
};

sync().catch((err) => {
  logger.error(err);
  process.exit(1);
});
