const path = require("path");

const PagesDir = path.join(process.cwd(), "pages");

const Components = {
  blog: "BlogPost",
};

Components.toString = () =>
  Object.keys(Components)
    .filter((key) => key !== "toString")
    .map((key) => `'${key}'`)
    .join(", ");

const isPage = (file) => path.dirname(file.dirname) === PagesDir;

const getSubpage = (file) => path.basename(file.dirname);

const getPageProps = (file) => {
  const subpage = getSubpage(file);
  const Component = Components[subpage];
  if (typeof Component !== "string")
    return file.fail(
      `Subpage '${subpage}' is invalid. Valid subpages: ${Components}.`
    );

  const slug = file.stem;
  return {
    Component,
    slug,
    path: `${subpage}/${slug}`,
  };
};

module.exports = () => (tree, file) => {
  if (!isPage(file)) return;

  const {
    title,
    description,
    "published time": publishedTime,
  } = file.data.frontmatter;

  const { path, Component } = getPageProps(file);
  const props = `{
    path: "${path}",
    title: "${title}",
    description: "${description}",
    publishedTime: new Date("${publishedTime}"),
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
