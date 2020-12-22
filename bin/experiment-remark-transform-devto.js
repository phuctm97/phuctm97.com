const path = require("path");
const remark = require("remark");
const remarkExtractFrontmatter = require("remark-frontmatter");
const remarkParseFrontmatter = require("../mdx/remark-parse-frontmatter");
const remarkTransformDEVto = require("../mdx/remark-transform-devto");
const vfile = require("to-vfile");

const remarkProcessor = remark()
  .use(remarkExtractFrontmatter)
  .use(remarkParseFrontmatter)
  .use(remarkTransformDEVto)
  .freeze();

const getPath = (subpage, slug) =>
  path.resolve(__dirname, "..", "pages", subpage, `${slug}.mdx`);

const read = (subpage, slug) => {
  const input = vfile.readSync(getPath(subpage, slug));
  const output = remarkProcessor.processSync(input);

  return {
    frontmatter: { ...output.data.frontmatter, subpage, slug },
    content: output.toString(),
  };
};

const data = read("blog", "hello-world-start-blog-in-html");

console.log(data.frontmatter);
console.log("---");
console.log(data.content);
