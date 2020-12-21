const path = require("path");
const glob = require("glob");
const metadata = require("../metadata.json");

const getAllPagePaths = () =>
  glob.sync(`pages/**/*.mdx`).map((name) => path.join(process.cwd(), name));

const pagePath2URLParams = (pagePath) => {
  let input = pagePath;

  const cwd = process.cwd();
  if (input.startsWith(cwd)) {
    input = input.substr(cwd.length + 1);
  }
  if (input.startsWith("pages/")) {
    input = input.substr(6);
  }
  if (input.endsWith(".mdx")) {
    input = input.substr(0, input.length - 4);
  }

  const subpage = path.dirname(input);
  const slug = path.basename(input);
  return { subpage, slug };
};

const getPageCanonicalURL = ({ subpage, slug }) =>
  `${metadata.url}/${subpage}/${slug}`;

const pagePath2CanonicalURL = (pagePath) =>
  getPageCanonicalURL(pagePath2URLParams(pagePath));

const isPage = (pagePath) => {
  const { subpage, slug } = pagePath2URLParams(pagePath);
  return (
    subpage.length > 0 && subpage.indexOf(path.sep) === -1 && slug.length > 0
  );
};

module.exports = {
  getAllPagePaths,
  pagePath2URLParams,
  getPageCanonicalURL,
  pagePath2CanonicalURL,
  isPage,
};
