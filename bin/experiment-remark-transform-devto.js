const path = require("path");
const remark = require("remark");
const preset = require("../mdx/remark-devto-preset");
const vfile = require("to-vfile");

const remarkProcessor = remark().use(preset).freeze();

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
