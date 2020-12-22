const remark = require("remark");
const vfile = require("to-vfile");
const md5 = require("md5");

const startPlugins = [
  require("remark-frontmatter"),
  require("./remark-parse-frontmatter"),
  require("./remark-page-metadata"),
];

const endPlugins = [
  require("remark-squeeze-paragraphs"),
  require("./remark-unwrap-texts"),
  require("./remark-remove-frontmatter"),
];

const presets = {
  devto: {
    plugins: [
      ...startPlugins,
      require("./remark-devto-frontmatter"),
      ...endPlugins,
    ],
  },
};

const renderFor = (filePath, preset) => {
  const proc = remark().use(presets[preset]).freeze();
  const input = vfile.readSync(filePath);
  const output = proc.processSync(input);

  const { frontmatter } = output.data;
  const content = output.toString();
  return {
    frontmatter,
    content,
    md5: md5(`${JSON.stringify(frontmatter)}\n${content}`),
  };
};

module.exports = renderFor;
