import { Plugin } from "unified";
import { select } from "unist-util-select";
import mdToString from "mdast-util-to-string";
import { HasPost } from "@/next-blog/interfaces";
import { HasFrontmatter } from "@/mdx-with-frontmatter";
import isPost from "@/next-blog/is-post";
import getURLElements from "@/next-blog/get-url";
import validateFrontmatter from "@/next-blog/validate-frontmatter";
import generateCover from "@/next-blog/generate-cover";

/**
 * A unified plugin that parses and extracts a blog post's metadata from its file (if applicable).
 */
const parser: Plugin = () => (tree, file) => {
  if (!file.path) return file.fail("Unknown file path.");
  if (!isPost(file.path)) return file.message("Not a post, skip.");

  const { path: relURL, folder, slug } = getURLElements(file.path);

  const data = file.data as Partial<HasFrontmatter & HasPost>;

  const { frontmatter } = data;
  if (!frontmatter) return file.fail("No frontmatter.");

  validateFrontmatter(frontmatter);

  let title: string;
  let description: string;

  // Find title in frontmatter.title -> first h1.
  if (frontmatter.title) {
    title = frontmatter.title;
  } else {
    const h1 = select("heading[depth=1]", tree);
    if (!h1) return file.fail("Couldn't find title.");
    title = mdToString(h1);
  }

  // Find description in frontmatter.description -> first p.
  if (frontmatter.description) {
    description = frontmatter.description;
  } else {
    const p = select("paragraph", tree);
    if (!p) return file.fail("Couldn't find description.");
    description = mdToString(p);
  }

  data.post = {
    title,
    description,
    date: frontmatter.date,
    tags: frontmatter.tags || [],
    cover: generateCover({ ...frontmatter, title }),
    path: relURL,
    folder,
    slug,
  };
};

export default parser;
