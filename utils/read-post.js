const remark = require("remark");
const vfile = require("to-vfile");

const processor = remark()
  .use(require("remark-frontmatter"))
  .use(require("remark-parse-frontmatter"))
  .use(require("../scripts/mdx/remark-post-metadata"))
  .freeze();

const readPost = (filename) => {
  const input = vfile.readSync(filename);
  const output = processor.processSync(input);
  return output.data.post;
};

module.exports = readPost;
