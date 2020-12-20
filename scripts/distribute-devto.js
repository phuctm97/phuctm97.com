const path = require("path");
const fs = require("fs");
const matter = require("gray-matter");
const axios = require("axios").default;

// List all MDX blog pages.
const pagesDir = path.join(process.cwd(), "pages");
const blogDir = path.join(pagesDir, "blog");
const filenames = fs
  .readdirSync(blogDir)
  .filter((name) => /\.mdx$/.test(name))
  .map((name) => path.join(blogDir, name));

// Read all MDX frontmatters without 'dev.to id', sorted by published time.
const files = filenames
  .map((filename) => ({
    path: filename.substring(pagesDir.length, filename.length - 4),
    ...matter(fs.readFileSync(filename, "utf-8")),
  }))
  .filter((file) => file.data && !file.data["dev.to id"])
  .sort(
    (a, b) =>
      new Date(a.data["published time"]).getTime() -
      new Date(b.data["published time"]).getTime()
  );

// Distribute only first file.
const file = files[0];
if (!file) {
  console.log("Nothing to distribute.");
  process.exit(0);
}

// Prepare request to DEV.to.
const canonicalBaseURL = "https://phuctm97.com";
const devtoAPIKey = process.env.DEVTO_API_KEY ?? "";

const { data, content } = file;
const article = {
  title: data.title,
  published: false,
  description: data.description,
  canonical_url: `${canonicalBaseURL}${file.path}`,
  body_markdown: content,
};

// Call DEV.to create article API: https://docs.dev.to/api/#operation/createArticle.
axios
  .post(
    "https://dev.to/api/articles",
    { article },
    { headers: { "api-key": devtoAPIKey } }
  )
  .then((res) => console.log(res))
  .catch((err) => {
    console.error(err.message);
    if (err.response) {
      console.error(err.response.data);
    }

    process.exit(1);
  });
