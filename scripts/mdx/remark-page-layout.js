module.exports = () => (tree, file) => {
  const { page } = file.data;
  if (!page) file.fail("Not a page.");

  const { subpage, url, title, description, publishedTime } = page;
  const props = `{
    url: "${url}",
    title: "${title}",
    description: "${description}",
    publishedTime: new Date("${publishedTime}"),
  }`;

  tree.children.unshift(
    {
      type: "import",
      value: `import layout from "~components/mdx/${subpage}";`,
    },
    {
      type: "export",
      default: true,
      value: `export default layout(${props});`,
    }
  );
};
