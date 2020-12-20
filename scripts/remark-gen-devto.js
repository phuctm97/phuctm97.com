const path = require("path");
const fs = require("fs");
const axios = require("axios");
const matter = require("gray-matter");
const toMarkdown = require("mdast-util-to-markdown");
const { sleep } = require("./utils");

const CanonicalURL = "https://phuctm97";
const DEVToAPIKey = process.env.DEVTO_API_KEY ?? "";

const readDEVToIdentifiers = (filename) => {
  const { data } = matter(fs.readFileSync(filename, "utf-8"));
  if (!data.id || !data.url)
    throw new Error("Frontmatter must have 'id' and 'url'.");

  return data;
};

const beautifyAxiosErrorMessage = (err) => {
  let msg = err.message;
  if (err.response) msg += `\n${JSON.stringify(err.response.data, null, 2)}`;

  return msg;
};

const createDEVToArticle = async (title, file) => {
  file.info(`Creating a DEV.to article.`);

  try {
    return await axios.post(
      "https://dev.to/api/articles",
      {
        article: {
          title,
          body_markdown: [
            `#${title}`,
            `File: ${path.basename(file.dirname)}/${file.basename}`,
            "Working in progress",
          ].join("\n\n"),
          published: false,
        },
      },
      { headers: { "api-key": DEVToAPIKey } }
    );
  } catch (err) {
    throw new Error(beautifyAxiosErrorMessage(err));
  }
};

let lock = false;

module.exports = () => async (_, file) => {
  const { frontmatter, page } = file.data;
  if (!frontmatter || !page) return;

  while (lock) await sleep(10000);
  lock = true;

  try {
    const { title, description } = frontmatter;
    const { subpage, slug, path: urlPath } = page;

    const filename = path.join(process.cwd(), "dev.to", subpage, slug + ".md");
    const { id, url } = fs.existsSync(filename)
      ? readDEVToIdentifiers(filename)
      : await createDEVToArticle(title, file);

    const devToFrontmatter = {
      id,
      url,
      title,
      description,
      canonical_url: `${CanonicalURL}/${urlPath}`,
    };

    fs.writeFileSync(
      filename,
      matter.stringify(toMarkdown(tree), devToFrontmatter)
    );
  } catch (err) {
    file.fail(err);
  } finally {
    lock = false;
  }
};
