const path = require("path");
const remark = require("remark");
const extractFrontmatter = require("remark-frontmatter");
const parseFrontmatter = require("../mdx/remark-parse-frontmatter");
const squeezeParagraphs = require("remark-squeeze-paragraphs");
const trimTextBreaks = require("../mdx/remark-trim-text-breaks");
const vfile = require("to-vfile");

const remarkProcessor = remark()
  .use(extractFrontmatter)
  .use(parseFrontmatter)
  .use(squeezeParagraphs)
  .use(trimTextBreaks)
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

console.log("Frontmatter:", data.frontmatter);
console.log("Content:", data.content);
