const remark = require("remark");
const vfile = require("to-vfile");

const processMDX = (path, preset) => {
  const processor = remark().use(preset).freeze();
  const input = vfile.readSync(path);
  const output = processor.processSync(input);

  return {
    frontmatter: output.data.frontmatter,
    content: output.toString(),
  };
};

module.exports = processMDX;
