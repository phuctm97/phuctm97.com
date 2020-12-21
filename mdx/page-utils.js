const path = require("path");
const glob = require("glob");
const fs = require("fs");
const matter = require("gray-matter");
const metadata = require("../metadata.json");

const CWD = process.cwd();

const getURLParam = (pagePath) => {
  let input = pagePath;
  if (input.startsWith(CWD)) input = input.substr(CWD.length + 1);
  if (input.startsWith("pages/")) input = input.substr(6);
  if (input.endsWith(".mdx")) input = input.substr(0, input.length - 4);

  const subpage = path.dirname(input);
  const slug = path.basename(input);
  return { subpage, slug };
};

const getCanonicalURL = (subpage, slug) => `${metadata.url}/${subpage}/${slug}`;

const all = () =>
  glob.sync(`pages/**/*.mdx`).map((name) => path.join(CWD, name));

const read = (subpage, slug) => {
  const { data: frontmatter, content } = matter(
    fs.readFileSync(path.join(CWD, "pages", subpage, `${slug}.mdx`))
  );
  const canonicalURL = getCanonicalURL(subpage, slug);
  return {
    frontmatter: { ...frontmatter, subpage, slug, canonicalURL },
    content,
  };
};

const stringify = ({ frontmatter, content }) =>
  matter.stringify(content, frontmatter);

const pageUtils = {
  getURLParam,
  getCanonicalURL,
  all,
  read,
  stringify,
};

module.exports = pageUtils;
