const path = require("path");
const fs = require("fs");
const axios = require("axios");
const matter = require("gray-matter");
const toMarkdown = require("mdast-util-to-markdown");

const CanonicalURL = "https://phuctm97";
const DEVToID = "dev.to id";
const DEVToURL = "dev.to url";
const DEVToAPIKey = process.env.DEVTO_API_KEY ?? "";
const DEVToAPIAccessDelay = 10000;

const readDEVToIdentifiers = (absname, relname) => {
  const { data } = matter(fs.readFileSync(absname, "utf-8"));

  const id = data[DEVToID];
  const url = data[DEVToURL];
  if (!id || !url)
    return file.fail(
      `'${relname}' must have frontmatter '${DEVToID}' and '${DEVToURL}'.`
    );

  return [id, url];
};

const beautifyAxiosErrorMessage = (err) => {
  let msg = err.message;
  if (err.response) msg += `\n${JSON.stringify(err.response.data, null, 2)}`;

  return msg;
};

let devToAPILock = false;

const createDEVToArticle = async (title, filename) => {
  while (devToAPILock)
    await new Promise((resolve) => setTimeout(resolve, DEVToAPIAccessDelay));

  devToAPILock = true;
  console.log(`Creating a DEV.to article for ${filename}...`);

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
  } finally {
    devToAPILock = false;
  }
};

module.exports = () => async (_, file) => {
  const { frontmatter, page } = file.data;
  if (!frontmatter || !page) return;

  const { title, description } = frontmatter;
  const { subpage, slug, path: urlPath } = page;

  const devToFilename = path.join("dev.to", subpage, slug + ".md");
  const devToAbsname = path.join(process.cwd(), devToFilename);

  const [devToID, devToURL] = fs.existsSync(devToAbsname)
    ? readDEVToIdentifiers(devToAbsname, devToFilename)
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
    devToAbsname,
    matter.stringify(toMarkdown(tree), devToFrontmatter)
  );
};
