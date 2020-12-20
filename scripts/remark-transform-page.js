const path = require("path");

const PagesDir = path.join(process.cwd(), "pages");

const Components = {
  blog: "BlogPost",
};

const Subpages = Object.keys(Components)
  .map((key) => `'${key}'`)
  .join(", ");

const isPage = (file) => path.dirname(file.dirname) === PagesDir;

const getSubpageName = (file) => path.basename(file.dirname);

const getPageProps = (file) => {
  if (!isPage(file)) return;

  const subpage = getSubpageName(file);
  const Component = Components[subpage];
  if (typeof Component !== "string")
    return file.fail(
      `Subpage '${subpage}' is invalid. Valid subpages: ${Subpages}.`
    );

  const slug = file.stem;
  return {
    Component,
    subpage,
    slug,
    path: `${subpage}/${slug}`,
  };
};

module.exports = () => (tree, file) => {
  file.data.page = getPageProps(file);

  const { frontmatter, page } = file.data;
  if (!frontmatter || !page) return;

  const { title, description, "published time": publishedTime } = frontmatter;
  const { path: urlPath, Component } = page;

  const props = `{
    path: "${urlPath}",
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