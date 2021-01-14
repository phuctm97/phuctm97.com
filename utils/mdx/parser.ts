import { Plugin } from "unified";
import { Node } from "unist";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import { isObject } from "~/utils/lang/obj";
import getURL from "~/utils/mdx/get-url";
import { Data } from "~/utils/mdx/interfaces";
import validate from "~/utils/mdx/validate-frontmatter";

const parseTitle = (tree: Node) => {
  const h1 = select("heading[depth=1]", tree);
  if (!h1) throw new Error("Couldn't find title.");
  return mdToString(h1);
};

const parseDesc = (tree: Node) => {
  const p = select("paragraph", tree);
  if (!p) throw new Error("Couldn't find description.");
  return mdToString(p);
};

const parser: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("No file.path.");

  const { url, path, folder, slug } = getURL(file.path);

  if (!isObject(file.data)) return file.fail("Invalid file.data.");

  const data = file.data as Data;

  let title: string;
  let description: string;

  const { frontmatter } = data;
  if (frontmatter) {
    if (!validate(frontmatter)) return file.fail("Invalid frontmatter.");
    title = frontmatter.title || parseTitle(tree);
    description = frontmatter.description || parseDesc(tree);
  } else {
    title = parseTitle(tree);
    description = parseDesc(tree);
  }

  data.metadata = {
    title,
    description,
    url,
    path,
    folder,
    slug,
  };
};

export default parser;
