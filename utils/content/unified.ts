import { Plugin } from "unified";
import { Node } from "unist";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import { Content } from "~/interfaces/content";
import getURL from "~/utils/content/get-url";
import getFrontmatter from "~/utils/content/get-frontmatter";
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

const plugin: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("No file.path.");

  const frontmatter = getFrontmatter(file.data);

  const metadata: Content["metadata"] = {
    title: frontmatter.title || parseTitle(tree),
    description: frontmatter.description || parseDescription(tree),
    ...getURL(file.path),
  };

  if (!isParent(tree)) return file.fail("Tree is empty.");

  tree.children.push(
    {
      type: "export",
      value: `export const frontmatter = ${JSON.stringify(frontmatter)};`,
    },
    {
      type: "export",
      value: `export const metadata = ${JSON.stringify(metadata)};`,
    }
  );
};

export default plugin;
