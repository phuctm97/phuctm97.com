const {
  isPage,
  pagePath2URLParams,
  getPageCanonicalURL,
} = require("./page-utils");

const Components = {
  blog: "BlogPost",
};

const Subpages = Object.keys(Components)
  .map((key) => `'${key}'`)
  .join(", ");

const getPageProps = (file) => {
  if (!isPage(file.path)) return;

  const { subpage, slug } = pagePath2URLParams(file.path);
  const Component = Components[subpage];
  if (typeof Component !== "string")
    return file.fail(
      `Subpage '${subpage}' is invalid. Valid subpages: ${Subpages}.`
    );

  return {
    Component,
    subpage,
    slug,
    url: getPageCanonicalURL({ subpage, slug }),
  };
};

module.exports = () => (tree, file) => {
  file.data.page = getPageProps(file);

  const { frontmatter, page } = file.data;
  if (!frontmatter || !page) return;

  const { title, description, "published time": publishedTime } = frontmatter;
  const { url, Component } = page;

  const props = `{
    url: "${url}",
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
