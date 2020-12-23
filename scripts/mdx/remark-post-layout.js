/**
 * Automatically selects and renders layout for a post based on its `folder`.
 *
 * Requires `remark-post-metadata`.
 */
module.exports = () => (tree, file) => {
  const { post } = file.data;
  if (!post) file.fail("Not a post.");

  const { url, folder, title, description, tags, publishedTime } = post;
  const props = `{
    url: "${url}",
    title: "${title}",
    tags: [${tags.map((tag) => `"${tag}"`).join(", ")}],
    description: "${description}",
    publishedTime: new Date("${publishedTime}"),
  }`;

  tree.children.unshift(
    {
      type: "import",
      value: `import layout from "~components/mdx/${folder}";`,
    },
    {
      type: "export",
      default: true,
      value: `export default layout(${props});`,
    }
  );
};
