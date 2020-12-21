const pageUtils = require("../mdx/page-utils");

const Components = {
  blog: "BlogPost",
};

const Subpages = Object.keys(Components)
  .map((key) => `'${key}'`)
  .join(", ");

const getPageProps = (file) => {
  if (!pageUtils.isPage(file.path)) return;

  const { subpage, slug } = pageUtils.getURLParam(file.path);
  const Component = Components[subpage];
  if (typeof Component !== "string")
    return file.fail(
      `Subpage '${subpage}' is invalid. Valid subpages: ${Subpages}.`
    );

  return {
    Component,
    subpage,
    slug,
    url: pageUtils.getCanonicalURL(subpage, slug),
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
