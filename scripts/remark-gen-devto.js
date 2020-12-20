const path = require("path");
const fs = require("fs");
const axios = require("axios");
const matter = require("gray-matter");
const toMarkdown = require("mdast-util-to-markdown");

const CanonicalURL = "https://phuctm97";
const DEVToID = "dev.to id";
const DEVToURL = "dev.to url";
const DEVToDir = path.join(process.cwd(), "dev.to");
const DEVToAPIKey = process.env.DEVTO_API_KEY ?? "";

const readDEVToIdentifiers = (filename) => {
  const { data } = matter(fs.readFileSync(filename, "utf-8"));

  const id = data[DEVToID];
  const url = data[DEVToURL];
  if (!id || !url) {
    const relName = path.relative(DEVToDir, devToFilename);
    return file.fail(
      `'${relName}' must have frontmatter '${DEVToID}' and '${DEVToURL}'.`
    );
  }

  return [id, url];
};

const beautifyAxiosErrorMessage = (err) => {
  let msg = err.message;
  if (err.response) msg += `\n${JSON.stringify(err.response.data, null, 2)}`;

  return msg;
};

const createDEVToArticle = async (title, filename) => {
  console.log("Creating article");

  try {
    const res = await axios.post(
      "https://dev.to/api/articles",
      {
        article: {
          title,
          body_markdown: [
            `#${title}`,
            `File: ${filename}`,
            "Working in progress",
          ].join("\n"),
          published: false,
        },
      },
      { headers: { "api-key": DEVToAPIKey } }
    );
    return [res.id, res.url];
  } catch (err) {
    throw new Error(beautifyAxiosErrorMessage(err));
  }
};

module.exports = () => async (_, file) => {
  const { frontmatter, page } = file.data;
  if (!frontmatter || !page) return;

  const { title, description } = frontmatter;
  const { subpage, slug, path: urlPath } = page;

  const devToFilename = path.join(DEVToDir, subpage, slug + ".md");
  const [devToID, devToURL] = fs.existsSync(devToFilename)
    ? readDEVToIdentifiers(devToFilename)
    : await createDEVToArticle(title, devToFilename);
  if (!devToID || !devToURL) return;

  const devToFrontmatter = {
    [DEVToID]: devToID,
    [DEVToURL]: devToURL,
    title,
    description,
    canonical_url: `${CanonicalURL}/${urlPath}`,
  };

  fs.writeFileSync(
    devToFilename,
    matter.stringify(toMarkdown(tree), devToFrontmatter)
  );
};
