const path = require("path");
const fs = require("fs");
const axios = require("axios");
const matter = require("gray-matter");
const toMarkdown = require("mdast-util-to-markdown");

const CanonicalURL = "https://phuctm97";
const DEVToID = "dev.to id";
const DEVToDir = path.join(process.cwd(), "dev.to");
const DEVToAPIKey = process.env.DEVTO_API_KEY ?? "";

const readDEVToID = (filename) => {
  const { data } = matter(fs.readFileSync(filename, "utf-8"));

  const id = data[DEVToID];
  if (!id) {
    const relName = path.relative(DEVToDir, devToFilename);
    return file.fail(`Couldn't find attribute '${DEVToID}' in '${relName}'`);
  }

  return id;
};

const createDEVToID = async (title, filename) => {
  console.log("sending x");
  // const res = await axios.post(
  //   "https://dev.to/api/articles",
  //   {
  //     article: {
  //       title,
  //       body_markdown: [
  //         `#${title}`,
  //         `File: ${filename}`,
  //         "Working in progress",
  //       ].join("\n"),
  //       published: false,
  //     },
  //   },
  //   { headers: { "api-key": DEVToAPIKey } }
  // );

  // return res.id;
};

module.exports = () => async (_, file) => {
  const { frontmatter, page } = file.data;
  if (!frontmatter || !page) return;

  const { title, description } = frontmatter;
  const { subpage, slug, path: urlPath } = page;

  const devToFilename = path.join(DEVToDir, subpage, slug + ".md");
  const devToID = fs.existsSync(devToFilename)
    ? readDEVToID(devToFilename)
    : await createDEVToID(title, devToFilename);
  if (!devToID) return;

  const devToFrontmatter = {
    "dev.to id": devToID,
    title,
    description,
    canonical_url: `${CanonicalURL}/${urlPath}`,
  };

  fs.writeFileSync(
    devToFilename,
    matter.stringify(toMarkdown(tree), devToFrontmatter)
  );
};
