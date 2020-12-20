const path = require("path");
const fs = require("fs");
const yaml = require("yaml");
const vfile = require("to-vfile");
const find = require("unist-util-find");
const { createCompiler } = require("@mdx-js/mdx");
const remarkFrontmatter = require("remark-frontmatter");

// Find all MDX filenames
const dir = path.join(process.cwd(), "pages", "blog");
const filenames = fs
  .readdirSync(dir)
  .filter((name) => /\.mdx$/.test(name))
  .map((name) => path.join(dir, name));

// Create custom MDX loader to extract frontmatter.
const extractFrontmatter = () => (tree, file) => {
  const node = find(tree, { type: "yaml" });
  if (!node) return;

  file.data.frontmatter = yaml.parse(node.value);
};
const mdxc = createCompiler({
  remarkPlugins: [remarkFrontmatter, extractFrontmatter],
});

// Find a file without 'dev.to id'.
let filenameToBeDistributed;
for (let filename of filenames) {
  const file = vfile.readSync(filename, "utf8");

  mdxc.process(file, (err, file) => {
    if (err) throw err;
    if (!file.data.frontmatter) return;
    if (file.data.frontmatter["dev.to id"]) return;

    filenameToBeDistributed = filename;
  });

  if (filenameToBeDistributed) break;
}

console.log(filenameToBeDistributed);
