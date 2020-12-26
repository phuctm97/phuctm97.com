const path = require("path");
const glob = require("glob");
const fs = require("fs");
const jsonc = require("jsonc-parser");

const { logger } = require("../scripts/bin-utils");
const { rootDir, relPagesDir } = require("../scripts/path-utils");
const { isPost, inferPostURLParams } = require("../scripts/post-utils");

const hashnode = require("hashnode-sdk-js");
const renderFor = require("../scripts/mdx/render-for");

const crosspostJSONPath = path.join(rootDir, "data", "crosspost-hashnode.json");
const toCrosspostEntry = (article, md5) => ({
  id: article.id,
  url: article.url,
  md5,
});

const parseCrosspostJSON = (filePath) => {
  const errs = [];

  const json = jsonc.parse(fs.readFileSync(filePath, "utf-8"), errs);
  if (errs.length > 0)
    throw new Error("Invalid JSON: " + JSON.stringify(errs, null, 2));

  return json;
};

const writeCrosspostJSON = (json, filePath) => {
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + "\n");
};

const crosspost = async () => {
  const crosspost = parseCrosspostJSON(crosspostJSONPath);

  const paths = glob.sync(`${relPagesDir}/**/*.mdx`, {
    cwd: rootDir,
    absolute: true,
  });

  const user = await hashnode.findUser("phuctm97");

  for (let filePath of paths) {
    if (!isPost(filePath)) continue;

    const { folder, slug } = inferPostURLParams(filePath);
    const postID = `${folder}/${slug}`;

    const data = renderFor(filePath, "hashnode");

    if (!crosspost[postID]) {
      logger.debug(`New post '${postID}': creating Hashnode story...`);

      const article = await hashnode.createPublicationArticle(
        user.publication.id,
        {
          ...data.frontmatter,
          contentMarkdown: data.content,
        }
      );
      crosspost[postID] = toCrosspostEntry(article, data.md5);

      logger.success(`Created Hashnode story '${article.url}'.`);
    } else {
      const { id, url: prevURL, md5: prevMD5 } = crosspost[postID];

      if (prevMD5 !== data.md5) {
        logger.debug(
          `Post '${postID}' changed: updating Hashnode article '${prevURL}'...`
        );

        const article = await hashnode.updatePublicationArticle(
          user.publication.id,
          {
            ...data.frontmatter,
            id,
            contentMarkdown: data.content,
          }
        );
        crosspost[postID] = toCrosspostEntry(article, data.md5);

        logger.success(`Updated Hashnode article '${article.url}'.`);
      }
    }
  }

  writeCrosspostJSON(crosspost, crosspostJSONPath);
  logger.info("Hashnode stories are up to date.");
};

crosspost().catch((err) => {
  logger.error(err);
  process.exit(1);
});
