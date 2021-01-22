import { Plugin } from "unified";
import { Node } from "unist";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import compose from "~/utils/content/compose";
import getURL from "~/utils/content/url";
import getFrontmatter from "~/utils/content/frontmatter";
import isParent from "~/utils/unist/is-parent";

const parseTitle = (tree: Node) => {
  const h1 = select("heading[depth=1]", tree);
  if (!h1) throw new Error("No h1.");
  return mdToString(h1);
};

const parseDescription = (tree: Node) => {
  const p = select("paragraph", tree);
  if (!p) throw new Error("No p.");
  return mdToString(p);
};

const applyPlugins = compose([]);

const transformContent: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("No file.path.");

  const frontmatter = getFrontmatter(file.data);

  const content = applyPlugins(frontmatter, {
    metadata: {
      title: frontmatter.title || parseTitle(tree),
      description: frontmatter.description || parseDescription(tree),
      ...getURL(file.path),
    },
  });

  if (!isParent(tree)) return file.fail("Tree is empty.");

  tree.children.unshift({
    type: "import",
    value: `import Layout from "~/layouts/${content.metadata.folder}";`,
  });
  tree.children.push(
    {
      type: "export",
      value: `export const metadata = ${JSON.stringify(content.metadata)};`,
    },
    {
      type: "export",
      default: true,
      value: `export default Layout;`,
    }
  );
};

export default transformContent;
