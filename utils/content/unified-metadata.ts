import { Plugin } from "unified";
import { isObject } from "~/utils/lang/obj";
import getURL from "~/utils/content/get-url";
import isParent from "~/utils/unist/is-parent";

const transformPage: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("No file.path.");

  const data = file.data;

  if (!isObject(data)) return file.fail("Invalid file.data.");

  const { url, path, folder, slug } = getURL(file.path);

  // TODO: parse frontmatter.

  data.metadata = {
    url,
    path,
    folder,
    slug,
  };

  if (!isParent(tree)) return file.fail("Tree is empty.");

  tree.children.push({
    type: "export",
    value: `export const metadata = ${JSON.stringify(data.metadata)};`,
  });
};

export default transformPage;
