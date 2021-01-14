import { Plugin } from "unified";
import { HasPost } from "@/next-blog/interfaces";
import isParent from "~/utils/unist/is-parent";

/**
 * A unified/remark plugin that exports `post` from a _parsed_ MDX blog post for dynamic rendering (if applicable).
 */
const exporter: Plugin = () => (tree, file) => {
  const { post } = file.data as Partial<HasPost>;
  if (!post) return file.message("Not a post, skip.");

  if (!isParent(tree)) return file.fail("Tree is empty.");
  tree.children.push({
    type: "export",
    value: `export const post = ${JSON.stringify(post)};`,
  });
};

export default exporter;
