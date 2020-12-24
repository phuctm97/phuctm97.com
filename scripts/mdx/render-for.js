const remark = require("remark");
const vfile = require("to-vfile");
const md5 = require("md5");

const startPlugins = [
  require("remark-frontmatter"),
  require("./remark-parse-frontmatter"),
  require("./remark-post-metadata"),
];

const endPlugins = [
  require("remark-squeeze-paragraphs"),
  require("./remark-absolute-links"),
  require("remark-unwrap-texts"),
  require("./remark-remove-frontmatter"),
];

const makePreset = (plugins) => ({
  plugins: [...startPlugins, ...plugins, ...endPlugins],
});

const presets = {
  devto: makePreset([require("./remark-devto-frontmatter")]),
  hashnode: makePreset([require("./remark-hashnode-frontmatter")]),
};

const validPresets = Object.keys(presets)
  .map((name) => `'${name}'`)
  .join(", ");

/**
 * Renders a post for distribution to other platforms. Currently supports: DEV.to, Hashnode.
 *
 * @param {string} filePath Absolute path to a post MDX file.
 * @param {string} preset Name of the target platform: `devto`, `hashnode`.
 */
const renderFor = (filePath, preset) => {
  const config = presets[preset];
  if (!config)
    throw new Error(
      `Preset '${preset}' is not supported. Valid presets: ${validPresets}.`
    );

  const proc = remark().use(config).freeze();
  const input = vfile.readSync(filePath);
  const output = proc.processSync(input);

  const { frontmatter } = output.data;
  const content = output.toString();
  const blob = `${JSON.stringify(frontmatter)}\n${content}`;
  return {
    frontmatter,
    content,
    md5: md5(blob),
  };
};

module.exports = renderFor;
