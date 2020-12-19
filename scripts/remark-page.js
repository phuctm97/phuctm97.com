const path = require("path");
const yaml = require("yaml");
const find = require("unist-util-find");

const Components = {
  blog: "BlogPost",
};

const getRoute = (file) => {
  const pagesDir = path.join(file.cwd, "pages");

  const fileGrandDir = path.dirname(file.dirname);
  if (fileGrandDir !== pagesDir)
    return file.fail(`MDX pages must be in 'pages/*' ('${pagesDir}/*').`);

  const dir = path.basename(file.dirname);
  const Component = Components[dir];
  if (!Component)
    return file.fail(
      `MDX pages must be in [${Object.keys(Components).join(",")}].`
    );

  const slug = file.stem;
  return {
    Component,
    slug,
    path: `${dir}/${slug}`,
  };
};

module.exports = () => (tree, file) => {
  const yamlNode = find(tree, { type: "yaml" });
  const { title, description, publishedAt } = yaml.parse(yamlNode.value);

  const { path, Component } = getRoute(file);
  const props = `{
    path: "${path}",
    title: "${title}",
    description: "${description}",
    publishedAt: new Date("${publishedAt}"),
  }`;

  tree.children.unshift(
    {
      type: "import",
      value: `import ${Component} from "~components/mdx/${Component}";`,
    },
    {
      type: "export",
      default: true,
      value: `export default ${Component}(${props});`,
    }
  );
};
