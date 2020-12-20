const path = require("path");

const Components = {
  blog: "BlogPost",
};

const getSubpage = (file) => {
  const pagesDir = path.join(file.cwd, "pages");

  const baseDir = path.dirname(file.dirname);
  if (baseDir !== pagesDir)
    return file.fail(
      `MDX pages must be in '${path.relative(process.cwd(), pagesDir)}/*'.`
    );

  return path.basename(file.dirname);
};

const getRoute = (file) => {
  const sub = getSubpage(file);
  if (!sub) return;

  const Component = Components[sub];
  if (!Component)
    return file.fail(
      `Subpage '${sub}' is invalid. Valid subpages: ${Object.keys(Components)
        .map((it) => `'${it}'`)
        .join(", ")}.`
    );

  const slug = file.stem;
  return {
    Component,
    slug,
    path: `${sub}/${slug}`,
  };
};

module.exports = () => (tree, file) => {
  const {
    title,
    description,
    "published time": publishedTime,
  } = file.data.frontmatter;

  const { path, Component } = getRoute(file);
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
