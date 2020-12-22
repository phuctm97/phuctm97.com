const path = require("path");
const remark = require("remark");
const frontmatter = require("remark-frontmatter");
const parseFrontmatter = require("../mdx/remark-parse-frontmatter");
const pageMetadata = require("../mdx/remark-page-metadata");
const devtoFrontmatter = require("../mdx/remark-devto-frontmatter");
const squeezeParagraphs = require("remark-squeeze-paragraphs");
const trimTextBreaks = require("../mdx/remark-trim-text-breaks");
const stringifyFrontmatter = require("../mdx/remark-stringify-frontmatter");
const vfile = require("to-vfile");

const remarkProcessor = remark()
  .use(frontmatter)
  .use(parseFrontmatter)
  .use(pageMetadata)
  .use(devtoFrontmatter)
  .use(squeezeParagraphs)
  .use(trimTextBreaks)
  .use(stringifyFrontmatter)
  .freeze();

const getPath = (subpage, slug) =>
  path.resolve(__dirname, "..", "pages", subpage, `${slug}.mdx`);

const read = (subpage, slug) => {
  const input = vfile.readSync(getPath(subpage, slug));
  const output = remarkProcessor.processSync(input);

  return {
    frontmatter: output.data.frontmatter,
    content: output.toString(),
  };
};

const data = read("blog", "hello-world-start-blog-in-html");

console.log("Frontmatter:");
console.log(data.frontmatter);
console.log("Content:");
console.log(data.content);
